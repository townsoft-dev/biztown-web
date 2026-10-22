"use client";

import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { useInView } from "./use-in-view";

type RevealProps = {
  as?: "div" | "li" | "article";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * Mờ dần rồi trượt lên khi cuộn tới (như file HTML tham khảo: .reveal → .reveal.in). Chỉ ẩn
 * khi trang chạy được JS (class "js" trên <html>), nên không có JS thì nội dung vẫn hiện.
 */
export function Reveal({ as: Tag = "div", className, style, children }: RevealProps) {
  // Hiện khi mép trên đã lên quá vạch cách đáy màn hình 8% — không phụ thuộc chiều cao khối.
  const [ref, inView] = useInView<HTMLElement>(0, "0px 0px -8% 0px");

  return (
    <Tag
      ref={ref as never}
      className={cn("bt-scroll-reveal", inView && "is-in", className)}
      style={style}
    >
      {children}
    </Tag>
  );
}
