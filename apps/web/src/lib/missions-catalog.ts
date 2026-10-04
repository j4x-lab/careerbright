import type { Mission } from "./missions";
import { MISSIONS_TECH } from "./missions-tech";
import { MISSIONS_BIZ } from "./missions-biz";
import { MISSIONS_CREATIVE } from "./missions-creative";

// Full catalog: 54 missions, 1 per profession (roleId unique).
export const MISSIONS_CATALOG: Mission[] = [...MISSIONS_TECH, ...MISSIONS_BIZ, ...MISSIONS_CREATIVE];

const BY_ROLE = new Map(MISSIONS_CATALOG.map((m) => [m.roleId, m]));
const BY_SLUG = new Map(MISSIONS_CATALOG.map((m) => [m.slug, m]));

export function getMissionForRole(roleId: string): Mission | null {
  return BY_ROLE.get(roleId) ?? null;
}

export function getMissionsForRoles(roleIds: string[]): Mission[] {
  return roleIds.flatMap((id) => (BY_ROLE.get(id) ? [BY_ROLE.get(id)!] : []));
}

export function getCatalogMissionBySlug(slug: string): Mission | null {
  return BY_SLUG.get(slug) ?? null;
}

export function missionCoverage(roleIds: string[]): { total: number; covered: number; missing: string[] } {
  const missing = roleIds.filter((id) => !BY_ROLE.has(id));
  return { total: roleIds.length, covered: roleIds.length - missing.length, missing };
}
