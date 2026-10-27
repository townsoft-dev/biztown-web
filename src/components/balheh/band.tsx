"use client";

import Image from "next/image";
import { useId, useRef } from "react";

import { Reveal } from "@/components/home/reveal";
import type { BalhehBandContent } from "@/content/balheh-types";

import { BalhehSection } from "./parts";

/**
 * Khối kêu gọi cuối trang (Figma: Section · Bắt đầu với Balheh · Closing band) — mọi CTA trên trang
 * cuộn tới đây. Thẻ luôn tối (navy) ở cả Day và Night như Figma. Nút "Dùng miễn phí" đưa con trỏ
 * vào ô nhập. Ô nhập chỉ là giao diện như trang chủ — chưa nối API /api/leads, bấm gửi không làm gì.
 */
export function BalhehBand({ content }: { content: BalhehBandContent }) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <BalhehSection id="contact">
      <Reveal className="relative mx-auto flex max-w-[1344px] items-center gap-12 overflow-hidden rounded-[40px] bg-[radial-gradient(600px_400px_at_22%_60%,rgba(16,138,255,0.27),transparent_65%),linear-gradient(160deg,#141c38_0%,#23305e_100%)] p-16 max-lg:flex-col max-lg:gap-6 max-md:rounded-[28px] max-md:p-8">
        {/* Logo Balheh lớn kèm quầng sáng (Figma: Band logo). */}
        <Image
          src="/images/balheh/band-logo.svg"
          alt=""
          width={495.494}
          height={300}
          className="h-[300px] w-[495.494px] shrink-0 max-lg:h-[200px] max-lg:w-[330px] max-sm:h-auto max-sm:w-full max-sm:max-w-[330px]"
        />

        <div className="flex min-w-0 flex-1 flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 py-[7px] pr-4 pl-[7px] text-[14px] leading-[22.4px] font-medium whitespace-nowrap text-slate-200">
            <Image
              src="/images/balheh/tag-dot-dark.svg"
              alt=""
              width={22}
              height={22}
              className="size-[22px]"
            />
            {content.tag}
          </span>

          <h2 className="mt-[18px] max-w-[672px] text-[52px] leading-[57.2px] font-semibold tracking-[-1.56px] text-balance text-white max-sm:text-[34px] max-sm:leading-10 max-sm:tracking-[-1px]">
            {content.title.lead}
            <span className="bg-[linear-gradient(90deg,#ffc46b,#ef9f27)] [box-decoration-break:clone] bg-clip-text text-transparent">
              {content.title.kw}
            </span>
            {content.title.tail}
          </h2>

          <button
            type="button"
            onClick={() => inputRef.current?.focus()}
            className="bt-btn bt-btn-primary mt-4"
          >
            {content.cta}
          </button>

          <p className="mt-6 text-[15px] leading-6 text-slate-200">{content.consult}</p>
          <form
            onSubmit={(event) => event.preventDefault()}
            className="mt-3 flex w-full max-w-[540px] items-center gap-2 rounded-full border border-white bg-white py-[5px] pr-[5px] pl-[22px] focus-within:shadow-[0_0_0_3px_#ef9f27] max-sm:flex-wrap max-sm:rounded-3xl max-sm:p-2"
          >
            <label htmlFor={inputId} className="sr-only">
              {content.inputLabel}
            </label>
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              inputMode="email"
              autoComplete="on"
              placeholder={content.inputLabel}
              className="min-w-0 flex-1 bg-transparent text-[16px] text-navy outline-none placeholder:text-app-faint max-sm:px-3 max-sm:py-2.5"
            />
            <button
              type="submit"
              className="flex h-[46px] items-center justify-center rounded-full bg-navy-950 px-7 text-[14px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-navy max-sm:w-full"
            >
              {content.submit}
            </button>
          </form>
        </div>
      </Reveal>
    </BalhehSection>
  );
}
