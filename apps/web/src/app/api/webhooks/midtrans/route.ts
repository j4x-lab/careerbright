import { z } from "zod";
import { prisma } from "@careerbright/db";
import { verifyMidtransSignature } from "@careerbright/payments/server";

const Notification = z.object({
  order_id: z.string(),
  status_code: z.string(),
  gross_amount: z.string(),
  transaction_status: z.string(),
  fraud_status: z.string().optional(),
  signature_key: z.string(),
});

// POST /api/webhooks/midtrans — verify signature, flip Order to PAID on settlement.
export async function POST(req: Request) {
  const n = Notification.parse(await req.json());
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) return Response.json({ error: "gateway not configured" }, { status: 503 });

  const ok = verifyMidtransSignature({
    orderId: n.order_id,
    statusCode: n.status_code,
    grossAmount: n.gross_amount,
    serverKey,
    signature: n.signature_key,
  });
  if (!ok) return Response.json({ error: "bad signature" }, { status: 401 });

  const paid = n.transaction_status === "settlement" || n.transaction_status === "capture";
  if (paid) {
    await prisma.order.updateMany({
      where: { orderNumber: n.order_id },
      data: { status: "PAID", gatewayPayload: n as never },
    });
    // Subscription activation: SUBSCRIPTION orders extend AppUser subscription.
    // Raw pg (not Prisma) — Prisma client can't regenerate on Termux, and the
    // new subscriptionTier/subscriptionEndsAt columns exist in schema.sql.
    try {
      const { Pool } = await import("pg");
      const pool = new Pool({ connectionString: process.env.DATABASE_URL ?? "" });
      const { rows } = await pool.query(`select "userId", type, "gatewayPayload" from "Order" where "orderNumber"=$1 limit 1`, [n.order_id]);
      const order = rows[0] as { userId?: string; type?: string; gatewayPayload?: { tier?: string } | string } | undefined;
      const tier = (typeof order?.gatewayPayload === "string" ? undefined : order?.gatewayPayload?.tier) ?? "MONTHLY";
      if (order?.type === "SUBSCRIPTION" && order.userId && order.userId !== "pending-auth") {
        const days = tier === "ANNUAL" ? 365 : tier === "SEMESTER" ? 180 : 30;
        await pool.query(`update "AppUser" set "subscriptionTier"=$1, "subscriptionEndsAt"=now() + ($2 || ' days')::interval where id=$3`, [tier, String(days), order.userId]);
      }
      await pool.end().catch(() => {});
    } catch {
      /* best-effort: order already PAID above */
    }
  }
  return Response.json({ ok: true });
}
