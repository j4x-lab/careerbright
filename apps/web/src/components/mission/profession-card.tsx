import { Link } from "@/i18n/navigation";
import type { Role } from "@/lib/discovery";
import type { Mission } from "@/lib/missions";
import { DEMAND_DOTS, DEMAND_LABEL, formatSalaryRange, getRoleMeta } from "@/lib/role-meta";

/* Profession card: every profession matched to its mission.
 * Visual, not plain: salary band, demand dots, difficulty bars, tools, mission CTA. */

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

export function ProfessionCard({ role, mission }: { role: Role; mission: Mission | null }) {
  const meta = getRoleMeta(role.id);
  return (
    <article className="panel group flex h-full flex-col p-6 transition hover:border-ink">
      <div className="flex items-center gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-700">{role.category}</p>
        {meta?.popular && (
          <span className="rounded-full bg-signal/15 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-signal-strong">
            Populer
          </span>
        )}
      </div>

      <h3 className="font-nova mt-2 text-[19px] font-bold leading-snug tracking-tight">{role.title}</h3>
      <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-soft">{role.shortDescription}</p>

      {meta ? (
        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Gaji</dt>
            <dd className="tnum font-nova text-[17px] font-bold">{formatSalaryRange(meta.salaryMin, meta.salaryMax)}</dd>
          </div>
          <div className="text-right">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Sulit</dt>
            <dd className="mt-1 flex justify-end"><DifficultyBars level={mission?.difficulty ?? meta.difficulty} /></dd>
          </div>
          <div className="col-span-2">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Permintaan pasar</dt>
            <dd className="mt-1 flex items-center gap-2">
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
            </dd>
          </div>
        </dl>
      ) : (
        <p className="mt-4 font-mono text-[11px] text-muted">Metadata gaji menyusul.</p>
      )}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {role.tools.slice(0, 3).map((t) => (
          <span key={t} className="chip !px-2.5 !py-1 !text-[11px] !text-muted">{t}</span>
        ))}
        {role.tools.length > 3 && (
          <span className="font-mono text-[11px] text-faint">+{role.tools.length - 3}</span>
        )}
      </div>

      <div className="mt-auto pt-4">
        {mission ? (
          <Link
            href={`/misi/${mission.slug}`}
            className="btn-primary flex min-h-[48px] items-center justify-center px-5 text-sm"
          >
            Kerjakan misi →
          </Link>
        ) : (
          <p className="text-center font-mono text-[11px] text-muted">Misi segera hadir</p>
        )}
        {mission && (
          <p className="mt-2 text-center font-mono text-[10px] text-faint">
            {mission.skkniUnitCode} · ±{mission.estimatedMin} mnt · revisi {mission.maxRevisions}x
          </p>
        )}
      </div>
    </article>
  );
}
