// Cerah v2 — student dashboard app-shell: sidebar + progress + wallet + upgrade.
import { UpgradeButton } from "./upgrade-button";

const STATS = [
  { t: "Jalur aktif", v: "Akuntan Junior", s: "62% selesai · Fase 3/5", w: "62%" },
  { t: "Streak belajar", v: "12 hari", s: "Terbaik 21 hari", w: "80%" },
  { t: "Badge terkumpul", v: "7 / 14", s: "2 menunggu verifikasi AI", w: "50%" },
  { t: "Skor kesiapan AI", v: "78 / 100", s: "+6 minggu ini", w: "78%" },
];

const NAV: [string, string, boolean][] = [
  ["Belajar", "/id/dashboard", true],
  ["Jalur saya", "/id/paths/junior-accountant", false],
  ["Asesmen", "/id/belajar/js-dasar-analis", false],
  ["Dompet", "/id/verify/contoh", false],
  ["Pengaturan", "/id/auth/masuk", false],
];

export default function StudentDashboard() {
  return (
    <main className="grain min-h-[100dvh] bg-paper px-4 py-8 text-ink md:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[240px_1fr]">
        {/* sidebar */}
        <aside className="shell-side hidden h-fit gap-1 p-3 lg:grid">
          <a href="/" className="flex items-center gap-2 px-2 py-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 font-mono text-[12px] font-bold text-white">SB</span>
            <span className="text-[14px] font-extrabold tracking-tight">SUPER<span className="text-brand-700">BRIGHT</span></span>
          </a>
          {NAV.map(([label, href, on]) => (
            <a key={label} href={href} aria-current={on ? "page" : undefined}
              className={`px-3.5 py-2.5 text-[13.5px] font-semibold transition ${on ? "shell-active" : "rounded-xl text-soft hover:bg-paper"}`}>
              {label}
            </a>
          ))}
          <div className="mt-2 rounded-2xl bg-ink p-4 text-white">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-amber-300">BNSP upgrade</p>
            <p className="tnum mt-1 font-mono text-lg font-bold">IDR 1,25 jt</p>
            <p className="mt-1 text-[12px] text-white/60">Sertifikat resmi LSP mitra.</p>
          </div>
        </aside>

        <div className="min-w-0">
          <a href="/" className="link-more">← Beranda</a>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-700">Dasbor belajar</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">Lanjut, kamu sudah 62%.</h1>
              <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-soft">
                Setiap milestone yang selesai menjadi badge terverifikasi + QR.
              </p>
            </div>
            <span className="flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 font-mono text-[11px] text-soft">
              <span className="live-dot" aria-hidden /> sinkron · AI aktif
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {STATS.map((c) => (
              <div key={c.t} className="panel p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{c.t}</p>
                <p className="tnum mt-2 text-xl font-extrabold tracking-tight">{c.v}</p>
                <div className="bar-track mt-3"><div className="bar-fill" style={{ width: c.w }} /></div>
                <p className="mt-2 text-xs text-muted">{c.s}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            <div className="panel overflow-hidden lg:col-span-7">
              <div className="bg-ink px-6 py-4 text-white">
                <p className="text-[15px] font-extrabold">Lanjutkan belajar</p>
                <p className="mt-0.5 text-[13px] text-white/55">Pajak Badan & e-Faktur · Pelajaran 3 dari 6</p>
              </div>
              <div className="p-6">
                <div className="bar-track"><div className="bar-fill" style={{ width: "62%" }} /></div>
                <p className="tnum mt-2 font-mono text-[11px] text-muted">62% · tersisa ~2 jam</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href="/id/belajar/js-dasar-analis" className="btn-primary group px-6 py-3 text-sm">
                    Lanjut Pelajaran <span className="btn-island !h-7 !w-7 text-sm">→</span>
                  </a>
                  <a href="/id/paths/junior-accountant" className="btn-ghost px-6 py-3 text-sm">Lihat Jalur</a>
                </div>
              </div>
            </div>
            <div className="rounded-[24px] border-2 border-ink bg-ink p-6 text-white lg:col-span-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300">Upgrade ke BNSP</p>
              <p className="mt-2 text-lg font-extrabold tracking-tight">Sertifikat resmi, bukan sekadar badge.</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                Selesaikan jalur, bayar via Midtrans di dasbor, dijadwalkan ke LSP mitra.
              </p>
              <p className="tnum mt-3 font-mono text-2xl font-bold text-amber-300">
                IDR 1.250.000 <span className="text-xs font-normal text-white/45">sekali bayar</span>
              </p>
              <div className="mt-4"><UpgradeButton learningPathId="junior-accountant" priceLabel="IDR 1.250.000" /></div>
            </div>
          </div>

          <div className="panel mt-4 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[15px] font-extrabold">Dompet kredensial</p>
                <p className="mt-1 text-sm text-soft">7 badge OB 3.0 terbit · bagikan ke LinkedIn atau unduh PDF.</p>
              </div>
              <a href="/id/verify/contoh" className="link-more hidden sm:block">Buka verifikasi →</a>
            </div>
            <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1">
              {["Keu-01", "Pajak-05", "Lapor-07", "Capstone"].map((b) => (
                <span key={b} className="flex-none rounded-[14px] border border-line bg-paper px-4 py-3 font-mono text-xs text-soft">
                  ◆ {b} · <span className="font-bold text-ok">valid</span>
                </span>
              ))}
              <span className="flex flex-none items-center rounded-[14px] border border-dashed border-line px-4 py-3 font-mono text-xs text-faint">
                + 3 terkunci
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
