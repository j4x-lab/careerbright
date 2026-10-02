// University — cohort analytics, curriculum→SKKNI gap map, export
import { OpsShell, StatCard } from "@/components/ops-shell";

export default function UniversityDashboard() {
  return (
    <OpsShell eyebrow="Kampus · cohorts" title="Universitas" desc="Analitik kohort, peta kesenjangan kurikulum → SKKNI, dan ekspor kelulusan.">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard t="Mahasiswa aktif" v="412" s="3 prodi · semester berjalan" />
        <StatCard t="Cakupan SKKNI" v="68%" s="kurikulum → SKKNI terpetakan" />
        <StatCard t="Tersertifikasi" v="23" s="lulusan BNSP semester ini" />
      </div>
    </OpsShell>
  );
}
