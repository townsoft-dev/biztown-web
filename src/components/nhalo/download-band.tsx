"use client";

import { useId } from "react";

import type { NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS } from "@/i18n/config";

import { Mascot, StoreBadges } from "./parts";

/**
 * Banner cuối trang: tải app + để lại số điện thoại (Figma: Download and consultation).
 * Ô nhập chỉ là giao diện — chưa nối API /api/leads, bấm gửi không làm gì.
 */
export function NhaloDownloadBand({ content }: { content: NhaloContent["band"] }) {
  const inputId = useId();

  return (
    <section id={NHALO_SECTIONS.download} className="bt-wrap py-[88px] max-md:py-16">
      <div className="relative mx-auto flex max-w-[1264px] items-center gap-12 overflow-hidden rounded-[40px] bg-[radial-gradient(607px_348px_at_278px_261px,rgba(239,159,39,0.35),transparent),linear-gradient(90deg,#141c38_0%,#23305e_100%)] p-16 max-lg:flex-col max-lg:gap-6 max-md:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[64px_64px]"
        />
        <div className="relative flex h-[300px] w-[390px] shrink-0 items-center justify-center max-lg:h-[200px] max-lg:w-auto">
          <Mascot size={220} className="bt-float max-lg:size-[150px]!" />
        </div>

        <div className="relative flex min-w-0 flex-1 flex-col items-start gap-6">
          <h2 className="text-[52px] leading-[57.2px] font-semibold tracking-[-1.56px] max-sm:text-[34px] max-sm:leading-10 max-sm:tracking-[-1px]">
            <span className="block text-white">{content.title[0]}</span>
            <span className="-my-[0.2em] block bg-[linear-gradient(90deg,#ef9f27,#ffd08a)] bg-clip-text py-[0.2em] text-transparent">
              {content.title[1]}
            </span>
          </h2>
          <StoreBadges store={content.store} tone="band" />
          <div className="flex w-full flex-col gap-3">
            <p className="text-[14px] leading-[22.4px] text-slate-200">{content.consult}</p>
            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex w-full max-w-[540px] items-center gap-2 rounded-full bg-white py-[5px] pr-[5px] pl-[22px] focus-within:shadow-[0_0_0_3px_#ef9f27] max-sm:flex-wrap max-sm:rounded-3xl max-sm:p-2"
            >
              <label htmlFor={inputId} className="sr-only">
                {content.inputLabel}
              </label>
              <input
                id={inputId}
                type="text"
                autoComplete="on"
                placeholder={content.inputLabel}
                className="min-w-0 flex-1 bg-transparent text-[16px] text-navy outline-none placeholder:text-app-faint max-sm:px-3 max-sm:py-2.5"
              />
              <button
                type="submit"
                className="flex h-[46px] items-center justify-center rounded-full bg-navy-950 px-7 text-[14px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-navy max-sm:w-full"
              >
                {content.cta}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
