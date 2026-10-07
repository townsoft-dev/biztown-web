import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ReactNode } from "react";

import { DeleteAccountContent as DeleteAccountEn } from "@/content/en/delete-account";
import { HomeContent as HomeEn } from "@/content/en/home";
import { SupportContent as SupportEn } from "@/content/en/support";
import { DeleteAccountContent as DeleteAccountVi } from "@/content/vi/delete-account";
import { HomeContent as HomeVi } from "@/content/vi/home";
import { SupportContent as SupportVi } from "@/content/vi/support";
import type { Locale, PageKey } from "@/i18n/config";

import { SiteShell } from "./site-shell";

/**
 * Chính sách quyền riêng tư là HTML sinh từ repo biztown-rent (xem scripts/import-privacy.mjs).
 * Đọc lúc build — site xuất tĩnh nên không có lần đọc nào lúc chạy.
 */
function PrivacyContent({ locale }: { locale: Locale }) {
  const html = readFileSync(join(process.cwd(), "src/content/privacy", `${locale}.html`), "utf8");
  return <div className="contents" dangerouslySetInnerHTML={{ __html: html }} />;
}

const CONTENT: Record<PageKey, Record<Locale, () => ReactNode>> = {
  home: { vi: () => <HomeVi />, en: () => <HomeEn /> },
  support: { vi: () => <SupportVi />, en: () => <SupportEn /> },
  privacy: { vi: () => <PrivacyContent locale="vi" />, en: () => <PrivacyContent locale="en" /> },
  deleteAccount: { vi: () => <DeleteAccountVi />, en: () => <DeleteAccountEn /> },
};

/** Một trang hoàn chỉnh (khung + nội dung) theo ngôn ngữ. File page.tsx chỉ gọi component này. */
export function LocalePage({ locale, page }: { locale: Locale; page: PageKey }) {
  return (
    <SiteShell locale={locale} page={page}>
      {CONTENT[page][locale]()}
    </SiteShell>
  );
}
