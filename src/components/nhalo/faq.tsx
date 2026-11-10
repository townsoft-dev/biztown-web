import type { CSSProperties } from "react";

import type { NhaloContent } from "@/content/nhalo-types";

/** Số câu hỏi hiện ở trang NhàLo (mục Hỗ trợ); trang Hỏi đáp hiện tất cả. */
export const NHALO_FAQ_ON_HOME = 5;

/**
 * Danh sách hỏi đáp (Figma: FAQ item) — nằm trong mục "Hỗ trợ" (start.tsx). Dùng <details>: mở/đóng
 * không cần JS, câu đầu mở sẵn; dấu + xoay thành × khi mở.
 */
export function NhaloFaqList({ items }: { items: NhaloContent["faq"]["items"] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <details
          key={item.q}
          open={index === 0}
          className="group rounded-3xl border border-line bg-card"
        >
          <summary className="flex cursor-pointer list-none items-center gap-5 px-[26px] py-4 max-sm:px-5 [&::-webkit-details-marker]:hidden">
            <span className="flex-1 text-[17px] leading-[1.5] font-semibold text-ink max-sm:text-[16px]">
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
          <p className="px-[26px] pb-5 text-[15.5px] leading-[1.6] text-ink-muted max-sm:px-5">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
