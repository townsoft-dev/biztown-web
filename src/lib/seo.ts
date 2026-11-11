import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { DEFAULT_LOCALE, LOCALES, localizedPath, type Locale, type PageKey } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const OG_LOCALES: Record<Locale, string> = {
  vi: "vi_VN",
  en: "en_US",
};

/** Trang chủ và các trang sản phẩm: dùng nguyên tiêu đề riêng, không ghép title template. */
const PRODUCT_PAGES = new Set<PageKey>(["home", "nhalo", "balheh"]);

/**
 * Trang pháp lý ở gốc site chỉ còn sống vì đã khai với App Store và Google Play (CLAUDE.md
 * cấm đổi bốn đường dẫn đó). NhàLo là tên mới của BizTown Rent Manager — một ứng dụng duy
 * nhất — nên chúng phục vụ đúng nội dung của trang /nhalo/... tương ứng.
 *
 * Vì trùng nội dung, canonical trỏ sang bản /nhalo/ và trang này KHÔNG khai hreflang: cụm
 * hreflang chỉ có nghĩa giữa những trang tự canonical về chính mình, khai ở đây sẽ mâu thuẫn
 * tín hiệu. Cũng KHÔNG đặt noindex — noindex đi kèm canonical có thể khiến Google áp luôn
 * noindex cho trang đích.
 */
const CANONICAL_ALIASES: Partial<Record<PageKey, PageKey>> = {
  privacy: "nhaloPrivacy",
  deleteAccount: "nhaloDeleteAccount",
};

/** Trang chỉ là bản sao canonical của trang khác — bỏ khỏi sitemap. */
export function canonicalTarget(page: PageKey): PageKey | undefined {
  return CANONICAL_ALIASES[page];
}

/**
 * Ảnh xem trước khi chia sẻ link, theo từng trang (file ở public/og/). Trang không có tên
 * trong bảng này dùng ảnh mặc định. Ảnh không phụ thuộc ngôn ngữ để chỉ phải xuất một bộ từ
 * Figma; muốn tách theo ngôn ngữ thì đổi thành Record<Locale, …>.
 */
const OG_IMAGES: Partial<Record<PageKey, string>> = {
  home: "/og/biztown.png",
  nhalo: "/og/nhalo.png",
  balheh: "/og/balheh.png",
  contact: "/og/lien-he.png",
};

const OG_IMAGE_DEFAULT = "/og/biztown.png";

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

/** Metadata đầy đủ cho một trang: title, description, canonical, hreflang, Open Graph, Twitter. */
export function buildPageMetadata(locale: Locale, page: PageKey): Metadata {
  const dict = getDictionary(locale);
  const { title, description } = dict.meta[page];
  const alias = CANONICAL_ALIASES[page];
  // og:url theo quy ước là URL chuẩn của nội dung, nên cũng trỏ về bản canonical.
  const url = absoluteUrl(locale, alias ?? page);
  // metadataBase (root-document.tsx) biến đường dẫn tương đối thành URL tuyệt đối.
  const image = {
    url: OG_IMAGES[page] ?? OG_IMAGE_DEFAULT,
    width: siteConfig.ogImage.width,
    height: siteConfig.ogImage.height,
    alt: title,
  };

  return {
    title: PRODUCT_PAGES.has(page) ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      ...(alias ? {} : { languages: languageAlternates(page) }),
    },
    openGraph: {
      type: "website",
      siteName: dict.siteName,
      url,
      title,
      description,
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
