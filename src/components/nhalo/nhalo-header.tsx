import Image from "next/image";
import Link from "next/link";

import { BizTownMark } from "@/components/site/biztown-mark";
import { LocaleSwitcher } from "@/components/site/site-header";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { TopLink } from "@/components/site/top-link";
import type { NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS, localizedPath, type Locale, type PageKey } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

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
    <header className="sticky top-0 z-50 border-b border-line bg-page/95 backdrop-blur-[14px]">
      <div className="bt-wrap relative flex h-20 items-center gap-4">
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
          <ThemeToggle label={dict.themeToggle} />
          <div className="hidden sm:block">
            <LocaleSwitcher locale={locale} page={page} label={dict.localeSwitcherLabel} />
          </div>
          <a
            href={`${base}#${NHALO_SECTIONS.download}`}
            className="bt-btn bt-btn-primary hidden sm:inline-flex"
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
    </header>
  );
}
