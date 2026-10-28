"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

import type { Note } from "@/content/nhalo-types";
import { cn } from "@/lib/utils";

export type AnnoSide = "left" | "right";

type Pin = { x: number; y: number; visible: boolean };

type Placement = {
  /** Toạ độ (tâm) chấm số trong khung điện thoại; null = chưa đo / không có mốc. */
  pins: (Pin | null)[];
  /** top của ô chú thích trong cột của nó. */
  tops: (number | null)[];
  /** Đường nối ô chú thích → chấm và chấm tròn ở đầu ô, toạ độ trong khung ngoài. */
  lines: { d: string; x: number; y: number }[];
};

const EMPTY: Placement = { pins: [], tops: [], lines: [] };

/** Khoảng cách tối thiểu giữa hai ô chú thích cùng cột (file mẫu: layoutAnno). */
const LABEL_GAP = 10;
/** Chấm số nằm lùi vào trong cạnh điện thoại 5px; ẩn khi mốc cuộn sát mép vùng cuộn 6px. */
const PIN_INSET = 5;
const EDGE = 6;

/**
 * Màn hình ứng dụng có chú thích đánh số hai bên (Figma: Annotated screen; file mẫu: annoBlock +
 * layoutAnno). Người xem tự kéo lên xuống trong điện thoại (Phone scroll); chú thích số n trỏ tới
 * phần tử `data-anno="n"` trong màn hình: đo vị trí thật rồi đặt chấm, ô chú thích và đường nối,
 * mốc nào cuộn khuất thì ẩn chấm và ô của nó. Màn hẹp: bỏ cột chú thích và đường nối, vẫn giữ
 * chấm số trên điện thoại, chú thích thành danh sách đánh số bên dưới.
 */
