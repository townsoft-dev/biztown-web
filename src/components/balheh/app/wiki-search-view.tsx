import type { BalhehAppCopy, BalhehFeaturesContent } from "@/content/balheh-types";
import { cn } from "@/lib/utils";

import { AppWindow, Av, BxHead, BxIcon } from "./app-ui";

/** Màu gợi ý tag và bảng màu tag (file mẫu: .tagpop). */
const TAG_SUGGESTIONS = [
  ["urgent", "#c0392b"],
  ["internal", "#6366f1"],
  ["final-review", "#22c55e"],
] as const;
const TAG_COLORS = ["#3730a3", "#ef4444", "#22c55e", "#f59e0b", "#a855f7", "#64748b", "#374151"];

/**
 * Màn Wiki đang tìm kiếm (Figma: Panel · Lưu tài liệu; file mẫu: vWikiSearch): ô tìm, kết quả
 * gom theo thư mục có tô sáng từ khoá, nhiều tab tài liệu, trang soạn bằng khối và ô chọn tag.
 * Trang đang mở lấy từ `app.wiki` như hero. Phần tử có `data-anno="n"` là chỗ chấm chú thích.
 */
export function WikiSearchShot({
  t,
  search,
}: {
  t: BalhehAppCopy["wiki"];
  search: BalhehFeaturesContent["search"];
}) {
  return (
    <AppWindow view="wiki">
      <BxHead title="Brandsite" sub="Wiki" />
      <div className="grid flex-1 grid-cols-[214px_1fr] overflow-hidden">
        {/* Thanh tìm kiếm + kết quả. */}
        <div className="grid content-start gap-2 border-r border-[#e5e7eb] bg-[#f6f7f9] px-2 py-2.5 text-[11px]">
          <div className="flex items-center gap-2 px-1 text-[#4b5563]">
            <BxIcon name="fileplus" size={15} />
            <BxIcon name="folderplus" size={15} />
            <span className="grid size-[19px] place-items-center rounded-[4px] bg-[#e8eefc] text-[#2556c5]">
              <BxIcon name="search" size={15} />
            </span>
            <BxIcon name="sort" size={15} />
          </div>
          <div className="flex items-center gap-1.5">
            <div
              data-anno="1"
              className="flex flex-1 items-center gap-1.5 rounded-[5px] bg-white px-2 py-[5px] shadow-[inset_0_0_0_1.5px_#2556c5]"
            >
              <BxIcon name="search" size={12} className="text-[#4b5563]" />
              <span className="flex-1 truncate">{search.query}</span>
              <span className="grid size-3.5 place-items-center rounded-full bg-[#e5e7eb] text-[#4b5563]">
                <BxIcon name="x" size={10} />
              </span>
            </div>
            <span className="grid size-[27px] place-items-center rounded-[5px] bg-white text-[#4b5563] shadow-[inset_0_0_0_1px_#c7cbd3]">
              <BxIcon name="filter" size={13} />
            </span>
          </div>
          <div className="flex items-center justify-between px-0.5 text-[10px] text-[#4b5563]">
            {search.results}
            <BxIcon name="sort" size={12} />
          </div>
          {search.groups.map((group, i) => (
            <div
              key={group.name}
              className="overflow-hidden rounded-[6px] bg-white shadow-[inset_0_0_0_1px_#dbe6fb]"
            >
              <GroupHead name={group.name} count={group.count} open />
              {group.snippets.map((snippet, j) => (
                <p
                  key={j}
                  className="border-t border-[#eef0f4] px-2 py-1.5 text-[10.5px] leading-[1.45] text-[#30343c]"
                >
                  <Highlight text={snippet} anno={i === 0 && j === 0 ? "2" : undefined} />
                </p>
              ))}
            </div>
          ))}
          {search.more.map((group, i) => (
            <div key={group.name} data-anno={i === 0 ? "3" : undefined}>
              <GroupHead name={group.name} count={group.count} />
            </div>
          ))}
        </div>

        {/* Tài liệu đang mở. */}
        <div className="flex min-w-0 flex-col">
          <div data-anno="4" className="flex gap-0.5 border-b border-[#e5e7eb] px-2.5 pt-1.5">
            {[...t.tabs, "Menu Overview"].map((tab, index) => (
              <span
                key={tab}
                className={cn(
                  "inline-flex items-center gap-2 rounded-t-[6px] px-2.5 py-1.5 text-[10.5px] whitespace-nowrap text-[#4b5563]",
                  index === 0 &&
                    "bg-white font-semibold text-[#1d1f24] shadow-[inset_0_-2px_0_#2556c5]",
                )}
              >
                {tab}
                <BxIcon name="x" size={11} />
              </span>
            ))}
          </div>
          <div className="flex items-center px-3 py-1.5 text-[10.5px] text-[#4b5563]">
            <span className="flex-1 text-center">{t.crumb}</span>
            <span className="flex items-center gap-2">
              Edited 3m ago
              <BxIcon name="share2" size={13} />
              <BxIcon name="bookmark" size={13} />
              <BxIcon name="dots" size={13} />
            </span>
          </div>
          <div className="grid flex-1 grid-cols-[1fr_228px] overflow-hidden">
            <div className="min-w-0 px-[22px] py-4 text-[11.5px] text-[#30343c]">
              <h4 className="text-[22px] font-bold tracking-[-0.01em] text-[#1d1f24]">{t.title}</h4>
              <p className="mt-1">{t.desc}</p>
              <h6 data-anno="5" className="mt-4 w-max text-[14px] font-bold text-[#1d1f24]">
                {t.h1}
              </h6>
              <Todos items={t.todo1} />
              <h6 className="mt-4 text-[14px] font-bold text-[#1d1f24]">{t.h2}</h6>
              <Todos items={t.todo2} />
              <div className="mt-4 flex items-center gap-2">
                {t.rel}
                <span
                  data-anno="6"
                  className="inline-flex items-center gap-[5px] rounded bg-[#eef0f4] px-2 py-1 text-[10.5px]"
                >
                  <BxIcon name="check" size={12} className="text-[#2556c5]" />
                  {t.task}
                </span>
              </div>
              <div className="mt-5 flex items-center gap-1.5 text-[#9ca3af]">
                <BxIcon name="plus" size={12} />
                Type &apos;/&apos; for commands
              </div>
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
                <b className="text-[10.5px] font-semibold whitespace-nowrap">{t.edited}</b>
              </div>
              <small className="mt-1.5 text-[10px] font-bold text-[#4b5563]">TAGS</small>
              <div data-anno="7" className="flex w-max gap-1">
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
              <div className="mt-1 grid gap-1.5 rounded-[7px] bg-white p-2 text-[10.5px] shadow-[0_8px_24px_rgba(0,0,0,0.14)]">
                <div className="flex items-center gap-1.5 rounded-[5px] px-2 py-1 shadow-[inset_0_0_0_1.5px_#2556c5]">
                  <BxIcon name="search" size={12} />
                  frontend
                </div>
                <small className="text-[9px] font-semibold text-[#8a8f99]">SUGGESTIONS</small>
                {TAG_SUGGESTIONS.map(([name, color]) => (
                  <span key={name} className="flex items-center gap-1.5">
                    <i className="size-1.5 rounded-full" style={{ background: color }} />
                    {name}
                  </span>
                ))}
                <small className="text-[9px] font-semibold text-[#8a8f99]">TAG COLOR</small>
                <div className="flex gap-1">
                  {TAG_COLORS.map((color, index) => (
                    <i
                      key={color}
                      className={cn("size-3 rounded-full", index === 0 && "ring-2 ring-[#c7d2fe]")}
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

function GroupHead({ name, count, open }: { name: string; count: number; open?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2 py-[5px] text-[10.5px]",
        open ? "bg-[#e8eefc] text-[#2556c5]" : "text-[#30343c]",
      )}
    >
      <BxIcon name={open ? "down" : "right"} size={11} />
      <span className="flex-1 truncate">{name}</span>
      <em className="grid size-[15px] place-items-center rounded-full bg-[#f59e0b] text-[9px] font-bold text-white not-italic">
        {count}
      </em>
    </div>
  );
}

/** Đoạn trích kết quả: cụm trong {ngoặc nhọn} tô vàng như từ khoá tìm được. */
function Highlight({ text, anno }: { text: string; anno?: string }) {
  return (
    <>
      {text.split(/\{([^}]+)\}/).map((part, index) =>
        index % 2 === 0 ? (
          part
        ) : (
          <mark
            key={index}
            // Chấm chú thích trỏ vào cụm tô sáng đầu tiên (luôn ở vị trí 1 sau khi tách).
            data-anno={index === 1 ? anno : undefined}
            className="rounded-[2px] bg-[#fde68a] px-px text-inherit"
          >
            {part}
          </mark>
        ),
      )}
    </>
  );
}

function Todos({ items }: { items: string[] }) {
  return (
    <div className="mt-2 grid gap-1.5">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-2">
          <i className="size-3 rounded-[3px] shadow-[inset_0_0_0_1.5px_#9ca3af]" />
          {item}
        </div>
      ))}
      <div className="flex items-center gap-2 text-[#9ca3af]">
        <BxIcon name="plus" size={11} />
        Add action item...
      </div>
    </div>
  );
}
