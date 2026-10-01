// Student Dashboard — backend: learningPath.progress, lesson.complete,
// assessment.submit, credential.issue, order.create, payment.webhook
import { UpgradeButton } from "./upgrade-button";

const STATS = [
  { t: "Jalur aktif", v: "Akuntan Junior", s: "62% selesai · Fase 3/5" },
  { t: "Streak belajar", v: "12 hari", s: "Terbaik 21 hari · lanjutkan" },
  { t: "Badge terkumpul", v: "7 / 14", s: "2 menunggu verifikasi AI" },
  { t: "Skor kesiapan AI", v: "78 / 100", s: "+6 minggu ini" },
];

export default function StudentDashboard() {
  return (
    <main className="grain mx-auto min-h-[100dvh] max-w-7xl bg-ink-950 px-4 py-10">
      <a href="/" className="link-more">
        ← Kembali
      </a>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Dasbor Belajar</h1>
          <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-zinc-400">
            Lanjutkan jalurmu. Setiap milestone yang selesai menjadi badge terverifikasi.
          </p>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] text-zinc-400">
          <span className="live-dot" aria-hidden /> sinkron · AI aktif
        </span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((c) => (
          <div key={c.t} className="spot rounded-2xl border border-white/10 bg-ink-900 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">{c.t}</p>
            <p className="tnum mt-2 text-xl font-bold tracking-tight">{c.v}</p>
            <p className="mt-1 text-xs text-zinc-500">{c.s}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-12">
        <div className="rounded-2xl border border-white/10 bg-ink-900 p-6 lg:col-span-7">
          <p className="text-[15px] font-semibold">Lanjutkan belajar</p>
          <p className="mt-1 text-sm text-zinc-400">Pajak Badan & e-Faktur · Pelajaran 3 dari 6</p>
          <div className="bar-track mt-4">
            <div className="bar-fill" style={{ width: "62%" }} />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="/id/belajar/js-dasar-analis" className="btn-primary group px-6 py-3 text-sm">
              Lanjut Pelajaran
              <span className="btn-island !h-7 !w-7 text-sm">→</span>
            </a>
            <a href="/id/paths/junior-accountant" className="btn-ghost px-6 py-3 text-sm">
              Lihat Jalur
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-accent/30 bg-ink-900 p-6 lg:col-span-5">
          <p className="font-semibold">Upgrade ke Sertifikat BNSP</p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-400">
            Selesaikan jalur, bayar via Midtrans di dasbor, lalu dijadwalkan ke LSP mitra.
          </p>
          <p className="tnum mt-3 font-mono text-2xl font-bold">
            IDR 1.250.000 <span className="text-xs font-normal text-zinc-500">sekali bayar</span>
          </p>
          <div className="mt-4">
            <UpgradeButton learningPathId="junior-accountant" priceLabel="IDR 1.250.000" />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-ink-900 p-6">
        <p className="text-[15px] font-semibold">Dompet kredensial</p>
        <p className="mt-1 text-sm text-zinc-400">
          7 badge OB 3.0 terbit · bagikan ke LinkedIn atau unduh PDF kapan saja.
        </p>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {["Keu-01", "Pajak-05", "Lapor-07", "Capstone"].map((b) => (
            <span
              key={b}
              className="flex-none rounded-lg border border-white/10 bg-ink-950 px-4 py-3 font-mono text-xs text-zinc-300"
            >
              ◆ {b} · <span className="text-accent">valid</span>
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
