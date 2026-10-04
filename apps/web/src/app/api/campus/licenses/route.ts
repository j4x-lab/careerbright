import { z } from "zod";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? "",
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

// GET /api/campus/licenses?universityId=xxx — list licenses + usage.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const universityId = url.searchParams.get("universityId");
  const sql = universityId
    ? `select l.*, (select count(*)::int from "AppUser" u where u."campusLicenseId"=l.id) as "memberCount" from "CampusLicense" l where l."universityId"=$1 order by l."createdAt" desc`
    : `select l.*, (select count(*)::int from "AppUser" u where u."campusLicenseId"=l.id) as "memberCount" from "CampusLicense" l order by l."createdAt" desc limit 100`;
  const { rows } = await pool.query(sql, universityId ? [universityId] : []);
  return Response.json(rows);
}

const Create = z.object({
  universityId: z.string().min(1),
  name: z.string().min(2).max(200),
  contactEmail: z.string().email(),
  seats: z.number().min(1).max(100000),
  pricePerSeat: z.number().min(0),
  startsAt: z.string(),
  endsAt: z.string(),
});

// POST /api/campus/licenses — create paid cohort license.
export async function POST(req: Request) {
  const body = Create.parse(await req.json());
  const { rows } = await pool.query(
    `insert into "CampusLicense" (id, "universityId", name, "contactEmail", seats, "pricePerSeat", "startsAt", "endsAt", status, "inviteCode", "createdAt", "updatedAt") values (gen_random_uuid()::text,$1,$2,$3,$4,$5,$6,$7,'ACTIVE',gen_random_uuid()::text,now(),now()) returning *`,
    [body.universityId, body.name, body.contactEmail, body.seats, body.pricePerSeat, body.startsAt, body.endsAt],
  );
  return Response.json(rows[0]);
}
