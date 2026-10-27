import type { BalhehAppCopy } from "@/content/balheh-types";
import { cn } from "@/lib/utils";

import { Av, BxHead, BxIcon, Typed } from "./app-ui";

/** Trang mới đang soạn trong demo; title null = còn chữ mờ "Untitled". */
export type WikiDraft = {
  title: string | null;
  attend: string;
  dec: string;
  todos: string[];
  rel: boolean;
  checked: boolean;
  /** Ô đang gõ (hiện con trỏ nhấp nháy). */
  typing: "title" | "attend" | "dec" | "todo" | null;
};

function CheckBox({ checked }: { checked?: boolean }) {
  return (
    <i
      className={cn(
        "relative size-3 shrink-0 rounded-[3px] not-italic",
        checked
          ? "shadow-[inset_0_0_0_1.5px_#16a34a] after:absolute after:top-0.5 after:left-[3px] after:h-[3px] after:w-[5px] after:-rotate-45 after:border-b-[1.5px] after:border-l-[1.5px] after:border-[#16a34a]"
          : "shadow-[inset_0_0_0_1px_#c7cbd3]",
      )}
    />
  );
}

/**
 * Màn Wiki (Figma: Chapter=3): cây thư mục, tab trang, nội dung trang và bảng chi tiết. Demo bấm
 * "+" mở trang mới rồi gõ biên bản họp (`draft`). Mặc định là trang "Họp khởi động" như Figma.
 */
