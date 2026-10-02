// Admin Dashboard — KPIs, catalog, users, LSP partners, payments reconciliation.
const KPIS = [
  { t: "MAU", v: "1.240", s: "+18% MoM" },
  { t: "Completion", v: "34%", s: "target 40%" },
  { t: "Upgrade CVR", v: "6,1%", s: "ke BNSP" },
  { t: "MRR", v: "IDR 42 jt", s: "+9% MoM" },
];

export default function AdminDashboard() {
  return (
    <main className="mx-auto min-h-[100dvh] max-w-7xl bg-paper px-4 py-10">
      <a href="/" className="link-more">
        ← Beranda
      </a>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Admin</h1>
      <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-soft">
        KPI, katalog, pengguna, mitra LSP, dan rekonsiliasi pembayaran.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.t} className="rounded-2xl border border-ink/10 bg-card p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{k.t}</p>
            <p className="tnum mt-2 font-mono text-2xl font-bold">{k.v}</p>
            <p className="mt-1 text-xs text-muted">{k.s}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-dashed border-ink/20 bg-card p-8 text-center">
        <p className="text-sm font-semibold">Modul katalog & rekonsiliasi</p>
        <p className="mx-auto mt-1 max-w-[52ch] text-sm text-soft">
          Persetujuan kursus, slot TUK, dan rekonsiliasi Midtrans/Xendit menyusul di Phase 5.
        </p>
      </div>
    </main>
  );
}
