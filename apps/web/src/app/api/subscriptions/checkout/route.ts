import { z } from "zod";
import { Pool } from "pg";
import { createSnapTransaction, subscriptionPrice } from "@careerbright/payments/server";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? "",
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

const Body = z.object({
  userId: z.string().min(1),
  tier: z.enum(["MONTHLY", "SEMESTER", "ANNUAL"]),
  customerEmail: z.string().email().optional(),
  customerName: z.string().optional(),
  campusInviteCode: z.string().optional(),
});

function orderNumber() {
  return `SUB-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

// POST /api/subscriptions/checkout — Rp69k/bln (Exec Summary §3) + paket semester/tahunan.
// Campus invite → gratis (lisensi kampus menanggung).
export async function POST(req: Request) {
  const body = Body.parse(await req.json());
  const price = subscriptionPrice(body.tier);

  if (body.campusInviteCode) {
    const lic = await pool.query(`select * from "CampusLicense" where "inviteCode"=$1 and status='ACTIVE' limit 1`, [
      body.campusInviteCode,
    ]);
    if (lic.rows[0]) {
      await pool.query(`update "AppUser" set "campusLicenseId"=$1, "subscriptionTier"='CAMPUS', "subscriptionEndsAt"=$2 where id=$3`, [
        lic.rows[0].id,
        lic.rows[0].endsAt,
        body.userId,
      ]);
      return Response.json({ free: true, license: lic.rows[0].name });
    }
  }

  const order = await pool.query(
    `insert into "Order" (id, "userId", "orderNumber", status, "totalAmount", currency, "paymentGateway", type, "createdAt", "updatedAt") values (gen_random_uuid()::text,$1,$2,'PENDING',$3,'IDR','MIDTRANS','SUBSCRIPTION',now(),now()) returning *`,
    [body.userId, orderNumber(), price],
  );
  const row = order.rows[0];

  const snap = await createSnapTransaction({
    orderId: row.orderNumber,
    grossAmount: price,
    itemName: `Career SuperBright ${body.tier} — Rp${price.toLocaleString("id-ID")}`,
    customerEmail: body.customerEmail,
    customerName: body.customerName,
  });

  await pool.query(`update "Order" set "gatewayPayload"=$1::jsonb where id=$2`, [JSON.stringify({ snapToken: snap.token, tier: body.tier }), row.id]);
  return Response.json({ snapToken: snap.token, orderNumber: row.orderNumber, price });
}
