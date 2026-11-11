import Image from "next/image";
import type { CSSProperties } from "react";

import { LocaleSwitcher } from "@/components/site/site-header";
import { siteConfig } from "@/config/site";
import type { NhaloContent, NhaloLink } from "@/content/nhalo-types";
import { NHALO_SECTIONS, localizedPath, type Locale, type PageKey } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

/** Icon nét một màu, tô theo màu chữ để đổi theo theme. */
function MaskIcon({ src, size }: { src: string; size: number }) {
  return (
    <span
      aria-hidden="true"
      className="bt-icon"
      style={{ width: size, height: size, "--icon": `url(${src})` } as CSSProperties}
    />
  );
}

/** Icon mạng xã hội ở chân trang: logo trắng (Simple Icons) trên nền màu thương hiệu. */
const SOCIALS = [
  { key: "facebook", label: "Facebook", bg: "bg-[#1877f2]", size: "size-[15px]" },
  { key: "zalo", label: "Zalo", bg: "bg-[#0068ff]", size: "size-[22px]" },
  { key: "youtube", label: "YouTube", bg: "bg-[#ff0000]", size: "size-[15px]" },
  {
    key: "tiktok",
    label: "TikTok",
    bg: "bg-[#111111] dark:ring-1 dark:ring-white/25",
    size: "size-[15px]",
  },
] as const;

/** `base`: rỗng khi đang ở trang NhàLo, còn ở trang con thì là đường dẫn trang NhàLo. */
function resolveNhaloHref(locale: Locale, to: NhaloLink, base: string) {
  if (!to) return null;
  if ("section" in to) return `${base}#${NHALO_SECTIONS[to.section]}`;
  if ("external" in to) return to.external;
  return localizedPath(locale, to.page);
}

/**
 * Chân trang NhàLo (Figma: Footer · NhaLo): logo, mô tả, MST, địa chỉ, 4 cột link, bản quyền.
 * Dùng chung cho các trang con (/nhalo/privacy…), xem NhaloHeader.
 */
export function NhaloFooter({
  locale,
  content,
  page = "nhalo",
}: {
  locale: Locale;
  content: NhaloContent["footer"];
  page?: PageKey;
}) {
  const dict = getDictionary(locale);
  const base = page === "nhalo" ? "" : localizedPath(locale, "nhalo");

  return (
    <footer className="border-t border-line pt-12 pb-8 [background:var(--nl-footer-bg)]">
      <div className="bt-wrap">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-[300px_250px_repeat(3,1fr)] lg:gap-x-10">
          {/* Khối 1: logo + giới thiệu. */}
          <div className="col-span-2 flex flex-col items-start gap-4 md:col-span-3 lg:col-span-1">
            <a href={`${base}#${NHALO_SECTIONS.top}`} className="flex">
              <Image
                src="/images/home/nhalo-logo.svg"
                alt="NhàLo"
                width={180}
                height={60}
                className="theme-light-only"
              />
              <Image
                src="/images/home/nhalo-logo-alt.svg"
                alt="NhàLo"
                width={180}
                height={60}
                className="theme-dark-only"
              />
            </a>
            <div className="flex max-w-[300px] flex-col gap-1.5 text-[14px] leading-[22.4px] text-ink-muted">
              <p>{content.tagline}</p>
              <p className="font-medium text-ink">{content.maker}</p>
            </div>
          </div>

          {/* Khối 2: pháp nhân, địa chỉ, mạng xã hội. */}
          <div className="col-span-2 flex flex-col items-start gap-4 md:col-span-3 lg:col-span-1 lg:pt-[76px]">
            {/* Cùng cách trình bày với chân trang BizTown: tên pháp nhân, MST, địa chỉ. */}
            <address className="flex flex-col gap-1 text-[14px] leading-[22.4px] text-ink-muted not-italic">
              <span className="flex items-center gap-1 font-medium text-ink">
                <MaskIcon src="/images/nhalo/icon-building.svg" size={18.4} />
                {dict.companyName}
              </span>
              <span className="pl-[22px]">{content.taxCode}</span>
              <span className="flex items-center gap-[3px] whitespace-nowrap">
                <MaskIcon src="/images/nhalo/icon-map-pin.svg" size={16.4} />
                {content.address}
              </span>
            </address>
            <ul aria-label={content.social} className="flex items-center gap-2.5">
              {SOCIALS.map((item) => {
                const href = siteConfig.nhaloSocial[item.key];
                const icon = (
                  <span
                    className={cn("bt-icon", item.size)}
                    style={{ "--icon": `url(/images/social/${item.key}.svg)` } as CSSProperties}
                  />
                );
                const box =
                  "flex size-8 items-center justify-center rounded-full text-white shadow-[0_4px_10px_rgba(24,33,63,0.14)] transition-transform duration-200";
                return (
                  <li key={item.key}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener"
                        aria-label={item.label}
                        title={item.label}
                        className={cn(box, item.bg, "hover:-translate-y-0.5 hover:scale-105")}
                      >
                        {icon}
                      </a>
                    ) : (
                      <span aria-label={item.label} title={item.label} className={cn(box, item.bg)}>
                        {icon}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {content.columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-1.5">
              {/* Nhãn nhóm liên kết, không phải tiêu đề nội dung — xem site-footer.tsx. */}
              <p className="mb-[9px] text-[14px] leading-[22.4px] font-semibold text-ink">
                {column.title}
              </p>
              <ul aria-label={column.title} className="flex flex-col gap-1.5">
                {column.links.map((link) => {
                  const href = resolveNhaloHref(locale, link.to, base);
                  // Link ra ngoài (App Store, Google Play) mở tab mới để người dùng không mất
                  // trang đang đọc; rel="noopener" là bắt buộc khi dùng target="_blank".
                  const external = Boolean(link.to && "external" in link.to);
                  return (
                    <li key={link.label} className="text-[15px] leading-6 text-ink-muted">
                      {href ? (
                        <a
                          href={href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener" : undefined}
                          className="underline-offset-2 hover:text-ink hover:underline"
                        >
                          {link.label}
                        </a>
                      ) : (
                        link.label
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <div className="flex max-w-[720px] flex-col gap-1">
            <p className="text-[13px] leading-[20.8px] text-ink-muted">{content.copyright}</p>
            <p className="text-[11.5px] leading-[1.5] text-ink-muted/80">{content.trademarks}</p>
          </div>
          <LocaleSwitcher locale={locale} page={page} label={dict.localeSwitcherLabel} />
        </div>
      </div>
    </footer>
  );
}