export function AnnotatedScreen({
  sides,
  callouts,
  hint,
  phone,
}: {
  sides: AnnoSide[];
  callouts: Note[];
  /** Dòng nhắc dưới điện thoại: kéo trong màn hình để xem thêm. */
  hint: string;
  phone: ReactNode;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const shotRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<Record<AnnoSide, HTMLDivElement | null>>({ left: null, right: null });
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [placement, setPlacement] = useState<Placement>(EMPTY);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const shot = shotRef.current;
    if (!box || !shot) return;
    // "screen": cả màn hình cuộn (Phone đánh dấu data-scroller); "body": chỉ phần thân cuộn.
    const scroller = shot.querySelector<HTMLElement>("[data-scroller], .app-body");

    const measure = () => {
      const B = box.getBoundingClientRect();
      const S = shot.getBoundingClientRect();
      if (!B.width || !S.width) return;
      const V = scroller?.getBoundingClientRect() ?? S;

      const pins = callouts.map((_, index): Pin | null => {
        const target = shot.querySelector(`[data-anno="${index + 1}"]`);
        if (!target) return null;
        const r = target.getBoundingClientRect();
        const cy = r.top + Math.min(r.height / 2, 14);
        const x = sides[index] === "left" ? PIN_INSET : S.width - PIN_INSET;
        const y = Math.min(Math.max(cy, V.top + EDGE), V.bottom - EDGE) - S.top;
        return { x, y, visible: cy > V.top + EDGE && cy < V.bottom - EDGE };
      });

      const tops: (number | null)[] = callouts.map(() => null);
      const lines: Placement["lines"] = [];
      (["left", "right"] as const).forEach((side) => {
        const col = colRefs.current[side];
        // Cột chú thích ẩn ở màn hẹp (offsetParent null) thì chỉ đặt chấm.
        if (!col || col.offsetParent === null) return;
        const C = col.getBoundingClientRect();
        const items = callouts
          .map((_, index) => index)
          .filter((index) => sides[index] === side && pins[index]?.visible)
          .sort((a, b) => pins[a]!.y - pins[b]!.y);

        // Xếp ô theo thứ tự chấm, không chồng nhau; tràn quá đáy điện thoại thì đẩy cả cột lên.
        let next = S.top - C.top;
        items.forEach((index) => {
          const h = labelRefs.current[index]?.offsetHeight ?? 0;
          const top = Math.max(next, pins[index]!.y + S.top - C.top - h / 2);
          tops[index] = top;
          next = top + h + LABEL_GAP;
        });
        const over = next - LABEL_GAP - (S.bottom - C.top);
        if (over > 0) items.forEach((index) => (tops[index] = tops[index]! - over));

        items.forEach((index) => {
          const label = labelRefs.current[index];
          if (!label) return;
          const pin = pins[index]!;
          const lx =
            (side === "left"
              ? C.left + label.offsetLeft + label.offsetWidth
              : C.left + label.offsetLeft) - B.left;
          const ly = C.top - B.top + tops[index]! + label.offsetHeight / 2;
          const px = S.left - B.left + pin.x;
          const py = S.top - B.top + pin.y;
          const d = (px - lx) / 2;
          lines.push({
            d: `M${lx} ${ly}C${lx + d} ${ly} ${px - d} ${py} ${px} ${py}`,
            x: lx,
            y: ly,
          });
        });
      });

      setPlacement({ pins, tops, lines });
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    scroller?.addEventListener("scroll", onScroll, { passive: true });
    // Font tải xong làm chữ đổi cỡ: đo lại.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      observer.disconnect();
      scroller?.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [callouts, sides]);

  const column = (side: AnnoSide) => (
    <div
      ref={(node) => {
        colRefs.current[side] = node;
      }}
      className="relative hidden self-stretch justify-self-stretch min-[75rem]:block"
    >
      {callouts.map((note, index) =>
        sides[index] === side ? (
          <div
            key={index}
            ref={(node) => {
              labelRefs.current[index] = node;
            }}
            // Figma: ô chú thích rộng 279px, cách đầu đường nối 12px.
            className={cn(
              "absolute w-[279px] max-w-[calc(100%-12px)] transition-opacity duration-300 motion-reduce:transition-none",
              side === "left" ? "right-3" : "left-3",
              placement.tops[index] == null ? "pointer-events-none opacity-0" : "opacity-100",
            )}
            style={{ top: placement.tops[index] ?? 0 }}
          >
            <Callout number={index + 1} note={note} />
          </div>
        ) : null,
      )}
    </div>
  );

  return (
    <div
      ref={boxRef}
      className="relative mx-auto grid w-full max-w-[1100px] justify-items-center gap-8 min-[75rem]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] min-[75rem]:items-start min-[75rem]:gap-14"
    >
      {column("left")}

      <div className="flex flex-col items-center">
        <div ref={shotRef} className="relative">
          {phone}
          {placement.pins.map((pin, index) =>
            pin ? (
              <span
                key={index}
                aria-hidden="true"
                className={cn(
                  "absolute z-[2] flex size-[22px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-[11.5px] leading-none font-bold text-on-accent shadow-[0_0_0_3px_rgba(255,255,255,0.95),0_4px_10px_rgba(0,0,0,0.18)] transition-opacity duration-300 motion-reduce:transition-none",
                  pin.visible ? "opacity-100" : "opacity-0",
                )}
                style={{ left: pin.x, top: pin.y }}
              >
                {index + 1}
              </span>
            ) : null,
          )}
        </div>
        <p className="mt-3 text-center text-[13px] text-ink-muted">
          <span aria-hidden="true">↕ </span>
          {hint}
        </p>
      </div>

      {column("right")}

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] hidden size-full overflow-visible min-[75rem]:block"
      >
        {placement.lines.map((line) => (
          <g key={line.d}>
            <path d={line.d} fill="none" stroke="var(--accent)" strokeWidth={1.6} />
            <circle cx={line.x} cy={line.y} r={3} fill="var(--accent)" />
          </g>
        ))}
      </svg>

      <ol className="grid w-full max-w-[560px] gap-3 min-[75rem]:hidden">
        {callouts.map((note, index) => (
          <li key={note.title}>
            <Callout number={index + 1} note={note} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function Callout({ number, note }: { number: number; note: Note }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-line bg-card p-3 text-[14px] shadow-[0_12px_32px_var(--shadow-navy)]">
      <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-accent text-[12px] leading-none font-semibold text-on-accent">
        {number}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <span className="font-semibold text-ink">{note.title}</span>
        <span className="leading-[22.4px] text-ink-muted">{note.desc}</span>
      </span>
    </div>
  );
}
