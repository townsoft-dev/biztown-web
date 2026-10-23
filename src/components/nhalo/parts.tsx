import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { Reveal } from "@/components/home/reveal";
import { TagChip } from "@/components/ui/tag-chip";
import type { MarkTitle, StoreBadge } from "@/content/nhalo-types";
import { cn } from "@/lib/utils";

/** Tiêu đề hai dòng, dòng sau có vạch tô cam (Figma: Title + Highlighted phrase). */
export function MarkedTitle({ title, className }: { title: MarkTitle; className?: string }) {
  return (
    <h2 className={cn("bt-h2 text-balance text-ink", className)}>
      <span className="block">{title.lead}</span>
      <span className="bt-mark">{title.mark}</span>
    </h2>
  );
}

/** Tag chip + tiêu đề + đoạn dẫn căn giữa (Figma: Section heading). */
export function NhaloSectionHead({
  tag,
  title,
  lead,
}: {
  tag: string;
  title: MarkTitle;
  lead?: string;
}) {
  return (
    <Reveal className="mx-auto flex max-w-[920px] flex-col items-center gap-[18px] text-center">
      <TagChip label={tag} />
      <MarkedTitle title={title} />
      {lead && <p className="bt-lead max-w-[720px] text-pretty">{lead}</p>}
    </Reveal>
  );
}

/** Linh vật NhàLo (Figma: NhaLo logo · Logo3) — khung vuông, hình đặt lệch như file gốc. */
export function Mascot({
  size,
  className,
  priority,
}: {
  size: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative block shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/nhalo/mascot.svg"
        alt=""
        width={109}
        height={118}
        priority={priority}
        className="absolute h-auto max-w-none"
        style={{ left: "19.47%", top: "19.87%", width: "64.1%" }}
      />
    </span>
  );
}

const STORES = {
  hero: [
    { name: "App Store", icon: "/images/nhalo/icon-apple.svg", width: 160 },
    { name: "Google Play", icon: "/images/nhalo/icon-google-play.svg", width: 179 },
  ],
  band: [
    { name: "App Store", icon: "/images/nhalo/icon-apple-dark.svg", width: 145 },
    { name: "Google Play", icon: "/images/nhalo/icon-google-play-dark.svg", width: 163 },
  ],
} as const;

/**
 * Hai nút tải app kèm nhãn "Sắp có" (Figma: pill / store). Ứng dụng chưa lên store nên chưa có
 * link — hiện dạng nhãn, không bấm được.
 */
export function StoreBadges({
  store,
  tone,
  className,
}: {
  store: StoreBadge;
  tone: "hero" | "band";
  className?: string;
}) {
  const dark = tone === "hero";
  return (
    <ul
      className={cn("flex flex-wrap items-center", dark ? "gap-[23px]" : "gap-[33px]", className)}
    >
      {STORES[tone].map((item) => (
        <li
          key={item.name}
          className={cn(
            "relative flex shrink-0 items-center gap-3 text-left",
            dark
              ? "h-[58px] rounded-[14px] bg-app-store pl-[18px] text-[#fff6e2]"
              : "h-[52px] rounded-[14px] bg-white pl-3.5 text-on-accent",
          )}
          style={{ width: item.width }}
        >
          <Image src={item.icon} alt="" width={dark ? 20 : 22} height={dark ? 20 : 22} />
          <span className="flex flex-col whitespace-nowrap">
            <span
              className={cn(
                dark
                  ? "text-[11.5px] leading-[12.65px] font-medium"
                  : "text-[10px] leading-[11px] opacity-70",
              )}
            >
              {store.prefix}
            </span>
            <span
              className={cn(
                "font-semibold",
                dark ? "text-[17px] leading-[18.7px]" : "text-[16px] leading-[17.6px]",
              )}
            >
              {item.name}
            </span>
          </span>
          <span
            className={cn(
              "absolute right-[-11px] rounded-[11px] bg-accent px-2 py-[3px] text-[10px] leading-4 font-bold whitespace-nowrap text-on-accent",
              dark ? "top-[-11px]" : "top-[-9px]",
            )}
          >
            {store.badge}
          </span>
        </li>
      ))}
    </ul>
  );
}

