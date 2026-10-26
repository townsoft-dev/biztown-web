import type { HomeContent } from "@/content/home-types";
import type { Locale } from "@/i18n/config";

import { Audience } from "./audience";
import { CtaBand } from "./cta-band";
import { Discover } from "./discover";
import { Hero } from "./hero";
import { Journey } from "./journey";
import { Offers } from "./offers";
import { Platform } from "./platform";
import { Principles } from "./principles";
import { Role } from "./role";
import { Stats } from "./stats";
import { Why } from "./why";

/**
 * Trang chủ theo Figma "Homepage · VI · 1440". Hero và khối Hệ sinh thái nằm chung một nền
 * gradient ấm có lưới, bo 48px ở đáy (Figma: v6-dark → bg · day / grid · day).
 */
export function HomePage({ content, locale }: { content: HomeContent; locale: Locale }) {
  return (
    <>
      <div className="relative overflow-hidden rounded-b-[48px] bg-[image:var(--top-bg)] pt-[76px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[image:var(--grid-tile)] bg-size-[52px_52px]"
        />
        <div className="relative">
          <Hero content={content.hero} apps={content.discover} />
          <Platform content={content.platform} locale={locale} />
        </div>
      </div>
      <Offers content={content.offers} />
      <Discover content={content.discover} locale={locale} />
      <Audience content={content.audience} />
      <Stats content={content.stats} locale={locale} />
      <Journey content={content.journey} />
      <Role content={content.role} />
      <Why content={content.why} />
      <Principles content={content.principles} />
      <CtaBand content={content.band} />
    </>
  );
}
