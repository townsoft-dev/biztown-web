import Image from "next/image";
import Link from "next/link";

import { BizTownMark } from "@/components/site/biztown-mark";
import { LocaleSwitcher } from "@/components/site/site-header";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { TopLink } from "@/components/site/top-link";
import type { NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS, localizedPath, type Locale, type PageKey } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

import { NhaloMobileMenu } from "./nhalo-mobile-menu";

/** Lockup NhàLo: bản chữ navy cho Day, chữ sáng cho Night. */
export function NhaloLockup({ width, height }: { width: number; height: number }) {
  return (
    <>
      <Image
        src="/images/nhalo/nhalo-lockup.svg"
        alt="NhàLo"
        width={width}
        height={height}
        priority
        className="theme-light-only"
      />
      <Image
        src="/images/nhalo/nhalo-lockup-alt.svg"
        alt="NhàLo"
        width={width}
        height={height}
        className="theme-dark-only"
      />
    </>
  );
}

/**
 * Thanh điều hướng của trang NhàLo (Figma: Nav · Balheh): biểu tượng BizTown về trang chủ,
 * lockup NhàLo, menu nhảy tới các section, nút sáng/tối, ngôn ngữ, "Dùng miễn phí".
 * Màn hẹp gom menu vào nút ☰. Dùng chung cho các trang con (/nhalo/privacy…): khi đó link
 * section trỏ về trang NhàLo và nút đổi ngôn ngữ giữ nguyên trang con.
 */
/**
 * Trang tự có nền đầu trang: thanh menu nổi đè lên nền đó (kéo phần dưới lên bằng -mb), không
 * để lại dải trắng phía sau (trang tài liệu chừa sẵn pt-[76px] trong SiteShell cho việc này).
 */
const FLOATING = new Set<PageKey>([
  "nhalo",
  "nhaloGuide",
  "nhaloHelp",
  "nhaloPrivacy",
  "nhaloDeleteAccount",
  "nhaloTerms",
]);

export function NhaloHeader({
  locale,
  content,
  page = "nhalo",
}: {
  locale: Locale;
  content: NhaloContent["header"];
  page?: PageKey;
}) {
  const dict = getDictionary(locale);
  const base = page === "nhalo" ? "" : localizedPath(locale, "nhalo");
  const links = content.menu.map((item) => ({
    label: item.label,
    href: `${base}#${NHALO_SECTIONS[item.to]}`,
  }));

  return (
    // Thanh menu dạng viên thuốc nổi, kính mờ (giống header BizTown). Trang NhàLo: hero chạy
    // lên dưới thanh menu (-mb), hero tự chừa chỗ ở trên; trang con thì giữ khoảng trống.
    <header className={cn("sticky top-0 z-50 pt-3", FLOATING.has(page) && "-mb-[76px]")}>
      <div className="bt-wrap">
        <div className="relative flex h-16 items-center gap-4 rounded-full border border-[var(--nav-ring)] bg-[var(--glass-bg)] pr-2 pl-5 shadow-[0_12px_32px_var(--nav-shadow)] backdrop-blur-[14px] max-sm:pl-4">
          <div className="flex shrink-0 items-center gap-[15px]">
            <Link
              href={localizedPath(locale, "home")}
              aria-label={content.biztownLabel}
              className="flex"
            >
              <BizTownMark />
            </Link>
            <span aria-hidden="true" className="h-6 w-px bg-line" />
            <TopLink href={localizedPath(locale, "nhalo")} className="flex">
              <NhaloLockup width={120} height={40} />
            </TopLink>
          </div>

          <nav aria-label={content.menuLabel} className="hidden lg:block">
            <ul className="flex gap-0.5">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-full px-3 py-2 text-[15px] leading-6 font-medium whitespace-nowrap text-ink-muted transition-colors hover:bg-accent-tint hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2.5">
            <div className="hidden sm:block">
              <LocaleSwitcher locale={locale} page={page} label={dict.localeSwitcherLabel} />
            </div>
            {/* Cùng chiều cao ô ngôn ngữ (34px), nằm bên phải ô đó. */}
            <ThemeToggle label={dict.themeToggle} className="size-[34px] text-[14px]" />
            <a
              href={`${base}#${NHALO_SECTIONS.download}`}
              className="hidden h-11 items-center rounded-full bg-accent px-5 text-[14px] font-semibold whitespace-nowrap text-on-accent shadow-[0_6px_16px_rgba(239,159,39,0.35)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              {content.cta}
            </a>
            <NhaloMobileMenu
              links={links}
              openLabel={content.openMenu}
              closeLabel={content.closeMenu}
              menuLabel={content.menuLabel}
            >
              <LocaleSwitcher locale={locale} page={page} label={dict.localeSwitcherLabel} />
              <a href={`${base}#${NHALO_SECTIONS.download}`} className="bt-btn bt-btn-primary">
                {content.cta}
              </a>
            </NhaloMobileMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
