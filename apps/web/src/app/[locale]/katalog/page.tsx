import { KatalogSearch } from "./katalog-search";

/* Cerah v2 — katalog header with dark band. */

export default function KatalogPage() {
  return (
    <main className="overflow-x-clip bg-paper text-ink">
      <a href="#konten" className="skip-link">Lewati ke konten</a>
      <section className="hero-light relative overflow-hidden pt-[140px]">
        <div className="relative mx-auto max-w-7xl px-4 pb-10">
          <a href="/" className="font-mono text-[12px] text-muted underline decoration-line underline-offset-4 hover:text-ink">← Beranda</a>
          <p className="eyebrow-light mt-6">Katalog · peran + jalur + kursus</p>
          <h1 id="konten" className="mt-3 max-w-[18ch] text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Pilih peran, <span className="text-brand-700">bukan scroll.</span>
          </h1>
          <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-soft">
            Peran, jalur, dan kursus dalam satu pencarian. Filter konteks Indonesia untuk materi berkasus lokal.
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