export function WikiView({
  t,
  draft = null,
  newHover = false,
}: {
  t: BalhehAppCopy["wiki"];
  draft?: WikiDraft | null;
  /** Con trỏ đang rê lên nút "+" tab mới. */
  newHover?: boolean;
}) {
  const base = t.crumb.split(" / ")[0];
  const draftName = draft?.title || "Untitled";

  return (
    <>
      <BxHead title="Brandsite" sub="Wiki" />
      <div className="grid flex-1 grid-cols-[190px_1fr] overflow-hidden">
        <div className="grid content-start gap-0.5 border-r border-[#e5e7eb] bg-[#f6f7f9] px-2 py-2.5 text-[11px]">
          <div className="flex items-center gap-2 px-1 pb-2 text-[#4b5563]">
            <BxIcon name="fileplus" size={15} />
            <BxIcon name="folderplus" size={15} />
            <BxIcon name="search" size={15} />
            <BxIcon name="sort" size={15} />
            <BxIcon name="panel" size={15} className="ml-auto" />
          </div>
          {t.tree.map((folder, i) => (
            <div key={folder.name} className="contents">
              <div
                className={cn(
                  "mt-1 flex items-center gap-[5px] px-1 py-[5px] text-[#30343c]",
                  i === 0 && "text-[#2556c5]",
                )}
              >
                <BxIcon name="down" size={12} />
                {folder.name}
                {i === 0 ? (
                  <em className="grid size-3.5 place-items-center rounded-full bg-[#f59e0b] text-[9px] font-bold text-white not-italic">
                    7
                  </em>
                ) : (
                  ` (${folder.pages.length})`
                )}
              </div>
              {folder.pages.map((page, j) => (
                <TreePage key={page} name={page} on={i === 0 && j === 0 && !draft} />
              ))}
              {i === 0 && draft && <TreePage name={draftName} on className="bh-pop" />}
            </div>
          ))}
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="flex gap-0.5 border-b border-[#e5e7eb] px-2.5 pt-1.5">
            {t.tabs.map((tab, index) => (
              <DocTab key={tab} name={tab} on={index === 0 && !draft} />
            ))}
            {draft && <DocTab name={draftName} on className="bh-pop" />}
            <span
              data-demo="wiki-new"
              className={cn(
                "mt-[3px] ml-1 grid size-6 place-items-center rounded-[6px] text-[#4b5563] transition-colors",
                (newHover || !draft) && "bg-[#e8eefc] text-[#2556c5]",
              )}
            >
              <BxIcon name="plus" size={13} />
            </span>
          </div>
          <div className="flex items-center px-3 py-1.5 text-[10.5px] text-[#4b5563]">
            <span className="flex-1 text-center">{draft ? `${base} / ${draftName}` : t.crumb}</span>
            <span className="flex items-center gap-2">
              Edited 3m ago
              <BxIcon name="share2" size={13} />
              <BxIcon name="bookmark" size={13} />
              <BxIcon name="dots" size={13} />
            </span>
          </div>
          <div className="grid flex-1 grid-cols-[1fr_228px] overflow-hidden">
            <div className="min-w-0 px-[22px] py-4">
              {draft ? <Draft t={t} draft={draft} /> : <KickoffPage t={t} />}
            </div>
            <div className="grid content-start gap-1.5 overflow-hidden border-l border-[#e5e7eb] px-2.5 py-2 text-[11px]">
              <div className="mb-1 flex gap-0.5 text-[10.5px]">
                {(
                  [
                    ["info", "Detail"],
                    ["cmt", "Comment"],
                    ["link", "Links"],
                  ] as const
                ).map(([icon, label], index) => (
                  <span
                    key={label}
                    className={cn(
                      "inline-flex items-center gap-[3px] px-1 py-[5px] whitespace-nowrap text-[#4b5563]",
                      index === 0 && "font-semibold text-[#1d1f24] shadow-[inset_0_-2px_0_#2556c5]",
                    )}
                  >
                    <BxIcon name={icon} size={12} />
                    {label}
                  </span>
                ))}
              </div>
              <small className="mt-1.5 text-[10px] font-bold text-[#4b5563]">PEOPLE</small>
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-[#4b5563]">Owner</span>
                <span className="flex items-center gap-[5px] text-right">
                  <Av tone="orange" text="HU" />
                  <span>
                    <b className="block text-[10px]">{t.owner}</b>
                    <em className="block text-[9px] text-[#8a8f99] not-italic">{t.role}</em>
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-[#4b5563]">Contributors</span>
                <span className="flex">
                  <Av tone="blue" />
                  <Av tone="green" />
                  <Av tone="purple" />
                  <Av tone="navy" text="+3" className="bg-[#2556c5]" />
                </span>
              </div>
              <small className="mt-1.5 text-[10px] font-bold text-[#4b5563]">ACTIVITY</small>
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-[#4b5563]">Created</span>
                <b className="text-[10.5px] font-semibold whitespace-nowrap">{t.created}</b>
              </div>
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-[#4b5563]">Last edited</span>
                <b className="text-[10.5px] font-semibold whitespace-nowrap">
                  {draft?.checked ? t.demo.just : t.edited}
                </b>
              </div>
              <small className="mt-1.5 text-[10px] font-bold text-[#4b5563]">TAGS</small>
              <div className="flex flex-wrap gap-1">
                <span className="rounded bg-[#dbe6fb] px-[7px] py-0.5 text-[10px] font-semibold text-[#2556c5]">
                  #kickoff
                </span>
                <span className="rounded bg-[#fbd5d5] px-[7px] py-0.5 text-[10px] font-semibold text-[#b91c1c]">
                  #backend
                </span>
                <span className="rounded-full px-[7px] py-0.5 text-[10px] text-[#6b7280] shadow-[inset_0_0_0_1px_#c7cbd3]">
                  +Add
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TreePage({ name, on, className }: { name: string; on?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "ml-2.5 flex items-center gap-1.5 border-l border-[#dfe2e7] px-2 py-1 text-[#4b5563]",
        on && "rounded-r-[5px] bg-[#e6edfb] text-[#2556c5]",
        className,
      )}
    >
      <BxIcon name="doc" size={12} />
      <span className="truncate">{name}</span>
    </div>
  );
}

function DocTab({ name, on, className }: { name: string; on?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[30px] rounded-t-[6px] px-2.5 py-1.5 text-[11px] text-[#4b5563]",
        on && "-mb-px bg-white text-[#1d1f24] shadow-[inset_0_0_0_1px_#e5e7eb]",
        className,
      )}
    >
      <span className="max-w-[140px] truncate">{name}</span>
      <BxIcon name="x" size={11} />
    </span>
  );
}

function Todo({ text, checked, caret }: { text: string; checked?: boolean; caret?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 py-1 text-[11.5px]",
        checked && "text-[#6b7280] line-through",
      )}
    >
      <CheckBox checked={checked} />
      <Typed text={text} caret={caret} />
    </div>
  );
}

function Related({ label, task, className }: { label: string; task: string; className?: string }) {
  return (
    <div className={cn("mt-3.5 flex flex-wrap items-center gap-2 text-[11.5px]", className)}>
      {label}
      <span className="inline-flex items-center gap-[5px] rounded bg-[#f1f2f4] px-2 py-1 text-[10.5px]">
        <BxIcon name="check" size={12} className="text-[#2556c5]" />
        {task}
      </span>
    </div>
  );
}

function Commands() {
  return (
    <div className="mt-6 flex items-center gap-1.5 text-[11px] text-[#9ca3af]">
      <BxIcon name="plus" size={12} />
      Type &apos;/&apos; for commands
    </div>
  );
}

/** Trang "Họp khởi động" như Figma. */
function KickoffPage({ t }: { t: BalhehAppCopy["wiki"] }) {
  return (
    <>
      <h4 className="mb-1.5 text-[22px] font-bold tracking-[-0.01em]">{t.title}</h4>
      <p className="text-[11.5px] text-[#30343c]">{t.desc}</p>
      <h6 className="mt-3.5 mb-1.5 text-[15px] font-semibold">{t.h1}</h6>
      {t.todo1.map((item) => (
        <Todo key={item} text={item} />
      ))}
      <div className="flex items-center gap-2 py-1 text-[11.5px] text-[#8a8f99] italic">
        <BxIcon name="plus" size={11} />
        Add action item...
      </div>
      <h6 className="mt-3.5 mb-1.5 text-[15px] font-semibold">{t.h2}</h6>
      {t.todo2.map((item) => (
        <Todo key={item} text={item} />
      ))}
      <Related label={t.rel} task={t.task} />
      <Commands />
    </>
  );
}

/** Trang mới đang gõ trong demo. */
function Draft({ t, draft }: { t: BalhehAppCopy["wiki"]; draft: WikiDraft }) {
  return (
    <>
      <h4
        data-demo="wiki-title"
        className={cn(
          "mb-1.5 min-h-[30px] text-[22px] font-bold tracking-[-0.01em]",
          draft.title === null && "text-[#c7cbd3]",
        )}
      >
        {draft.title === null ? (
          "Untitled"
        ) : (
          <Typed text={draft.title} caret={draft.typing === "title"} />
        )}
      </h4>
      <p className="min-h-[18px] text-[11.5px] text-[#30343c]">
        <Typed text={draft.attend} caret={draft.typing === "attend"} />
      </p>
      {draft.dec && (
        <h6 className="mt-3.5 mb-1.5 text-[15px] font-semibold">
          <Typed text={draft.dec} caret={draft.typing === "dec"} />
        </h6>
      )}
      {draft.todos.map((item, index) => (
        <div key={index} data-demo={index === 0 ? "wiki-check" : undefined}>
          <Todo
            text={item}
            checked={index === 0 && draft.checked}
            caret={draft.typing === "todo" && index === draft.todos.length - 1}
          />
        </div>
      ))}
      {draft.rel && <Related label={t.rel} task="TASK-415" className="bh-pop" />}
      <Commands />
    </>
  );
}
