import { localizedPath, sectionPath, type Locale } from "@/i18n/config";
import type { LinkTarget } from "@/i18n/dictionaries";

/** Đổi đích liên kết (section/trang) thành href; null nếu chưa có trang để trỏ tới. */
export function resolveHref(locale: Locale, to: LinkTarget): string | null {
  if (!to) return null;
  if ("section" in to) return sectionPath(locale, to.section);
  return localizedPath(locale, to.page);
}
