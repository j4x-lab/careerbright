// Client-safe payment helpers (no node: builtins — safe for browser bundle).
export const PAYMENT_METHODS = ["GOPAY", "QRIS", "BANK_TRANSFER", "CREDIT_CARD", "E_WALLET", "RETAIL"] as const;

export const SUBSCRIPTION_MONTHLY = 69000;
export const SUBSCRIPTION_SEMESTER = 349000;
export const SUBSCRIPTION_ANNUAL = 649000;

export function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}

export function snapJsUrl() {
  const prod = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true";
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? "";
  const host = prod ? "https://app.midtrans.com/snap/snap.js" : "https://app.sandbox.midtrans.com/snap/snap.js";
  return `${host}?data-client-key=${clientKey}`;
}
