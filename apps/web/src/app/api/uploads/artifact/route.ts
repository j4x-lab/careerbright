import { saveArtifactFile } from "@/lib/storage";

// POST /api/uploads/artifact — multipart form: file, userId, missionSlug.
// Free local storage (public/uploads) unless S3 env set. Max 10MB.
export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const userId = String(form.get("userId") ?? "anon").slice(0, 64);
    const missionSlug = String(form.get("missionSlug") ?? "umum").slice(0, 80);
    if (!file) return Response.json({ error: "file required" }, { status: 400 });
    const buf = Buffer.from(await file.arrayBuffer());
    const stored = await saveArtifactFile({
      bytes: buf,
      mime: file.type || "application/octet-stream",
      userId,
      missionSlug,
    });
    return Response.json(stored);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Upload failed";
    return Response.json({ error: msg }, { status: 400 });
  }
}
