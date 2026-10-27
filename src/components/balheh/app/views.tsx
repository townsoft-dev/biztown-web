"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

import type { BalhehAppCopy, BoardCard, LabelTone } from "@/content/balheh-types";
import { cn } from "@/lib/utils";

import { Av, BxHead, BxIcon, Progress, Status, Typed } from "./app-ui";

/*
 * Màn Board trong cửa sổ Balheh (Figma: Hero / Stage · Chapter 1); Channels, Wiki, Dashboard ở
 * các file *-view.tsx cùng thư mục. Mỗi màn nhận trạng thái
 * demo qua props; giá trị mặc định là màn hình tĩnh đúng như Figma. Phần tử con trỏ demo cần
 * tới có data-demo.
 */

const LABEL_STYLE: Record<LabelTone, string> = {
  purple: "bg-[#ede4fd] text-[#6d28d9]",
  yellow: "bg-[#fdecc8] text-[#a16207]",
  red: "bg-[#fbd5d5] text-[#b91c1c]",
  green: "bg-[#cdeec0] text-[#3f6212]",
};

const COL_STYLE = [
  "bg-[#fdf0d0] shadow-[inset_0_0_0_1px_#f6d68f]",
  "bg-[#e6edf9] shadow-[inset_0_0_0_1px_#c8d6f0]",
  "bg-[#ece0fb] shadow-[inset_0_0_0_1px_#d5bff3]",
];

