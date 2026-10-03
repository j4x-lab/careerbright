// Keyless smoke test for pure logic (run: node test/smoke.ts from repo root).
import assert from "node:assert/strict";
import { formatIDR } from "../packages/payments/src/index.ts";
import { verifyMidtransSignature } from "../packages/payments/src/server.ts";
import { consensus, buildJudgePrompt } from "../packages/ai/src/index.ts";
import {
  buildOpenBadgeCredential,
  obVerificationSummary,
  buildVerificationUrl,
} from "../packages/credentials/src/index.ts";

// payments
assert.equal(formatIDR(1250000), "Rp 1.250.000");
const sigArgs = {
  orderId: "CB-TEST-1",
  statusCode: "200",
  grossAmount: "1250000",
  serverKey: "test-key",
  signature: "",
};
const { createHash } = await import("node:crypto");
sigArgs.signature = createHash("sha512")
  .update(`${sigArgs.orderId}${sigArgs.statusCode}${sigArgs.grossAmount}${sigArgs.serverKey}`)
  .digest("hex");
assert.equal(verifyMidtransSignature(sigArgs), true);
assert.equal(verifyMidtransSignature({ ...sigArgs, grossAmount: "999" }), false);

// ai judge
const c = consensus([
  [{ criterionId: "a", score: 80, feedbackId: "baik", confidence: 0.9 }],
  [{ criterionId: "a", score: 90, feedbackId: "baik", confidence: 0.8 }],
]);
assert.equal(c.score, 85);
assert.equal(c.confidence, 0.85);
assert.equal(consensus([]).score, 0);
const prompt = buildJudgePrompt({
  rubric: [{ id: "k1", labelId: "Ketepatan", weight: 0.6 }],
  submission: "jawaban",
  contextId: "SKKNI-M.691090.005.01",
});
assert.ok(prompt.includes("SKKNI-M.691090.005.01") && prompt.includes("judge-v1"));

// credentials
const ob = buildOpenBadgeCredential({
  id: "badge-1",
  recipientDid: "did:web:superbright.id:student:1",
  nameId: "Dasar Pajak",
  descriptionId: "Kompeten pajak dasar",
  criteriaNarrativeId: "Lulus asesmen AI ≥70",
  skkniCode: "M.691090.005.01",
  kkniLevel: 6,
});
assert.deepEqual(
  (ob["@context"] as string[]).length,
  2
);
const summary = obVerificationSummary(ob);
assert.equal(summary.skkni, "M.691090.005.01");
assert.equal(summary.verifyUrl, buildVerificationUrl("badge-1"));

// i18n parity: every static t("key") used under a namespace must exist in
// both dictionaries. Guards against MISSING_MESSAGE runtime errors when
// copy and code are edited in parallel.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
const idMsgs = JSON.parse(readFileSync("apps/web/messages/id.json", "utf8"));
const enMsgs = JSON.parse(readFileSync("apps/web/messages/en.json", "utf8"));
function srcFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return srcFiles(p);
    return /\.(tsx?|jsx?)$/.test(e.name) ? [p] : [];
  });
}
const missing = [];
for (const f of srcFiles("apps/web/src")) {
  const src = readFileSync(f, "utf8");
  // Split into module scope + one chunk per top-level function: the same
  // variable name (t) is rebound per component, so attribution must be
  // per-chunk. A key is reported only when it exists in NONE of the
  // namespaces used by its own chunk — that state always crashes.
  const declRe =
    /const\s+(\w+)\s*=\s*(?:await\s+)?useTranslations\("([^"]+)"\)/g;
  const declAsyncRe =
    /const\s+(\w+)\s*=\s*await\s+createTranslator\(\{[\s\S]*?namespace:\s*"([^"]+)"[\s\S]*?\}\)/g;
  const chunks = src.split(
    /(?=^export\s+(?:default\s+)?(?:async\s+)?function\s+\w+|^function\s+\w+)/m
  );
  const modNs = new Map();
  for (const m of chunks[0].matchAll(declRe)) modNs.set(m[1], m[2]);
  for (const m of chunks[0].matchAll(declAsyncRe)) modNs.set(m[1], m[2]);
  for (const chunk of chunks) {
    const varNs = new Map(modNs);
    for (const m of chunk.matchAll(declRe)) varNs.set(m[1], m[2]);
    for (const m of chunk.matchAll(declAsyncRe)) varNs.set(m[1], m[2]);
    if (varNs.size === 0) continue;
    const nss = new Set(varNs.values());
    for (const m of chunk.matchAll(/(^|[^\w$.])(\w+)\(\s*"([^"]+)"\s*[,)]/gm)) {
      if (!varNs.has(m[2])) continue;
      const ok = [...nss].some(
        (ns) =>
          idMsgs[ns]?.[m[3]] !== undefined && enMsgs[ns]?.[m[3]] !== undefined
      );
      if (!ok) missing.push(`${f} :: ${m[3]} (not in ${[...nss].join("/")})`);
    }
  }
}
assert.deepEqual(missing, []);

console.log("smoke: all assertions passed");