export type AnnotationLayout = {
  /** Cao cả khung (px, theo Figma). */
  height: number;
  /** Rộng cột chú thích mỗi bên. */
  calloutWidth: number;
  /** Rộng khung điện thoại (đã thu nhỏ). */
  phoneWidth: number;
  /** Mỗi chú thích: bên trái/phải, y của ô chú thích, y (tâm) của chấm số trên điện thoại. */
  callouts: { side: "left" | "right"; slot: number; pin: number }[];
};

/** Rộng khung chú thích theo Figma. */
const LAYOUT_WIDTH = 1100;
/** Đường nối bắt đầu ở mép ô chú thích, cách đỉnh ô 48px (Figma: Annotation connector). */
const CONNECTOR_OFFSET = 48;

/**
 * Màn hình ứng dụng có chú thích đánh số hai bên, nối bằng đường cong cam (Figma: Annotated
 * screen). Màn rộng: toạ độ tuyệt đối theo design; màn hẹp: điện thoại ở giữa, chú thích thành
 * danh sách đánh số bên dưới.
 */
export function AnnotatedScreen({
  layout,
  callouts,
  phone,
}: {
  layout: AnnotationLayout;
  callouts: { title: string; desc: string }[];
  phone: ReactNode;
}) {
  const phoneLeft = (LAYOUT_WIDTH - layout.phoneWidth) / 2;
  const phoneRight = phoneLeft + layout.phoneWidth;

  return (
    <>
      <div
        className="relative mx-auto hidden min-[75rem]:block"
        style={{ width: LAYOUT_WIDTH, height: layout.height }}
      >
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] overflow-visible"
          width={LAYOUT_WIDTH}
          height={layout.height}
        >
          {layout.callouts.map((item, index) => {
            const left = item.side === "left";
            const x1 = left ? layout.calloutWidth : LAYOUT_WIDTH - layout.calloutWidth;
            const x2 = left ? phoneLeft : phoneRight;
            const y1 = item.slot + CONNECTOR_OFFSET;
            const mid = (x1 + x2) / 2;
            return (
              <path
                key={index}
                d={`M${x1} ${y1}C${mid} ${y1} ${mid} ${item.pin} ${x2} ${item.pin}`}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={1.6}
              />
            );
          })}
        </svg>

        {layout.callouts.map((item, index) => (
          <Callout
            key={index}
            number={index + 1}
            note={callouts[index]}
            className="absolute"
            style={{
              top: item.slot,
              width: layout.calloutWidth,
              ...(item.side === "left" ? { left: 0 } : { right: 0 }),
            }}
          />
        ))}

        <div className="absolute top-0" style={{ left: phoneLeft }}>
          {phone}
        </div>

        {layout.callouts.map((item, index) => (
          <Pin
            key={index}
            number={index + 1}
            className="absolute z-[2]"
            style={{
              top: item.pin - 11,
              left: (item.side === "left" ? phoneLeft : phoneRight) - 9,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-8 min-[75rem]:hidden">
        {phone}
        <ol className="grid w-full max-w-[560px] gap-3">
          {callouts.map((note, index) => (
            <li key={note.title}>
              <Callout number={index + 1} note={note} />
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

function Callout({
  number,
  note,
  className,
  style,
}: {
  number: number;
  note?: { title: string; desc: string };
  className?: string;
  style?: CSSProperties;
}) {
  if (!note) return null;
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-xl border border-line bg-card p-3 text-[14px] shadow-[0_12px_32px_var(--shadow-navy)]",
        className,
      )}
      style={style}
    >
      <NumberDot number={number} />
      <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <span className="font-semibold text-ink">{note.title}</span>
        <span className="leading-[22.4px] text-ink-muted">{note.desc}</span>
      </span>
    </div>
  );
}

/** Số tròn cam 22px (Figma: Number / Step number). */
export function NumberDot({ number, className }: { number: number; className?: string }) {
  return (
    <span
      className={cn(
        "flex size-[22px] shrink-0 items-center justify-center rounded-full bg-accent text-[12px] leading-none font-semibold text-on-accent",
        className,
      )}
    >
      {number}
    </span>
  );
}

function Pin({
  number,
  className,
  style,
}: {
  number: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-[22px] items-center justify-center rounded-full border-2 border-white bg-accent text-[12px] leading-none font-semibold text-on-accent",
        className,
      )}
      style={style}
    >
      {number}
    </span>
  );
}
