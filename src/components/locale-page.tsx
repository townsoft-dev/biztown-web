import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ReactNode } from "react";

import type { BalhehContent } from "@/content/balheh-types";
import { CONTACT as CONTACT_EN } from "@/content/en/contact";
import { BALHEH as BALHEH_EN } from "@/content/en/balheh";
import { HOME as HOME_EN } from "@/content/en/home";
import { NHALO as NHALO_EN } from "@/content/en/nhalo";
import { NHALO_GUIDE as GUIDE_EN } from "@/content/en/nhalo-guide";
import {
  SUPPORT as SUPPORT_EN,
  SUPPORT_PRODUCTS as SUPPORT_PRODUCTS_EN,
} from "@/content/en/support";
import type { NhaloContent } from "@/content/nhalo-types";
import { BALHEH as BALHEH_VI } from "@/content/vi/balheh";
import { CONTACT as CONTACT_VI } from "@/content/vi/contact";
import { HOME as HOME_VI } from "@/content/vi/home";
import { NHALO as NHALO_VI } from "@/content/vi/nhalo";
import { NHALO_GUIDE as GUIDE_VI } from "@/content/vi/nhalo-guide";
import {
  SUPPORT as SUPPORT_VI,
  SUPPORT_PRODUCTS as SUPPORT_PRODUCTS_VI,
} from "@/content/vi/support";
import type { Locale, PageKey } from "@/i18n/config";
import { buildStructuredData, type FaqItem } from "@/lib/structured-data";

import { SupportPage } from "@/components/support/support-page";
import { JsonLd } from "./site/json-ld";
import { BalhehFooter } from "./balheh/balheh-footer";
import { BalhehHeader } from "./balheh/balheh-header";
import { BalhehPage } from "./balheh/balheh-page";
import { ContactPage } from "./contact/contact-page";
import { HomePage } from "./home/home-page";
import { NHALO_FAQ_ON_HOME } from "./nhalo/faq";
import { NhaloFooter } from "./nhalo/nhalo-footer";
import { NhaloGuidePage } from "./nhalo/guide-page";
import { NhaloHelpPage } from "./nhalo/help-page";
import { NhaloHeader } from "./nhalo/nhalo-header";
import { NhaloPage } from "./nhalo/nhalo-page";
import { SiteShell } from "./site-shell";

/**
 * Trang pháp lý dạng HTML sinh từ repo app (xem scripts/import-privacy.mjs): `dir` là thư mục
 * trong src/content. Đọc lúc build — site xuất tĩnh nên không có lần đọc nào lúc chạy.
 */
function HtmlContent({ dir, locale }: { dir: string; locale: Locale }) {
  const html = readFileSync(join(process.cwd(), "src/content", dir, `${locale}.html`), "utf8");
  return <div className="contents" dangerouslySetInnerHTML={{ __html: html }} />;
}

const NHALO: Record<Locale, NhaloContent> = { vi: NHALO_VI, en: NHALO_EN };
const BALHEH: Record<Locale, BalhehContent> = { vi: BALHEH_VI, en: BALHEH_EN };

