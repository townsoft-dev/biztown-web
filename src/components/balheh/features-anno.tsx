"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Chú thích nằm cột trái hay phải của màn hình. */
export type AnnoSide = "l" | "r";

type Layout = {
  /** Toạ độ chấm (tâm) trong khung, theo px màn hình. */
  pins: ({ x: number; y: number } | null)[];
  /** Vị trí top của nhãn trong cột của nó; null = chưa đo / không có điểm neo. */
  tops: (number | null)[];
  /** Đường nối nhãn → chấm (thuộc tính d của <path>). */
  lines: string[];
  /** Màn rộng: có cột nhãn hai bên. */
  wide: boolean;
};

const EMPTY: Layout = { pins: [], tops: [], lines: [], wide: false };

/** Khoảng cách tối thiểu giữa hai nhãn cùng cột (file mẫu: layoutAnno). */
const LABEL_GAP = 12;

/**
 * Màn hình Balheh có chú thích hai bên (Figma: Annotation n + Connector n + Pin n; file mẫu:
 * layoutAnno). Màn hình dựng ở khổ gốc `width × height` rồi thu nhỏ cho vừa cột giữa (tối đa
 * `maxScale`, như ScaledStage ở hero). Mỗi chú thích số n trỏ tới phần tử `data-anno="n"` trong
 * màn hình: đo vị trí thật rồi đặt chấm, nhãn và đường nối, nên chữ dài/ngắn theo ngôn ngữ vẫn
 * khớp. Dưới lg: bỏ cột nhãn, chấm có số và danh sách chú thích xếp dưới màn hình.
 */
export function AnnotatedShot({
  width,
  height,
  maxScale = 0.75,
  sides,
  callouts,
  children,
}: {
  width: number;
  height: number;
  maxScale?: number;
  sides: AnnoSide[];
  callouts: string[];
  children: ReactNode;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<Record<AnnoSide, HTMLDivElement | null>>({ l: null, r: null });
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scale, setScale] = useState(maxScale);
  const [layout, setLayout] = useState<Layout>(EMPTY);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const stage = stageRef.current;
    if (!box || !stage) return;

    const measure = () => {
      const next = Math.min(maxScale, stage.clientWidth / width) || maxScale;
      setScale(next);
      const B = box.getBoundingClientRect();
      if (!B.width) return;

      const pins = callouts.map((_, index) => {
        const target = stage.querySelector(`[data-anno="${index + 1}"]`);
        if (!target) return null;
        const r = target.getBoundingClientRect();
        return {
          x: (sides[index] === "l" ? r.left : r.right) - B.left,
          y: r.top - B.top + Math.min(r.height / 2, 12),
        };
      });

      const tops: (number | null)[] = callouts.map(() => null);
      const lines: string[] = [];
      const left = colRefs.current.l;
      const wide = !!left && left.offsetParent !== null;
      if (wide) {
        (["l", "r"] as const).forEach((side) => {
          const col = colRefs.current[side];
          if (!col) return;
          const C = col.getBoundingClientRect();
          const colTop = C.top - B.top;
          const edge = (side === "l" ? C.right : C.left) - B.left;
          let last = -Infinity;
          callouts
            .map((_, index) => index)
            .filter((index) => sides[index] === side && pins[index])
            .sort((a, b) => pins[a]!.y - pins[b]!.y)
            .forEach((index) => {
              const pin = pins[index]!;
              const h = labelRefs.current[index]?.offsetHeight ?? 0;
              const top = Math.max(pin.y - colTop - h / 2, last + LABEL_GAP, 0);
              last = top + h;
              tops[index] = top;
              lines.push(`M${edge} ${colTop + top + h / 2} L${pin.x} ${pin.y}`);
            });
        });
      }
      setLayout({ pins, tops, lines, wide });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    // Font Inter/Lexend tải xong làm chữ đổi cỡ: đo lại.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => observer.disconnect();
  }, [callouts, sides, width, maxScale]);

  const label = (index: number) => (
    <div
      key={index}
      ref={(node) => {
        labelRefs.current[index] = node;
      }}
      className={cn(
        "absolute inset-x-0 flex items-start gap-2 rounded-[10px] border border-line bg-card px-2.5 py-2 shadow-[0_6px_16px_var(--shadow-soft)] transition-opacity duration-300",
        layout.tops[index] == null ? "opacity-0" : "opacity-100",
      )}
      style={{ top: layout.tops[index] ?? 0 }}
    >
      <Num n={index + 1} />
      <span className="min-w-0 flex-1 text-[13.5px] leading-[18px] font-medium text-ink">
        {callouts[index]}
      </span>
    </div>
  );

  const column = (side: AnnoSide) => (
    <div
      ref={(node) => {
        colRefs.current[side] = node;
      }}
      className="relative max-lg:hidden"
    >
      {callouts.map((_, index) => (sides[index] === side ? label(index) : null))}
    </div>
  );

  return (
    <div ref={boxRef} className="relative">
      <div className="lg:grid lg:grid-cols-[164px_minmax(0,1fr)_164px] lg:gap-5 xl:grid-cols-[200px_minmax(0,1fr)_200px] xl:gap-7">
        {column("l")}
        <div ref={stageRef} className="relative min-w-0" style={{ height: height * scale }}>
          <div
            className="absolute top-0 left-1/2 origin-top"
            style={{ width, transform: `translateX(-50%) scale(${scale})` }}
          >
            {children}
          </div>
        </div>
        {column("r")}
      </div>

      {layout.wide && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
        >
          {layout.lines.map((d) => (
            <path key={d} d={d} fill="none" stroke="var(--accent)" strokeWidth={1.5} />
          ))}
        </svg>
      )}
      {layout.pins.map((pin, index) =>
        pin ? (
          <span
            key={index}
            aria-hidden="true"
            className="absolute z-[2] grid size-[18px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-[10px] font-bold text-on-accent shadow-[0_0_0_3px_#fff,0_4px_10px_rgba(0,0,0,0.18)] lg:size-3.5 lg:text-[0px]"
            style={{ left: pin.x, top: pin.y }}
          >
            {index + 1}
          </span>
        ) : null,
      )}

      <ol className="mt-5 grid gap-2 sm:grid-cols-2 lg:hidden">
        {callouts.map((text, index) => (
          <li key={index} className="flex items-center gap-2.5 text-[15px] leading-[1.4] text-ink">
            <Num n={index + 1} />
            {text}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Num({ n }: { n: number }) {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] leading-none font-bold text-on-accent">
      {n}
    </span>
  );
}
