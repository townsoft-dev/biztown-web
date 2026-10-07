import Link from "next/link";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { LOCALES, PAGES, localizedPath, type Locale, type PageKey } from "@/i18n/config";
import { LOCALE_NAMES, getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

const MAIN_ID = "main-content";
const PAGE_KEYS = Object.keys(PAGES) as PageKey[];

type SiteShellProps = {
  locale: Locale;
  /** Trang hiện tại: đánh dấu mục điều hướng và tạo link chuyển ngôn ngữ cùng trang. */
  page: PageKey;
  children: ReactNode;
};

/** Header, khung nội dung và chân trang chung của mọi trang. */
export function SiteShell({ locale, page, children }: SiteShellProps) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <>
      <a
        href={`#${MAIN_ID}`}
        className="fixed top-3 left-3 z-50 -translate-y-24 rounded-lg bg-orange px-4 py-3 font-semibold text-navy focus:translate-y-0"
      >
        {dict.skipToContent}
      </a>

      <header className="surface-dark py-5">
        <div className="mx-auto max-w-[760px] px-5">
          <div className="flex items-center justify-between gap-4">
            <Link
              href={localizedPath(locale, "home")}
              className="text-[17px] font-bold tracking-[0.06em] text-white uppercase no-underline"
            >
              {dict.appName}
            </Link>
            <LocaleSwitcher locale={locale} page={page} label={dict.localeSwitcherLabel} />
          </div>
          <nav aria-label={dict.navLabel} className="mt-3">
            <ul className="flex flex-wrap gap-x-[18px] gap-y-1 text-sm">
              {PAGE_KEYS.map((key) => (
                <li key={key}>
                  <Link
                    href={localizedPath(locale, key)}
                    aria-current={key === page ? "page" : undefined}
                    className="py-0.5 text-navy-soft transition-colors hover:text-white aria-[current=page]:text-white"
                  >
                    {dict.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main
        id={MAIN_ID}
        className="doc mx-auto my-6 max-w-[760px] border-y border-line bg-card px-[18px] pt-[26px] pb-8 sm:mb-8 sm:rounded-xl sm:border-x sm:px-7 sm:pt-8 sm:pb-10"
      >
        {children}
      </main>

      <footer className="mx-auto max-w-[760px] px-5 pt-1 pb-11 text-sm text-muted">
        © {year} {dict.companyName} ·{" "}
        <a href={`mailto:${siteConfig.email}`} className="text-slate underline underline-offset-2">
          {siteConfig.email}
        </a>
      </footer>
    </>
  );
}

type LocaleSwitcherProps = {
  locale: Locale;
  page: PageKey;
  label: string;
};

/** Chuyển ngôn ngữ bằng link sang cùng trang ở ngôn ngữ kia — không cần JS, crawl được. */
function LocaleSwitcher({ locale, page, label }: LocaleSwitcherProps) {
  return (
    <ul aria-label={label} className="flex shrink-0 gap-1 text-[13px] font-semibold">
      {LOCALES.map((target) => {
        const active = target === locale;
        return (
          <li key={target}>
            {/* <a> thay vì <Link>: hai ngôn ngữ dùng hai root layout, đằng nào cũng tải lại trang. */}
            <a
              href={localizedPath(target, page)}
              hrefLang={target}
              lang={target}
              aria-current={active ? "true" : undefined}
              title={LOCALE_NAMES[target]}
              className={cn(
                "block rounded-full border px-3 py-0.5 uppercase transition-colors",
                active
                  ? "border-white bg-white text-navy"
                  : "border-white/30 text-navy-soft hover:border-white hover:text-white",
              )}
            >
              {target}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
