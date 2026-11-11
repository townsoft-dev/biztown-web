import { NHALO as NHALO_EN } from "@/content/en/nhalo";
import type { HomeContent } from "@/content/home-types";
import { NHALO as NHALO_VI } from "@/content/vi/nhalo";
import type { Locale } from "@/i18n/config";

import { About } from "./about";
import { ContactBand } from "./contact-band";
import { Hero } from "./hero";
import { Platform } from "./platform";
import { Solutions } from "./solutions";

const NHALO = { vi: NHALO_VI, en: NHALO_EN } as const;

/**
 * Trang chủ theo Figma "Homepage · VI · 1440". Hero và khối Hệ sinh thái nằm chung một nền
 * gradient ấm có lưới, bo 48px ở đáy (Figma: v6-dark → bg · day / grid · day).
 */
export function HomePage({ content, locale }: { content: HomeContent; locale: Locale }) {
  return (
    <>
      <div className="relative overflow-hidden rounded-b-[48px] bg-[image:var(--bt-home-bg)] pt-[76px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[image:var(--grid-tile)] bg-size-[52px_52px]"
        />
        <div className="relative">
          <Hero content={content.hero} apps={content.discover} locale={locale} />
          <Platform content={content.platform} locale={locale} nhaloApp={NHALO[locale].app} />
        </div>
      </div>
      {/* Nền phần dưới: vài quầng xanh, cam rất nhạt để không trắng trơn. */}
      <div className="bg-[image:var(--bt-lower-bg)]">
        <Solutions content={content.solutions} locale={locale} />
        <About content={content.about} />
        <ContactBand content={content.contact} locale={locale} />
      </div>
    </>
  );
}
