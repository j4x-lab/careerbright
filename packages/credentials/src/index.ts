// Open Badges 3.0 + W3C VC 2.0 issuance (pure builders — signing in Phase 4).
export function buildVerificationUrl(id: string, base = "https://careerbright.id") {
  return `${base}/verify/${id}`;
}

export const OB30_CONTEXT = [
  "https://www.w3.org/ns/credentials/v2",
  "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json",
];

export interface BadgeInput {
  id: string;
  recipientDid: string;
  nameId: string;
  nameEn?: string;
  descriptionId: string;
  imageUrl?: string;
  criteriaNarrativeId: string;
  skkniCode: string;
  kkniLevel: number;
  issuerName?: string;
  issuanceDate?: string;
}

export function buildOpenBadgeCredential(b: BadgeInput) {
  return {
    "@context": OB30_CONTEXT,
    id: buildVerificationUrl(b.id),
    type: ["VerifiableCredential", "OpenBadgeCredential"],
    issuer: {
      id: "https://careerbright.id",
      type: "Profile",
      name: b.issuerName ?? "CareerBright",
      url: "https://careerbright.id",
    },
    issuanceDate: b.issuanceDate ?? new Date().toISOString(),
    credentialSubject: {
      id: b.recipientDid,
      type: "AchievementSubject",
      achievement: {
        id: `https://careerbright.id/badges/${b.id}`,
        type: ["Achievement", "MicroCredential"],
        name: b.nameId,
        description: b.descriptionId,
        ...(b.imageUrl ? { image: b.imageUrl } : {}),
        criteria: { narrative: b.criteriaNarrativeId },
        alignment: [{ targetName: b.skkniCode, targetFramework: "SKKNI" }],
      },
    },
  };
}

export function obVerificationSummary(ob: ReturnType<typeof buildOpenBadgeCredential>) {
  const ach = (ob.credentialSubject as { achievement: { name: string; alignment: { targetName: string }[] } }).achievement;
  return {
    name: ach.name,
    skkni: ach.alignment.map((a) => a.targetName).join(", "),
    verifyUrl: ob.id as string,
  };
}
