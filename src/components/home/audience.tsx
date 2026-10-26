"use client";

import { useState } from "react";

import type { AudienceCard, HomeContent } from "@/content/home-types";
import { HOME_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { SectionHead } from "./parts";
import { Reveal } from "./reveal";

/** Vị trí ba thẻ trong khung 1344×452 (Figma: bt-astack): trái, giữa (nổi bật), phải. */
const POSITIONS = {
  center: "lg:left-[calc(50%-255.5px)] lg:top-0 lg:w-[511px] lg:z-10",
  right: "lg:left-[calc(100%-431px)] lg:top-14 lg:h-[396px] lg:w-[444px] lg:opacity-80",
  left: "lg:-left-3.5 lg:top-14 lg:h-[396px] lg:w-[444px] lg:opacity-80",
} as const;

type Position = keyof typeof POSITIONS;

/** Section "Công nghệ dễ dùng cho mọi mô hình kinh doanh" — chọn đối tượng, thẻ xoay vòng. */
export function Audience({ content }: { content: HomeContent["audience"] }) {
  const [active, setActive] = useState(0);
  const count = content.cards.length;

  /** Thẻ đang chọn ở giữa, thẻ kế tiếp bên phải, thẻ còn lại bên trái. */
  const positionOf = (index: number): Position => {
    const offset = (index - active + count) % count;
    return offset === 0 ? "center" : offset === 1 ? "right" : "left";
  };

  return (
    <section id={HOME_SECTIONS.audience} className="bt-wrap flex flex-col items-center py-14">
      <SectionHead tag={content.tag} title={content.title} />

      <Reveal className="mt-8">
        <div
          role="tablist"
          className="flex flex-wrap justify-center gap-1.5 rounded-full border border-line bg-card p-1.5 shadow-[0_1px_1px_var(--shadow-soft)] max-sm:rounded-3xl"
        >
          {content.cards.map((card, index) => {
            const selected = index === active;
            return (
              <button
                key={card.code}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(index)}
                className={cn(
                  "flex items-center gap-2 rounded-full py-2.5 pr-[18px] pl-2.5 text-[16px] leading-none font-medium whitespace-nowrap transition-colors",
                  selected ? "bg-accent text-on-accent" : "text-ink-muted hover:text-ink",
                )}
              >
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full text-[11px] font-bold",
                    selected ? "bg-on-accent text-white" : "bg-card-soft text-ink",
                  )}
                >
                  {card.code}
                </span>
                {card.segment}
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal className="relative mt-9 flex w-full flex-col gap-4 lg:block lg:h-[452px]">
        {content.cards.map((card, index) => {
          const position = positionOf(index);
          return (
            <AudienceItem
              key={card.code}
              card={card}
              featured={position === "center"}
              more={content.more}
              className={cn(POSITIONS[position], position === "center" ? "max-lg:order-first" : "")}
              onSelect={() => setActive(index)}
            />
          );
        })}
      </Reveal>
    </section>
  );
}

function AudienceItem({
  card,
  featured,
  more,
  className,
  onSelect,
}: {
  card: AudienceCard;
  featured: boolean;
  more: string;
  className: string;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={featured ? undefined : onSelect}
      className={cn(
        "flex flex-col rounded-[32px] border p-10 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] max-sm:p-7 lg:absolute",
        featured
          ? "border-accent bg-accent text-on-accent shadow-[0_24px_48px_rgba(120,60,0,0.25)]"
          : "cursor-pointer border-line bg-card text-ink shadow-[0_1px_1px_var(--shadow-soft)]",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-14 shrink-0 items-center justify-center rounded-full text-[16px] leading-[25.6px] font-bold",
          featured ? "bg-on-accent text-white" : "bg-accent text-on-accent",
        )}
      >
        {card.code}
      </span>
      <h3 className="mt-9 text-[34px] leading-[54.4px] font-semibold tracking-[-0.68px] max-sm:text-[28px] max-sm:leading-[1.3]">
        {card.title}
      </h3>
      <p
        className={cn(
          "mt-3 text-[18px] leading-[28.8px]",
          featured ? "text-navy" : "text-ink-muted",
        )}
      >
        {card.desc}
      </p>
      <div
        className={cn(
          "mt-7 flex items-center justify-between gap-3 border-t pt-[19px] text-[15px] leading-6",
          featured ? "border-[rgba(24,33,63,0.15)]" : "border-line",
        )}
      >
        <span className="whitespace-nowrap">{card.foot}</span>
        {featured && (
          // "Tìm hiểu thêm" → section sản phẩm.
          <a
            href={`#${HOME_SECTIONS.products}`}
            className="flex items-center gap-3 text-[16px] leading-none font-semibold whitespace-nowrap"
          >
            <span
              aria-hidden="true"
              className="flex size-7 items-center justify-center rounded-full border border-on-accent text-[14px]"
            >
              →
            </span>
            {more}
          </a>
        )}
      </div>
    </div>
  );
}
