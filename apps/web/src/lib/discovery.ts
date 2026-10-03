import { z } from "zod";
import rolesJson from "../data/roles.json";
import scenariosJson from "../data/micro_scenarios.json";

/*
 * Discovery data layer — PRD §5 (roles.json, micro_scenarios.json).
 *
 * These JSON files are the Tier 1 / Tier 2 content source of truth. Zod parses
 * them at module load so a malformed entry fails fast with a readable error
 * instead of rendering a half-broken role page.
 */

export const RoleCategory = z.enum([
  "Tech & Product",
  "Creative & Marketing",
  "Business & Operations",
  "Finance & Banking",
  "Future & AI",
]);
export type RoleCategory = z.infer<typeof RoleCategory>;

export const ROLE_CATEGORIES: RoleCategory[] = [
  "Tech & Product",
  "Creative & Marketing",
  "Business & Operations",
  "Finance & Banking",
  "Future & AI",
];

const TimelineEntry = z.object({ time: z.string(), event: z.string() });

export const RoleSchema = z.object({
  id: z.string().min(1),
  category: RoleCategory,
  title: z.string().min(1),
  shortDescription: z.string().min(1),
  tools: z.array(z.string()).min(1),
  mythVsReality: z.object({ myth: z.string(), reality: z.string() }),
  timeline: z.array(TimelineEntry).min(1),
});
export type Role = z.infer<typeof RoleSchema>;

const ScenarioOption = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  type: z.enum(["Optimal", "Risky", "Fatal"]),
});

export const ScenarioSchema = z.object({
  id: z.string().min(1),
  roleId: z.string().min(1),
  title: z.string().min(1),
  context: z.object({
    message: z.string().min(1),
    sender: z.string().min(1),
    time: z.string().min(1),
  }),
  options: z.array(ScenarioOption).min(2),
  feedback: z.object({
    Optimal: z.string().min(1),
    Fatal: z.string().min(1),
    PractitionerQuote: z.string().min(1),
  }),
});
export type MicroScenario = z.infer<typeof ScenarioSchema>;

export const ROLES: Role[] = z.array(RoleSchema).parse(rolesJson);
export const SCENARIOS: MicroScenario[] = z.array(ScenarioSchema).parse(scenariosJson);

const ROLES_BY_ID = new Map(ROLES.map((r) => [r.id, r]));
const SCENARIOS_BY_ID = new Map(SCENARIOS.map((s) => [s.id, s]));

export function getRole(id: string): Role | null {
  return ROLES_BY_ID.get(id) ?? null;
}

export function getScenario(id: string): MicroScenario | null {
  return SCENARIOS_BY_ID.get(id) ?? null;
}

export function getScenariosForRole(roleId: string): MicroScenario[] {
  return SCENARIOS.filter((s) => s.roleId === roleId);
}

export type WorkStyle = "Semua" | "Introvert" | "Ekstrovert" | "Client-facing" | "Internal";

export interface RoleFilters {
  q?: string;
  category?: RoleCategory | "Semua";
}

export function searchRoles({ q = "", category = "Semua" }: RoleFilters = {}): Role[] {
  const needle = q.trim().toLowerCase();
  return ROLES.filter((r) => {
    if (category !== "Semua" && r.category !== category) return false;
    if (!needle) return true;
    return `${r.title} ${r.shortDescription} ${r.category} ${r.tools.join(" ")}`
      .toLowerCase()
      .includes(needle);
  });
}