const CONTENT: Record<PageKey, Record<Locale, () => ReactNode>> = {
  home: {
    vi: () => <HomePage content={HOME_VI} locale="vi" />,
    en: () => <HomePage content={HOME_EN} locale="en" />,
  },
  support: {
    vi: () => <SupportPage content={SUPPORT_VI} products={SUPPORT_PRODUCTS_VI} locale="vi" />,
    en: () => <SupportPage content={SUPPORT_EN} products={SUPPORT_PRODUCTS_EN} locale="en" />,
  },
  // NhàLo là tên mới của BizTown Rent Manager — một ứng dụng duy nhất. Hai đường dẫn gốc
  // /privacy/ và /delete-account/ đã khai với App Store và Google Play nên phải sống tiếp
  // (CLAUDE.md), và phục vụ đúng tài liệu đang hiệu lực của NhàLo thay vì bản cũ. Canonical
  // của chúng trỏ sang /nhalo/... — xem CANONICAL_ALIASES trong src/lib/seo.ts.
  privacy: {
    vi: () => <HtmlContent dir="nhalo-privacy" locale="vi" />,
    en: () => <HtmlContent dir="nhalo-privacy" locale="en" />,
  },
  nhaloPrivacy: {
    vi: () => <HtmlContent dir="nhalo-privacy" locale="vi" />,
    en: () => <HtmlContent dir="nhalo-privacy" locale="en" />,
  },
  nhaloDeleteAccount: {
    vi: () => <HtmlContent dir="nhalo-delete-account" locale="vi" />,
    en: () => <HtmlContent dir="nhalo-delete-account" locale="en" />,
  },
  deleteAccount: {
    vi: () => <HtmlContent dir="nhalo-delete-account" locale="vi" />,
    en: () => <HtmlContent dir="nhalo-delete-account" locale="en" />,
  },
  nhaloGuide: {
    vi: () => <NhaloGuidePage content={GUIDE_VI} app={NHALO_VI.app} locale="vi" />,
    en: () => <NhaloGuidePage content={GUIDE_EN} app={NHALO_EN.app} locale="en" />,
  },
  nhaloHelp: {
    vi: () => <NhaloHelpPage content={NHALO_VI.help} faq={NHALO_VI.faq} locale="vi" />,
    en: () => <NhaloHelpPage content={NHALO_EN.help} faq={NHALO_EN.faq} locale="en" />,
  },
  nhalo: {
    vi: () => <NhaloPage content={NHALO_VI} locale="vi" />,
    en: () => <NhaloPage content={NHALO_EN} locale="en" />,
  },
  balheh: {
    vi: () => <BalhehPage content={BALHEH_VI} />,
    en: () => <BalhehPage content={BALHEH_EN} />,
  },
  contact: {
    vi: () => <ContactPage content={CONTACT_VI} locale="vi" />,
    en: () => <ContactPage content={CONTACT_EN} locale="en" />,
  },
};

const NHALO_PAGES = new Set<PageKey>([
  "nhalo",
  "nhaloPrivacy",
  "nhaloDeleteAccount",
  "nhaloGuide",
  "nhaloHelp",
]);

/** Một trang hoàn chỉnh (khung + nội dung) theo ngôn ngữ. File page.tsx chỉ gọi component này. */
export function LocalePage({ locale, page }: { locale: Locale; page: PageKey }) {
  // Trang sản phẩm NhàLo, Balheh có thanh điều hướng và chân trang riêng theo design; các trang
  // con của NhàLo (chính sách, xoá tài khoản) dùng chung header/footer với trang NhàLo.
  const nhalo = NHALO_PAGES.has(page) ? NHALO[locale] : null;
  const balheh = page === "balheh" ? BALHEH[locale] : null;

  // Câu hỏi thường gặp chỉ có ở chính trang sản phẩm, không có ở các trang con của NhàLo.
  const faq: FaqItem[] | undefined =
    (page === "nhalo"
      ? nhalo?.faq.items.slice(0, NHALO_FAQ_ON_HOME)
      : page === "nhaloHelp"
        ? nhalo?.faq.items
        : undefined) ?? balheh?.faq.items;

  return (
    <SiteShell
      locale={locale}
      page={page}
      header={
        (nhalo && <NhaloHeader locale={locale} content={nhalo.header} page={page} />) ||
        (balheh && <BalhehHeader locale={locale} content={balheh.header} />)
      }
      footer={
        (nhalo && <NhaloFooter locale={locale} content={nhalo.footer} page={page} />) ||
        (balheh && <BalhehFooter locale={locale} content={balheh.footer} />)
      }
    >
      {CONTENT[page][locale]()}
      <JsonLd data={buildStructuredData({ locale, page, faq })} />
    </SiteShell>
  );
}
