"use client";

import { QRCodeSVG } from "qrcode.react";

import { siteConfig } from "@/config/site";
import type { AppCopy, HeroIntro, NhaloContent } from "@/content/nhalo-types";
import { localizedPath, type Locale } from "@/i18n/config";

import { MsIcon, Phone } from "./app/app-ui";
import { HomeScreen } from "./app/screens";
import { DEFAULT_VARIANT } from "./hero-variant";
import { StoreBadges } from "./parts";
import { useNhaloLinks } from "./use-link-code";

/**
 * Màn hình đầu trang /nhalo/ cho người bấm quảng cáo (khớp banner Batdongsan): nhãn "Miễn phí
 * trọn đời", tiêu đề, 4 ý có tick (hoặc 3 bước theo nguồn), màn Trang chủ app có hai ô nổi, QR
 * to để quét bằng điện thoại (máy tính) hoặc hai nút store to (điện thoại).
 *
 * Tiêu đề / danh sách của mọi nguồn đều có sẵn trong HTML, mỗi bản bọc trong data-nl-v; script
 * ở nhalo-page.tsx chọn bản theo utm_campaign trước khi trang hiện nên chữ không nháy, không
 * nhảy bố cục.
 */
export function NhaloHeroIntro({
  content,
  app,
  locale,
}: {
  content: NhaloContent["hero"];
  app: AppCopy;
  locale: Locale;
}) {
  const links = useNhaloLinks();
  const intros: { id: string; intro: HeroIntro }[] = [
    { id: DEFAULT_VARIANT, intro: content.intro },
    ...content.variants.map((variant) => ({ id: variant.id, intro: variant })),
  ];
  // Chưa có link OA Zalo / fanpage Messenger thì nút tạm dẫn tới trang Liên hệ.
  const contact = localizedPath(locale, "contact");
  const chat = [
    { href: siteConfig.nhaloChat.zalo || contact, label: content.chat.zalo, icon: "chat" },
    {
      href: siteConfig.nhaloChat.messenger || contact,
      label: content.chat.messenger,
      icon: "send",
    },
  ];

  return (
    <div className="bt-wrap relative grid items-center gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_auto]">
      <div className="flex min-w-0 flex-col items-start gap-5">
        <span className="rounded-full bg-accent px-5 py-2 text-[16px] leading-none font-bold text-on-accent shadow-[0_6px_14px_rgba(239,159,39,0.35)]">
          {content.badge}
        </span>

        <h1 className="text-[56px] leading-[1.12] font-semibold tracking-[-1.6px] text-balance max-lg:text-[44px] max-sm:text-[34px] max-sm:tracking-[-1px]">
          {intros.map(({ id, intro }) => (
            <span key={id} data-nl-v={id}>
              <span className="block text-ink">{intro.headline[0]}</span>
              <span className="bt-kw -my-[0.2em] block py-[0.2em]">{intro.headline[1]}</span>
            </span>
          ))}
        </h1>

        {/* Điện thoại: hai nút store to ngay dưới tiêu đề (không cần QR). */}
        <StoreBadges store={content.store} tone="hero" links={links} className="gap-3 lg:hidden" />

        {intros.map(({ id, intro }) => (
          <div key={id} data-nl-v={id}>
            <IntroList intro={intro} />
          </div>
        ))}

        {/* Máy tính: QR to để quét bằng điện thoại, kèm hai nút store. */}
        <div className="mt-1 flex items-center gap-5 rounded-[24px] border border-line bg-white p-4 shadow-[0_12px_32px_var(--shadow-navy)] max-lg:hidden">
          <QRCodeSVG
            value={links.qr}
            size={168}
            level="M"
            marginSize={3}
            bgColor="#ffffff"
            fgColor="#18213f"
            title={content.qr.alt}
            className="shrink-0"
          />
          <div className="flex flex-col items-start gap-3">
            <p className="max-w-[190px] text-[17px] leading-[1.35] font-semibold text-navy">
              {content.qr.label}
            </p>
            <StoreBadges
              store={content.store}
              tone="hero"
              links={links}
              className="flex-col items-start gap-2.5"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {chat.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener" : undefined}
              className="flex h-12 items-center gap-2 rounded-full border-[1.5px] border-[rgba(35,48,94,0.3)] px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-card dark:border-line"
            >
              <MsIcon name={item.icon} size={20} />
              {item.label}
            </a>
          ))}
        </div>

        <p className="text-[14px] leading-[22.4px] text-ink-muted">{content.note}</p>
      </div>

      {/* Màn Trang chủ app + hai ô nổi (như banner tuần 1). */}
      <div className="relative justify-self-center px-12 [--s:0.62] max-sm:px-9 max-sm:[--s:0.6] lg:[--s:0.7]">
        <Phone>
          <HomeScreen t={app} />
        </Phone>
        <FloatCard
          label={content.floats.vacant}
          value="4"
          tone="green"
          className="top-[calc(112px*var(--s))] right-0"
        />
        <FloatCard
          label={content.floats.unpaid}
          value="18.100.000 đ"
          tone="orange"
          className="top-[calc(240px*var(--s))] left-0"
        />
      </div>
    </div>
  );
}

function IntroList({ intro }: { intro: HeroIntro }) {
  if (intro.steps) {
    return (
      <ol className="flex flex-col gap-3.5">
        {intro.steps.map((step, index) => (
          <li key={step.title} className="flex items-start gap-3.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-[17px] leading-none font-bold text-on-accent">
              {index + 1}
            </span>
            <span className="flex flex-col gap-0.5 pt-0.5">
              <span className="text-[19px] leading-[1.35] font-semibold text-ink">
                {step.title}
              </span>
              <span className="text-[15px] leading-[1.45] text-ink-muted">{step.desc}</span>
            </span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul className="flex flex-col gap-3">
      {intro.points?.map((point) => (
        <li key={point} className="flex items-start gap-3">
          <MsIcon name="check_circle" size={26} className="shrink-0 text-chip-paid" />
          <span className="text-[19px] leading-[1.4] font-medium text-ink max-sm:text-[17px]">
            {point}
          </span>
        </li>
      ))}
    </ul>
  );
}

function FloatCard({
  label,
  value,
  tone,
  className,
}: {
  label: string;
  value: string;
  tone: "green" | "orange";
  className: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-[2] flex flex-col rounded-[16px] border-[3px] bg-white px-4 py-1.5 shadow-[0_14px_30px_rgba(24,33,63,0.18)] max-sm:px-3 max-sm:py-1 ${
        tone === "green" ? "border-chip-paid" : "border-accent"
      } ${className}`}
    >
      <span className="text-[13px] leading-[1.3] font-semibold whitespace-nowrap text-app-secondary">
        {label}
      </span>
      <span
        className={`text-[24px] leading-[1.2] font-bold whitespace-nowrap max-sm:text-[19px] ${
          tone === "green" ? "text-app-green" : "text-orange-800"
        }`}
      >
        {value}
      </span>
    </span>
  );
}
