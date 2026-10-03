import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/*
 * Role gating for the ops surfaces.
 *
 * Until this existed, /admin, /lsp, /instructor, /employer and /university were
 * world-readable — the `role` column was data, not a permission. Each page
 * calls `requireRole([...])`, which redirects anonymous visitors to sign-in and
 * signed-in users with the wrong role to their own dashboard.
 *
 * This is a page-level guard, which is the right layer for a first pass: the
 * routes are dynamic (they read headers), so nothing sensitive is prerendered.
 * The tRPC procedures in packages/db still do their own authorization — do not
 * treat this as a substitute for that.
 */

export const ROLES = [
  "STUDENT",
  "INSTRUCTOR",
  "ADMIN",
  "LSP_ASSESSOR",
  "EMPLOYER",
  "UNIVERSITY",
] as const;

export type Role = (typeof ROLES)[number];

export async function getSession() {
  try {
    return await auth.api.getSession({ headers: await headers() });
  } catch {
    // A DB/auth failure must not read as "signed in".
    return null;
  }
}

/** Where each role belongs, so a wrong-role visit lands somewhere useful. */
const HOME_FOR: Record<Role, string> = {
  STUDENT: "/dashboard",
  INSTRUCTOR: "/instructor",
  ADMIN: "/admin",
  LSP_ASSESSOR: "/lsp",
  EMPLOYER: "/employer",
  UNIVERSITY: "/university",
};

export async function requireRole(allowed: Role[]) {
  const session = await getSession();
  if (!session) redirect("/auth/masuk");

  const role = (session.user.role ?? "STUDENT") as Role;
  if (!allowed.includes(role)) redirect(HOME_FOR[role] ?? "/");
  return session;
}