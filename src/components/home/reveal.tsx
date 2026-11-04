"use client";

import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { useInView } from "./use-in-view";

type RevealProps = {
  as?: "div" | "li" | "article";
  className?: string;
  style?: CSSProperties;
  /**
   * Hiện ngay, không chờ cuộn tới. Dùng cho khối có thể nằm trong màn hình đầu: những khối đó
   * bị `opacity: 0` cho tới khi React hydrate xong (~255 KB JS) rồi IntersectionObserver mới
   * chạy, nên trên máy yếu sẽ thấy khoảng trắng một lúc. Phần tử trong suốt cũng không được
   * tính là LCP, nên nếu khối này là phần tử lớn nhất thì LCP bị lùi theo.
   */
  immediate?: boolean;
  children: ReactNode;
};

/**
 * Mờ dần rồi trượt lên khi cuộn tới (như file HTML tham khảo: .reveal → .reveal.in). Chỉ ẩn
 * khi trang chạy được JS (class "js" trên <html>), nên không có JS thì nội dung vẫn hiện.
 */
export function Reveal({
  as: Tag = "div",
  className,
  style,
  immediate = false,
  children,
}: RevealProps) {
  // Hiện khi mép trên đã lên quá vạch cách đáy màn hình 8% — không phụ thuộc chiều cao khối.
  const [ref, inView] = useInView<HTMLElement>(0, "0px 0px -8% 0px");

  return (
    <Tag
      ref={ref as never}
      className={cn("bt-scroll-reveal", (immediate || inView) && "is-in", className)}
      style={style}
    >
      {children}
    </Tag>
  );
}
