export default async function VerifyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="mx-auto min-h-[100dvh] max-w-3xl bg-paper px-4 py-16 text-center">
      <a href="/" className="link-more">
        ← Beranda
      </a>
      <div className="bezel mx-auto mt-10 max-w-md text-left">
        <div className="bezel-inner p-6 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            Verifikasi Kredensial
          </p>
          <h1 className="tnum mt-3 break-all font-mono text-lg text-zinc-100">credential:{id}</h1>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-zinc-400">
            Endpoint publik — backend memverifikasi tanda tangan VC 2.0 / OB 3.0 dan status BNSP.
          </p>
          <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
            <p className="text-sm font-semibold text-emerald-300">Status: Valid (contoh)</p>
            <p className="tnum mt-1.5 font-mono text-xs text-zinc-400">SKKNI: M.691090.005.01 · KKNI 6</p>
          </div>
          <div className="mt-5 flex gap-3">
            <span className="rounded-lg border border-white/10 px-3 py-2 font-mono text-[11px] text-zinc-400">
              OB 3.0 ✓
            </span>
            <span className="rounded-lg border border-white/10 px-3 py-2 font-mono text-[11px] text-zinc-400">
              VC 2.0 ✓
            </span>
            <span className="rounded-lg border border-white/10 px-3 py-2 font-mono text-[11px] text-zinc-500">
              BNSP · menyusul
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
