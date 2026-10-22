"use client";

import Image from "next/image";
import { useState } from "react";

import { AppMark } from "@/components/ui/app-mark";
import { Icon } from "@/components/ui/icon";
import { StatusBadge } from "@/components/ui/status-badge";
import type { HomeContent, Product, ProductKey } from "@/content/home-types";
import { HOME_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { Illustration } from "./parts";
import { Reveal } from "./reveal";

/** Mockup bên phải mỗi slide: khung Figma 599×h, file export có thêm 60/30px bóng đổ. */
const VISUALS: Record<ProductKey, { src: string; height: number; exportHeight: number }> = {
  nhalo: { src: "/images/home/products/nhalo.svg", height: 588, exportHeight: 667 },
  balheh: { src: "/images/home/products/balheh.png", height: 439.5, exportHeight: 501 },
  hr: { src: "/images/home/products/hr.svg", height: 417, exportHeight: 470 },
  finance: { src: "/images/home/products/finance.svg", height: 498, exportHeight: 577 },
  sales: { src: "/images/home/products/sales.svg", height: 417, exportHeight: 488 },
  custom: { src: "/images/home/products/custom.svg", height: 416, exportHeight: 454 },
};

/** Section "Một hệ sinh thái | Đa dạng giải pháp" — chọn sản phẩm bằng chip, mũi tên, chấm. */
export function Platform({ content }: { content: HomeContent["platform"] }) {
  const { products } = content;
  const [active, setActive] = useState(0);
  const product = products[active];
  const go = (index: number) => setActive((index + products.length) % products.length);
  const first = active === 0;

  return (
    <section id={HOME_SECTIONS.products} className="bt-wrap pt-12 pb-16">
      <Reveal>
        <div className="flex flex-wrap items-center justify-center gap-x-[22px] text-center">
          <h2 className="bt-h2 whitespace-nowrap max-sm:whitespace-normal">{content.title}</h2>
          <span
            aria-hidden="true"
            className="h-[54px] w-[3px] rounded-[3px] bg-accent max-sm:hidden"
          />
          <p className="bt-h2 bt-kw whitespace-nowrap max-sm:whitespace-normal">
            {first ? content.keyword.first : content.keyword.other}
          </p>
        </div>
        <p className="bt-lead mx-auto mt-[18px] max-w-[702px] text-center">
          {first ? content.lead.first : content.lead.other}
        </p>

        <div
          role="tablist"
          aria-label={content.pickerLabel}
          className="mt-8 flex flex-wrap justify-center gap-2.5"
        >
          {products.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(index)}
                className={cn(
                  "flex items-center gap-2.5 rounded-full border py-1.5 pr-[18px] pl-1.5 text-[15px] leading-none font-medium whitespace-nowrap transition-all",
                  selected
                    ? "border-transparent bg-accent text-on-accent shadow-[0_10px_30px_rgba(239,159,39,0.35)]"
                    : "border-chip-ring bg-chip text-ink-muted hover:text-ink",
                )}
              >
                <AppMark mark={item.mark} size={32} />
                {item.chip}
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal>
        <div className="relative mt-8">
          <ProductSlide key={product.key} product={product} statusLabels={content.statusLabels} />
          <SlideArrow direction="prev" label={content.prevLabel} onClick={() => go(active - 1)} />
          <SlideArrow direction="next" label={content.nextLabel} onClick={() => go(active + 1)} />
        </div>

        <div className="mt-7 flex justify-center gap-2">
          {products.map((item, index) => (
            <button
              key={item.key}
              type="button"
              aria-label={item.chip}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
              className={cn(
                "h-2 rounded-full transition-all",
                index === active ? "w-7 bg-accent" : "w-2 bg-dot-idle",
              )}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function ProductSlide({
  product,
  statusLabels,
}: {
  product: Product;
  statusLabels: HomeContent["platform"]["statusLabels"];
}) {
  const visual = VISUALS[product.key];

  return (
    <div className="bt-fade grid grid-cols-1 gap-12 overflow-hidden rounded-[36px] border border-[rgba(239,159,39,0.22)] bg-[linear-gradient(153deg,rgba(255,255,255,0.96),rgba(255,255,255,0.74))] p-12 shadow-[0_40px_80px_rgba(166,95,0,0.14)] backdrop-blur-[8px] max-md:p-7 lg:grid-cols-2 dark:bg-[linear-gradient(153deg,rgba(28,38,80,0.96),rgba(28,38,80,0.8))] dark:shadow-[0_40px_80px_rgba(0,0,0,0.3)]">
      <div className="flex min-w-0 flex-col items-start">
        <div className="flex flex-wrap items-center gap-3">
          <ProductName name={product.name} />
          {product.type && (
            <span
              className={cn(
                "flex h-6 items-center rounded-full px-2.5 text-[12px] leading-3 font-semibold",
                product.type === "App"
                  ? "bg-navy text-white dark:bg-white dark:text-navy"
                  : "bg-[#1e6b3c] text-orange-50",
              )}
            >
              {product.type}
            </span>
          )}
          {product.status && (
            <StatusBadge status={product.status} label={statusLabels[product.status]} />
          )}
        </div>

        <h3 className="mt-3.5 text-[38px] leading-[43.7px] font-semibold tracking-[-0.95px] text-ink max-sm:text-[30px] max-sm:leading-9">
          {product.title}
        </h3>

        <ul className="mt-[22px] flex flex-col gap-3.5">
          {product.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-center gap-3 text-[18px] leading-[26.1px] text-ink"
            >
              <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-accent text-on-accent shadow-[0_4px_12px_rgba(239,159,39,0.35)]">
                <Icon name="check" size={18} />
              </span>
              {bullet}
            </li>
          ))}
        </ul>

        <ul className="mt-[26px] flex flex-wrap gap-2">
          {product.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-line bg-card-soft px-4 py-2 text-[14px] leading-[22.4px] font-medium text-ink"
            >
              {chip}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" className="bt-btn bt-btn-primary">
            {product.primary}
          </button>
          <button type="button" className="bt-btn bt-btn-outline">
            {product.secondary}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "flex min-w-0 justify-center",
          product.key === "nhalo" ? "items-start" : "items-center",
        )}
      >
        <Illustration
          src={visual.src}
          width={599}
          height={visual.height}
          exportWidth={708}
          exportHeight={visual.exportHeight}
          offsetX={60}
          offsetY={30}
        />
      </div>
    </div>
  );
}

/** Tên sản phẩm: logo ảnh (NhàLo, Balheh) hoặc chữ in hoa giãn cách màu cam. */
function ProductName({ name }: { name: Product["name"] }) {
  if ("text" in name) {
    return (
      <span className="text-[14px] leading-[22.4px] font-bold tracking-[2.24px] text-accent-text uppercase">
        {name.text}
      </span>
    );
  }
  return name.logo === "nhalo" ? (
    <>
      <Image
        src="/images/home/nhalo-logo.svg"
        alt="NhàLo"
        width={172}
        height={57.3}
        className="theme-light-only h-[57.3px] w-[172px]"
      />
      <Image
        src="/images/home/nhalo-logo-alt.svg"
        alt="NhàLo"
        width={172}
        height={57.3}
        className="theme-dark-only h-[57.3px] w-[172px]"
      />
    </>
  ) : (
    <Image
      src="/images/home/balheh-logo.svg"
      alt="Balheh"
      width={158}
      height={46.5}
      className="h-[46.5px] w-[158px]"
    />
  );
}

function SlideArrow({
  direction,
  label,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 flex size-[52px] -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white text-[18px] text-navy shadow-[0_12px_32px_var(--shadow-navy)] max-md:size-11",
        direction === "prev" ? "-left-6 max-md:-left-2" : "-right-6 max-md:-right-2",
      )}
    >
      <span aria-hidden="true">{direction === "prev" ? "←" : "→"}</span>
    </button>
  );
}
