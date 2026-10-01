// Student Dashboard — backend: learningPath.progress, lesson.complete,
// assessment.submit, credential.issue, order.create
import { UpgradeButton } from "./upgrade-button";

const cards = [
  { t: "Jalur aktif", v: "Junior Accountant — 62%" },
  { t: "Streak belajar", v: "12 hari" },
  { t: "Badge terkumpul", v: "7 / 14" },
  { t: "Skor kesiapan AI", v: "78 / 100" },
];

export default function StudentDashboard() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Dasbor Belajar</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.t} className="rounded-2xl border border-white/10 bg-ink-900 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">{c.t}</p>
            <p className="mt-2 text-lg font-semibold">{c.v}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-accent/30 bg-ink-900 p-6">
        <p className="font-semibold">Upgrade ke Sertifikat BNSP</p>
        <p className="mt-1 text-sm text-zinc-400">
          Selesaikan jalur, bayar via Midtrans di dasbor, lalu dijadwalkan ke LSP mitra (TUK/online).
        </p>
        <div className="mt-4">
          <UpgradeButton learningPathId="junior-accountant" priceLabel="IDR 1.250.000" />
        </div>
      </div>
    </main>
  );
}
