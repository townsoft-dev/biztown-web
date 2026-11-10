"use client";

import type { AppCopy, NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS, type Locale } from "@/i18n/config";

import { NhaloHeroIntro } from "./hero-intro";

/**
 * Hero trang NhàLo: nền cam có lưới mờ + màn hình mở đầu cho người đến từ quảng cáo
 * (hero-intro.tsx). Phần demo tự chạy đã gộp vào mục "Tính năng" (features.tsx).
 */
export function NhaloHero({
  content,
  app,
  locale,
}: {
  content: NhaloContent["hero"];
  app: AppCopy;
  locale: Locale;
}) {
  return (
    <section
      id={NHALO_SECTIONS.top}
      className="relative overflow-hidden bg-[image:var(--nl-hero-bg)] pt-[116px] pb-20 max-lg:pb-10 max-sm:pt-[100px]"
    >
      {/* Đáy nền cam nhạt dần vào nền trang (thay cho bo góc: vầng cam bên trái làm góc trái lộ
          đường cong rõ còn góc phải gần như trắng). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent,var(--page-bg))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[800px] bg-[linear-gradient(var(--nl-hero-grid)_1px,transparent_1px),linear-gradient(90deg,var(--nl-hero-grid)_1px,transparent_1px)] [mask-image:linear-gradient(180deg,#000_70%,transparent)] bg-size-[96px_96px]"
      />

      <NhaloHeroIntro content={content} app={app} locale={locale} />
    </section>
  );
}