function Card({
  card,
  demo,
  className,
  style,
}: {
  card: BoardCard;
  demo?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const done = card.progress >= 100;
  return (
    <div
      data-demo={demo}
      className={cn(
        "rounded-[7px] bg-white p-[9px] shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
        className,
      )}
      style={style}
    >
      <div className="mb-1.5 flex items-center gap-1">
        {card.labels.map((label) => (
          <span
            key={label.text}
            className={cn("rounded px-2.5 py-0.5 text-[10px] font-medium", LABEL_STYLE[label.tone])}
          >
            {label.text}
          </span>
        ))}
        {card.alarm && <BxIcon name="alarm" size={13} className="ml-auto text-[#dc2626]" />}
      </div>
      <b className="mb-1.5 block text-[12.5px] font-bold">{card.title}</b>
      <div className="grid grid-cols-[1fr_auto] items-center gap-2">
        <Progress value={card.progress} />
        <Status status={card.status} />
      </div>
      <div className="mt-1.5 flex items-center gap-2 text-[10px] text-[#4b5563]">
        <span
          className={cn(
            "inline-flex items-center gap-0.5",
            done && "rounded-[3px] bg-[#1f5130] px-1 py-px text-white",
          )}
        >
          {card.checks}
          <BxIcon name="check" size={12} />
        </span>
        <span className="inline-flex items-center gap-0.5">
          {card.comments}
          <BxIcon name="cmt" size={12} />
        </span>
        <span className="inline-flex items-center gap-0.5">
          {card.files}
          <BxIcon name="clip" size={12} />
        </span>
        <span className="ml-auto flex">
          {card.people.map((tone, index) => (
            <Av key={index} tone={tone} size={16} />
          ))}
        </span>
      </div>
      {card.due && (
        <span className="mt-1.5 inline-flex items-center gap-1 rounded bg-[#f6b4b4] px-[7px] py-0.5 text-[10px] font-semibold text-[#7f1d1d]">
          <BxIcon name="alarm" size={12} />
          {card.due}
        </span>
      )}
    </div>
  );
}

function AddRow({ label, demo }: { label: string; demo?: string }) {
  return (
    <div
      data-demo={demo}
      className="flex items-center justify-center gap-1 rounded-[6px] bg-white p-[7px] text-[11px] text-[#30343c]"
    >
      <BxIcon name="plus" size={12} />
      {label}
    </div>
  );
}

/** Thẻ demo được kéo sang cột "Đang làm". */
const MOVING = 1;

/**
 * Màn Board (Figma: Chapter=1): 3 cột Kanban. Demo kéo thẻ "Ảnh chụp màn hình" sang "Đang làm"
 * (`drag` → `moved`), rồi gõ một thẻ mới ở cột đầu (`composing` → `added`).
 */
export function BoardView({
  t,
  drag = false,
  moved = false,
  composing = null,
  added = false,
}: {
  t: BalhehAppCopy["board"];
  drag?: boolean;
  moved?: boolean;
  /** Chữ đang gõ vào ô thẻ mới; null = chưa mở ô. */
  composing?: string | null;
  added?: boolean;
}) {
  const colsRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);

  // Đo quãng kéo từ thẻ tới chỗ "Add new card" của cột "Đang làm" (theo khổ gốc, bỏ tỉ lệ thu nhỏ).
  useLayoutEffect(() => {
    const box = colsRef.current;
    if (!drag || !box) return;
    const card = box.querySelector<HTMLElement>('[data-demo="card-move"]');
    const target = box.querySelector<HTMLElement>('[data-demo="add-1"]');
    if (!card || !target) return;
    const a = card.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    const scale = a.width / card.offsetWidth || 1;
    setOffset({ x: (b.left - a.left) / scale, y: (b.top - a.top - 6) / scale });
  }, [drag]);

  const cards = t.cards.map((card, index) =>
    index === MOVING && moved ? { ...card, col: 1 as const, status: "Active" as const } : card,
  );
  // Thẻ chuyển cột thì xuống cuối cột mới.
  const ordered = [...cards.filter((_, i) => i !== MOVING), cards[MOVING]];
  const newCard: BoardCard = {
    col: 0,
    labels: [{ text: "PR", tone: "purple" }],
    title: t.newCard,
    progress: 0,
    status: "Pending",
    checks: "0/0",
    comments: 0,
    files: 0,
    people: ["orange"],
  };

  return (
    <>
      <BxHead title="Brandsite" sub="Boards" />
      <div className="flex shrink-0 items-center gap-1 border-b border-[#e5e7eb] px-4 text-[11px]">
        {(
          [
            ["Front-end Board", "9+"],
            ["Back-end Board", "3"],
            ["Mobile Board", "8"],
          ] as const
        ).map(([name, count], index) => (
          <span
            key={name}
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-[9px] whitespace-nowrap text-[#4b5563]",
              index === 0 && "text-[#1d1f24] shadow-[inset_0_-2px_0_#2556c5]",
            )}
          >
            {name}
            <em className="rounded bg-[#f3b4b4] px-[5px] py-px text-[9.5px] font-bold text-[#9b1c1c] not-italic">
              {count}
            </em>
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-[9px] text-[#4b5563]">
          <BxIcon name="plus" size={12} />
          New board
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="mr-1 flex">
            <Av tone="blue" />
            <Av tone="orange" />
            <Av tone="green" />
            <Av tone="purple" />
            <Av tone="navy" text="+6" className="bg-[#2556c5]" />
          </span>
          {(
            [
              ["filter", "Filter"],
              ["share", "Share"],
              ["gear", "Setting"],
            ] as const
          ).map(([icon, label]) => (
            <span
              key={label}
              className="inline-flex items-center gap-1 rounded-[5px] px-2 py-1 font-medium text-[#2556c5] shadow-[inset_0_0_0_1px_#2556c5]"
            >
              <BxIcon name={icon} size={12} />
              {label}
            </span>
          ))}
        </div>
      </div>
      <div
        ref={colsRef}
        className="grid flex-1 grid-cols-[repeat(3,minmax(190px,1fr))_150px] items-start gap-3 overflow-hidden px-4 py-2.5"
      >
        {t.cols.map((name, col) => {
          const inCol = ordered.filter((card) => card.col === col);
          const count = inCol.length + (col === 0 && added ? 1 : 0);
          return (
            <div key={name} className={cn("grid gap-[7px] rounded-lg p-1.5", COL_STYLE[col])}>
              <div className="flex items-center gap-1.5 rounded-[6px] bg-white px-2 py-1.5">
                <b className="text-[12px]">{name}</b>
                <em className="rounded bg-[#fde68a] px-[5px] text-[10px] font-bold text-[#92400e] not-italic">
                  {count}
                </em>
                <BxIcon name="dots" size={15} className="ml-auto" />
              </div>
              {inCol.map((card) => {
                const isMoving = card === cards[MOVING];
                return (
                  <Card
                    key={card.title}
                    card={card}
                    className={cn(
                      isMoving && moved && "bh-pop",
                      isMoving &&
                        drag &&
                        "relative z-[5] rotate-3 shadow-[0_22px_36px_rgba(0,0,0,0.2)] transition-transform duration-[1100ms] ease-[cubic-bezier(0.45,0.05,0.25,1)]",
                    )}
                    style={
                      isMoving && drag && offset
                        ? { transform: `translate(${offset.x}px, ${offset.y}px) rotate(3deg)` }
                        : undefined
                    }
                    demo={isMoving && !moved ? "card-move" : undefined}
                  />
                );
              })}
              {col === 0 && added && <Card card={newCard} className="bh-pop" />}
              {col === 0 && composing !== null ? (
                <div className="grid gap-1.5 rounded-[7px] bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                  <div
                    data-demo="nc-input"
                    className="min-h-[30px] rounded-[5px] px-2 py-1.5 text-[12px] font-medium shadow-[inset_0_0_0_1.5px_#2556c5]"
                  >
                    <Typed text={composing} caret />
                  </div>
                  <div className="flex items-center gap-2">
                    <b
                      data-demo="nc-add"
                      className="rounded-[5px] bg-[#2556c5] px-3 py-[5px] text-[11px] font-normal text-white"
                    >
                      Add
                    </b>
                    <BxIcon name="x" size={13} />
                  </div>
                </div>
              ) : (
                <AddRow label="Add new card" demo={`add-${col}`} />
              )}
            </div>
          );
        })}
        <div className="flex items-center justify-center gap-1 rounded-lg bg-white p-2.5 text-[11px] text-[#30343c] shadow-[0_1px_3px_rgba(0,0,0,0.08),inset_0_0_0_1px_#e5e7eb]">
          <BxIcon name="plus" size={12} />
          Add new list
        </div>
      </div>
    </>
  );
}
