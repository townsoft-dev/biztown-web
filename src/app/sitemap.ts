import type { MetadataRoute } from "next";

import { LOCALES, PAGES, type PageKey } from "@/i18n/config";
import { lastModified } from "@/lib/server/last-modified";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Mức ưu tiên tương đối giữa các trang (chỉ là gợi ý cho crawler, không phải xếp hạng):
 * trang chủ cao nhất, rồi tới trang bán hàng, cuối cùng là trang pháp lý — nội dung mỏng và
 * gần giống nhau nên không nên tranh crawl budget với trang sản phẩm.
 */
const PRIORITIES: Record<PageKey, number> = {
  home: 1,
  nhalo: 0.9,
  balheh: 0.9,
  contact: 0.8,
  support: 0.6,
  privacy: 0.3,
  deleteAccount: 0.3,
  nhaloPrivacy: 0.3,
  nhaloDeleteAccount: 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(PAGES) as PageKey[]).flatMap((page) => {
    const modified = lastModified(page);
    return LOCALES.map((locale) => ({
      url: absoluteUrl(locale, page),
      lastModified: modified,
      changeFrequency: "monthly" as const,
      priority: PRIORITIES[page],
      alternates: { languages: languageAlternates(page) },
    }));
  });
}
