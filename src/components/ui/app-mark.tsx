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

/** Bản cho nền tối (mode Night): phần đen của logo Balheh (khối góc dưới trái, dấu check) đổi trắng. */
const DARK_LOGOS: Partial<Record<keyof typeof LOGOS, string>> = {
  balheh: "/images/home/balheh-mark-dark.svg",
};

type AppMarkProps = {
  mark: AppMarkKind;
  /** Cạnh (px). */
  size: number;
  /** Bo góc: "full" cho dạng tròn, số px cho dạng vuông bo. */
  radius?: "full" | number;
  /** Cỡ chữ viết tắt (px). */
  fontSize?: number;
  /**
   * Nền phía sau logo: "theme" (mặc định) đổi theo Day/Night; "light" khi nền luôn trắng
   * (thẻ thông báo, ô nền trắng) để giữ logo màu gốc ở mode Night.
   */
  surface?: "theme" | "light";
  className?: string;
};

export function AppMark({
  mark,
  size,
  radius = "full",
  fontSize = 11,
  surface = "theme",
  className,
}: AppMarkProps) {
  const borderRadius = radius === "full" ? 999 : radius;

  if ("logo" in mark) {
    const image = (src: string, themeClass?: string) => (
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        className={cn("shrink-0 object-contain", themeClass, className)}
        style={{ width: size, height: size }}
      />
    );
    const dark = surface === "theme" ? DARK_LOGOS[mark.logo] : undefined;
    if (!dark) return image(LOGOS[mark.logo]);
    return (
      <>
        {image(LOGOS[mark.logo], "theme-light-only")}
        {image(dark, "theme-dark-only")}
      </>
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
