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
  nhalo: "/nhalo",
} as const;
export type PageKey = keyof typeof PAGES;

/** Đường dẫn của một trang theo ngôn ngữ, có "/" cuối khớp trailingSlash: true. */
export function localizedPath(locale: Locale, page: PageKey) {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return `${prefix}${PAGES[page]}/`;
}

/** Các section của trang chủ có thể trỏ tới (id dùng chung cho mọi ngôn ngữ). */
export const HOME_SECTIONS = {
  products: "san-pham",
  services: "dich-vu",
  discover: "kham-pha",
  audience: "danh-cho-ai",
  about: "ve-biztown",
  principles: "triet-ly",
  contact: "lien-he",
} as const;
export type HomeSection = keyof typeof HOME_SECTIONS;

/** Các section của trang NhàLo có thể trỏ tới (id dùng chung cho mọi ngôn ngữ). */
export const NHALO_SECTIONS = {
  top: "dau-trang",
  features: "tinh-nang",
  utilities: "dien-nuoc",
  contract: "hop-dong",
  roles: "phan-quyen",
  start: "huong-dan",
  faq: "hoi-dap",
  download: "tai-app",
} as const;
export type NhaloSection = keyof typeof NHALO_SECTIONS;

/** Link tới một section của trang chủ, ví dụ ("en", "contact") → /en/#lien-he */
export function sectionPath(locale: Locale, section: HomeSection) {
  return `${localizedPath(locale, "home")}#${HOME_SECTIONS[section]}`;
}
