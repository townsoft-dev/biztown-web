import Image from "next/image";
import type { ReactNode } from "react";

import type { RichText } from "@/content/home-types";
import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";

/** In đoạn chữ, phần { kw } tô gradient cam (Figma: v6-kw). */
export function Rich({ text }: { text: RichText }) {
  return (
    <>
      {text.map((part, index) =>
        typeof part === "string" ? (
          part
        ) : (
          <span key={index} className="bt-kw">
            {part.kw}
          </span>
        ),
      )}
    </>
  );
}

/** Tiêu đề H2 căn giữa (Figma: bt-sh). */
export function SectionHead({
  title,
  children,
  className,
}: {
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mx-auto flex max-w-[860px] flex-col items-center gap-[18px] text-center",
        className,
      )}
    >
      <h2 className="bt-h2">{title}</h2>
      {children}
    </Reveal>
  );
}

type IllustrationProps = {
  src: string;
  /** Kích thước khung trong Figma (node). */
  width: number;
  height: number;
  /** Kích thước file export (gồm cả phần bóng đổ tràn ra ngoài khung). */
  exportWidth: number;
  exportHeight: number;
  /** Vị trí góc trên-trái của khung bên trong file export. */
  offsetX: number;
  offsetY: number;
  className?: string;
  priority?: boolean;
};

/**
 * Hình minh hoạ export từ Figma (mockup, thẻ nổi). File export rộng hơn khung vì có bóng đổ,
 * nên đặt ảnh lệch theo offset để khung khớp đúng vị trí design; co giãn theo % khi màn hẹp.
 */
export function Illustration({
  src,
  width,
  height,
  exportWidth,
  exportHeight,
  offsetX,
  offsetY,
  className,
  priority,
}: IllustrationProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none relative w-full select-none", className)}
      style={{ maxWidth: width, aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        alt=""
        width={exportWidth}
        height={exportHeight}
        priority={priority}
        className="absolute h-auto max-w-none"
        style={{
          left: `${(-offsetX / width) * 100}%`,
          top: `${(-offsetY / height) * 100}%`,
          width: `${(exportWidth / width) * 100}%`,
        }}
      />
    </div>
  );
}
