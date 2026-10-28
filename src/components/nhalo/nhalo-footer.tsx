import Image from "next/image";
import type { CSSProperties } from "react";

import { LocaleSwitcher } from "@/components/site/site-header";
import type { NhaloContent, NhaloLink } from "@/content/nhalo-types";
import { NHALO_SECTIONS, localizedPath, type Locale, type PageKey } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

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

/** `base`: rỗng khi đang ở trang NhàLo, còn ở trang con thì là đường dẫn trang NhàLo. */
function resolveNhaloHref(locale: Locale, to: NhaloLink, base: string) {
  if (!to) return null;
  if ("section" in to) return `${base}#${NHALO_SECTIONS[to.section]}`;
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
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-[340px_repeat(4,1fr)]">
          <div className="col-span-2 flex flex-col items-start gap-[18px] md:col-span-4 lg:col-span-1">
            <a href={`${base}#${NHALO_SECTIONS.top}`} className="flex">
              <Image
                src="/images/home/nhalo-logo.svg"
                alt="NhàLo"
                width={140}
                height={47}
                className="theme-light-only"
              />
              <Image
                src="/images/home/nhalo-logo-alt.svg"
                alt="NhàLo"
                width={140}
                height={47}
                className="theme-dark-only"
              />
            </a>
            <p className="max-w-[280px] text-[14px] leading-[22.4px] text-ink-muted">
              {content.tagline}
            </p>
            <div className="flex flex-col text-[14px] leading-[22.4px] text-ink-muted">
              <p className="flex items-center gap-1">
                <MaskIcon src="/images/nhalo/icon-building.svg" size={18.4} />
                {content.taxCode}
              </p>
              <p className="flex items-center gap-[3px]">
                <MaskIcon src="/images/nhalo/icon-map-pin.svg" size={16.4} />
                {content.address}
              </p>
            </div>
          </div>

          {content.columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-1.5">
              <h2 className="mb-[9px] text-[14px] leading-[22.4px] font-semibold text-ink">
                {column.title}
              </h2>
              <ul className="flex flex-col gap-1.5">
                {column.links.map((link) => {
                  const href = resolveNhaloHref(locale, link.to, base);
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

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="text-[13px] leading-[20.8px] text-ink-muted">{content.copyright}</p>
          <LocaleSwitcher locale={locale} page={page} label={dict.localeSwitcherLabel} />
        </div>
      </div>
    </footer>
  );
}
