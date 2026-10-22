"use client";

import { useState } from "react";

import { TagChip } from "@/components/ui/tag-chip";
import type { HomeContent, Principle } from "@/content/home-types";
import { HOME_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";
/** Thẻ rộng 300 + khoảng cách 24 → mỗi lần trượt 324px. */
const CARD_STEP = 324;

const TONES: Record<Principle["tone"], string> = {
  orange: "bg-accent text-on-accent",
  tint: "bg-orange-50 text-orange-800",
  gray: "bg-gray-100 text-navy",
  ink: "bg-ink text-page",
};

/** Carousel 4 nguyên tắc (Figma: Section / Principles carousel) — 3 vị trí trượt. */
export function Principles({ content }: { content: HomeContent["principles"] }) {
  const positions = content.items.length - 1;
  const [index, setIndex] = useState(0);
  const go = (next: number) => setIndex(Math.max(0, Math.min(positions - 1, next)));

  return (
    <section id={HOME_SECTIONS.principles} className="bt-wrap py-14">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.5fr_1fr]">
        <Reveal className="flex flex-col items-start">
          <TagChip label={content.tag} />
          <h2 className="bt-h2 mt-3">{content.title}</h2>
          {/* Nút "Tìm hiểu thêm" đang ẩn trong design (opacity 0) — chỉ giữ khoảng trống. */}
          <div aria-hidden="true" className="mt-6 h-[52px] max-lg:hidden" />
          <div className="mt-8 flex w-full items-center justify-between">
            <div className="flex gap-2">
              <CarouselArrow
                label={content.prevLabel}
                disabled={index === 0}
                onClick={() => go(index - 1)}
              >
                ←
              </CarouselArrow>
              <CarouselArrow
                label={content.nextLabel}
                disabled={index === positions - 1}
                onClick={() => go(index + 1)}
              >
                →
              </CarouselArrow>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: positions }, (_, dot) => (
                <button
                  key={dot}
                  type="button"
                  aria-label={`${dot + 1} / ${positions}`}
                  aria-current={dot === index ? "true" : undefined}
                  onClick={() => go(dot)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    dot === index ? "w-6 bg-accent" : "w-2 bg-line",
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <div className="overflow-hidden">
          <ul
            className="flex gap-6 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{ transform: `translateX(-${index * CARD_STEP}px)` }}
          >
            {content.items.map((item) => (
              <Reveal as="li" key={item.kicker} className="w-[300px] shrink-0 max-sm:w-[260px]">
                <div
                  className={cn(
                    "flex min-h-[375px] items-center justify-center rounded-3xl text-[96px] leading-[96px] font-bold tracking-[-3.84px] whitespace-nowrap max-sm:min-h-[320px]",
                    TONES[item.tone],
                  )}
                >
                  {item.media}
                </div>
                <p className="mt-4 text-[12px] leading-[19.2px] font-semibold tracking-[1.68px] text-accent-text uppercase">
                  {item.kicker}
                </p>
                <h3 className="mt-2 text-[21px] leading-[29.4px] font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[16px] leading-[25.6px] text-ink-muted">{item.desc}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CarouselArrow({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-11 items-center justify-center rounded-full border border-gray-100 bg-white text-[18px] text-navy shadow-[0_12px_32px_var(--shadow-navy)] disabled:cursor-default disabled:opacity-40"
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
