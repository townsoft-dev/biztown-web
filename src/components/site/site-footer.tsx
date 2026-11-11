import Link from "next/link";
import type { CSSProperties } from "react";

import { siteConfig } from "@/config/site";
import { LOCALES, localizedPath, type Locale } from "@/i18n/config";
import { LOCALE_NAMES, getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

import { BrandLogo } from "./brand-logo";
import { resolveHref } from "./link-target";

/** Icon mạng xã hội: logo trắng (Simple Icons) trên nền màu thương hiệu — như chân trang NhàLo. */
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

/** Icon nét (Figma: building-07, map-pin) tô theo màu chữ để đổi theo Day/Night. */
function FooterIcon({ name, size }: { name: "building" | "map-pin"; size: number }) {
  return (
    <span
      aria-hidden="true"
      className="bt-icon"
      style={
        {
          width: size,
          height: size,
          "--icon": `url(/images/home/icon-${name}.svg)`,
        } as CSSProperties
      }
    />
  );
}

/**
 * Chân trang BizTown, cùng bố cục với chân trang NhàLo: khối 1 logo + giới thiệu, khối 2 pháp
 * nhân + địa chỉ + mạng xã hội, rồi ba cột liên kết (Sản phẩm · Dịch vụ · Hỗ trợ) — mục nào
 * cũng dẫn tới trang hoặc section thật, dòng cuối là bản quyền và chọn ngôn ngữ.
 */
export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { footer } = dict;

  return (
    <footer className="border-t border-line pt-12 pb-8 [background:var(--nl-footer-bg)]">
      <div className="bt-wrap">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-[300px_270px_repeat(3,1fr)] lg:gap-x-10">
          {/* Khối 1: logo + giới thiệu. */}
          <div className="col-span-2 flex flex-col items-start gap-4 md:col-span-3 lg:col-span-1">
            <Link href={localizedPath(locale, "home")} aria-label={dict.homeLabel}>
              <BrandLogo />
            </Link>
            <div className="flex max-w-[300px] flex-col gap-1.5 text-[14px] leading-[22.4px] text-ink-muted">
              <p className="text-pretty">{footer.tagline}</p>
              <p className="font-medium text-balance text-ink">{footer.maker}</p>
            </div>
          </div>

          {/* Khối 2: pháp nhân, địa chỉ, mạng xã hội. */}
          <div className="col-span-2 flex flex-col items-start gap-4 md:col-span-3 lg:col-span-1 lg:pt-[60px]">
            {/* Tên pháp nhân đầy đủ: Google đối chiếu tên công ty trên site với dữ liệu doanh
                nghiệp bên ngoài, và người dùng cũng cần biết ai đứng sau sản phẩm. */}
            <address className="flex flex-col gap-1 text-[14px] leading-[22.4px] text-ink-muted not-italic">
              <span className="flex items-center gap-1 font-medium text-ink">
                <FooterIcon name="building" size={18.4} />
                {dict.companyName}
              </span>
              <span className="pl-[22px]">{footer.taxCode}</span>
              <span className="flex items-center gap-[3px] whitespace-nowrap">
                <FooterIcon name="map-pin" size={16.4} />
                {footer.address}
              </span>
            </address>
            <ul aria-label={footer.socialLabel} className="flex items-center gap-2.5">
              {SOCIALS.map((item) => (
                <li key={item.key}>
                  <a
                    href={siteConfig.biztownSocial[item.key]}
                    target="_blank"
                    rel="noopener"
                    aria-label={item.label}
                    title={item.label}
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full text-white shadow-[0_4px_10px_rgba(24,33,63,0.14)] transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105",
                      item.bg,
                    )}
                  >
                    <span
                      className={cn("bt-icon", item.size)}
                      style={{ "--icon": `url(/images/social/${item.key}.svg)` } as CSSProperties}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-1.5">
              {/* Không dùng <h2>: đây là nhãn nhóm liên kết, không phải tiêu đề nội dung —
                  để heading ở đây sẽ chen vào dàn ý H1/H2 của mọi trang. Tên nhóm chuyển
                  thành tên gọi của danh sách để trình đọc màn hình vẫn đọc được. */}
              <p className="mb-[9px] text-[14px] leading-[22.4px] font-semibold text-ink">
                {column.title}
              </p>
              <ul aria-label={column.title} className="flex flex-col gap-1.5">
                {column.links.map((link) => {
                  const href = resolveHref(locale, link.to);
                  return (
                    <li key={link.label} className="text-[15px] leading-6 text-ink-muted">
                      {href ? (
                        <a
                          href={href}
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

        <div className="mt-8 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-[13px] leading-[20.8px] text-ink-muted">
          <p>{footer.copyright}</p>
          <p>
            {LOCALES.map((target, index) => (
              <span key={target}>
                {index > 0 && " · "}
                <a
                  href={localizedPath(target, "home")}
                  hrefLang={target}
                  lang={target}
                  className="hover:text-ink hover:underline"
                >
                  {LOCALE_NAMES[target]}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
