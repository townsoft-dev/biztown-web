import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { DEFAULT_LOCALE, LOCALES, localizedPath, type Locale, type PageKey } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const OG_LOCALES: Record<Locale, string> = {
  vi: "vi_VN",
  en: "en_US",
};

/** URL tuyệt đối của một trang theo ngôn ngữ, ví dụ ("en", "support") → https://biztown.vn/en/support/ */
export function absoluteUrl(locale: Locale, page: PageKey) {
  return `${siteConfig.url}${localizedPath(locale, page)}`;
}

/** hreflang cho mọi ngôn ngữ + x-default (trỏ về tiếng Việt). */
export function languageAlternates(page: PageKey) {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale] = absoluteUrl(locale, page);
  }
  languages["x-default"] = absoluteUrl(DEFAULT_LOCALE, page);
  return languages;
}

/** Metadata đầy đủ cho một trang: title, description, canonical, hreflang, Open Graph. */
export function buildPageMetadata(locale: Locale, page: PageKey): Metadata {
  const dict = getDictionary(locale);
  const { title, description } = dict.meta[page];
  const url = absoluteUrl(locale, page);

  return {
    // Trang chủ dùng nguyên tên app, không ghép title template.
    title: page === "home" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(page),
    },
    openGraph: {
      type: "website",
      siteName: dict.appName,
      url,
      title,
      description,
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
    },
  };
}
