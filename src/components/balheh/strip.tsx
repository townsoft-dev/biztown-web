import Image from "next/image";
import { Fragment } from "react";

import type { BalhehContent } from "@/content/balheh-types";

import { BalhehLockup } from "./balheh-header";

const TOOL_ICONS = ["board", "chat", "wiki"];

/** "Thay cho: giao việc + chat + tài liệu = Balheh" (Figma: Strip · 3 tools → 1). */
export function BalhehStrip({ content }: { content: BalhehContent["strip"] }) {
  return (
    <section className="bt-wrap flex flex-col items-center gap-[18px] pt-7 pb-2 text-center">
      <p className="text-[16px] leading-[25.6px] font-medium text-ink-muted">{content.label}</p>
      <div className="flex flex-wrap items-center justify-center gap-3.5">
        {content.items.map((item, index) => (
          <Fragment key={item}>
            <span className="flex h-[50px] items-center gap-2.5 rounded-full border border-line bg-card pr-[19px] pl-2.5 shadow-[0_1px_1px_var(--shadow-soft)]">
              <span className="flex size-[30px] items-center justify-center rounded-[9px] bg-[var(--bh-tile)]">
                <Image
                  src={`/images/balheh/icon-${TOOL_ICONS[index]}.svg`}
                  alt=""
                  width={16}
                  height={16}
                />
              </span>
              <span className="text-[16px] leading-[25.6px] font-semibold whitespace-nowrap text-ink">
                {item}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="text-[24px] leading-[38.4px] font-semibold text-accent-text"
            >
              {index < content.items.length - 1 ? "+" : "="}
            </span>
          </Fragment>
        ))}
        <span className="flex h-12 items-center rounded-full border-2 border-accent bg-card px-[22px] shadow-[0_12px_14px_rgba(166,95,0,0.14)]">
          <BalhehLockup width={95} height={28} />
        </span>
      </div>
    </section>
  );
}
