// Admin Dashboard — KPIs, catalog, users, LSP partners, payments reconciliation.
import { OpsShell, StatCard } from "@/components/ops-shell";

const KPIS = [
  { t: "MAU", v: "1.240", s: "+18% MoM" },
  { t: "Completion", v: "34%", s: "target 40%" },
  { t: "Upgrade CVR", v: "6,1%", s: "ke BNSP" },
  { t: "MRR", v: "IDR 42 jt", s: "+9% MoM" },
];

export default function AdminDashboard() {
  return (
    <OpsShell eyebrow="Ops · admin" title="Admin" desc="KPI, katalog, pengguna, mitra LSP, dan rekonsiliasi pembayaran.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((k) => <StatCard key={k.t} {...k} />)}
      </div>
      <div className="panel-warm mt-4 border-dashed p-8 text-center">
        <p className="text-[15px] font-extrabold">Modul katalog & rekonsiliasi</p>
        <p className="mx-auto mt-1 max-w-[52ch] text-sm text-soft">
          Persetujuan kursus, slot TUK, dan rekonsiliasi Midtrans/Xendit menyusul di Phase 5.
        </p>
      </div>
    </OpsShell>
  );
}
