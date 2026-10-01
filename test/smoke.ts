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

console.log("smoke: all assertions passed");
