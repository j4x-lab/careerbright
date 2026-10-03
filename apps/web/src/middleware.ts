import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/* This file MUST live in src/. The app uses a src directory, so Next only
   registers middleware at src/middleware.ts — a copy at the workspace root is
   silently ignored (no error, empty middleware-manifest). Without it the
   "as-needed" locale prefix is never stripped, [locale] swallows the first URL
   segment, and every /katalog, /auth/masuk, /paths/* URL either 404s or
   silently renders the landing page. */
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
