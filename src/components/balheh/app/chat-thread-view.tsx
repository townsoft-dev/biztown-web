import type { ReactNode } from "react";

import type { Avatar, BalhehAppCopy } from "@/content/balheh-types";
import { cn } from "@/lib/utils";

import { AppWindow, Av, BxHead, BxIcon, Mentions } from "./app-ui";

/**
 * Màn Channels có thread đang mở bên phải (Figma: Panel · Trao đổi; file mẫu: vChatShot): tin
 * nhắn đã thành TASK, dòng "đã tạo thread", thẻ thread và khung trả lời. Dữ liệu mẫu lấy từ
 * `app.chat` như hero. Phần tử có `data-anno="n"` là chỗ chấm chú thích số n trỏ tới.
 */
export function ChatThreadShot({ t, reply }: { t: BalhehAppCopy["chat"]; reply: string }) {
  const demo = t.demo;
  const me = t.people[0];
  const [first, , file] = t.messages;

  return (
    <AppWindow view="chat">
      <BxHead title="Brandsite" sub="Channels" />
      <div className="grid flex-1 grid-cols-[168px_1fr_232px] overflow-hidden">
        {/* Kênh và thread: thread mới nằm đầu kênh đầu tiên. */}
        <div className="grid content-start gap-0.5 border-r border-[#e5e7eb] px-2 py-2.5">
          <div className="mb-1.5 flex items-center gap-1.5">
            <b className="flex-1 text-[12px]">CHANNELS</b>
            <BxIcon name="plus" size={14} />
            <BxIcon name="dots" size={14} />
          </div>
          {t.channels.map((channel, i) => (
            <div key={channel.name} className="contents">
              <div
                data-anno={i === 0 ? "1" : undefined}
                className={cn(
                  "mt-1.5 flex items-center gap-1.5 rounded-[6px] px-2 py-1.5 text-[12px]",
                  i === 0 && "bg-[#2556c5] text-white",
                )}
              >
                <BxIcon name="hash" size={13} />
                {channel.name}
              </div>
              {i === 0 && <ThreadRow name={demo.thread} count={1} on anno="2" />}
              {channel.threads.map((item) => (
                <ThreadRow key={item.name} name={item.name} count={item.count} />
              ))}
            </div>
          ))}
        </div>

        {/* Hội thoại. */}
        <div className="flex min-w-0 flex-col bg-white">
          <div className="flex items-center gap-1.5 border-b border-[#e5e7eb] px-3 py-[9px] text-[12.5px]">
            <b className="inline-flex items-center gap-1">
              <BxIcon name="hash" size={14} />
              {t.channels[0].name}
            </b>
            <BxIcon name="right" size={13} />
            <b>{t.thread}</b>
            <span data-anno="5" className="ml-auto flex gap-2.5">
              <BxIcon name="newthread" size={14} />
              <BxIcon name="filter" size={14} />
              <BxIcon name="pin" size={14} />
              <BxIcon name="dots" size={14} />
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-1 overflow-hidden px-3 py-2">
            <Message avatar={first.avatar} name={first.name} time={first.time} pinned>
              {first.text && <Text text={first.text} />}
              {first.task && <TaskChip text={first.task} />}
              <Reactions items={first.reactions} />
            </Message>
            <div className="my-1 text-center text-[10px] text-[#9ca3af]">24 April 2026</div>
            <Message avatar={file.avatar} name={file.name} time={file.time}>
              <span
                data-anno="3"
                className="mt-[5px] flex w-max items-center gap-2 rounded-[6px] bg-white px-2.5 py-1.5 shadow-[inset_0_0_0_1px_#e5e7eb]"
              >
                <em className="rounded bg-[#eef0f4] px-1.5 py-1 text-[9px] font-bold text-[#4b5563] not-italic">
                  PDF
                </em>
                <span>
                  <b className="block text-[11px]">{file.file}</b>
                  <small className="text-[9.5px] text-[#8a8f99]">
                    Uploaded by {file.name} • 1.8 MB
                  </small>
                </span>
              </span>
              <Reactions items={file.reactions} />
            </Message>
            <Message avatar={me.avatar} name={me.name} time="15:24" mine>
              <Text text={demo.msg} />
              <span
                data-anno="6"
                className="mt-[5px] inline-flex w-max items-center gap-[5px] rounded bg-[#e8eefc] px-2 py-1 text-[10.5px] text-[#1e3a8a]"
              >
                <BxIcon name="check" size={12} className="text-[#2556c5]" />
                {demo.task}
              </span>
            </Message>
            <div className="flex items-center gap-1.5 px-1.5 py-1 text-[11px] text-[#4b5563]">
              <BxIcon name="newthread" size={13} />
              <b className="text-[#c81e1e]">{me.name}</b> {demo.started} <b>{demo.thread}</b>
              <small className="text-[10px] text-[#9ca3af]">15:26</small>
            </div>
            <div
              data-anno="4"
              className="mb-1 ml-[34px] rounded-lg bg-white px-2.5 py-2 text-[10.5px] shadow-[inset_0_0_0_1px_#e5e7eb]"
            >
              <b className="text-[11px]">{demo.thread}</b>
              <span className="ml-2 text-[10px] font-semibold text-[#2556c5]">
                {demo.oneMessage} ›
              </span>
              <div className="mt-1 flex items-center gap-[5px] text-[#30343c]">
                <Av tone="green" size={16} ring={false} />
                <b className="text-[#c81e1e]">Lan</b>
                <span className="min-w-0 flex-1 truncate">{reply}</span>
                <small className="text-[9.5px] text-[#9ca3af]">1m ago</small>
              </div>
            </div>
          </div>
          <div className="mx-3 mt-1 mb-2.5 flex items-center gap-2 rounded-[7px] py-[7px] pr-[7px] pl-3 text-[11.5px] text-[#8a8f99] shadow-[inset_0_0_0_1px_#c7cbd3]">
            <span className="flex-1">Type a message</span>
            <BxIcon name="font" size={15} />
            <BxIcon name="smile" size={15} />
            <BxIcon name="plus" size={15} />
            <SendButton anno="8" />
          </div>
        </div>

        {/* Thread đang mở. */}
        <div className="flex min-w-0 flex-col border-l border-[#e5e7eb]">
          <div className="flex items-center gap-1.5 border-b border-[#e5e7eb] px-2.5 py-[9px] text-[12px]">
            <BxIcon name="newthread" size={14} />
            <b className="flex-1 truncate">{demo.thread}</b>
            <BxIcon name="x" size={13} />
          </div>
          <div className="grid flex-1 content-start gap-2 px-2.5 py-3">
            <Message avatar={me.avatar} name={me.name} time="15:24" plain>
              <Text text={demo.msg} />
            </Message>
            <div
              data-anno="7"
              className="flex items-center gap-2 text-[9.5px] text-[#8a8f99] after:h-px after:flex-1 after:bg-[#e5e7eb]"
            >
              1 reply
            </div>
            <Message avatar="green" name="Lan" time="15:27" plain>
              <Text text={reply} />
              <Reactions items={[["👍", 2]]} />
            </Message>
          </div>
          <div className="m-2.5 flex items-end gap-2 rounded-[7px] p-2 text-[11px] text-[#9ca3af] shadow-[inset_0_0_0_1px_#c7cbd3]">
            <span className="h-9 flex-1">Reply in thread...</span>
            <BxIcon name="smile" size={14} />
            <SendButton />
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

function Message({
  avatar,
  name,
  time,
  pinned,
  mine,
  plain,
  children,
}: {
  avatar: Avatar;
  name: string;
  time: string;
  pinned?: boolean;
  mine?: boolean;
  plain?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid shrink-0 grid-cols-[28px_1fr] gap-2 rounded-[6px]",
        !plain && "p-1.5",
        mine && "bg-[#f6f8fe]",
      )}
    >
      <Av tone={avatar} text={name.slice(0, 2).toUpperCase()} size={28} ring={false} />
      <div className="min-w-0">
        <div className="flex items-baseline gap-1.5">
          <b className="text-[12px]">{name}</b>
          <small className="text-[10px] text-[#8a8f99]">{time}</small>
          {pinned && <small className="text-[10px] text-[#8a8f99]">Pinned</small>}
        </div>
        {children}
      </div>
    </div>
  );
}

