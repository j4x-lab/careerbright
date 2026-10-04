import { requireRole } from "@/server/guard";

export const dynamic = "force-dynamic";

// /admin/kampus — paid cohort licenses + reporting entry point.
export default async function AdminKampus() {
  await requireRole(["ADMIN", "UNIVERSITY"]);
  return (
    <main id="konten" className="mx-auto max-w-5xl px-4 pb-20 pt-[120px]">
      <p className="eyebrow-light">Admin · lisensi cohort kampus</p>
      <h1 className="font-nova mt-3 text-3xl font-bold">Kampus + cohort</h1>
      <p className="mt-2 text-sm text-soft">
        Paid cohort dengan onboarding, pelaporan, dan outcome portofolio — kanal scale yang diprioritaskan.
      </p>
      <ul className="mt-4 list-disc pl-5 text-sm">
        <li><code className="font-mono">GET /api/campus/licenses</code> — daftar lisensi + memberCount</li>
        <li><code className="font-mono">POST /api/campus/licenses</code> — buat lisensi (seats, pricePerSeat, periode)</li>
        <li>Undang mahasiswa via <code className="font-mono">/langganan?invite=INVITE_CODE</code> — gratis via lisensi</li>
      </ul>
    </main>
  );
}
