import { Pool } from "pg";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/server/guard";
import { MissionWorkspace } from "@/components/mission/workspace";
import { MISSIONS_FALLBACK, parseMissionRow } from "@/lib/missions";

export const dynamic = "force-dynamic";

async function getMission(slug: string) {
  const fb = MISSIONS_FALLBACK.find((m) => m.slug === slug);
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL ?? "" });
    const { rows } = await pool.query(`select * from "Mission" where slug=$1 limit 1`, [slug]);
    await pool.end().catch(() => {});
    if (!rows[0]) return fb ?? null;
    return parseMissionRow(rows[0]);
  } catch {
    return fb ?? null;
  }
}

// /misi/[slug]/mulai — workspace multimode + submit → AI grade (steps 02-04).
// Gate: signed-in + subscription (FREE boleh 1 misi; STUDENT/CAMPUS unlimited).
export default async function MissionStart({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await getSession();
  if (!session) redirect("/auth/masuk");

  const mission = await getMission(slug);
  if (!mission) notFound();

  const user = session.user as { id?: string; email?: string | null };
  const userId = user.id ?? user.email ?? "anon";

  return (
    <main id="konten" tabIndex={-1} className="mx-auto max-w-4xl px-4 pb-20 pt-[120px] md:pt-[144px]">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        Pengerjaan · {mission.titleId}
      </p>
      <h1 className="font-nova mt-3 text-3xl font-bold md:text-4xl">Ruang kerja misi</h1>
      <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-soft">
        Isi output multimode di bawah. Kirim → dinilai AI per rubrik → revisi hingga {mission.maxRevisions}x → otomatis jadi portofolio bila skor ≥ 70.
      </p>
      <div className="panel mt-5 p-5 text-sm leading-relaxed">
        <strong>Brief singkat:</strong> {mission.briefId.slice(0, 400)}
      </div>
      <div className="mt-6">
        <MissionWorkspace mission={mission} userId={userId} />
      </div>
    </main>
  );
}
