// Open Badges 3.0 + W3C VC 2.0 issuance (stub — full impl in Phase 4).
export function buildVerificationUrl(id: string) {
  return `https://careerbright.id/verify/${id}`;
}
export const OB30_CONTEXT = [
  "https://www.w3.org/ns/credentials/v2",
  "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json",
];
