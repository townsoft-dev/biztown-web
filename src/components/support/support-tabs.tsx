"use client";

import { useEffect, useState } from "react";

import { MsIcon } from "@/components/nhalo/app/app-ui";
import { AppMark } from "@/components/ui/app-mark";
import { Icon } from "@/components/ui/icon";
import { StatusBadge } from "@/components/ui/status-badge";
import type { SupportContent, SupportProduct } from "@/content/support-types";
import { localizedPath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type Key = SupportProduct["key"];

/**
 * Chip chọn sản phẩm + nội dung hỗ trợ của sản phẩm đó (lối tắt, câu hỏi thường gặp). Link có
 * dạng /support/#balheh mở thẳng tab tương ứng; mặc định NhàLo.
 */
export function SupportTabs({
  products,
  locale,
  label,
  statusLabels,
  faqTitle,
}: {
  products: SupportProduct[];
  locale: Locale;
  label: string;
  statusLabels: SupportContent["statusLabels"];
  faqTitle: string;
}) {
  const [active, setActive] = useState<Key>(products[0].key);

  useEffect(() => {
    const fromHash = () => {
      const key = window.location.hash.slice(1);
      if (products.some((item) => item.key === key)) setActive(key as Key);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [products]);

  function choose(key: Key) {
    setActive(key);
    window.history.replaceState(null, "", `#${key}`);
  }

  const product = products.find((item) => item.key === active) ?? products[0];

  return (
    <div className="mx-auto mt-6 max-w-[980px]">
      <div
        role="tablist"
        aria-label={label}
        className="flex flex-wrap justify-center gap-2.5 max-md:-mx-5 max-md:[scrollbar-width:none] max-md:flex-nowrap max-md:justify-start max-md:overflow-x-auto max-md:px-5 max-md:pb-2"
      >
        {products.map((item) => {
          const selected = item.key === active;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              id={`tab-${item.key}`}
              aria-selected={selected}
              aria-controls={`panel-${item.key}`}
              onClick={() => choose(item.key)}
              className={cn(
                "flex h-[52px] shrink-0 items-center justify-center gap-3 rounded-full border px-5 text-[15.5px] leading-none font-medium whitespace-nowrap transition-all duration-200",
                selected
                  ? "border-transparent bg-accent text-on-accent shadow-[0_10px_30px_rgba(239,159,39,0.35)]"
                  : "border-chip-ring bg-chip text-ink-muted hover:-translate-y-0.5 hover:text-ink",
              )}
            >
              <AppMark mark={item.mark} size={32} fontSize={10} />
              {item.name}
            </button>
          );
        })}
      </div>

      <div
        key={product.key}
        role="tabpanel"
        id={`panel-${product.key}`}
        aria-labelledby={`tab-${product.key}`}
        className="bt-fade mt-6 rounded-[32px] border border-line bg-card p-9 shadow-[0_24px_48px_var(--shadow-navy)] max-sm:p-6"
      >
        <div className="flex flex-wrap items-center gap-3">
          <AppMark mark={product.mark} size={48} radius={14} fontSize={13} />
          <b className="text-[24px] leading-tight font-semibold text-ink">{product.name}</b>
          <StatusBadge status={product.status} label={statusLabels[product.status]} />
        </div>
        <p className="mt-3 text-[16px] leading-[1.6] text-ink-muted">{product.intro}</p>

        {product.links.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {product.links.map((link) => {
              const href = link.page ? localizedPath(locale, link.page) : link.href;
              return (
                <li key={link.label}>
                  <a
                    href={href}
                    target={link.href ? "_blank" : undefined}
                    rel={link.href ? "noopener" : undefined}
                    className="flex h-10 items-center gap-1.5 rounded-full border border-line bg-card-soft px-4 text-[14.5px] font-medium text-ink transition-colors hover:border-accent hover:text-accent-text"
                  >
                    {link.label}
                    <Icon name="arrow-up-right" size={15} />
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        {product.soon ? (
          <div className="mt-7 flex items-start gap-4 rounded-[24px] border border-dashed border-line-strong bg-card-soft p-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-tint text-accent-text">
              <MsIcon name="notifications_active" size={22} />
            </span>
            <p className="text-[15.5px] leading-[1.6] text-ink-muted">{product.soon}</p>
          </div>
        ) : (
          <>
            <h3 className="mt-8 text-[19px] leading-tight font-semibold text-ink">{faqTitle}</h3>
            <ul className="mt-3 flex flex-col divide-y divide-line border-y border-line">
              {product.faqs.map((faq, index) => (
                <li key={faq.q}>
                  <details className="group" open={index === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16.5px] leading-snug font-semibold text-ink [&::-webkit-details-marker]:hidden">
                      {faq.q}
                      <Icon
                        name="chevron-down"
                        size={18}
                        className="shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-180"
                      />
                    </summary>
                    <p className="pb-4 text-[15.5px] leading-[1.65] text-ink-muted">{faq.a}</p>
                  </details>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