function Text({ text }: { text: string }) {
  return (
    <p className="mt-0.5 text-[11.5px] text-[#30343c]">
      <Mentions text={text} />
    </p>
  );
}

function TaskChip({ text }: { text: string }) {
  return (
    <span className="mt-[5px] inline-flex items-center gap-[5px] rounded bg-[#f1f2f4] px-2 py-1 text-[10.5px]">
      <BxIcon name="check" size={12} />
      {text}
    </span>
  );
}

function Reactions({ items }: { items: [string, number][] }) {
  if (!items.length) return null;
  return (
    <div className="mt-[5px] flex gap-1">
      {items.map(([emoji, count]) => (
        <span key={emoji} className="rounded bg-[#f1f2f4] px-1.5 py-px text-[10px]">
          {emoji}
          {count}
        </span>
      ))}
    </div>
  );
}

function SendButton({ anno }: { anno?: string }) {
  return (
    <b
      data-anno={anno}
      className="inline-flex items-center gap-1 rounded-[5px] bg-[#2556c5] px-2.5 py-[5px] text-[11px] text-white"
    >
      <BxIcon name="send" size={12} />
      Send
    </b>
  );
}

function ThreadRow({
  name,
  count,
  on,
  anno,
}: {
  name: string;
  count: number;
  on?: boolean;
  anno?: string;
}) {
  return (
    <div
      data-anno={anno}
      className={cn(
        "ml-3.5 flex items-center gap-1.5 rounded-[5px] px-2 py-1 text-[10.5px] text-[#6b7280]",
        on && "bg-[#e8eefc] text-[#2556c5]",
      )}
    >
      <BxIcon name="thread" size={11} />
      <span className="flex-1 truncate">{name}</span>
      <em className="grid size-[15px] place-items-center rounded-full bg-[#dbe6fb] text-[9px] text-[#3b5bab] not-italic">
        {count}
      </em>
    </div>
  );
}
