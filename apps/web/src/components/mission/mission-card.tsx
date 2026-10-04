import { Link } from "@/i18n/navigation";
import type { Mission } from "@/lib/missions";
import { DEMAND_DOTS, DEMAND_LABEL, formatSalaryRange, getRoleMeta } from "@/lib/role-meta";

function DifficultyBars({ level }: { level: number }) {
  return (
    <span className="inline-flex items-end gap-[3px]" aria-label={`Kesulitan ${level} dari 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          aria-hidden
          className="w-[4px] rounded-full"
          style={{ height: `${6 + i * 3}px`, background: i <= level ? "var(--brand-700)" : "var(--line)" }}
        />
      ))}
    </span>
  );
}

export function MissionCard({ mission }: { mission: Mission }) {
  const meta = getRoleMeta(mission.roleId);
  return (
    <article className="panel group p-6 transition hover:border-ink md:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {mission.roleId} · {mission.skkniUnitCode}
        </p>
        {meta?.popular && (
          <span className="rounded-full bg-signal/15 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-signal-strong">
            Populer
          </span>
        )}
      </div>

      <h3 className="font-nova mt-3 text-xl font-bold tracking-tight">
        <Link href={`/misi/${mission.slug}`} className="group-hover:text-brand-700">
          {mission.titleId}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-soft">{mission.briefId}</p>

      {/* Salary + demand band */}
      {meta && (
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Estimasi gaji</p>
            <p className="tnum font-nova text-lg font-bold text-ink">
              {formatSalaryRange(meta.salaryMin, meta.salaryMax)}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Permintaan</p>
            <p className="mt-1 flex items-center gap-2">
              <span className="inline-flex gap-[3px]" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-[6px] w-[6px] rounded-full"
                    style={{ background: i < DEMAND_DOTS[meta.demand] ? "var(--ok)" : "var(--line)" }}
                  />
                ))}
              </span>
              <span className="text-[12px] font-bold">{DEMAND_LABEL[meta.demand]}</span>
            </p>
          </div>
          <div className="ml-auto">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Sulit</p>
            <p className="mt-1"><DifficultyBars level={mission.difficulty} /></p>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="chip !text-[11px]">±{mission.estimatedMin} mnt</span>
        <span className="chip !text-[11px]">Revisi s.d. {mission.maxRevisions}x</span>
        {(mission.deliverableSpec.modes as string[]).slice(0, 3).map((m) => (
          <span key={m} className="chip !text-[11px] !text-muted">{m}</span>
        ))}
        <Link href={`/misi/${mission.slug}`} className="link-more ml-auto inline-flex min-h-[44px] items-center">
          Lihat brief →
        </Link>
      </div>
      <p className="mt-3 font-mono text-[10px] leading-relaxed text-faint">
        *Gaji estimasi entry-level Indonesia 2025–26, bukan janji penempatan.
      </p>
    </article>
  );
}
