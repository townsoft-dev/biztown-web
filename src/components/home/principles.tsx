"use client";

import { useEffect, useRef, useState } from "react";

import type { HomeContent, Principle } from "@/content/home-types";
import { HOME_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";

/** Thẻ rộng 300 + khoảng cách 24 → mỗi lần trượt 324px. */
const CARD_STEP = 324;
/** Màn nhỏ hơn sm (640): thẻ đang chọn canh giữa màn hình cho dễ đọc (trừ thẻ đầu/cuối). */
const CENTER_QUERY = "(max-width: 639.98px)";

const TONES: Record<Principle["tone"], string> = {
  orange: "bg-accent text-on-accent",
  tint: "bg-orange-50 text-orange-800",
  gray: "bg-gray-100 text-navy",
  ink: "bg-ink text-page",
};

/** Carousel 4 nguyên tắc (Figma: Section / Principles carousel) — mỗi thẻ một vị trí trượt. */
export function Principles({ content }: { content: HomeContent["principles"] }) {
  const positions = content.items.length;
  const [index, setIndex] = useState(0);
  const go = (next: number) => setIndex(Math.max(0, Math.min(positions - 1, next)));

  // Màn rộng: trượt từng bước 324px như design. Màn nhỏ: đo vị trí thật của thẻ (thẻ hẹp hơn)
  // rồi trượt theo thẻ đang chọn — khung tràn hết bề ngang màn hình.
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const media = window.matchMedia(CENTER_QUERY);
    const measure = () => {
      const card = track.children[index] as HTMLElement | undefined;
      if (!media.matches || !card) {
        setOffset(index * CARD_STEP);
        return;
      }
      // Thẻ đầu sát mép trái, thẻ cuối sát mép phải nội dung (lề bằng phần khung đã bù ra);
      // các thẻ giữa canh giữa.
      const gutter = -parseFloat(getComputedStyle(viewport).marginLeft) || 0;
      if (index === 0) setOffset(card.offsetLeft - gutter);
      else if (index === positions - 1)
        setOffset(card.offsetLeft + card.offsetWidth - (viewport.clientWidth - gutter));
      else setOffset(card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [index, positions]);

  return (
    <section id={HOME_SECTIONS.principles} className="bt-wrap py-14">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.5fr_1fr]">
        <Reveal className="flex flex-col items-start">
          <h2 className="bt-h2">{content.title}</h2>
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

        {/* Màn nhỏ: bù lề 20px của bt-wrap để khung rộng hết màn hình, lộ thẻ hai bên. */}
        <div ref={viewportRef} className="overflow-hidden max-sm:-mx-5">
          <ul
            ref={trackRef}
            className="flex gap-6 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{ transform: `translateX(${-offset}px)` }}
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
