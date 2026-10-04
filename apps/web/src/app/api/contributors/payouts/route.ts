import { z } from "zod";
import { Pool } from "pg";
import { clampPayoutRate, disbursePayout, payoutForCompletions } from "@careerbright/payments/server";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? "",
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

// GET /api/contributors/payouts?contributorId=xxx — list payouts.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const contributorId = url.searchParams.get("contributorId");
  const sql = contributorId
    ? `select p.*, m.slug as "missionSlug", m."titleId" as "missionTitle" from "ContributorPayout" p join "Mission" m on m.id=p."missionId" where p."contributorId"=$1 order by p."createdAt" desc`
    : `select p.*, m.slug as "missionSlug" from "ContributorPayout" p join "Mission" m on m.id=p."missionId" order by p."createdAt" desc limit 100`;
  const { rows } = await pool.query(sql, contributorId ? [contributorId] : []);
  return Response.json(rows);
}

const Compute = z.object({
  periodStart: z.string(),
  periodEnd: z.string(),
});

// POST /api/contributors/payouts/compute — aggregate verified completions → payout rows.
// Rp500–1000 per verified completion (Exec Summary §3), rate from Contributor.payoutRate.
export async function POST(req: Request) {
  const body = Compute.parse(await req.json());
  const { rows: agg } = await pool.query(
    `select m."authorId" as "contributorId", m.id as "missionId", count(distinct ma."userId")::int as completions
     from "MissionAttempt" ma join "Mission" m on m.id = ma."missionId"
     where ma.status='GRADED' and ma."reviewedAt" between $1 and $2 and m."authorId" is not null
     group by m."authorId", m.id`,
    [body.periodStart, body.periodEnd],
  );
  const created: unknown[] = [];
  for (const r of agg) {
    const c = await pool.query(`select "payoutRate" from "Contributor" where id=$1`, [r.contributorId]);
    const rate = clampPayoutRate(Number(c.rows[0]?.payoutRate ?? 750));
    const amount = payoutForCompletions(Number(r.completions), rate);
    if (amount <= 0) continue;
    const ins = await pool.query(
      `insert into "ContributorPayout" (id, "contributorId", "missionId", completions, amount, method, "periodStart", "periodEnd", status, "createdAt") values (gen_random_uuid()::text,$1,$2,$3,$4,'MANUAL',$5,$6,'PENDING',now()) returning *`,
      [r.contributorId, r.missionId, r.completions, amount, body.periodStart, body.periodEnd],
    );
    created.push(ins.rows[0]);
  }
  return Response.json({ created });
}

const Pay = z.object({
  payoutId: z.string(),
  method: z.enum(["MIDTRANS", "MANUAL"]).default("MANUAL"),
  reference: z.string().max(200).optional(),
});

// POST /api/contributors/payouts/pay — disburse (Q5: both Midtrans + manual).
export async function PATCH(req: Request) {
  const body = Pay.parse(await req.json());
  const cur = await pool.query(
    `select p.*, c."bankName", c."bankAccount", c."displayName" from "ContributorPayout" p join "Contributor" c on c.id=p."contributorId" where p.id=$1`,
    [body.payoutId],
  );
  const row = cur.rows[0];
  if (!row) return Response.json({ error: "Not found" }, { status: 404 });
  const ref = body.reference ?? `PAY-${row.id.slice(0, 8)}-${Date.now().toString(36).toUpperCase()}`;
  const res = await disbursePayout({
    amount: Number(row.amount),
    bankName: String(row.bankName ?? "-"),
    bankAccount: String(row.bankAccount ?? "-"),
    accountName: String(row.displayName ?? "-"),
    reference: ref,
    method: body.method,
  });
  await pool.query(`update "ContributorPayout" set method=$1, reference=$2, status=$3, "paidAt"=case when $3='PAID' then now() else null end where id=$4`, [
    res.method,
    res.reference,
    res.method === "MANUAL" ? "PROCESSING" : res.status,
    row.id,
  ]);
  if (res.method === "MANUAL") {
    // Manual: admin transfers via bank, then confirms; keep audit trail in reference.
    await pool.query(`update "Contributor" set "totalEarnings"="totalEarnings"+$1 where id=$2`, [row.amount, row.contributorId]);
  }
  return Response.json(res);
}
