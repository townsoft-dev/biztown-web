import Link from "next/link";
import type { CSSProperties } from "react";

import { LOCALES, localizedPath, type Locale } from "@/i18n/config";
import { LOCALE_NAMES, getDictionary } from "@/i18n/dictionaries";

import { BrandLogo } from "./brand-logo";
import { resolveHref } from "./link-target";

/** Nút mạng xã hội — chưa có địa chỉ trang thật nên chỉ là nhãn (Figma: Social button). */
const SOCIALS = [
  { short: "Zalo", name: "Zalo" },
  { short: "f", name: "Facebook" },
  { short: "in", name: "LinkedIn" },
  { short: "▶", name: "YouTube" },
];

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

/** Chân trang: logo, mô tả, MST + địa chỉ công ty, mạng xã hội, các cột liên kết, dòng bản quyền (Figma: Footer). */
export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { footer } = dict;

  return (
    <footer className="border-t border-line pt-[49px] pb-8">
      <div className="bt-wrap">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[1fr_0.7fr_0.7fr_0.7fr_0.7fr]">
          <div className="flex flex-col gap-[23.6px] sm:col-span-2 lg:col-span-1">
            <Link
              href={localizedPath(locale, "home")}
              aria-label={dict.homeLabel}
              className="self-start"
            >
              <BrandLogo />
            </Link>
            <p className="max-w-[262px] text-[14px] leading-[22.4px] text-ink-muted">
              {footer.description}
            </p>
            <address className="flex flex-col text-[14px] leading-[22.4px] text-ink-muted not-italic">
              <span className="flex items-center gap-1">
                <FooterIcon name="building" size={18.4} />
                {footer.taxCode}
              </span>
              <span className="flex items-center gap-[3px]">
                <FooterIcon name="map-pin" size={16.4} />
                {footer.address}
              </span>
            </address>
            <ul aria-label={footer.socialLabel} className="flex gap-2">
              {SOCIALS.map((social) => (
                <li
                  key={social.name}
                  title={social.name}
                  className="flex h-9 w-[39px] items-center justify-center rounded-full bg-card-soft text-[12px] font-bold text-ink"
                >
                  <span aria-hidden="true">{social.short}</span>
                  <span className="sr-only">{social.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {footer.columns.map((groups, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-8">
              {groups.map((group) => (
                <div key={group.title} className="flex flex-col gap-3">
                  <h2 className="text-[14px] leading-[22.4px] font-semibold text-ink">
                    {group.title}
                  </h2>
                  <ul className="flex flex-col gap-1.5">
                    {group.links.map((link) => {
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
          ))}
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-4 border-t border-line pt-[25px] text-[13px] leading-[20.8px] text-ink-muted">
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
