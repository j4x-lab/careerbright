import { Pool } from "pg";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
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

// /misi/[slug] — Brief realistis + deliverable spec + rubrik (steps 01).
export default async function MissionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mission = await getMission(slug);
  if (!mission) notFound();

  return (
    <main id="konten" tabIndex={-1} className="mx-auto max-w-4xl px-4 pb-20 pt-[120px] md:pt-[144px]">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        Misi · {mission.roleId} · {mission.skkniUnitCode} · KKNI {mission.kkniLevel}
      </p>
      <h1 className="font-nova mt-3 text-3xl font-bold leading-tight md:text-5xl">{mission.titleId}</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="chip !text-[11px]">±{mission.estimatedMin} menit</span>
        <span className="chip !text-[11px]">Level {mission.difficulty}</span>
        <span className="chip !text-[11px]">Revisi s.d. {mission.maxRevisions}x</span>
      </div>

      <section aria-labelledby="brief" className="panel mt-8 p-6 md:p-8">
        <h2 id="brief" className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">Brief realistis</h2>
        <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed">{mission.briefId}</p>
      </section>

      <section aria-labelledby="deliv" className="panel mt-5 p-6 md:p-8">
        <h2 id="deliv" className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">Yang harus dikumpulkan</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {(mission.deliverableSpec.modes as string[]).map((m) => (
            <li key={m} className="chip">{m}</li>
          ))}
        </ul>
        {mission.deliverableSpec.constraints && (
          <p className="mt-3 text-sm text-soft">{mission.deliverableSpec.constraints}</p>
        )}
        <p className="mt-2 font-mono text-[11px] text-muted">
          Minimal {mission.deliverableSpec.minArtifacts ?? 1} artifact terisi.
        </p>
      </section>

      <section aria-labelledby="rubrik" className="panel mt-5 p-6 md:p-8">
        <h2 id="rubrik" className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">Rubrik penilaian</h2>
        <ol className="mt-3 grid gap-2">
          {mission.rubric.map((r) => (
            <li key={r.id} className="flex items-baseline justify-between gap-4 border-t border-line py-2">
              <span className="text-sm font-bold">{r.labelId}</span>
              <span className="font-mono text-[11px] text-muted">bobot {r.weight}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[13px] text-muted">
          Nilai pertama bukan hasil akhir — perilaku perbaikan ikut diukur. Confidence &lt; 0.7 → review manusia.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={`/misi/${mission.slug}/mulai`} className="btn-primary min-h-[52px] px-7 text-[15px]">
          Mulai kerjakan →
        </Link>
        <Link href="/misi" className="link-more inline-flex min-h-[44px] items-center">
          ← Semua misi
        </Link>
      </div>
    </main>
  );
}
