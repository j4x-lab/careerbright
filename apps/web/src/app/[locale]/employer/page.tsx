// Employer — search skill profiles by SKKNI/KKNI, verify via /verify/[id]
import { OpsShell } from "@/components/ops-shell";

export default function EmployerDashboard() {
  return (
    <OpsShell eyebrow="Hiring · employer" title="Employer" desc="Cari profil skill terverifikasi SKKNI/KKNI/peran, verifikasi kredensial, pasang lowongan.">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Cari talenta", "Filter KKNI 5–7 · 7 kategori peran · kesiapan AI ≥ 75."],
          ["Verifikasi 1-klik", "Pindai QR di CV → buka /verify/[id] → lihat SKKNI + status BNSP."],
          ["Pasang lowongan", "Targetkan kota Wave 1: Jakarta, Surabaya, Bandung."],
        ].map(([h, d]) => (
          <div key={h} className="spot panel p-6">
            <p className="text-[15px] font-extrabold">{h}</p>
            <p className="mt-2 text-sm leading-relaxed text-soft">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <a href="/id/verify/contoh" className="btn-primary group px-6 py-3 text-sm">
          Coba Verifikasi <span className="btn-island">↗</span>
        </a>
      </div>
    </OpsShell>
  );
}
