import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/*
 * Role gating. Kept intentionally small: STUDENT (learner) and ADMIN
 * (operator). The old LSP_ASSESSOR / EMPLOYER / UNIVERSITY / INSTRUCTOR
 * surfaces were deleted with the BNSP domain (PRD has no assessor, employer,
 * campus or instructor-studio routes); those role values may still exist as
 * data on old rows, so they land on the public directory instead of a dead
 * page. Each page calls `requireRole([...])`, which redirects anonymous
 * visitors to sign-in and signed-in users with the wrong role somewhere
 * useful.
 */

export const ROLES = [
  "STUDENT",
  "INSTRUCTOR",
  "ADMIN",
  "LSP_ASSESSOR",
  "EMPLOYER",
  "UNIVERSITY",
  "CONTRIBUTOR",
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

/** Where each role belongs, so a wrong-role visit lands somewhere useful.
 *  Roles without a dedicated surface fall back to the public directory —
 *  never to a deleted page, and never to another guarded page (which would
 *  loop back here). */
const HOME_FOR: Record<Role, string> = {
  STUDENT: "/dashboard",
  INSTRUCTOR: "/kontributor",
  ADMIN: "/admin",
  LSP_ASSESSOR: "/admin",
  EMPLOYER: "/misi",
  UNIVERSITY: "/misi",
  CONTRIBUTOR: "/kontributor",
};

export async function requireRole(allowed: Role[]) {
  const session = await getSession();
  if (!session) redirect("/auth/masuk");

  const role = (session.user.role ?? "STUDENT") as Role;
  if (!allowed.includes(role)) redirect(HOME_FOR[role] ?? "/");
  return session;
}