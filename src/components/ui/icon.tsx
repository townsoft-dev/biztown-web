import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

const ICONS = {
  "arrow-up-right": "/images/home/icon-arrow-up-right.svg",
  "arrow-up": "/images/home/icon-arrow-up.svg",
  check: "/images/home/icon-check.svg",
  "chevron-down": "/images/home/icon-chevron-down.svg",
} as const;

export type IconName = keyof typeof ICONS;

type IconProps = {
  name: IconName;
  /** Cạnh (px) — mặc định 20. */
  size?: number;
  className?: string;
};

/**
 * Biểu tượng một màu từ file SVG export của Figma, tô bằng currentColor qua CSS mask để đổi
 * màu theo theme mà vẫn dùng đúng file gốc.
 */
export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("bt-icon", className)}
      style={{ width: size, height: size, "--icon": `url(${ICONS[name]})` } as CSSProperties}
    />
  );
}
