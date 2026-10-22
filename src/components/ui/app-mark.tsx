import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Biểu tượng ứng dụng (Figma: App mark): logo ảnh (NhàLo, Balheh) hoặc chữ viết tắt trên nền
 * màu. Màu nền chữ viết tắt cố định theo design, không đổi theo theme.
 */
export type AppMarkKind =
  { logo: "nhalo" | "balheh" } | { code: string; tone: "orange" | "slate" | "white" | "navy" };

const TONES = {
  orange: "bg-accent text-on-accent",
  slate: "bg-slate-200 text-navy",
  white: "bg-white text-navy border-[1.5px] border-gray-100",
  navy: "bg-navy text-white",
} as const;

const LOGOS = {
  nhalo: "/images/home/nhalo-mark.svg",
  // SVG nền trong suốt (bản PNG export từ Figma dính nền trắng).
  balheh: "/images/home/balheh-mark.svg",
} as const;

type AppMarkProps = {
  mark: AppMarkKind;
  /** Cạnh (px). */
  size: number;
  /** Bo góc: "full" cho dạng tròn, số px cho dạng vuông bo. */
  radius?: "full" | number;
  /** Cỡ chữ viết tắt (px). */
  fontSize?: number;
  className?: string;
};

export function AppMark({ mark, size, radius = "full", fontSize = 11, className }: AppMarkProps) {
  const borderRadius = radius === "full" ? 999 : radius;

  if ("logo" in mark) {
    return (
      <Image
        src={LOGOS[mark.logo]}
        alt=""
        width={size}
        height={size}
        className={cn("shrink-0 object-contain", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center leading-none font-bold",
        TONES[mark.tone],
        className,
      )}
      style={{ width: size, height: size, borderRadius, fontSize, letterSpacing: fontSize * 0.02 }}
    >
      {mark.code}
    </span>
  );
}
