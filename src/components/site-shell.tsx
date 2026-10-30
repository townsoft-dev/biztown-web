import type { ReactNode } from "react";

import { type Locale, type PageKey } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

import { BackToTop } from "./site/back-to-top";
import { SiteFooter } from "./site/site-footer";
import { SiteHeader } from "./site/site-header";

const MAIN_ID = "main-content";

/** Trang tự dựng toàn bộ section (không đặt trong thẻ trắng của trang tài liệu). */
const FULL_PAGES = new Set<PageKey>(["home", "nhalo", "balheh", "contact"]);

type SiteShellProps = {
  locale: Locale;
  /** Trang hiện tại: tạo link chuyển ngôn ngữ cùng trang và chọn kiểu khung nội dung. */
  page: PageKey;
  /** Header/footer riêng thay cho bản chung của BizTown (trang sản phẩm NhàLo, Balheh). */
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

/**
 * Khung chung của mọi trang: header, nội dung, chân trang, nút lên đầu trang. Trang chủ, các
 * trang sản phẩm (NhàLo, Balheh) và trang Liên hệ tự dựng toàn bộ section; các trang tài liệu (/support, /privacy, /delete-account) đặt nội dung trong
 * một thẻ trắng trên nền đầu trang — giữ nguyên nội dung cũ, chờ design riêng.
 */
export function SiteShell({ locale, page, header, footer, children }: SiteShellProps) {
  const dict = getDictionary(locale);

  return (
    <>
      <a
        href={`#${MAIN_ID}`}
        className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-accent px-4 py-3 font-semibold text-on-accent focus:translate-y-0"
      >
        {dict.skipToContent}
      </a>

      {header ?? <SiteHeader locale={locale} page={page} />}

      {FULL_PAGES.has(page) ? (
        <main id={MAIN_ID}>{children}</main>
      ) : (
        <div className="relative overflow-hidden rounded-b-[48px] bg-[image:var(--top-bg)] pt-[76px] pb-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[image:var(--grid-tile)] [mask-image:linear-gradient(180deg,#000,transparent_70%)] bg-size-[52px_52px]"
          />
          <main
            id={MAIN_ID}
            className="doc relative mx-auto mt-10 max-w-[860px] border-y border-line bg-card px-5 pt-8 pb-10 shadow-[0_1px_1px_var(--shadow-soft)] sm:mx-5 sm:rounded-[32px] sm:border-x sm:px-12 sm:pt-12 sm:pb-14 md:mx-auto"
          >
            {children}
          </main>
        </div>
      )}

      {footer ?? <SiteFooter locale={locale} />}
      <BackToTop label={dict.backToTop} />
    </>
  );
}
