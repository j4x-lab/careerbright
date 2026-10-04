import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { fileURLToPath } from "node:url";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  transpilePackages: ["@careerbright/db"],
  // Monorepo root silences the "multiple lockfiles" workspace warning.
  outputFileTracingRoot: fileURLToPath(new URL("../..", import.meta.url)),
  // Practice-first pivot: discovery routes redirect to mission loop.
  async redirects() {
    return [
      { source: "/roles", destination: "/misi", permanent: false },
      { source: "/:locale/roles", destination: "/:locale/misi", permanent: false },
      { source: "/role/:id", destination: "/misi?role=:id", permanent: false },
      { source: "/:locale/role/:id", destination: "/:locale/misi?role=:id", permanent: false },
      { source: "/scenario/:id", destination: "/misi", permanent: false },
      { source: "/:locale/scenario/:id", destination: "/:locale/misi", permanent: false },
      { source: "/series/:roleId", destination: "/misi", permanent: false },
      { source: "/:locale/series/:roleId", destination: "/:locale/misi", permanent: false },
    ];
  },
  webpack: (config) => {
    // Termux FS cannot snapshot webpack's persistent cache deps
    // ("Unable to snapshot resolve dependencies") — disable it for dev
    // AND build. Production builds are single-pass so no useful cache is
    // lost; dev cold-compiles each boot with no fatal warning.
    config.cache = false;
    // Module resolution probes `node_modules` up the ancestor chain to `/`,
    // and Watchpack watches every missing candidate's directory. On Termux
    // the ancestors above $HOME (/data/data, /data, /) are unreadable, so
    // each compile spams EACCES watcher/scanner errors (non-fatal). Ignore
    // exactly those three directories — project paths are unaffected.
    config.watchOptions = {
      ignored: ["/data", "/data/data", "/"],
    };
    return config;
  },
};

export default withNextIntl(nextConfig);
