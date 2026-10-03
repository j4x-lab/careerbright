import { RoleSchema, ScenarioSchema, type MicroScenario, type Role } from "@/lib/discovery";

/*
 * NVIDIA NIM content generator (PRD: "The Scalability Engine").
 *
 * OpenAI-compatible integration against https://integrate.api.nvidia.com/v1,
 * model nvidia/nemotron-3.5-lightning-30b-a3b. Staff type a job title; the
 * model returns one role profile plus its micro-scenarios as strict JSON,
 * validated here with the same zod schemas that gate roles.json /
 * micro_scenarios.json at module load. Anything that fails validation is
 * rejected with the zod issues attached — a malformed draft must never reach
 * the review UI looking plausible.
 *
 * Reasoning models narrate: the answer may arrive wrapped in <think> blocks
 * or in a separate reasoning field, so parsing strips both before JSON.parse.
 *
 * No key → a typed NO_KEY error, never a crash and never a fake draft.
 * Publication is deliberately out of scope: the reviewer copies the validated
 * JSON into the repo files and commits it, so every addition keeps a human
 * and a git history in the loop.
 */

// Fastest model with clean strict-JSON output on this key (verified live):
// glm-5.3-flash answers in seconds with parseable JSON. The requested
// Nemotron Super IDs are end-of-life (410), the 3.1 Nemotrons are not
// entitled to this account (404), ultra-550b is persistently overloaded
// (503), and the reasoning variants narrate instead of emitting JSON.
const MODEL = "z-ai/glm-5.3-flash";
const ENDPOINT = "https://integrate.api.nvidia.com/v1/chat/completions";

export type RoleDraft = { role: Role; scenarios: MicroScenario[] };

export class GeneratorError extends Error {
  constructor(
    public readonly code: "NO_KEY" | "API_ERROR" | "BAD_JSON" | "INVALID_DRAFT",
    message: string,
    public readonly detail?: unknown
  ) {
    super(message);
  }
}

// Backwards-compatible alias: the router previously imported GeminiError.
export { GeneratorError as GeminiError };

function apiKey(): string {
  const key = process.env.NVIDIA_API_KEY;
  if (!key) {
    throw new GeneratorError(
      "NO_KEY",
      "NVIDIA_API_KEY is not set — add it to .env to enable generation"
    );
  }
  return key;
}

function promptFor(jobTitle: string): string {
  return [
    "Kamu adalah penulis konten Career SuperBright, platform simulasi karir untuk fresh graduate Indonesia.",
    "Buat SATU profil peran dan 2 micro-scenario untuk jabatan berikut.",
    "WAJIB: Bahasa Indonesia, spesifik pasar Indonesia (gaji Rp, tools nyata, budaya kantor lokal).",
    "Larangan: angka bombastis tanpa konteks, bahasa Inggris campur, saran generik.",
    "",
    `Jabatan: ${jobTitle}`,
    "",
    "Kembalikan HANYA JSON valid dengan bentuk persis ini (tanpa markdown, tanpa penjelasan, tanpa berpikir keras di luar JSON):",
    "{",
    '  "role": {',
    '    "id": "slug-kebab-case",',
    '    "category": "salah satu dari: Tech & Product | Creative & Marketing | Business & Operations | Finance & Banking | Future & AI",',
    '    "title": "nama jabatan",',
    '    "shortDescription": "1 kalimat deskripsi kerja nyata (maks 140 karakter)",',
    '    "tools": ["4-6 tools nyata"],',
    '    "mythVsReality": { "myth": "...", "reality": "..." },',
    '    "timeline": [{"time": "09:00 WIB", "event": "..."}, ... 4 entri]',
    "  },",
    '  "scenarios": [{',
    '    "id": "slug-unik", "roleId": "<sama dengan role.id>", "title": "...",',
    '    "context": {"message": "situasi realistis 2-3 kalimat", "sender": "...", "time": "HH:MM WIB"},',
    '    "options": [{"id": "A", "text": "...", "type": "Optimal|Risky|Fatal"}, ... 4 opsi, tepat 1 Optimal],',
    '    "feedback": {"Optimal": "...", "Fatal": "...", "PractitionerQuote": "..."}',
    "  }, ... 2 skenario]",
    "}",
  ].join("\n");
}

function stripFences(text: string): string {
  const m = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  return (m ? m[1] : text).trim();
}

function stripThinking(text: string): string {
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<thinking>[\s\S]*?<\/thinking>/gi, "")
    .trim();
}

function extractJsonPayload(raw: string): unknown {
  const text = stripFences(stripThinking(raw));
  try {
    return JSON.parse(text);
  } catch {
    // Last resort: the largest {...} span in the output.
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start !== -1 && end > start) {
      return JSON.parse(text.slice(start, end + 1));
    }
    throw new GeneratorError("BAD_JSON", "No parseable JSON in model output", text.slice(0, 500));
  }
}

export async function generateRoleDraft(jobTitle: string): Promise<RoleDraft> {
  // Plain fetch against the OpenAI-compatible REST shape — NOT the openai SDK
  // package. Proven 2026-10-03: the SDK's connection handling stalls in this
  // environment (APIConnectionTimeoutError after 361s on a call curl answers
  // in ~60s), while native fetch with an AbortController completes. Same
  // endpoint, same request shape, same auth scheme.
  const key = apiKey();
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 300_000);
  let raw: string | null = null;
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      signal: ctrl.signal,
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: "Balas hanya dengan JSON valid, tanpa teks lain, tanpa markdown, tanpa blok berpikir.",
          },
          { role: "user", content: promptFor(jobTitle) },
        ],
        temperature: 0.7,
        top_p: 0.95,
        max_tokens: 2500,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new GeneratorError("API_ERROR", `${MODEL} HTTP ${res.status}`, body.slice(0, 300));
    }
    const data = (await res.json()) as {
      choices?: { message?: { content?: string | null; reasoning_content?: string | null } }[];
    };
    const message = data.choices?.[0]?.message;
    raw = message?.content ?? message?.reasoning_content ?? null;
  } catch (e) {
    if (e instanceof GeneratorError) throw e;
    throw new GeneratorError("API_ERROR", "NIM request failed", String(e).slice(0, 300));
  } finally {
    clearTimeout(timer);
  }
  if (!raw) {
    throw new GeneratorError("BAD_JSON", "Model returned no content");
  }

  let parsed: unknown;
  try {
    parsed = extractJsonPayload(raw);
  } catch (e) {
    if (e instanceof GeneratorError) throw e;
    throw new GeneratorError("BAD_JSON", "Model output was not parseable", String(e));
  }

  const shaped = parsed as { role?: unknown; scenarios?: unknown };
  const role = RoleSchema.safeParse(shaped.role);
  if (!role.success) {
    throw new GeneratorError(
      "INVALID_DRAFT",
      "Generated role failed schema validation",
      role.error.issues
    );
  }
  const scenarios: MicroScenario[] = [];
  for (const item of (Array.isArray(shaped.scenarios) ? shaped.scenarios : []).slice(0, 4)) {
    const s = ScenarioSchema.safeParse({ ...(item as object), roleId: role.data.id });
    if (!s.success) {
      throw new GeneratorError(
        "INVALID_DRAFT",
        "Generated scenario failed schema validation",
        s.error.issues
      );
    }
    scenarios.push(s.data);
  }
  if (scenarios.length === 0) {
    throw new GeneratorError("INVALID_DRAFT", "Generated draft contained no valid scenarios");
  }
  return { role: role.data, scenarios };
}
