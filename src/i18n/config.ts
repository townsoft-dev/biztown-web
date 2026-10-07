/**
 * Định tuyến song ngữ: tiếng Việt ở gốc (/support), tiếng Anh dưới /en (/en/support).
 *
 * Không dùng next-intl hay proxy vì site xuất tĩnh (output: "export") — không có server để
 * chuyển hướng theo ngôn ngữ. Mỗi ngôn ngữ là một route group có root layout riêng:
 * src/app/(vi) và src/app/(en)/en.
 */
export const LOCALES = ["vi", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "vi";

/** Các trang của site (đường dẫn không gồm tiền tố ngôn ngữ). Key khớp với Dictionary.nav. */
export const PAGES = {
  home: "",
  support: "/support",
  privacy: "/privacy",
  deleteAccount: "/delete-account",
} as const;
export type PageKey = keyof typeof PAGES;

/** Đường dẫn của một trang theo ngôn ngữ, có "/" cuối khớp trailingSlash: true. */
export function localizedPath(locale: Locale, page: PageKey) {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return `${prefix}${PAGES[page]}/`;
}
