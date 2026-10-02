import type { AbstractIntlMessages } from "next-intl";
import idMessages from "../../messages/id.json";
import enMessages from "../../messages/en.json";

/* Deterministic locale messages. Bypasses request-scope resolution
   (middleware/header/setRequestLocale) entirely: pages pass their URL
   locale explicitly, so rendering can never fall back to the wrong
   language. Both dictionaries are bundled; cast once here. */
const MESSAGES: Record<string, AbstractIntlMessages> = {
  id: idMessages as unknown as AbstractIntlMessages,
  en: enMessages as unknown as AbstractIntlMessages,
};

export function getLocaleMessages(locale: string): AbstractIntlMessages {
  return MESSAGES[locale] ?? MESSAGES.id;
}
