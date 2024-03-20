"use server";

import { cookies, headers } from "next/headers";
import type { Language } from "@/lib/types";

export async function setLanguageCookie(language: Language): Promise<void> {
  cookies().set(`language-override`, language);
}

export async function initializeLanguage(): Promise<Language> {
  let language: Language = `en`;
  const languageOverride = cookies().get(`language-override`);
  const browserDefaultLanguage = headers().get(`accept-language`);

  if (browserDefaultLanguage && browserDefaultLanguage.startsWith(`es`)) {
    language = `es`;
  }
  if (
    languageOverride &&
    (languageOverride.value === `en` || languageOverride.value === `es`)
  ) {
    language = languageOverride.value;
  }

  return language;
}
