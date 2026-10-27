import type { BalhehAppCopy } from "@/content/balheh-types";
import { cn } from "@/lib/utils";

import { Av, BxHead, BxIcon, Mentions, Typed } from "./app-ui";

export type ChatMenu = { open: "bar" | "menu"; hover: number } | null;
export type ChatDialog = { title: string | null; ready: boolean } | null;

/**
 * Màn Channels (Figma: Chapter=2 và "Chapter=2 · Create thread"): kênh + thread, tin nhắn,
 * thành viên. Demo gõ và gửi tin (`typed` → `sent`), biến tin thành task (`menu` → `task`), rồi
 * tạo thread từ tin đó (`dialog` → `thread`). Mặc định là màn hình tĩnh như Figma.
 */
export function ChatView({
  t,
  me,
  typed = null,
  sent = false,
  menu = null,
  task = false,
  dialog = null,
  thread = false,
}: {
  t: BalhehAppCopy["chat"];
  /** Tên người đang dùng (avatar HU). */
  me: string;
  /** Chữ đang gõ ở ô nhập; null = ô trống. */
  typed?: string | null;
  sent?: boolean;
  menu?: ChatMenu;
  task?: boolean;
  dialog?: ChatDialog;
  thread?: boolean;
}) {
  const demo = t.demo;

  return (
    <>
      <BxHead title="Brandsite" sub="Channels" />
      <div className="grid flex-1 grid-cols-[170px_1fr_190px] overflow-hidden">
        {/* Kênh và thread. */}
        <div className="grid content-start gap-0.5 border-r border-[#e5e7eb] px-2 py-2.5">
          <div className="mb-1.5 flex items-center gap-1.5">
            <b className="flex-1 text-[12px]">CHANNELS</b>
            <BxIcon name="plus" size={14} />
            <BxIcon name="dots" size={14} />
          </div>
          {t.channels.map((channel, i) => (
            <div key={channel.name} className="contents">
              <div
                className={cn(
                  "mt-1.5 flex items-center gap-1.5 rounded-[6px] px-2 py-1.5 text-[12px]",
                  i === 0 && "bg-[#2556c5] text-white",
                )}
              >
                <BxIcon name="hash" size={13} />
                {channel.name}
                {i === 2 && (
                  <em className="grid size-3.5 place-items-center rounded-full bg-[#f59e0b] text-[9px] font-bold text-white not-italic">
                    1
                  </em>
                )}
              </div>
              {i === 0 && thread && (
                <ThreadRow name={demo.thread} count={1} on className="bh-pop" />
              )}
              {channel.threads.map((item, j) => (
                <ThreadRow
                  key={item.name}
                  name={item.name}
                  count={item.count}
                  on={i === 0 && j === 0 && !thread}
                />
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
            <span className="ml-auto flex gap-2.5">
              <BxIcon name="newthread" size={14} />
              <BxIcon name="filter" size={14} />
              <BxIcon name="pin" size={14} />
              <BxIcon name="dots" size={14} />
            </span>
          </div>
          {/* Tin mới đẩy tin cũ lên trên (tràn phía trên bị cắt), như khung chat thật. */}
          <div className="flex flex-1 flex-col justify-end gap-1 overflow-hidden bg-[#fbfbfc] px-3 py-1.5">
            {t.messages.map((message) => (
              <div
                key={message.time}
                className="grid shrink-0 grid-cols-[28px_1fr] gap-2 rounded-[6px] p-1.5"
              >
                <Av
                  tone={message.avatar}
                  text={message.name.slice(0, 2).toUpperCase()}
                  size={28}
                  ring={false}
                />
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <b className="text-[12px]">{message.name}</b>
                    <small className="text-[10px] text-[#8a8f99]">{message.time}</small>
                    {message.pinned && <small className="text-[10px] text-[#8a8f99]">Pinned</small>}
                  </div>
                  {message.text && (
                    <p className="mt-0.5 text-[11.5px] text-[#30343c]">
                      <Mentions text={message.text} />
                    </p>
                  )}
                  {message.task && (
                    <span className="mt-[5px] inline-flex items-center gap-[5px] rounded bg-[#f1f2f4] px-2 py-1 text-[10.5px]">
                      <BxIcon name="check" size={12} />
                      {message.task}
                    </span>
                  )}
                  {message.file && (
                    <span className="mt-[5px] flex w-max items-center gap-2 rounded-[6px] bg-white px-2.5 py-1.5 shadow-[inset_0_0_0_1px_#e5e7eb]">
                      <em className="rounded bg-[#eef0f4] px-1.5 py-1 text-[9px] font-bold text-[#4b5563] not-italic">
                        PDF
                      </em>
                      <span>
                        <b className="block text-[11px]">{message.file}</b>
                        <small className="text-[9.5px] text-[#8a8f99]">
                          Uploaded by {message.name} • 1.8 MB
                        </small>
                      </span>
                    </span>
                  )}
                  {message.reactions.length > 0 && (
                    <div className="mt-[5px] flex gap-1">
                      {message.reactions.map(([emoji, count]) => (
                        <span key={emoji} className="rounded bg-[#f1f2f4] px-1.5 py-px text-[10px]">
                          {emoji}
                          {count}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {sent && (
              <div
                data-demo="mine"
                className={cn(
                  "bh-pop relative grid shrink-0 grid-cols-[28px_1fr] gap-2 rounded-[6px] p-1.5",
                  menu ? "bg-[#f1f3f6]" : "bg-[#f6f8fe]",
                )}
              >
                <Av tone="orange" text="HU" size={28} ring={false} />
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <b className="text-[12px]">{me}</b>
                    <small className="text-[10px] text-[#8a8f99]">15:24</small>
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-[#30343c]">
                    <Mentions text={demo.msg} />
                  </p>
                  {task && (
                    <span className="bh-pop mt-[5px] inline-flex items-center gap-[5px] rounded bg-[#e8eefc] px-2 py-1 text-[10.5px] text-[#1e3a8a]">
                      <BxIcon name="check" size={12} className="text-[#2556c5]" />
                      {demo.task}
                    </span>
                  )}
                </div>
                {menu && (
                  <div className="absolute -top-2.5 right-2 flex gap-2 rounded-[6px] bg-white px-2 py-[5px] text-[#6b7280] shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                    <BxIcon name="smile" size={13} />
                    <BxIcon name="cmt" size={13} />
                    <BxIcon name="fwd" size={13} />
                    <span data-demo="mine-dots">
                      <BxIcon name="dots" size={13} />
                    </span>
                  </div>
                )}
                {menu?.open === "menu" && (
                  <div className="absolute right-2 bottom-[22px] z-[2] grid w-[138px] rounded-[7px] bg-white p-1 text-[10.5px] shadow-[0_8px_24px_rgba(0,0,0,0.14)]">
                    {t.hover.map((label, k) => (
                      <span
                        key={label}
                        data-demo={`menu-${k}`}
                        className={cn(
                          "rounded-[5px] px-2 py-1.5 text-[#4b5563]",
                          k === 4 && "text-[#dc2626]",
                          k === menu.hover && "bg-[#e8eefc] font-semibold text-[#2556c5]",
                        )}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {thread && (
              <>
                <div className="bh-pop flex shrink-0 items-center gap-1.5 px-1.5 py-1 text-[11px] text-[#4b5563]">
                  <BxIcon name="newthread" size={13} />
                  <b className="text-[#c81e1e]">{me}</b> {demo.started} <b>{demo.thread}</b>
                  <small className="text-[10px] text-[#9ca3af]">15:26</small>
                </div>
                <div className="bh-pop mx-1.5 mb-1 ml-[34px] shrink-0 rounded-lg bg-white px-2.5 py-2 text-[10.5px] shadow-[inset_0_0_0_1px_#e5e7eb]">
                  <b className="text-[11px]">{demo.thread}</b>
                  <span className="ml-2 text-[10px] font-semibold text-[#2556c5]">
                    {demo.oneMessage} ›
                  </span>
                  <div className="mt-1 flex items-center gap-[5px] truncate text-[#30343c]">
                    <Av tone="orange" size={16} ring={false} />
                    <b className="text-[#c81e1e]">{me}</b> {demo.msg}
                    <small className="ml-auto text-[9.5px] text-[#9ca3af]">now</small>
                  </div>
                </div>
              </>
            )}
          </div>
          <div
            data-demo="chat-input"
            className={cn(
              "mx-3 mt-2 mb-2.5 flex items-center gap-2 rounded-[7px] py-[7px] pr-[7px] pl-3 text-[11.5px] text-[#8a8f99]",
              typed !== null
                ? "shadow-[inset_0_0_0_1.5px_#2556c5]"
                : "shadow-[inset_0_0_0_1px_#c7cbd3]",
            )}
          >
            <span className={cn("flex-1", typed !== null && "text-[#1d1f24]")}>
              {typed !== null ? <Typed text={typed} caret /> : "Type a message"}
            </span>
            <BxIcon name="font" size={15} />
            <BxIcon name="smile" size={15} />
            <BxIcon name="plus" size={15} />
            <b
              data-demo="chat-send"
              className="inline-flex items-center gap-1 rounded-[5px] bg-[#2556c5] px-2.5 py-[5px] text-[11px] text-white"
            >
              <BxIcon name="send" size={12} />
              Send
            </b>
          </div>
        </div>

        {/* Thành viên. */}
        <div className="grid content-start gap-1.5 border-l border-[#e5e7eb] px-2.5 py-2">
          <div className="mb-1 flex gap-0.5 text-[10.5px]">
            {(
              [
                ["users", "Members"],
                ["check", "Tasks"],
                ["doc", "Docs"],
              ] as const
            ).map(([icon, label], index) => (
              <span
                key={label}
                className={cn(
                  "inline-flex items-center gap-[3px] p-[5px] text-[#4b5563]",
                  index === 0 && "font-semibold text-[#1d1f24] shadow-[inset_0_-2px_0_#2556c5]",
                )}
              >
                <BxIcon name={icon} size={12} />
                {label}
              </span>
            ))}
          </div>
          <small className="mt-1 text-[9.5px] font-bold text-[#4b5563]">ONLINE (3)</small>
          {t.people.map((person, index) => (
            <div key={person.name} className="contents">
              {index === 3 && (
                <small className="mt-1 text-[9.5px] font-bold text-[#4b5563]">AWAY (1)</small>
              )}
              <div className="flex items-center gap-2">
                <Av
                  tone={person.avatar}
                  text={person.name.slice(0, 2).toUpperCase()}
                  size={28}
                  ring={false}
                  presence={person.away ? "away" : "on"}
                />
                <div>
                  <b className="block text-[11.5px] font-medium">{person.name}</b>
                  <span className="text-[9.5px] text-[#8a8f99]">{person.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hộp "Create Threads" (Figma: Chapter=2 · Create thread). */}
        {dialog && (
          <div className="bt-fade absolute inset-0 z-20 grid place-items-center bg-[rgba(55,60,70,0.45)] backdrop-blur-[2px]">
            <div className="bh-pop relative grid w-[350px] gap-1.5 rounded-lg bg-white px-5 py-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
              <BxIcon name="x" size={14} className="absolute top-3.5 right-3.5 text-[#6b7280]" />
              <b className="text-[14px]">Create Threads</b>
              <small className="mb-1.5 text-[11.5px] text-[#6b7280]">
                Create a new discussion thread in this chat room.
              </small>
              <span className="mt-1 text-[11.5px] font-medium">Thread Title</span>
              <div
                data-demo="dlg-title"
                className={cn(
                  "min-h-8 rounded-[6px] px-2.5 py-2 text-[11.5px]",
                  dialog.title !== null
                    ? "shadow-[inset_0_0_0_1.5px_#2556c5,0_0_0_3px_rgba(37,86,197,0.15)]"
                    : "text-[#9ca3af] shadow-[inset_0_0_0_1px_#d1d5db]",
                )}
              >
                {dialog.title !== null ? (
                  <Typed text={dialog.title} caret={!dialog.ready} />
                ) : (
                  "Enter thread title..."
                )}
              </div>
              <span className="mt-1 text-[11.5px] font-medium">Content</span>
              <div className="min-h-8 rounded-[6px] bg-[#f6f7f9] px-2.5 py-2 text-[11.5px] text-[#30343c] shadow-[inset_0_0_0_1px_#d1d5db]">
                {demo.msg}
              </div>
              <div className="mt-2.5 flex justify-end gap-2">
                <span className="rounded-[5px] px-3 py-1.5 text-[11.5px] font-medium text-[#2556c5] shadow-[inset_0_0_0_1px_#2556c5]">
                  Cancel
                </span>
                <b
                  data-demo="dlg-create"
                  className={cn(
                    "rounded-[5px] bg-[#2556c5] px-3 py-1.5 text-[11.5px] font-medium text-white transition-opacity",
                    !dialog.ready && "opacity-45",
                  )}
                >
                  Create
                </b>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function ThreadRow({
  name,
  count,
  on,
  className,
}: {
  name: string;
  count: number;
  on?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "ml-3.5 flex items-center gap-1.5 rounded-[5px] px-2 py-1 text-[10.5px] text-[#6b7280]",
        on && "bg-[#e8eefc] text-[#2556c5]",
        className,
      )}
    >
      <BxIcon name="thread" size={11} />
      <span className="flex-1">{name}</span>
      <em className="grid size-[15px] place-items-center rounded-full bg-[#dbe6fb] text-[9px] text-[#3b5bab] not-italic">
        {count}
      </em>
    </div>
  );
}
