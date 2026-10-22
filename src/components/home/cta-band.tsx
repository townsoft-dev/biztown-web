"use client";

import { useId } from "react";

import { TagChip } from "@/components/ui/tag-chip";
import type { HomeContent } from "@/content/home-types";
import { HOME_SECTIONS } from "@/i18n/config";

import { Rich } from "./parts";
import { Reveal } from "./reveal";

/** Ba khối logo 3D (Figma: logo3d) — cao 140 / 236 / 186, mọc lên lần lượt. */
const BARS = [
  {
    height: 140,
    className:
      "bg-[linear-gradient(#eef0f6,#9aa1bb)] shadow-[inset_0_-10px_20px_rgba(0,0,0,0.18),inset_0_2px_0_rgba(255,255,255,0.5)]",
  },
  {
    height: 236,
    className:
      "border-[1.5px] border-white/25 bg-[linear-gradient(#4a5a9a,#23305e)] shadow-[inset_0_2px_0_rgba(255,255,255,0.4)]",
  },
  {
    height: 186,
    className:
      "bg-[linear-gradient(#ffd08a,#ef9f27)] shadow-[0_0_60px_rgba(239,159,39,0.55),inset_0_2px_0_rgba(255,255,255,0.6)]",
  },
];

/**
 * Khối kêu gọi cuối trang (Figma: bt-section s-band). Ô nhập chỉ là giao diện — chưa nối API
 * /api/leads, bấm gửi không làm gì.
 */
export function CtaBand({ content }: { content: HomeContent["band"] }) {
  const inputId = useId();

  return (
    <section id={HOME_SECTIONS.contact} className="bt-wrap py-14">
      <Reveal className="relative grid grid-cols-1 gap-12 overflow-hidden rounded-[40px] bg-[image:var(--band-bg)] p-16 max-md:p-8 lg:grid-cols-[0.7fr_1fr]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[image:var(--band-grid)] bg-size-[52px_52px]"
        />

        <div
          aria-hidden="true"
          className="relative flex min-h-[320px] items-end justify-center gap-[18px] pb-10 max-md:min-h-[240px]"
        >
          <span className="absolute bottom-[14px] left-1/2 h-10 w-[300px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(239,159,39,0.55),transparent)]" />
          {BARS.map((bar, index) => (
            <span
              key={bar.height}
              className={`bt-rise relative block w-[74px] origin-bottom animate-[bt-rise_1.2s_cubic-bezier(0.2,0.8,0.2,1)_both] rounded-[20px_20px_8px_8px] max-md:w-14 ${bar.className}`}
              style={{ height: bar.height, animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>

        <div className="relative flex flex-col items-start">
          <TagChip label={content.tag} />
          <h2 className="mt-[18px] text-[52px] leading-[57.2px] font-semibold tracking-[-1.56px] text-ink max-sm:text-[34px] max-sm:leading-10">
            <Rich text={content.title} />
          </h2>
          <p className="mt-4 max-w-[562px] text-[19px] leading-[30.4px] text-ink-muted">
            {content.lead}
          </p>
          <form
            onSubmit={(event) => event.preventDefault()}
            className="mt-7 flex w-full max-w-[540px] items-center gap-2 rounded-full bg-white py-[5px] pr-[5px] pl-[22px] shadow-[0_20px_40px_rgba(166,95,0,0.18)] max-sm:flex-wrap max-sm:rounded-3xl max-sm:p-2"
          >
            <label htmlFor={inputId} className="sr-only">
              {content.inputLabel}
            </label>
            <input
              id={inputId}
              type="tel"
              autoComplete="tel"
              placeholder={content.inputLabel}
              className="min-w-0 flex-1 bg-transparent text-[16px] text-navy outline-none placeholder:text-navy max-sm:px-3 max-sm:py-2.5"
            />
            <button type="submit" className="bt-btn bt-btn-primary max-sm:w-full">
              {content.cta}
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
