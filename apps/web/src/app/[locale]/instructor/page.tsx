// Instructor Dashboard — backend: course.*, assessment.*, submission.review, payout.*
import { appRouter } from "@/server/routers";
import { CreateCourseForm } from "./create-course-form";

export default async function InstructorDashboard() {
  let courses: { id: string; slug: string; titleId: string; status: string }[] = [];
  let dbOnline = true;
  try {
    const caller = appRouter.createCaller({});
    courses = await caller.courses.list();
  } catch {
    dbOnline = false;
  }

  return (
    <main className="mx-auto min-h-[100dvh] max-w-7xl bg-paper px-4 py-10">
      <a href="/" className="link-more">
        ← Beranda
      </a>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Course Studio</h1>
      {!dbOnline && (
        <p className="mt-3 rounded-xl border border-ink/10 bg-cream p-4 text-sm text-soft">
          Database belum terhubung (atur DATABASE_URL lalu jalankan seed). UI di bawah aktif setelah DB online.
        </p>
      )}
      <CreateCourseForm />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {courses.length === 0 && dbOnline && (
          <p className="text-sm text-soft">Belum ada kursus. Buat draf pertamamu di atas.</p>
        )}
        {courses.map((c) => (
          <div key={c.id} className="rounded-2xl border border-ink/10 bg-card p-5">
            <p className="font-semibold">{c.titleId}</p>
            <p className="mt-1 font-mono text-[11px] text-muted">/{c.slug} · {c.status}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
