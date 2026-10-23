import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ReactNode } from "react";

import { DeleteAccountContent as DeleteAccountEn } from "@/content/en/delete-account";
import { HOME as HOME_EN } from "@/content/en/home";
import { NHALO as NHALO_EN } from "@/content/en/nhalo";
import { SupportContent as SupportEn } from "@/content/en/support";
import type { NhaloContent } from "@/content/nhalo-types";
import { DeleteAccountContent as DeleteAccountVi } from "@/content/vi/delete-account";
import { HOME as HOME_VI } from "@/content/vi/home";
import { NHALO as NHALO_VI } from "@/content/vi/nhalo";
import { SupportContent as SupportVi } from "@/content/vi/support";
import type { Locale, PageKey } from "@/i18n/config";

import { HomePage } from "./home/home-page";
import { NhaloFooter } from "./nhalo/nhalo-footer";
import { NhaloHeader } from "./nhalo/nhalo-header";
import { NhaloPage } from "./nhalo/nhalo-page";
import { SiteShell } from "./site-shell";

/**
 * Chính sách quyền riêng tư là HTML sinh từ repo biztown-rent (xem scripts/import-privacy.mjs).
 * Đọc lúc build — site xuất tĩnh nên không có lần đọc nào lúc chạy.
 */
function PrivacyContent({ locale }: { locale: Locale }) {
  const html = readFileSync(join(process.cwd(), "src/content/privacy", `${locale}.html`), "utf8");
  return <div className="contents" dangerouslySetInnerHTML={{ __html: html }} />;
}

const NHALO: Record<Locale, NhaloContent> = { vi: NHALO_VI, en: NHALO_EN };

const CONTENT: Record<PageKey, Record<Locale, () => ReactNode>> = {
  home: {
    vi: () => <HomePage content={HOME_VI} locale="vi" />,
    en: () => <HomePage content={HOME_EN} locale="en" />,
  },
  support: { vi: () => <SupportVi />, en: () => <SupportEn /> },
  privacy: { vi: () => <PrivacyContent locale="vi" />, en: () => <PrivacyContent locale="en" /> },
  deleteAccount: { vi: () => <DeleteAccountVi />, en: () => <DeleteAccountEn /> },
  nhalo: {
    vi: () => <NhaloPage content={NHALO_VI} locale="vi" />,
    en: () => <NhaloPage content={NHALO_EN} locale="en" />,
  },
};

/** Một trang hoàn chỉnh (khung + nội dung) theo ngôn ngữ. File page.tsx chỉ gọi component này. */
export function LocalePage({ locale, page }: { locale: Locale; page: PageKey }) {
  // Trang sản phẩm NhàLo có thanh điều hướng và chân trang riêng theo design.
  const nhalo = page === "nhalo" ? NHALO[locale] : null;

  return (
    <SiteShell
      locale={locale}
      page={page}
      header={nhalo && <NhaloHeader locale={locale} content={nhalo.header} />}
      footer={nhalo && <NhaloFooter locale={locale} content={nhalo.footer} />}
    >
      {CONTENT[page][locale]()}
    </SiteShell>
  );
}
