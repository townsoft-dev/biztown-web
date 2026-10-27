import Image from "next/image";
import Link from "next/link";

import { NhaloMobileMenu } from "@/components/nhalo/nhalo-mobile-menu";
import { LocaleSwitcher } from "@/components/site/site-header";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { TopLink } from "@/components/site/top-link";
import type { BalhehContent } from "@/content/balheh-types";
import { BALHEH_SECTIONS, localizedPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Lockup Balheh: bản chữ đen cho Day, chữ trắng cho Night (khối góc dưới trái, dấu check). */
export function BalhehLockup({
  width,
  height,
  priority,
}: {
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <>
      <Image
        src="/images/home/balheh-logo.svg"
        alt="Balheh"
        width={width}
        height={height}
        priority={priority}
        className="theme-light-only"
      />
      <Image
        src="/images/home/balheh-logo-dark.svg"
        alt="Balheh"
        width={width}
        height={height}
        className="theme-dark-only"
      />
    </>
  );
}

/**
 * Thanh điều hướng của trang Balheh (Figma: Nav · Balheh): biểu tượng BizTown về trang chủ,
 * lockup Balheh, menu nhảy tới các section, nút sáng/tối, ngôn ngữ, "Dùng miễn phí".
 * Màn hẹp gom menu vào nút ☰.
 */
export function BalhehHeader({
  locale,
  content,
}: {
  locale: Locale;
  content: BalhehContent["header"];
}) {
  const dict = getDictionary(locale);
  const links = content.menu.map((item) => ({
    label: item.label,
    href: `#${BALHEH_SECTIONS[item.to]}`,
  }));
  const contact = `#${BALHEH_SECTIONS.contact}`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/95 backdrop-blur-[14px]">
      <div className="bt-wrap relative flex h-20 items-center gap-4">
        <div className="flex shrink-0 items-center gap-[15px]">
          <Link
            href={localizedPath(locale, "home")}
            aria-label={content.biztownLabel}
            className="flex size-10 items-center justify-center"
          >
            <Image src="/images/nhalo/biztown-icon.svg" alt="" width={24} height={24} />
          </Link>
          <span aria-hidden="true" className="h-6 w-px bg-line" />
          <TopLink href={localizedPath(locale, "balheh")} className="flex">
            <BalhehLockup width={122} height={36} priority />
          </TopLink>
        </div>

        <nav aria-label={content.menuLabel} className="hidden xl:block">
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
            <LocaleSwitcher locale={locale} page="balheh" label={dict.localeSwitcherLabel} />
          </div>
          <a href={contact} className="bt-btn bt-btn-primary hidden sm:inline-flex">
            {content.cta}
          </a>
          {/* Menu 6 mục chỉ vừa một hàng từ 1280px, dưới đó gom vào nút ☰. */}
          <NhaloMobileMenu
            links={links}
            openLabel={content.openMenu}
            closeLabel={content.closeMenu}
            menuLabel={content.menuLabel}
            className="xl:hidden"
          >
            <LocaleSwitcher locale={locale} page="balheh" label={dict.localeSwitcherLabel} />
            <a href={contact} className="bt-btn bt-btn-primary">
              {content.cta}
            </a>
          </NhaloMobileMenu>
        </div>
      </div>
    </header>
  );
}
