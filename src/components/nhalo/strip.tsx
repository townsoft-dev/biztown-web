import Image from "next/image";
import { Fragment } from "react";

import type { NhaloContent } from "@/content/nhalo-types";

import { MsIcon } from "./app/app-ui";

const TOOL_ICONS = ["menu_book", "table_chart", "chat"];

/** "NhàLo thay cho: sổ + Excel + nhắn tin = NhàLo" (Figma: Equation strip). */
export function NhaloStrip({ content }: { content: NhaloContent["strip"] }) {
  return (
    <section className="bt-wrap flex flex-col items-center gap-[18px] pt-12 text-center">
      <p className="text-[16px] leading-[25.6px] text-ink-muted">{content.label}</p>
      <div className="flex flex-wrap items-center justify-center gap-3.5">
        {content.items.map((item, index) => (
          <Fragment key={item}>
            <span className="flex items-center gap-2.5 rounded-full border border-line bg-card py-2.5 pr-5 pl-2.5">
              <span className="flex size-8 items-center justify-center rounded-[10px] bg-accent-tint text-ink">
                <MsIcon name={TOOL_ICONS[index]} size={22} />
              </span>
              <span className="text-[14px] leading-none font-semibold whitespace-nowrap text-ink">
                {item}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="text-[21px] leading-[27.3px] font-semibold text-line-strong"
            >
              {index < content.items.length - 1 ? "+" : "="}
            </span>
          </Fragment>
        ))}
        <span className="flex rounded-full border-2 border-accent px-3 py-2 shadow-[0_30px_60px_rgba(166,95,0,0.16)]">
          <Image
            src="/images/home/nhalo-logo.svg"
            alt="NhàLo"
            width={96}
            height={32}
            className="theme-light-only"
          />
          <Image
            src="/images/home/nhalo-logo-alt.svg"
            alt="NhàLo"
            width={96}
            height={32}
            className="theme-dark-only"
          />
        </span>
      </div>
    </section>
  );
}
