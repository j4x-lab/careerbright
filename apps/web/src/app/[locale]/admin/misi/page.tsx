import { requireRole } from "@/server/guard";

export const dynamic = "force-dynamic";

// /admin/misi — curation queue (kurasi + kalibrasi sebelum publish).
export default async function AdminMisi() {
  await requireRole(["ADMIN", "LSP_ASSESSOR"]);
  return (
    <main id="konten" className="mx-auto max-w-5xl px-4 pb-20 pt-[120px]">
      <p className="eyebrow-light">Admin · kurasi misi</p>
      <h1 className="font-nova mt-3 text-3xl font-bold">Antrian kurasi</h1>
      <p className="mt-2 text-sm text-soft">
        Setiap misi melalui kurasi + kalibrasi sebelum publish. Gunakan tRPC <code className="font-mono">missions.curationQueue</code> +{" "}
        <code className="font-mono">missions.setStatus</code> dari console, atau endpoint berikut:
      </p>
      <ul className="mt-4 list-disc pl-5 text-sm">
        <li><code className="font-mono">GET /api/missions/review?status=NEEDS_HUMAN_REVIEW</code> — antrian penilaian manusia</li>
        <li><code className="font-mono">POST /api/missions/review</code> — override asesor → GRADED + portofolio</li>
        <li><code className="font-mono">POST /api/contributors/payouts/compute</code> — hitung komisi Rp500–1000/completion</li>
        <li><code className="font-mono">PATCH /api/contributors/payouts/pay</code> — cairkan (MIDTRANS/MANUAL)</li>
      </ul>
      <p className="mt-4 text-sm text-muted">Full table UI menyusul — API + tRPC sudah live dan dipakai /kontributor.</p>
    </main>
  );
}
