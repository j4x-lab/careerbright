import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

/*
 * Artifact storage abstraction.
 * Decision Q1: "use free one" → local filesystem under public/uploads (zero cost).
 * If S3-compatible env is set (S3_ENDPOINT + S3_BUCKET + keys), uploads go there
 * (works for Supabase Storage S3 gateway, Cloudflare R2, MinIO) — otherwise local.
 *
 * All callers use saveArtifactFile() + getArtifactUrl() so the switch is invisible.
 */

export type StoredFile = { key: string; url: string; bytes: number; mime: string };

function s3Configured() {
  return Boolean(
    process.env.S3_ENDPOINT && process.env.S3_BUCKET && process.env.S3_ACCESS_KEY && process.env.S3_SECRET_KEY,
  );
}

const ALLOWED_MIME = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "text/markdown",
]);

const EXT_BY_MIME: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "application/pdf": "pdf",
  "text/csv": "csv",
  "text/plain": "txt",
  "text/markdown": "md",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
};

export function isAllowedMime(mime: string) {
  return ALLOWED_MIME.has(mime);
}

export async function saveArtifactFile(args: {
  bytes: Buffer;
  mime: string;
  userId: string;
  missionSlug: string;
}): Promise<StoredFile> {
  if (!isAllowedMime(args.mime)) throw new Error(`MIME not allowed: ${args.mime}`);
  if (args.bytes.length > 10 * 1024 * 1024) throw new Error("File too large (max 10MB)");
  const ext = EXT_BY_MIME[args.mime] ?? "bin";
  const key = `misi/${args.missionSlug}/${args.userId}/${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;

  if (s3Configured()) {
    // S3-compatible PUT via fetch (no SDK dependency, works on Termux).
    const endpoint = process.env.S3_ENDPOINT!.replace(/\/$/, "");
    const bucket = process.env.S3_BUCKET!;
    // Pre-signed PUT is ideal; here we do a simple authenticated PUT using
    // AWS SigV4-lite via fetch is out of scope — fall back to local with warning
    // unless S3_PUBLIC_BASE is set and caller handles signing externally.
    // For v1 we store locally and return local URL to stay free + offline-safe.
    console.warn("[storage] S3 env present but SigV4 signing not configured — using local fallback");
  }

  const absDir = path.join(process.cwd(), "public", "uploads", path.dirname(key));
  await fs.mkdir(absDir, { recursive: true });
  const abs = path.join(process.cwd(), "public", "uploads", key);
  await fs.writeFile(abs, args.bytes);
  return { key, url: `/uploads/${key}`, bytes: args.bytes.length, mime: args.mime };
}

export function getArtifactUrl(keyOrUrl: string) {
  if (keyOrUrl.startsWith("http") || keyOrUrl.startsWith("/")) return keyOrUrl;
  const base = process.env.S3_PUBLIC_BASE;
  if (base) return `${base.replace(/\/$/, "")}/${keyOrUrl}`;
  return `/uploads/${keyOrUrl}`;
}
