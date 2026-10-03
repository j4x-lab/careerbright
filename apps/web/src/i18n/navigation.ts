import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/*
 * Locale-aware navigation. Every internal href in the app is written without
 * a locale prefix ("/katalog", "/auth/masuk") and Link resolves the prefix
 * from the active locale — localePrefix "as-needed" serves the default
 * locale (id) unprefixed and any other locale prefixed ("/en/katalog").
 * Hardcoding "/id/..." in markup meant /en/** linked back into Indonesian.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);