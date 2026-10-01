import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { fileURLToPath } from "node:url";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  transpilePackages: ["@careerbright/db"],
  // Monorepo root silences the "multiple lockfiles" workspace warning.
  outputFileTracingRoot: fileURLToPath(new URL("../..", import.meta.url)),
  webpack: (config, { dev }) => {
    // Termux FS cannot snapshot webpack's persistent cache deps —
    // disable it in dev (cold compile each boot, no fatal warning).
    if (dev) config.cache = false;
    return config;
  },
};

export default withNextIntl(nextConfig);
