import Link from "next/link";

import { LOCALES, localizedPath, type Locale, type PageKey } from "@/i18n/config";
import { LOCALE_NAMES, getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

import { BrandLogo } from "./brand-logo";
import { resolveHref } from "./link-target";
import { ProductsMenu } from "./products-menu";
import { ThemeToggle } from "./theme-toggle";

type SiteHeaderProps = {
  locale: Locale;
  /** Trang hiện tại: để nút chuyển ngôn ngữ trỏ sang cùng trang ở ngôn ngữ kia. */
  page: PageKey;
};

/**
 * Thanh điều hướng dạng viên thuốc, dính đầu trang khi cuộn (Figma: Nav). Cao 76px (12 lề + 64)
 * và kéo -76px để nằm đè lên phần đầu trang; nội dung bên dưới tự chừa pt-[76px].
 */
export function SiteHeader({ locale, page }: SiteHeaderProps) {
  const dict = getDictionary(locale);

  return (
    <header className="sticky top-0 z-50 -mb-[76px] pt-3">
      <div className="bt-wrap">
        <nav
          aria-label={dict.navLabel}
          className="flex h-16 items-center gap-4 rounded-full border border-[var(--nav-ring)] bg-[var(--glass-bg)] pr-2 pl-5 shadow-[0_12px_32px_var(--nav-shadow)] backdrop-blur-[14px]"
        >
          <Link
            href={localizedPath(locale, "home")}
            aria-label={dict.homeLabel}
            className="shrink-0"
          >
            <BrandLogo />
          </Link>

          <ul className="ml-[99px] hidden flex-1 items-center gap-6 lg:flex">
            {dict.nav.map((item, index) => {
              const href = resolveHref(locale, item.to);
              // Mục đầu ("Sản phẩm") mở danh sách sản phẩm thay vì nhảy thẳng tới section.
              if (index === 0) {
                return (
                  <li key={item.label}>
                    <ProductsMenu
                      label={item.label}
                      menu={dict.productMenu}
                      hrefs={dict.productMenu.items.map((product) =>
                        resolveHref(locale, product.to),
                      )}
                      allHref={href}
                    />
                  </li>
                );
              }
              const content = item.label;
              const className =
                "flex items-center gap-[5px] text-[15px] leading-6 font-medium whitespace-nowrap text-ink-muted";
              return (
                <li key={item.label}>
                  {href ? (
                    <a href={href} className={cn(className, "transition-colors hover:text-ink")}>
                      {content}
                    </a>
                  ) : (
                    <span className={className}>{content}</span>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle label={dict.themeToggle} />
            <LocaleSwitcher locale={locale} page={page} label={dict.localeSwitcherLabel} />
            <button type="button" className="bt-btn bt-btn-primary hidden sm:inline-flex">
              {dict.startFree}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

type LocaleSwitcherProps = {
  locale: Locale;
  page: PageKey;
  label: string;
};

/** Chuyển ngôn ngữ bằng link sang cùng trang ở ngôn ngữ kia — không cần JS, crawl được. */
export function LocaleSwitcher({ locale, page, label }: LocaleSwitcherProps) {
  return (
    <ul aria-label={label} className="flex shrink-0 gap-0.5 rounded-full bg-card-soft p-[3px]">
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
                "block rounded-full border px-2.5 py-[7px] text-[12px] leading-none font-semibold uppercase transition-colors",
                active
                  ? "border-gray-100 bg-white text-navy shadow-[0_1px_1px_var(--shadow-soft)] dark:border-transparent dark:bg-card dark:text-ink"
                  : "border-transparent text-ink-muted hover:text-ink",
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
