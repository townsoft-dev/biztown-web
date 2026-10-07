import type { MetadataRoute } from "next";

import { LOCALES, PAGES, type PageKey } from "@/i18n/config";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(PAGES) as PageKey[]).flatMap((page) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(locale, page),
      changeFrequency: "monthly" as const,
      priority: page === "home" ? 1 : 0.7,
      alternates: { languages: languageAlternates(page) },
    })),
  );
}
