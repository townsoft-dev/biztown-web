import type { CSSProperties } from "react";

import { Reveal } from "@/components/home/reveal";
import type { NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS } from "@/i18n/config";

import { NhaloSectionHead } from "./parts";

/**
 * Câu hỏi thường gặp (Figma: Frequently asked questions · FAQ item). Dùng <details> như file HTML
 * tham khảo: mở/đóng không cần JS, câu đầu mở sẵn; dấu + xoay thành × khi mở.
 */
export function NhaloFaq({ content }: { content: NhaloContent["faq"] }) {
  return (
    <section id={NHALO_SECTIONS.faq} className="bt-wrap py-[88px] max-md:py-16">
      <NhaloSectionHead tag={content.tag} title={content.title} />

      <Reveal className="mx-auto mt-11 flex max-w-[960px] flex-col gap-3">
        {content.items.map((item, index) => (
          <details
            key={item.q}
            open={index === 0}
            className="group rounded-3xl border border-line bg-card"
          >
            <summary className="flex cursor-pointer list-none items-center gap-5 px-[26px] py-4 max-sm:px-5 [&::-webkit-details-marker]:hidden">
              <span className="flex-1 text-[18px] leading-[28.8px] font-semibold text-ink max-sm:text-[16px] max-sm:leading-[1.5]">
                {item.q}
              </span>
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-line-strong text-ink-muted transition-[transform,background-color] duration-200 group-open:rotate-45 group-open:border-transparent group-open:bg-accent group-open:text-on-accent"
              >
                <span
                  className="bt-icon size-3.5"
                  style={{ "--icon": "url(/images/nhalo/icon-plus.svg)" } as CSSProperties}
                />
              </span>
            </summary>
            <p className="px-[26px] pb-6 text-[16px] leading-[25.6px] text-ink-muted max-sm:px-5">
              {item.a}
            </p>
          </details>
        ))}
      </Reveal>
    </section>
  );
}
