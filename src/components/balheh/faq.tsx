import type { CSSProperties } from "react";

import { Reveal } from "@/components/home/reveal";
import type { BalhehFaqContent } from "@/content/balheh-types";

import { BalhehSection, BalhehSectionHead } from "./parts";

const ICON_PLUS = { "--icon": "url(/images/nhalo/icon-plus.svg)" } as CSSProperties;
const ICON_CLOSE = { "--icon": "url(/images/balheh/icon-close.svg)" } as CSSProperties;

/**
 * Câu hỏi thường gặp (Figma: Section · Hỏi đáp · FAQ item). Dùng <details> như trang NhàLo: mở/đóng
 * không cần JS, câu đầu mở sẵn; nút tròn đổi từ dấu + (viền) sang × (nền cam) khi mở.
 */
export function BalhehFaq({ content }: { content: BalhehFaqContent }) {
  return (
    <BalhehSection
      id="faq"
      className="bg-[radial-gradient(693px_455px_at_68%_55%,rgba(120,185,255,0.38),transparent)] max-md:py-16 dark:bg-[radial-gradient(693px_455px_at_68%_55%,rgba(120,185,255,0.1),transparent)]"
    >
      <BalhehSectionHead tag={content.tag} title={content.title} />

      <Reveal className="mx-auto mt-10 flex max-w-[960px] flex-col gap-3">
        {content.items.map((item, index) => (
          <details
            key={item.q}
            open={index === 0}
            className="group rounded-3xl border border-line bg-card"
          >
            <summary className="flex cursor-pointer list-none items-center gap-5 px-[26px] py-[15px] group-open:py-4 max-sm:px-5 [&::-webkit-details-marker]:hidden">
              <span className="flex-1 text-[18px] leading-[28.8px] font-semibold text-ink max-sm:text-[16px] max-sm:leading-[1.5]">
                {item.q}
              </span>
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-line-strong text-ink-muted transition-colors duration-200 group-open:border-transparent group-open:bg-accent group-open:text-on-accent"
              >
                <span className="bt-icon size-3.5 group-open:hidden" style={ICON_PLUS} />
                <span
                  className="bt-icon hidden size-3.5 group-open:inline-block"
                  style={ICON_CLOSE}
                />
              </span>
            </summary>
            <p className="max-w-[780px] px-[26px] pb-6 text-[16px] leading-[25.6px] text-ink-muted max-sm:px-5">
              {item.a}
            </p>
          </details>
        ))}
      </Reveal>
    </BalhehSection>
  );
}
