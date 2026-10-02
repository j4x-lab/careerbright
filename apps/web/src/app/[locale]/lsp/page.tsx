// LSP Assessor — sessions, APL-02 verification, rubric scoring → credential.bNSPIssue
import { OpsShell, StatCard } from "@/components/ops-shell";

export default function LspDashboard() {
  return (
    <OpsShell eyebrow="Asesmen · LSP/BNSP" title="LSP Asesor" desc="Sesi TUK dan online proctoring, verifikasi APL-02, penilaian rubrik SKKNI.">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard t="Terjadwal" v="6 sesi" s="minggu ini · 2 TUK" />
        <StatCard t="Menunggu" v="14 berkas" s="APL-02 perlu verifikasi" />
        <StatCard t="Keyakinan AI" v="0,74" s="rata-rata antrean review" />
      </div>
    </OpsShell>
  );
}
