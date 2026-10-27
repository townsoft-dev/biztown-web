import Image from "next/image";
import type { ReactNode } from "react";

import type { BalhehCheckItem, BalhehFeaturesContent } from "@/content/balheh-types";
import { cn } from "@/lib/utils";

import { Av, BxIcon, bxInter, Mentions } from "./app-ui";
import { FxIcon } from "./fx-icons";

/** Khổ gốc màn chi tiết thẻ: cao hơn <AppWindow> một chút để hộp thẻ hiện đủ như Figma. */
export const CARD_SHOT_H = 641;

/**
 * Màn chi tiết thẻ đang mở (Figma: Panel · Giao việc · cd-pop; file mẫu: vCardDetail). Nền Board
 * bị phủ trắng hoàn toàn trong Figma nên chỉ dựng khung trình duyệt + hộp thẻ. Phần tử có
 * `data-anno="n"` là chỗ chấm chú thích số n trỏ tới.
 */
export function CardDetailShot({ t }: { t: BalhehFeaturesContent["card"] }) {
  return (
    <div
      className={cn(
        bxInter.className,
        "relative w-[1120px] overflow-hidden rounded-[14px] bg-white text-left text-[#1d1f24] shadow-[0_0_0_1px_rgba(35,48,94,0.08),var(--bh-window-shadow)]",
      )}
      style={{ height: CARD_SHOT_H }}
    >
      <div aria-hidden="true" className="flex items-center gap-3 bg-[#e9ebef] px-3 py-2">
        <span className="inline-flex items-center gap-1.5 rounded-t-lg bg-white py-[5px] pr-3.5 pl-2 text-[10.5px] font-semibold">
          <Image src="/images/home/balheh-mark.svg" alt="" width={16} height={14} />
          BALHEH
        </span>
        <span className="max-w-[420px] flex-1 rounded-full bg-white px-3 py-1 text-[11px] text-[#6b7280]">
          balheh.com
        </span>
      </div>

      {/* Hộp thẻ (cd-pop), sát đáy cửa sổ như Figma. */}
      <div className="absolute top-[63px] bottom-0 left-[124px] w-[864px] rounded-t-[10px] bg-white px-[18px] pt-3.5 text-[11px] shadow-[0_20px_60px_rgba(35,48,94,0.25)]">
        <div className="flex items-center gap-2.5 border-b border-[#e5e7eb] pb-2.5">
          <span
            data-anno="1"
            className="rounded-[5px] bg-[#eef0f4] px-2.5 py-1 text-[12px] font-semibold"
          >
            In Progress
          </span>
          <span className="ml-auto flex items-center gap-3.5 text-[#30343c]">
            <FxIcon name="eye" size={15} />
            <BxIcon name="dots" size={15} />
            <BxIcon name="x" size={15} />
          </span>
        </div>
        <h5 className="mt-3 text-[14px] font-bold">{t.title}</h5>

        <div className="mt-3 grid grid-cols-[1fr_368px] gap-4">
          {/* Cột trái: thông tin thẻ + checklist. */}
          <div className="grid content-start gap-2.5">
            <div
              data-anno="2"
              className="grid grid-cols-[1.15fr_1fr_1fr_0.85fr] rounded-[7px] text-[9px] shadow-[inset_0_0_0_1px_#c7cbd3]"
            >
              <GridCell label="LABELS">
                <span className="rounded bg-[#fdecc8] px-2 py-0.5 text-[10px] text-[#a16207]">
                  Web
                </span>
                <span className="rounded bg-[#cdeec0] px-2 py-0.5 text-[10px] text-[#3f6212]">
                  Dev
                </span>
                <Plus />
              </GridCell>
              <GridCell label="MEMBERS">
                <span className="flex">
                  <Av tone="green" size={18} />
                  <Av tone="navy" size={18} />
                  <Av tone="blue" size={18} />
                  <Av tone="purple" size={18} />
                </span>
                <span className="ml-auto text-[13px] text-[#4b5563]">+</span>
              </GridCell>
              <GridCell label="PROGRESS">
                <span className="h-1 flex-1 overflow-hidden rounded bg-[#e5e7eb]">
                  <i className="block h-full w-[49%] rounded bg-[#f5b301]" />
                </span>
                <b className="text-[10px] text-[#d49b00]">49%</b>
              </GridCell>
              <GridCell label="STATUS" last>
                <span className="grid gap-1">
                  <em className="rounded-[5px] bg-[#fdeeb5] px-2 py-0.5 text-[10px] font-semibold text-[#b8860b] not-italic">
                    Active ▾
                  </em>
                  <em className="rounded-[5px] bg-[#f3b4b4] px-2 py-0.5 text-[10px] font-semibold text-[#9b1c1c] not-italic">
                    Overdue
                  </em>
                </span>
              </GridCell>
            </div>

            <div data-anno="3" className="flex flex-wrap gap-1.5 text-[10.5px] text-[#2556c5]">
              <Chip icon={<BxIcon name="doc" size={12} />}>Description</Chip>
              <Chip icon={<BxIcon name="alarm" size={12} />}>Due date</Chip>
              <Chip icon={<BxIcon name="clip" size={12} />}>Attachment (11)</Chip>
              <Chip icon={<BxIcon name="cmt" size={12} />} dot>
                Comment (20)
              </Chip>
              <Chip icon={<FxIcon name="activity" size={12} />}>Activity</Chip>
            </div>

            <Dashed>New checklist</Dashed>

            <div data-anno="4">
              <Checklist
                name={t.checklist1}
                items={t.tasks1}
                footer={<Dashed inner>New task</Dashed>}
              />
            </div>
            <Checklist
              name={t.checklist2}
              items={t.tasks2}
              footer={
                <div className="m-1.5 flex items-center gap-2 rounded-[5px] py-1 pr-1.5 pl-2 text-[10.5px] text-[#9ca3af] shadow-[inset_0_0_0_1px_#c7cbd3]">
                  <span className="flex-1">{t.taskPlaceholder}</span>
                  <b className="rounded-[4px] bg-[#2556c5] px-2.5 py-1 text-white">Add</b>
                  <BxIcon name="x" size={13} className="text-[#6b7280]" />
                </div>
              }
            />
          </div>

          {/* Cột phải: việc đang mở. */}
          <div className="grid content-start gap-2 border-l border-[#e5e7eb] pl-4">
            <b className="border-l-[3px] border-[#2556c5] pl-2 text-[12.5px] leading-[1.3]">
              Task Detail
            </b>
            <h6 className="text-[14px] font-bold">{t.task}</h6>
            <div
              data-anno="6"
              className="grid grid-cols-[0.9fr_1.05fr_0.75fr_1.3fr] rounded-[7px] text-[9px] shadow-[inset_0_0_0_1px_#c7cbd3]"
            >
              <GridCell label="PRIORITY">
                <em className="rounded-full bg-[#fde0e0] px-2 py-0.5 text-[10px] font-semibold text-[#dc2626] not-italic">
                  High ▾
                </em>
              </GridCell>
              <GridCell label="DIFFCULTY">
                <em className="rounded-full bg-[#23305e] px-2 py-0.5 text-[10px] font-semibold text-white not-italic">
                  Complex ▾
                </em>
              </GridCell>
              <GridCell label="MEMBERS">
                <Av tone="orange" size={18} ring={false} />
              </GridCell>
              <GridCell label="DUE DATE" last>
                <em className="inline-flex items-center gap-1 rounded-[4px] px-1.5 py-0.5 text-[10px] whitespace-nowrap not-italic shadow-[inset_0_0_0_1px_#1d1f24]">
                  <FxIcon name="clock" size={11} />
                  Oct 15, 12:00
                </em>
              </GridCell>
            </div>
            <div className="rounded-[7px] p-2.5 shadow-[inset_0_0_0_1px_#e5e7eb]">
              <small className="text-[9px] font-semibold text-[#4b5563]">DESCRIPTION</small>
              <p className="mt-1 text-[10.5px] leading-[1.45] text-[#30343c]">{t.desc}</p>
              <b className="mt-1 ml-auto block w-max rounded-[4px] bg-[#2556c5] px-2.5 py-1 text-[10px] text-white">
                Edit
              </b>
            </div>
            <small className="mt-1 text-[9px] font-semibold text-[#4b5563]">ATTACHMENT</small>
            <Dashed>Add</Dashed>
            <div className="flex items-center gap-2.5">
              <span className="h-[30px] w-[50px] rounded-[4px] bg-[linear-gradient(135deg,#7dd3fc,#fbbf24)]" />
              <span className="min-w-0 flex-1">
                <b className="block truncate text-[10.5px]">{t.file}</b>
                <small className="text-[9px] text-[#8a8f99]">{t.added}</small>
              </span>
              <BxIcon name="right" size={13} className="text-[#6b7280]" />
              <BxIcon name="dots" size={13} className="text-[#6b7280]" />
            </div>
            <small className="mt-1 text-[9px] font-semibold text-[#4b5563]">COMMENT</small>
            <div className="rounded-[5px] px-2 py-1.5 text-[10px] text-[#9ca3af] shadow-[inset_0_0_0_1px_#e5e7eb]">
              {t.writeComment}
            </div>
            <div className="mt-1 grid grid-cols-[26px_1fr] gap-2">
              <Av tone="orange" text="HU" size={26} ring={false} />
              <div>
                <b className="text-[10.5px]">
                  Nguyen Thuy Huong{" "}
                  <small className="font-normal text-[#9ca3af]">Apr 17, 2026, 7:50AM</small>
                </b>
                <div className="mt-1 flex items-center gap-2">
                  <p className="min-w-0 flex-1 truncate rounded-[5px] px-2 py-1 text-[10.5px] text-[#30343c] shadow-[inset_0_0_0_1px_#e5e7eb]">
                    <Mentions text={t.comment} />
                  </p>
                  <span data-anno="7" className="flex gap-1.5 text-[#6b7280]">
                    <BxIcon name="smile" size={13} />
                    <BxIcon name="fwd" size={13} />
                    <FxIcon name="trash" size={13} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu "…" của thẻ (cd-menu): đang chọn Watch. */}
      <div
        data-anno="5"
        className="absolute top-[100px] left-[1000px] grid w-[100px] gap-0.5 rounded-[7px] bg-white p-1 text-[10px] text-[#4b5563] shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
      >
        {["Join", "Watch", "Move", "Share", "Archive"].map((item, index) => (
          <span
            key={item}
            className={cn(
              "flex items-center rounded-[4px] px-2 py-1.5",
              index === 1 && "bg-[#e8eefc] font-semibold text-[#1d1f24]",
            )}
          >
            {item}
            {index < 2 && <span className="ml-auto text-[#2556c5]">✓</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

function GridCell({
  label,
  last,
  children,
}: {
  label: string;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={cn("grid content-start gap-1.5 p-2", !last && "border-r border-[#e5e7eb]")}>
      <small className="font-semibold text-[#4b5563]">{label}</small>
      <div className="flex min-h-[18px] items-center gap-1.5">{children}</div>
    </div>
  );
}

function Plus() {
  return (
    <span className="grid size-4 place-items-center rounded-[3px] text-[#4b5563] shadow-[inset_0_0_0_1px_#9ca3af]">
      <BxIcon name="plus" size={10} />
    </span>
  );
}

function Chip({ icon, dot, children }: { icon: ReactNode; dot?: boolean; children: ReactNode }) {
  return (
    <span className="relative inline-flex items-center gap-1 rounded-[5px] px-2 py-1 shadow-[inset_0_0_0_1px_#2556c5]">
      {icon}
      {children}
      {dot && <i className="absolute -top-1 -right-1 size-[7px] rounded-full bg-[#f87171]" />}
    </span>
  );
}

function Dashed({ inner, children }: { inner?: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1 rounded-[5px] border border-dashed border-[#c7cbd3] py-1 text-[10.5px] text-[#4b5563]",
        inner && "m-1.5 justify-start pl-2",
      )}
    >
      <BxIcon name="plus" size={11} />
      {children}
    </div>
  );
}

function Checklist({
  name,
  items,
  footer,
}: {
  name: string;
  items: BalhehCheckItem[];
  footer: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[7px] shadow-[inset_0_0_0_1px_#9ca3af]">
      <div className="flex items-center gap-2 border-b border-[#e5e7eb] px-2 py-1.5 text-[10.5px]">
        <b className="flex-1">{name}</b>
        <span>5/12</span>
        <span className="h-1 w-[70px] overflow-hidden rounded bg-[#e5e7eb]">
          <i className="block h-full w-[49%] bg-[#f5b301]" />
        </span>
        <b className="text-[#d49b00]">49%</b>
        <BxIcon name="down" size={13} />
      </div>
      {items.map((item) => (
        <div
          key={item.text}
          className={cn(
            "flex items-center gap-2 px-2 py-[5px] text-[11px]",
            item.mark === "selected" && "bg-[#eef2fb]",
          )}
        >
          <i
            className={cn(
              "size-3 shrink-0 rounded-[3px] border-[1.5px]",
              item.done ? "border-[#16a34a]" : "border-[#9ca3af]",
            )}
          />
          <span className={cn("flex-1", item.done && "text-[#6b7280] line-through")}>
            {item.text}
          </span>
          {item.mark === "alarm" && <BxIcon name="alarm" size={13} className="text-[#dc2626]" />}
          <FxIcon name="trash" size={13} className="text-[#30343c]" />
        </div>
      ))}
      {footer}
    </div>
  );
}
