import { z } from "zod";
import { prisma } from "@careerbright/db";
import { verifyMidtransSignature } from "@careerbright/payments/server";

const Notification = z.object({
  order_id: z.string(),
  status_code: z.string(),
  gross_amount: z.string(),
  transaction_status: z.string(),
  fraud_status: z.string().optional(),
  signature_key: z.string(),
});

// POST /api/webhooks/midtrans — verify signature, flip Order to PAID on settlement.
export async function POST(req: Request) {
  const n = Notification.parse(await req.json());
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) return Response.json({ error: "gateway not configured" }, { status: 503 });

  const ok = verifyMidtransSignature({
    orderId: n.order_id,
    statusCode: n.status_code,
    grossAmount: n.gross_amount,
    serverKey,
    signature: n.signature_key,
  });
  if (!ok) return Response.json({ error: "bad signature" }, { status: 401 });

  const paid = n.transaction_status === "settlement" || n.transaction_status === "capture";
  if (paid) {
    await prisma.order.updateMany({
      where: { orderNumber: n.order_id },
      data: { status: "PAID", gatewayPayload: n as never },
    });
    // Phase 2: mark UserLearningPath.lspUpgradeStatus = PAID + notify via WhatsApp.
  }
  return Response.json({ ok: true });
}
