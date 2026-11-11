import { execFileSync } from "node:child_process";

import type { PageKey } from "@/i18n/config";

/**
 * Tệp nguồn quyết định nội dung của từng trang. Dùng để lấy ngày sửa gần nhất cho
 * <lastmod> trong sitemap — Google dựa vào mốc này để biết trang nào đáng crawl lại.
 */
const SOURCES: Record<PageKey, string[]> = {
  home: ["src/content/vi/home.ts", "src/content/en/home.ts", "src/components/home"],
  support: ["src/content/vi/support.tsx", "src/content/en/support.tsx"],
  // /privacy/ và /delete-account/ phục vụ chính tài liệu của NhàLo (xem locale-page.tsx).
  privacy: ["src/content/nhalo-privacy"],
  deleteAccount: ["src/content/nhalo-delete-account"],
  nhalo: ["src/content/vi/nhalo.ts", "src/content/en/nhalo.ts", "src/components/nhalo"],
  nhaloPrivacy: ["src/content/nhalo-privacy"],
  nhaloDeleteAccount: ["src/content/nhalo-delete-account"],
  nhaloTerms: ["src/content/nhalo-terms"],
  nhaloGuide: [
    "src/content/vi/nhalo-guide.ts",
    "src/content/en/nhalo-guide.ts",
    "src/components/nhalo/guide-page.tsx",
  ],
  nhaloHelp: [
    "src/content/vi/nhalo.ts",
    "src/content/en/nhalo.ts",
    "src/components/nhalo/help-page.tsx",
  ],
  balheh: ["src/content/vi/balheh.ts", "src/content/en/balheh.ts", "src/components/balheh"],
  contact: ["src/content/vi/contact.ts", "src/content/en/contact.ts", "src/components/contact"],
};

/**
 * Ngày commit gần nhất chạm vào nội dung của trang, đọc lúc build (site xuất tĩnh nên không
 * có lần gọi nào lúc chạy). Trả undefined khi không có git — vd. build từ bản tarball, hoặc
 * CI checkout nông không giữ lịch sử. Thiếu <lastmod> không phải lỗi, chỉ mất một tín hiệu.
 */
export function lastModified(page: PageKey): Date | undefined {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...SOURCES[page]], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (!out) return undefined;
    const date = new Date(out);
    return Number.isNaN(date.getTime()) ? undefined : date;
  } catch {
    return undefined;
  }
}
