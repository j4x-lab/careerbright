import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { phoneNumber } from "better-auth/plugins";
import { prisma } from "@careerbright/db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  plugins: [
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }) => {
        // Phase 1 stub: log OTP. Phase 2 → WhatsApp Business API sender.
        console.log(`[auth:otp] ${phoneNumber} → ${code}`);
      },
    }),
  ],
  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "STUDENT", required: false },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
