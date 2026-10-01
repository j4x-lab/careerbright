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
