import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { fileURLToPath } from "node:url";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  transpilePackages: ["@careerbright/db"],
  // Monorepo root silences the "multiple lockfiles" workspace warning.
  outputFileTracingRoot: fileURLToPath(new URL("../..", import.meta.url)),
  webpack: (config) => {
    // Termux FS cannot snapshot webpack's persistent cache deps
    // ("Unable to snapshot resolve dependencies") — disable it for dev
    // AND build. Production builds are single-pass so no useful cache is
    // lost; dev cold-compiles each boot with no fatal warning.
    config.cache = false;
    return config;
  },
};

export default withNextIntl(nextConfig);
