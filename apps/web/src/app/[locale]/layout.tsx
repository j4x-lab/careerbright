import type { ReactNode } from "react";
import { Providers } from "@/trpc/client";

export default function LocaleLayout({ children }: { children: ReactNode }) {
  return <Providers>{children}</Providers>;
}
