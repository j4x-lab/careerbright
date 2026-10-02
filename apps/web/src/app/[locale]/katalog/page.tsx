import { KatalogSearch } from "./katalog-search";

/* Cerah v2 — katalog header with dark band. */

export default function KatalogPage() {
  return (
    <main className="overflow-x-clip bg-paper text-ink">
      <a href="#konten" className="skip-link">Lewati ke konten</a>
      <section className="hero-dark relative overflow-hidden pt-[140px] text-white">
        <div className="aurora-blob" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 pb-10">
          <a href="/" className="font-mono text-[12px] text-white/50 underline decoration-white/25 underline-offset-4 hover:text-white">← Beranda</a>
          <p className="eyebrow-dark mt-6">Katalog · kursus + jalur</p>
          <h1 id="konten" className="mt-3 max-w-[18ch] text-4xl font-extrabold leading-tight md:text-6xl">
            Cari skill, <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">bukan scroll.</span>
          </h1>
          <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-white/60">
            Kursus dan jalur dalam satu pencarian. Filter konteks Indonesia untuk materi berkasus lokal.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
        <div className="-mt-16 relative z-10">
          <KatalogSearch />
        </div>
      </div>
    </main>
  );
}
