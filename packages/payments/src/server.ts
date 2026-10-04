// Server-only payment functions (node: builtins, secret keys).
// Import via "@careerbright/payments/server" — never from client components.
import { createHash } from "node:crypto";

// Midtrans webhook signature: SHA512(order_id + status_code + gross_amount + serverKey)
export function verifyMidtransSignature(args: {
  orderId: string;
  statusCode: string;
  grossAmount: string;
  serverKey: string;
  signature: string;
}) {
  const raw = `${args.orderId}${args.statusCode}${args.grossAmount}${args.serverKey}`;
  const expected = createHash("sha512").update(raw).digest("hex");
  return expected === args.signature.toLowerCase();
}

export function snapBaseUrl() {
  const prod = process.env.MIDTRANS_IS_PRODUCTION === "true";
  return prod ? "https://app.midtrans.com/snap/v1" : "https://app.sandbox.midtrans.com/snap/v1";
}

export async function createSnapTransaction(args: {
  orderId: string;
  grossAmount: number;
  itemName: string;
  customerEmail?: string;
  customerName?: string;
}) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) throw new Error("MIDTRANS_SERVER_KEY is not set");
  const res = await fetch(`${snapBaseUrl()}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`,
    },
    body: JSON.stringify({
      transaction_details: { order_id: args.orderId, gross_amount: args.grossAmount },
      item_details: [{ id: args.orderId, name: args.itemName, price: args.grossAmount, quantity: 1 }],
      customer_details: { email: args.customerEmail, first_name: args.customerName },
    }),
  });
  if (!res.ok) throw new Error(`Midtrans Snap failed: ${res.status}`);
  return (await res.json()) as { token: string; redirect_url: string };
}

// ---- Practice-platform pricing (Exec Summary §3) ----

export const SUBSCRIPTION_MONTHLY = 69000;
export const SUBSCRIPTION_SEMESTER = 349000; // ~6 bulan, diskon
export const SUBSCRIPTION_ANNUAL = 649000;
export const CONTRIBUTOR_MIN_RATE = 500;
export const CONTRIBUTOR_MAX_RATE = 1000;
export const CONTRIBUTOR_DEFAULT_RATE = 750;

export type SubscriptionTier = "MONTHLY" | "SEMESTER" | "ANNUAL";

export function subscriptionPrice(tier: SubscriptionTier): number {
  if (tier === "SEMESTER") return SUBSCRIPTION_SEMESTER;
  if (tier === "ANNUAL") return SUBSCRIPTION_ANNUAL;
  return SUBSCRIPTION_MONTHLY;
}

export function subscriptionDays(tier: SubscriptionTier): number {
  if (tier === "SEMESTER") return 180;
  if (tier === "ANNUAL") return 365;
  return 30;
}

export function clampPayoutRate(rate: number): number {
  if (!Number.isFinite(rate)) return CONTRIBUTOR_DEFAULT_RATE;
  return Math.min(CONTRIBUTOR_MAX_RATE, Math.max(CONTRIBUTOR_MIN_RATE, Math.round(rate)));
}

export function payoutForCompletions(completions: number, ratePerCompletion: number): number {
  return Math.max(0, Math.round(completions)) * clampPayoutRate(ratePerCompletion);
}

// Q5 (dual mode): Midtrans Payouts API when MIDTRANS_PAYOUT_KEY is set,
// otherwise callers record a MANUAL transfer with audit reference.
export type PayoutMethod = "MIDTRANS" | "MANUAL";

export function resolvePayoutMethod(preferred?: string): PayoutMethod {
  if (preferred === "MIDTRANS" && process.env.MIDTRANS_PAYOUT_KEY) return "MIDTRANS";
  return "MANUAL";
}

export async function disbursePayout(args: {
  amount: number;
  bankName: string;
  bankAccount: string;
  accountName: string;
  reference: string;
  method?: PayoutMethod;
}): Promise<{ method: PayoutMethod; reference: string; status: string }> {
  const method = resolvePayoutMethod(args.method);
  if (method === "MIDTRANS") {
    const key = process.env.MIDTRANS_PAYOUT_KEY!;
    const base = process.env.MIDTRANS_IS_PRODUCTION === "true"
      ? "https://api.midtrans.com/v2/payouts"
      : "https://api.sandbox.midtrans.com/v2/payouts";
    const res = await fetch(base, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${key}:`).toString("base64")}`,
      },
      body: JSON.stringify({
        payouts: [
          {
            beneficiary_name: args.accountName,
            beneficiary_account: args.bankAccount,
            beneficiary_bank: args.bankName,
            amount: String(args.amount),
            notes: args.reference,
          },
        ],
      }),
    });
    if (!res.ok) throw new Error(`Midtrans Payout failed: ${res.status}`);
    return { method, reference: args.reference, status: "PROCESSING" };
  }
  // MANUAL:caller stores reference + proof; audit trail lives in ContributorPayout.
  return { method: "MANUAL", reference: args.reference, status: "PENDING" };
}
