import type { Locale } from "@/types";

export function t(locale: Locale, es: string, en: string): string {
  return locale === "es" ? es : en;
}
