export default async function VerifyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="hero-dark relative min-h-[100dvh] overflow-hidden px-4 py-16 text-center text-white">
      <div className="aurora-blob" aria-hidden />
      <div className="relative mx-auto max-w-3xl">
        <a href="/" className="font-mono text-[12px] text-white/50 underline decoration-white/25 underline-offset-4 hover:text-white">
          ← Beranda
        </a>
        <div className="glass-dark mx-auto mt-10 max-w-md p-6 text-left md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300">
            Verifikasi Kredensial
          </p>
          <h1 className="tnum mt-3 break-all font-mono text-lg font-bold">credential:{id}</h1>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-white/60">
            Endpoint publik — backend memverifikasi tanda tangan VC 2.0 / OB 3.0 dan status BNSP.
          </p>
          <div className="mt-6 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4">
            <p className="text-sm font-bold text-emerald-300">Status: Valid (contoh)</p>
            <p className="tnum mt-1.5 font-mono text-xs text-white/55">SKKNI: M.691090.005.01 · KKNI 6</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-[10px] border border-white/12 bg-white/6 px-3 py-2 font-mono text-[11px] text-white/70">OB 3.0 ✓</span>
            <span className="rounded-[10px] border border-white/12 bg-white/6 px-3 py-2 font-mono text-[11px] text-white/70">VC 2.0 ✓</span>
            <span className="rounded-[10px] border border-white/12 px-3 py-2 font-mono text-[11px] text-white/40">BNSP · menyusul</span>
          </div>
          <a href="/id/auth/daftar" className="btn-amber mt-6 w-full justify-center">Dapatkan kredensialmu</a>
        </div>
      </div>
    </main>
  );
}
