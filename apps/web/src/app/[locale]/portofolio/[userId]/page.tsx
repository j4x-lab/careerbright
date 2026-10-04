import { Pool } from "pg";

export const dynamic = "force-dynamic";

type Entry = {
  id: string;
  missionSlug: string | null;
  missionTitle: string | null;
  briefSnapshot: unknown;
  artifacts: unknown;
  rubricSnapshot: unknown;
  aiFeedback: unknown;
  revisions: unknown;
  reflectionId: string | null;
  publishedAt: string;
};

// /portofolio/[userId] — Bukti terverifikasi (step 05): brief + proses + output + revisi + rubrik + refleksi.
export default async function PortfolioPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  let entries: Entry[] = [];
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL ?? "" });
    const { rows } = await pool.query(
      `select pe.id, pe."briefSnapshot", pe.artifacts, pe."rubricSnapshot", pe."aiFeedback", pe.revisions, pe."reflectionId", pe."publishedAt", m.slug as "missionSlug", m."titleId" as "missionTitle" from "PortfolioEntry" pe join "Mission" m on m.id = pe."missionId" where pe."userId"=$1 and pe."isPublic"=true order by pe."publishedAt" desc`,
      [decodeURIComponent(userId)],
    );
    await pool.end().catch(() => {});
    entries = rows as Entry[];
  } catch {
    entries = [];
  }

  return (
    <main id="konten" tabIndex={-1} className="mx-auto max-w-4xl px-4 pb-20 pt-[120px] md:pt-[144px]">
      <p className="eyebrow-light">Portofolio terverifikasi</p>
      <h1 className="font-nova mt-3 text-3xl font-bold md:text-5xl">Bukti, bukan sekadar sertifikat.</h1>
      <p className="mt-3 font-mono text-[11px] text-muted">
        {decodeURIComponent(userId)} · {entries.length} misi selesai
      </p>
      <div className="mt-8 grid gap-5">
        {entries.map((e) => {
          const brief = e.briefSnapshot as { titleId?: string; briefId?: string; skkniUnitCode?: string } | null;
          const arts = (Array.isArray(e.artifacts) ? e.artifacts : []) as { mode?: string; content?: string }[];
          const fb = e.aiFeedback as { score?: number; confidence?: number; feedbackId?: string } | null;
          return (
            <article key={e.id} className="panel p-6 md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {(brief?.skkniUnitCode ?? "") || e.missionSlug} · {new Date(e.publishedAt).toLocaleDateString("id-ID")}
              </p>
              <h2 className="font-nova mt-2 text-2xl font-bold">{e.missionTitle ?? brief?.titleId}</h2>
              {brief?.briefId && <p className="mt-2 text-sm text-soft">{String(brief.briefId).slice(0, 300)}</p>}
              <div className="mt-4 border-t border-line pt-4">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]">Output</p>
                <ul className="mt-2 grid gap-2">
                  {arts.map((a, i) => (
                    <li key={i} className="text-sm">
                      <span className="chip mr-2 !text-[10px]">{a.mode}</span>
                      <span className="break-words text-soft">{String(a.content ?? "").slice(0, 300)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {fb && (
                <div className="mt-4 border-t border-line pt-4">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
                    Skor {fb.score} · Confidence {fb.confidence}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-soft">{fb.feedbackId}</p>
                </div>
              )}
              {e.reflectionId && (
                <div className="mt-4 border-t border-line pt-4">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]">Refleksi</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm">{e.reflectionId}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
      {entries.length === 0 && (
        <p className="mt-8 text-sm text-muted">
          Belum ada portofolio publik. Selesaikan misi di /misi dengan skor ≥ 70 untuk mengisi halaman ini.
        </p>
      )}
    </main>
  );
}
