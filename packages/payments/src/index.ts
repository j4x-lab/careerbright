// Midtrans (primary) + Xendit (fallback) — full impl in Phase 1.
export const PAYMENT_METHODS = ["GOPAY", "QRIS", "BANK_TRANSFER", "CREDIT_CARD", "E_WALLET", "RETAIL"] as const;
export function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}
