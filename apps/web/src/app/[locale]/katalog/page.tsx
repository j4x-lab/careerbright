import { KatalogSearch } from "./katalog-search";

/* §29 Discovery — search courses, skills, paths with ID-context filter. */

export default function KatalogPage() {
  return (
    <main className="overflow-x-clip bg-paper pt-[96px] text-ink">
      <a href="#konten" className="skip-link">Lewati ke konten</a>
      <div id="konten" className="mx-auto max-w-7xl px-4 py-10 md:py-12">
        <a href="/" className="link-more">← Beranda</a>
        <h1 className="mt-4 max-w-[18ch] text-3xl font-bold leading-tight md:text-5xl">Katalog: cari skill, bukan scroll.</h1>
        <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-soft">
          Kursus dan jalur dalam satu pencarian. Filter konteks Indonesia untuk materi yang pakai kasus lokal.
        </p>
        <div className="mt-8">
          <KatalogSearch />
        </div>
      </div>
    </main>
  );
}
