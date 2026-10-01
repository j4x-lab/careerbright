// Instructor Dashboard — backend: course.*, assessment.*, submission.review, payout.*
export default function InstructorDashboard() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Course Studio</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {["Kursus saya (4)", "Antrean penilaian (23)", "Pendapatan bulan ini (IDR 8,2 jt)"].map((t) => (
          <div key={t} className="rounded-2xl border border-white/10 bg-ink-900 p-5 text-sm font-medium">{t}</div>
        ))}
      </div>
    </main>
  );
}
