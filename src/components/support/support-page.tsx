import type { CSSProperties } from "react";

import { MsIcon } from "@/components/nhalo/app/app-ui";
import { siteConfig } from "@/config/site";
import type { SupportContent, SupportProduct } from "@/content/support-types";
import { localizedPath, type Locale } from "@/i18n/config";

import { SupportTabs } from "./support-tabs";

/**
 * Trang Hỗ trợ (/support). Đường dẫn đã khai với App Store và Google Play cho NhàLo, nên kênh
 * liên hệ luôn nằm trên cùng và tab NhàLo mở mặc định. Phần trên dùng chung mọi sản phẩm (kênh
 * liên hệ, mẹo gửi yêu cầu); phần dưới là hỗ trợ riêng từng sản phẩm, chọn bằng chip.
 */
export function SupportPage({
  content,
  products,
  locale,
}: {
  content: SupportContent;
  products: SupportProduct[];
  locale: Locale;
}) {
  const channels = [
    {
      icon: "mail",
      href: `mailto:${siteConfig.email}`,
      external: false,
      ...content.channels.email,
    },
    { icon: "chat", href: siteConfig.nhaloChat.zalo, external: true, ...content.channels.zalo },
    {
      icon: "send",
      href: localizedPath(locale, "contact"),
      external: false,
      ...content.channels.contact,
    },
  ];

  return (
    <>
      {/* Phần chung: tiêu đề, ba kênh liên hệ, mẹo gửi yêu cầu. */}
      <section className="relative overflow-hidden bg-[image:var(--top-bg)] pt-[76px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[image:var(--grid-tile)] [mask-image:linear-gradient(180deg,#000,transparent_80%)] bg-size-[52px_52px]"
        />
        <div className="bt-wrap relative flex flex-col items-center pt-14 pb-12 text-center">
          <span className="rounded-full bg-accent-tint px-3 py-1 text-[12.5px] font-semibold tracking-[1.5px] text-accent-text uppercase">
            {content.kicker}
          </span>
          <h1 className="bt-h2 mt-4 text-balance">{content.title}</h1>
          <p className="bt-lead mt-3 max-w-[640px] text-balance">{content.lead}</p>

          <ul className="mt-9 grid w-full max-w-[980px] grid-cols-1 gap-4 text-left md:grid-cols-3">
            {channels.map((channel) => (
              <li key={channel.icon}>
                <a
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener" : undefined}
                  className="group flex h-full items-center gap-3 rounded-[24px] border border-line bg-card px-[18px] py-5 shadow-[0_12px_32px_var(--shadow-navy)] transition-[translate,border-color] duration-200 hover:-translate-y-0.5 hover:border-[rgba(239,159,39,0.5)]"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-tint text-accent-text transition-colors group-hover:bg-accent group-hover:text-on-accent">
                    <MsIcon name={channel.icon} size={24} />
                  </span>
                  <span className="min-w-0">
                    <b className="block text-[17px] leading-snug font-semibold text-ink">
                      {channel.label}
                    </b>
                    <span className="block text-[13px] leading-snug break-words text-ink-muted">
                      {channel.desc}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 grid w-full max-w-[980px] grid-cols-1 gap-4 rounded-[24px] border border-line bg-card-soft p-5 text-left md:grid-cols-[auto_1fr] md:items-center md:gap-8 md:px-7">
            <b className="text-[16px] font-semibold text-ink">{content.tipsTitle}</b>
            <ol className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {content.tips.map((tip, index) => (
                <li
                  key={tip}
                  className="flex items-center gap-2.5 text-[14.5px] leading-snug text-ink-muted"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-[12px] font-bold text-on-accent">
                    {index + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-4 text-[13.5px] text-ink-muted">{content.provider}</p>
        </div>
      </section>

      {/* Hỗ trợ riêng từng sản phẩm. */}
      <section className="bt-wrap pt-6 pb-20" style={{ scrollMarginTop: 96 } as CSSProperties}>
        <h2 className="text-center text-[30px] leading-tight font-semibold tracking-[-0.8px] text-ink max-sm:text-[24px]">
          {content.productsTitle}
        </h2>
        <SupportTabs
          products={products}
          locale={locale}
          label={content.productsLabel}
          statusLabels={content.statusLabels}
          faqTitle={content.faqTitle}
        />
      </section>
    </>
  );
}
