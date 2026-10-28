import Image from "next/image";

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
