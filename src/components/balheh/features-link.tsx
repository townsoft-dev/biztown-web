"use client";

import { useRef, useState } from "react";

import type { BalhehAppCopy, BalhehFeaturesContent } from "@/content/balheh-types";
import { cn } from "@/lib/utils";

import { Av, BxIcon, bxInter, Mentions } from "./app/app-ui";
import { FxIcon } from "./app/fx-icons";

/** Khung một mảnh giao diện Balheh (chat / thẻ / wiki) — nền trắng như sản phẩm thật. */
const PANEL =
  "overflow-hidden rounded-[12px] bg-white text-left text-[#1d1f24] shadow-[0_20px_40px_rgba(35,48,94,0.14)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.35)]";

/**
 * Bước "Kết nối" (Figma: Step=Kết nối · 1/2/3/Hoàn tất; file mẫu: stepsHTML + xlStage): bấm
 * lần lượt ba nút để biến tin nhắn thành việc, gắn trang wiki vào thẻ, mở thread từ thẻ; ba
 * mảnh giao diện bên phải đổi theo. `onInteract` báo cho section dừng tự chuyển bước.
 */
export function LinkStage({
  content,
  card,
  app,
  onInteract,
}: {
  content: BalhehFeaturesContent["link"];
  card: BalhehFeaturesContent["card"];
  app: BalhehAppCopy;
  onInteract: () => void;
}) {
  // Số bước đã làm (0–3).
  const [done, setDone] = useState(0);
  const firstRef = useRef<HTMLButtonElement>(null);
  const chat = app.chat;
  // Tin của Lan (@Minh @Hà …) trong dữ liệu chat mẫu của hero.
  const lan = chat.messages[1];
  const taskLabel = `${content.taskId}: ${content.newTask}`;
  const wikiBase = app.wiki.crumb.split(" / ")[0];

  function act(index: number) {
    onInteract();
    if (index === done) setDone(index + 1);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,513px)_minmax(0,1fr)] lg:gap-14">
      <div>
        <ol aria-label={content.stepsLabel} className="grid gap-3">
          {content.steps.map((step, index) => {
            const isDone = index < done;
            const isNext = index === done;
            return (
              <li
                key={step.title}
                className={cn(
                  "grid grid-cols-[44px_1fr] gap-x-4 rounded-[24px] bg-card p-[18px] transition-[border-color,box-shadow] duration-300",
                  isNext
                    ? "border-2 border-accent shadow-[0_18px_18px_rgba(166,95,0,0.12)]"
                    : "border border-line p-[19px]",
                )}
              >
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full text-[16px] font-bold transition-colors",
                    isDone && "bg-ink text-page",
                    isNext && "bg-accent text-on-accent",
                    !isDone && !isNext && "border-2 border-line text-ink-muted",
                  )}
                >
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h4 className="mt-[3px] text-[19px] leading-[30.4px] font-semibold tracking-[-0.19px] text-ink">
                    {step.title}
                  </h4>
                  <p className="mt-0.5 text-[15px] leading-[24px] text-pretty text-ink-muted">
                    {step.desc}
                  </p>
                  <button
                    ref={index === 0 ? firstRef : undefined}
                    type="button"
                    onClick={() => act(index)}
                    disabled={isDone}
                    aria-disabled={!isDone && !isNext ? true : undefined}
                    className={cn(
                      "mt-3.5 inline-flex h-10 items-center rounded-full px-[18px] text-[14px] font-semibold transition-colors",
                      isDone && "bg-positive-bg text-positive",
                      isNext &&
                        "border border-ink text-ink hover:border-accent hover:bg-accent hover:text-on-accent",
                      !isDone &&
                        !isNext &&
                        "pointer-events-none border border-ink text-ink opacity-45",
                    )}
                  >
                    {isDone ? step.done : step.action}
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
        {done >= 3 && (
          <button
            type="button"
            onClick={() => {
              onInteract();
              setDone(0);
              firstRef.current?.focus();
            }}
            className="mt-[30px] text-[15px] font-semibold text-accent-text underline underline-offset-4"
          >
            {content.reset}
          </button>
        )}
      </div>

      <div aria-live="polite" className="grid content-start gap-4">
        <div className={cn(bxInter.className, "grid items-start gap-[15px] sm:grid-cols-2")}>
          {/* Kênh chat: tin nhắn của Minh. */}
          <div className={cn(PANEL, "flex flex-col")}>
            <div className="flex items-center gap-1.5 border-b border-[#e5e7eb] px-3 py-2.5 text-[12.5px]">
              <b className="inline-flex items-center gap-1">
                <BxIcon name="hash" size={14} />
                {chat.channels[0].name}
              </b>
              <BxIcon name="right" size={13} />
              <b className="truncate">{chat.thread}</b>
            </div>
            <div className={cn("grid content-start gap-2.5 p-2", done === 0 && "min-h-[248px]")}>
              <div className="grid grid-cols-[28px_1fr] gap-2 px-1.5 pt-1">
                <Av tone="green" text="LA" size={28} ring={false} />
                <div>
                  <Who name="Lan" time="09:12" />
                  {lan.text && (
                    <p className="mt-0.5 text-[11.5px] text-[#30343c]">
                      <Mentions text={lan.text} />
                    </p>
                  )}
                </div>
              </div>
              <div className="relative grid grid-cols-[28px_1fr] gap-2 rounded-[6px] bg-[#f1f3f6] p-1.5">
                <Av tone="purple" text="MI" size={28} ring={false} />
                <div className="min-w-0">
                  <Who name="Minh" time="09:15" />
                  <p className="mt-0.5 text-[11.5px] text-[#30343c]">{content.msg}</p>
                  {done >= 1 && (
                    <span className="bh-pop mt-1.5 inline-flex items-center gap-[5px] rounded bg-[#dcfce7] px-2 py-1 text-[10.5px] text-[#166534]">
                      <BxIcon name="check" size={12} />
                      {taskLabel}
                    </span>
                  )}
                  {done >= 3 && (
                    <span className="bh-pop mt-1.5 flex items-center gap-[5px] text-[10.5px] font-semibold text-[#2556c5]">
                      <BxIcon name="thread" size={12} />
                      <span className="truncate">Thread · {content.newTask}</span>
                      <span className="ml-1.5 font-normal text-[#6b7280]">{content.replies}</span>
                    </span>
                  )}
                </div>
                {done === 0 && (
                  <>
                    <div className="absolute -top-2.5 right-4 flex gap-2 rounded-[6px] bg-white px-2 py-[5px] text-[#6b7280] shadow-[0_2px_4px_rgba(0,0,0,0.12)]">
                      <BxIcon name="smile" size={13} />
                      <BxIcon name="cmt" size={13} />
                      <BxIcon name="fwd" size={13} />
                      <BxIcon name="dots" size={13} />
                    </div>
                    <div className="absolute top-5 right-4 z-[2] grid w-[138px] rounded-[7px] bg-white p-1 text-[10.5px] shadow-[0_8px_12px_rgba(0,0,0,0.14)]">
                      {chat.hover.map((item, k) => (
                        <span
                          key={item}
                          className={cn(
                            "rounded-[5px] px-2 py-1.5 text-[#4b5563]",
                            k === 1 && "bg-[#e8eefc] font-semibold text-[#2556c5]",
                            k === 4 && "text-[#dc2626]",
                          )}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="mx-3 mt-auto mb-3 flex items-center gap-2 rounded-[7px] py-[6px] pr-[6px] pl-3 text-[11.5px] text-[#8a8f99] shadow-[inset_0_0_0_1px_#c7cbd3]">
              <span className="flex-1">Type a message</span>
              <BxIcon name="smile" size={15} />
              <b className="inline-flex items-center gap-1 rounded-[5px] bg-[#2556c5] px-2.5 py-[5px] text-[11px] text-white">
                <BxIcon name="send" size={12} />
                Send
              </b>
            </div>
          </div>

          <div className="grid gap-3">
            {/* Thẻ việc. */}
            <div className={cn(PANEL, "p-3.5")}>
              <div className="flex items-center gap-3 border-b border-[#e5e7eb] pb-2">
                <span className="rounded-[5px] bg-[#e8eefc] px-2.5 py-1 text-[12px] font-semibold">
                  In Progress
                </span>
                <FxIcon name="eye" size={14} className="ml-auto" />
                <BxIcon name="x" size={14} />
              </div>
              <b className="mt-3 block text-[14px]">{card.title}</b>
              <div className="mt-2.5 flex flex-wrap gap-1.5 text-[10.5px] font-medium text-[#2556c5]">
                <CardButton icon="doc">Description</CardButton>
                <CardButton icon="clip">Attachment (11)</CardButton>
                {done >= 3 && (
                  <CardButton icon="thread" className="bh-pop bg-[#e8eefc]">
                    Thread (1)
                  </CardButton>
                )}
              </div>
              <div className="mt-2.5 overflow-hidden rounded-[7px] shadow-[inset_0_0_0_1px_#c7cbd3]">
                <div className="flex items-center gap-2 border-b border-[#e5e7eb] px-2 py-[7px] text-[10.5px]">
                  <b className="flex-1">{card.checklist1}</b>
                  <span>{done >= 1 ? "2/5" : "2/4"}</span>
                  <span className="h-1 w-[50px] overflow-hidden rounded bg-[#e5e7eb]">
                    <i className="block h-full w-1/2 bg-[#f5b301]" />
                  </span>
                  <b className="text-[#d49b00]">50%</b>
                </div>
                {card.tasks1.slice(0, 2).map((item) => (
                  <CheckRow key={item.text} text={item.text} done />
                ))}
                {done >= 1 && (
                  <div className="bh-pop flex items-center gap-2 bg-[#eef2fb] px-2 py-1.5 text-[11px]">
                    <i className="size-3 shrink-0 rounded-[3px] border-[1.5px] border-[#9ca3af]" />
                    <span className="min-w-0 truncate">{content.newTask}</span>
                    <em className="inline-flex shrink-0 items-center gap-1 rounded bg-[#f3e8ff] px-1.5 py-px text-[9.5px] text-[#7c3aed] not-italic">
                      <BxIcon name="cmt" size={10} />
                      {content.from}
                    </em>
                    <FxIcon name="trash" size={13} className="ml-auto" />
                  </div>
                )}
              </div>
              {done >= 2 && (
                <div className="bh-pop mt-3">
                  <small className="text-[9.5px] font-bold text-[#4b5563] uppercase">
                    {content.docs}
                  </small>
                  <span className="mt-1.5 flex items-center gap-1.5 rounded-[5px] bg-[#f6f7f9] px-2 py-1.5 text-[11px] text-[#2556c5]">
                    <BxIcon name="doc" size={13} />
                    {content.page}
                    <em className="ml-auto text-[9.5px] text-[#6b7280] not-italic">Wiki</em>
                  </span>
                </div>
              )}
            </div>

            {/* Trang wiki. */}
            <div className={cn(PANEL, "p-3.5")}>
              <small className="text-[10px] text-[#6b7280]">
                {wikiBase} / {content.page}
              </small>
              <b className="mt-1 block text-[17px] tracking-[-0.17px]">{content.page}</b>
              <i className="mt-1.5 block h-[7px] w-[88%] rounded bg-[#eef0f4]" />
              <i className="mt-1.5 block h-[7px] w-[68%] rounded bg-[#eef0f4]" />
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11.5px]">
                {content.rel}
                {done >= 2 ? (
                  <span className="bh-pop inline-flex items-center gap-[5px] rounded bg-[#e8eefc] px-2 py-1 text-[10.5px] text-[#1e3a8a]">
                    <BxIcon name="check" size={12} className="text-[#2556c5]" />
                    {taskLabel}
                  </span>
                ) : (
                  <span className="rounded-[4px] border border-dashed border-[#c7cbd3] px-2 py-0.5 text-[10.5px] text-[#9ca3af]">
                    —
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bảng các liên kết Balheh hỗ trợ. */}
        <div className="rounded-[18px] border border-line bg-card p-[19px]">
          <h5 className="text-[15px] leading-[24px] font-semibold text-ink">{content.map.title}</h5>
          <ul className="mt-2.5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {content.map.rows.map(([from, to]) => (
              <li
                key={`${from}-${to}`}
                className="flex flex-wrap items-center gap-2 text-[14px] leading-[22.4px] font-semibold text-ink"
              >
                {from}
                <BxIcon name="link" size={14} className="text-accent-text" />
                {to}
              </li>
            ))}
          </ul>
          <p className="mt-3.5 flex gap-2.5 border-t border-line pt-3.5 text-[14px] leading-[22.4px] text-ink-muted">
            <FxIcon name="lock" size={16} className="mt-[3px]" />
            {content.map.note}
          </p>
        </div>
      </div>
    </div>
  );
}

function Who({ name, time }: { name: string; time: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <b className="text-[12px]">{name}</b>
      <small className="text-[10px] text-[#8a8f99]">{time}</small>
    </div>
  );
}

function CardButton({
  icon,
  className,
  children,
}: {
  icon: "doc" | "clip" | "thread";
  className?: string;
  children: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[5px] px-[7px] py-1 shadow-[inset_0_0_0_1px_#2556c5]",
        className,
      )}
    >
      <BxIcon name={icon} size={12} />
      {children}
    </span>
  );
}

function CheckRow({ text, done }: { text: string; done?: boolean }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 text-[11px]">
      <i
        className={cn(
          "size-3 shrink-0 rounded-[3px] border-[1.5px]",
          done ? "border-[#16a34a]" : "border-[#9ca3af]",
        )}
      />
      <span className={cn("flex-1", done && "text-[#6b7280] line-through")}>{text}</span>
      <FxIcon name="trash" size={13} />
    </div>
  );
}
