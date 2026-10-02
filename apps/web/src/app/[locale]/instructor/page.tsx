// Instructor Dashboard — backend: course.*, assessment.*, submission.review, payout.*
import { appRouter } from "@/server/routers";
import { CreateCourseForm } from "./create-course-form";
import { OpsShell } from "@/components/ops-shell";

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
    <OpsShell eyebrow="Studio · instruktur" title="Course Studio" desc="Buat kursus, petakan SKKNI, bangun asesmen, pantau payout.">
      {!dbOnline && (
        <p className="panel-warm mt-0 p-4 text-sm text-soft">
          Database belum terhubung (atur DATABASE_URL lalu jalankan seed). UI di bawah aktif setelah DB online.
        </p>
      )}
      <div className="panel mt-4 p-5 md:p-6"><CreateCourseForm /></div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {courses.length === 0 && dbOnline && (
          <p className="text-sm text-soft">Belum ada kursus. Buat draf pertamamu di atas.</p>
        )}
        {courses.map((c) => (
          <div key={c.id} className="spot panel p-5">
            <p className="font-extrabold">{c.titleId}</p>
            <p className="mt-1 font-mono text-[11px] text-muted">/{c.slug} · {c.status}</p>
          </div>
        ))}
      </div>
    </OpsShell>
  );
}
