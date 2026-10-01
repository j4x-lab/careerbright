// Admin Dashboard — KPIs, catalog, users, LSP partners, payments reconciliation.
export default function AdminDashboard() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {["MAU 1.240", "Completion 34%", "Upgrade CVR 6,1%", "MRR IDR 42 jt"].map((t) => (
          <div key={t} className="rounded-2xl border border-white/10 bg-ink-900 p-5 font-mono text-sm">{t}</div>
        ))}
      </div>
    </main>
  );
}
