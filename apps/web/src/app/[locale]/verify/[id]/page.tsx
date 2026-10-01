export default async function VerifyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Verifikasi Kredensial</p>
      <h1 className="mt-3 font-mono text-xl">credential:{id}</h1>
      <p className="mt-3 text-sm text-zinc-400">
        Endpoint publik — backend memverifikasi tanda tangan VC 2.0 / OB 3.0 dan status BNSP.
      </p>
      <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-white/10 bg-ink-900 p-6 text-left">
        <p className="text-sm font-semibold">Status: <span className="text-accent">Valid (contoh)</span></p>
        <p className="mt-2 font-mono text-xs text-zinc-400">SKKNI: M.691090.005.01 · KKNI 6</p>
      </div>
    </main>
  );
}
