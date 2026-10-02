export default async function VerifyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="hero-light relative min-h-[100dvh] overflow-hidden px-4 py-16 text-center">
      <div className="relative mx-auto max-w-3xl">
        <a href="/" className="font-mono text-[12px] text-muted underline decoration-line underline-offset-4 hover:text-ink">
          ← Beranda
        </a>
        <div className="glass-light mx-auto mt-10 max-w-md p-6 text-left md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-700">
            Verifikasi Kredensial
          </p>
          <h1 className="tnum mt-3 break-all font-mono text-lg font-bold">credential:{id}</h1>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-soft">
            Endpoint publik — backend memverifikasi tanda tangan VC 2.0 / OB 3.0 dan status BNSP.
          </p>
          <div className="mt-6 rounded-2xl border border-emerald-600/25 bg-emerald-50 p-4">
            <p className="text-sm font-bold text-emerald-700">Status: Valid (contoh)</p>
            <p className="tnum mt-1.5 font-mono text-xs text-soft">SKKNI: M.691090.005.01 · KKNI 6</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-[10px] border border-line bg-paper px-3 py-2 font-mono text-[11px] text-soft">OB 3.0 ✓</span>
            <span className="rounded-[10px] border border-line bg-paper px-3 py-2 font-mono text-[11px] text-soft">VC 2.0 ✓</span>
            <span className="rounded-[10px] border border-line px-3 py-2 font-mono text-[11px] text-faint">BNSP · menyusul</span>
          </div>
          <a href="/id/auth/daftar" className="btn-amber mt-6 w-full justify-center">Dapatkan kredensialmu</a>
        </div>
      </div>
    </main>
  );
}
