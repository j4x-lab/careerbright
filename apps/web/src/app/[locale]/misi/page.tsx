import { Pool } from "pg";
import { ProfessionCard } from "@/components/mission/profession-card";
import { ROLES, ROLE_CATEGORIES } from "@/lib/discovery";
import { parseMissionRow } from "@/lib/missions";
import { MISSIONS_CATALOG, getMissionForRole } from "@/lib/missions-catalog";

export const dynamic = "force-dynamic";

async function getMissions() {
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL ?? "" });
    const { rows } = await pool.query(
      `select * from "Mission" where status='PUBLISHED' order by "publishedAt" desc nulls last limit 200`,
    );
    await pool.end().catch(() => {});
    if (!rows.length) return MISSIONS_CATALOG;
    return rows.map(parseMissionRow);
  } catch {
    return MISSIONS_CATALOG;
  }
}

// /misi — profession grid (every profession matched to its mission) + visual cards.
export default async function MisiCatalog({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const missions = await getMissions();
  const byRole = new Map(missions.map((m) => [m.roleId, m] as const));
  const cats = sp.kategori && ROLE_CATEGORIES.includes(sp.kategori as never) ? [sp.kategori] : [...ROLE_CATEGORIES];
  const covered = ROLES.filter((r) => byRole.has(r.id)).length;
  const q = (sp.q ?? "").trim().toLowerCase();
  const matchesQuery = (roleId: string, title: string) => {
    if (!q) return true;
    const mission = byRole.get(roleId);
    return `${roleId} ${title} ${mission?.titleId ?? ""} ${mission?.skkniUnitCode ?? ""}`.toLowerCase().includes(q);
  };

  return (
    <main id="konten" tabIndex={-1} className="mx-auto max-w-7xl px-4 pb-20 pt-[120px] md:pt-[144px]">
      <a href="#konten" className="skip-link">Lewati ke konten</a>
      <p className="eyebrow-light">Praktik profesi · bukan katalog kursus</p>
      <h1 className="font-nova mt-3 max-w-[26ch] text-4xl font-bold leading-[1.06] md:text-5xl">
        Pilih profesimu. Kerjakan misinya. Bawa buktinya.
      </h1>
      <p className="mt-4 max-w-[64ch] text-[15px] leading-relaxed text-soft">
        {ROLES.length} profesi · {covered} bermisi · tiap misi: brief realistis → output multimode → feedback AI → revisi → portofolio terverifikasi.
      </p>

      <ol className="mt-8 flex flex-wrap gap-2 border-y border-line py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {["01 Misi brief realistis", "02 Output multimode", "03 Feedback AI", "04 Revisi", "05 Portofolio terverifikasi"].map((s) => (
          <li key={s} className="chip !text-[11px]">{s}</li>
        ))}
      </ol>

      {/* Category filter */}
      <nav aria-label="Filter kategori" className="mt-8 flex flex-wrap gap-2">
        <a href="/misi" className={`chip min-h-[44px] ${!sp.kategori ? "!border-ink !bg-ink !text-white" : ""}`}>
          Semua ({ROLES.length})
        </a>
        {ROLE_CATEGORIES.map((c) => {
          const n = ROLES.filter((r) => r.category === c).length;
          const active = sp.kategori === c;
          return (
            <a
              key={c}
              href={`/misi?kategori=${encodeURIComponent(c)}`}
              aria-current={active ? "page" : undefined}
              className={`chip min-h-[44px] ${active ? "!border-ink !bg-ink !text-white" : ""}`}
            >
              {c} ({n})
            </a>
          );
        })}
      </nav>

      {sp.q && (
        <p className="mt-6 font-mono text-[12px] text-muted">
          Hasil pencarian “{sp.q}” — <a href="/misi" className="underline underline-offset-4">reset</a>
        </p>
      )}

      {cats.map((cat) => {
        const roles = ROLES.filter((r) => r.category === cat && matchesQuery(r.id, r.title));
        if (!roles.length) return null;
        return (
          <section key={cat} aria-labelledby={`cat-${cat}`} className="mt-12">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-t-2 border-brand-700 pt-6">
              <h2 id={`cat-${cat}`} className="font-nova text-2xl font-bold tracking-tight md:text-3xl">
                {cat}
              </h2>
              <p className="font-mono text-[11px] text-muted">
                {roles.length} profesi · {roles.filter((r) => byRole.has(r.id)).length} bermisi
              </p>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map((role) => (
                <ProfessionCard key={role.id} role={role} mission={byRole.get(role.id) ?? getMissionForRole(role.id)} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
