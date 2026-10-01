import { z } from "zod";
import { prisma } from "@careerbright/db";
import { createSnapTransaction } from "@careerbright/payments/server";

const Body = z.object({
  learningPathId: z.string(),
  customerEmail: z.string().email().optional(),
  customerName: z.string().optional(),
});

function orderNumber() {
  return `CB-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

// POST /api/payments/snap — create Order + Midtrans Snap token for LSP upgrade.
// Requires DATABASE_URL + MIDTRANS_SERVER_KEY at runtime.
export async function POST(req: Request) {
  const body = Body.parse(await req.json());
  const path = await prisma.learningPath.findUnique({ where: { id: body.learningPathId } });
  if (!path?.lspCertPrice) return Response.json({ error: "Path has no LSP upgrade" }, { status: 400 });

  const order = await prisma.order.create({
    data: {
      userId: "pending-auth", // Phase 2: replace with session user id
      orderNumber: orderNumber(),
      totalAmount: path.lspCertPrice,
      paymentGateway: "MIDTRANS",
    },
  });

  const snap = await createSnapTransaction({
    orderId: order.orderNumber,
    grossAmount: order.totalAmount,
    itemName: `BNSP Upgrade — ${path.titleId}`,
    customerEmail: body.customerEmail,
    customerName: body.customerName,
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { gatewayPayload: { snapToken: snap.token } },
  });

  return Response.json({ snapToken: snap.token, orderNumber: order.orderNumber });
}
