import type { ReactNode } from "react";

import type { BalhehAppCopy } from "@/content/balheh-types";
import { cn } from "@/lib/utils";

import { Av, BxHead, BxIcon, Typed } from "./app-ui";

/** Memo đang soạn trong demo; null ở title/text = còn chữ mờ. */
export type MemoDraft = {
  title: string | null;
  text: string | null;
  color: number;
  typing: "title" | "text" | null;
};

const PROGRESS = [
  { name: "Front-end Board", tasks: "19/48", pct: 40, color: "#f5b301" },
  { name: "Back-end Board", tasks: "18/27", pct: 67, color: "#3b82f6" },
  { name: "Mobile Board", tasks: "32/32", pct: 100, color: "#1f8a4c" },
  { name: "QA & Testing", tasks: "4/21", pct: 15, color: "#ef4444" },
];

const MEMO_BG = { yellow: "bg-[#fdf8c8]", green: "bg-[#e9f7ee]", blue: "bg-[#e6f0fd]" };
const MEMO_COLORS = ["#fdf8c8", "#fef3c7", "#e6f0fd", "#fde0e0", "#e9f7ee"];

/** Vòng tròn 76% hoàn thành (Figma: Task distribution). */
const DONUT_R = 46;
const DONUT_C = 2 * Math.PI * DONUT_R;

function PdCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn("rounded-lg bg-white px-3 py-2.5 shadow-[inset_0_0_0_1px_#d6d9e0]", className)}
    >
      {children}
    </div>
  );
}

function Memo({
  tone,
  title,
  text,
  meta,
  className,
}: {
  tone: keyof typeof MEMO_BG;
  title: string;
  text: string;
  meta: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[6px] px-[9px] py-[7px] text-[10px]",
        MEMO_BG[tone],
        className,
      )}
    >
      <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-[#fde0e0] text-[#dc2626]">
        <BxIcon name="pin" size={11} />
      </span>
      <b className="mb-0.5 block text-[10.5px]">{title}</b>
      <p className="line-clamp-2 leading-[1.4] text-[#4b5563]">{text}</p>
      <div className="mt-1 flex items-center justify-between">
        <span className="flex">
          <Av tone="orange" size={15} />
          <Av tone="blue" size={15} />
        </span>
        <small className="text-[9px] text-[#6b7280]">{meta}</small>
      </div>
    </div>
  );
}

/**
 * Màn Dashboard dự án (Figma: Chapter=4): tóm tắt, phân bố công việc, memo, hạn chót. Demo thêm
 * một memo (`form` → `memoAdded`) rồi chuyển tab "Overdue" (`tab`).
 */
export function DashView({
  t,
  owner,
  form = null,
  memoAdded = false,
  tab = "up",
}: {
  t: BalhehAppCopy["dash"];
  /** Tên người tạo memo mới. */
  owner: string;
  form?: MemoDraft | null;
  memoAdded?: boolean;
  tab?: "up" | "od";
}) {
  const deadlines = tab === "up" ? t.upcoming : t.overdue;
  // Có memo mới thì memo cũ thứ hai nhường chỗ (khung cao cố định).
  const memos = form || memoAdded ? t.memos.slice(0, 1) : t.memos;

  return (
    <>
      <BxHead title="Brandsite" sub="Dashboard" />
      <div className="grid flex-1 grid-cols-[1.55fr_1fr] gap-2.5 overflow-hidden bg-[#f4f5f8] px-3 py-2.5">
        <div className="grid min-w-0 content-start gap-2.5">
          <PdCard>
            <div className="mb-1.5 flex items-center gap-1.5">
              <b className="text-[13px]">Project Summary</b>
              <BxIcon name="star" size={13} filled className="text-[#f5a524]" />
              <BxIcon name="dots" size={15} className="ml-auto" />
            </div>
            <div className="grid grid-cols-[1fr_170px] gap-3">
              <div>
                <p className="text-[10.5px] leading-[1.55] text-[#30343c]">{t.summary}</p>
                <div className="mt-2 flex gap-1.5">
                  {(
                    [
                      ["grid", "3 Boards", "bg-[#e3ecfb] text-[#2556c5]"],
                      ["chat", "2 Channels", "bg-[#fde0e0] text-[#b91c1c]"],
                      ["doc", "5 Docs", "bg-[#ede4fd] text-[#6d28d9]"],
                    ] as const
                  ).map(([icon, label, tone]) => (
                    <span
                      key={label}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-[5px] px-2 py-[3px] text-[10px] font-medium",
                        tone,
                      )}
                    >
                      <BxIcon name={icon} size={12} />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <dl className="border-l border-[#e5e7eb] pl-3 text-[10.5px]">
                <dt className="text-[9.5px] text-[#6b7280]">Project</dt>
                <dd className="mb-1 font-medium">Brandsite</dd>
                <dt className="text-[9.5px] text-[#6b7280]">Owner</dt>
                <dd className="mb-1 font-medium">Townsoft Vina</dd>
                <dt className="text-[9.5px] text-[#6b7280]">Status</dt>
                <dd className="mb-1">
                  <em className="inline-block rounded-[5px] bg-[#fdeeb5] px-[9px] py-[3px] text-[10px] font-semibold text-[#b8860b] not-italic">
                    Active
                  </em>
                </dd>
                <div className="flex gap-3.5">
                  <span>
                    <dt className="text-[9.5px] text-[#6b7280]">Created</dt>
                    <dd className="font-medium">2026.06.01</dd>
                  </span>
                  <span>
                    <dt className="text-[9.5px] text-[#6b7280]">Deadline</dt>
                    <dd className="font-medium">2026.12.31</dd>
                  </span>
                </div>
              </dl>
            </div>
          </PdCard>

          <PdCard className="grid grid-cols-[170px_1fr] items-center gap-3">
            <div className="text-center">
              <b className="mb-1 block text-[13px]">Task distribution</b>
              <svg viewBox="0 0 110 110" className="mx-auto mb-1 block size-[120px]">
                <circle cx="55" cy="55" r={DONUT_R} fill="none" stroke="#e48b88" strokeWidth="16" />
                <circle
                  cx="55"
                  cy="55"
                  r={DONUT_R}
                  fill="none"
                  stroke="#34a853"
                  strokeWidth="16"
                  strokeDasharray={`${((DONUT_C * 76) / 100).toFixed(1)} ${DONUT_C.toFixed(1)}`}
                  transform="rotate(-90 55 55)"
                />
                <text
                  x="55"
                  y="54"
                  textAnchor="middle"
                  fontSize="17"
                  fontWeight="700"
                  fill="#1d1f24"
                >
                  76%
                </text>
                <text x="55" y="68" textAnchor="middle" fontSize="8.5" fill="#6b7280">
                  Completed
                </text>
              </svg>
              <div className="flex justify-center gap-2.5 text-[10px]">
                <span className="inline-flex items-center gap-1">
                  <i className="size-[7px] rounded-full bg-[#34a853]" />
                  Complete <b className="text-[11px]">120</b>
                </span>
                <span className="inline-flex items-center gap-1">
                  <i className="size-[7px] rounded-full bg-[#e48b88]" />
                  Incomplete <b className="text-[11px]">37</b>
                </span>
              </div>
            </div>
            <div>
              <div className="mb-2 grid grid-cols-3 gap-1.5">
                {(
                  [
                    ["Total Task", "157", "4 Boards", "text-[#2563eb]", ""],
                    ["Completed", "120", "+14 this week", "text-[#16a34a]", ""],
                    ["Overdue", "8", "2 Critical", "text-[#dc2626]", "text-[#dc2626]"],
                  ] as const
                ).map(([label, value, note, noteTone, valueTone]) => (
                  <div
                    key={label}
                    className="rounded-[7px] px-2 py-1.5 shadow-[inset_0_0_0_1px_#d1d5db]"
                  >
                    <small className="block text-[9.5px] text-[#4b5563]">{label}</small>
                    <b className={cn("block text-[17px] font-bold", valueTone)}>{value}</b>
                    <em className={cn("text-[9px] not-italic", noteTone)}>{note}</em>
                  </div>
                ))}
              </div>
              <b className="block text-[11.5px]">Progress by Board</b>
              <small className="block text-[9.5px] text-[#9ca3af]">Task completion per board</small>
              {PROGRESS.map((row) => (
                <div key={row.name} className="mt-[5px]">
                  <div className="flex items-center gap-[5px] text-[10px] font-medium">
                    <i className="size-[7px] rounded-full" style={{ background: row.color }} />
                    {row.name}
                    <span className="ml-auto text-[9.5px] font-normal text-[#9ca3af]">
                      {row.tasks} tasks
                    </span>
                    <em
                      className="w-[30px] text-right font-semibold not-italic"
                      style={{ color: row.color }}
                    >
                      {row.pct}%
                    </em>
                  </div>
                  <span className="mt-[3px] block h-1 overflow-hidden rounded bg-[#f1f2f4]">
                    <i
                      className="block h-full rounded"
                      style={{ width: `${row.pct}%`, background: row.color }}
                    />
                  </span>
                </div>
              ))}
            </div>
          </PdCard>
        </div>

        <div className="grid min-w-0 content-start gap-2.5">
          <PdCard>
            <div className="mb-1.5 flex items-center gap-1.5">
              <b className="text-[13px]">Memos</b>
              <span
                data-demo="memo-add"
                className="ml-auto text-[11px] font-semibold text-[#2556c5]"
              >
                + Add
              </span>
            </div>
            <div className="grid gap-1.5">
              {form && <MemoForm form={form} />}
              {memoAdded && (
                <Memo
                  tone="blue"
                  title={t.demo.title}
                  text={t.demo.text}
                  meta={`${t.demo.just} · ${owner}`}
                  className="bh-pop"
                />
              )}
              {memos.map((memo) => (
                <Memo key={memo.title} {...memo} />
              ))}
            </div>
          </PdCard>

          <PdCard>
            <div className="mb-1.5 flex items-center gap-1.5">
              <b className="text-[13px]">Deadlines</b>
              <span className="ml-auto inline-flex rounded-[6px] bg-[#f1f2f4] p-0.5 text-[9.5px]">
                {(
                  [
                    ["up", "Upcoming", "12"],
                    ["od", "Overdue", "8"],
                  ] as const
                ).map(([key, label, count]) => (
                  <i
                    key={key}
                    data-demo={`dead-${key}`}
                    className={cn(
                      "rounded-[5px] px-[7px] py-[3px] text-[#4b5563] not-italic",
                      tab === key &&
                        "bg-white font-semibold text-[#1d1f24] shadow-[0_1px_2px_rgba(0,0,0,0.1)]",
                    )}
                  >
                    {label}
                    <u
                      className={cn(
                        "ml-0.5 rounded-[6px] px-1 text-[8.5px] no-underline",
                        key === "od" ? "bg-[#dc2626] text-white" : "bg-[#e5e7eb]",
                      )}
                    >
                      {count}
                    </u>
                  </i>
                ))}
              </span>
            </div>
            <div key={tab} className={cn(tab === "od" && "bh-pop")}>
              {deadlines.map((item) => (
                <div
                  key={item.title}
                  className={cn(
                    "mt-[5px] border-l-[3px] py-1 pl-[9px]",
                    tab === "od" ? "border-[#e60000]" : "border-[#f5b301]",
                  )}
                >
                  <em
                    className={cn(
                      "rounded px-1.5 py-px text-[8.5px] not-italic",
                      tab === "od"
                        ? "bg-[#fcebef] text-[#c81e1e] shadow-[inset_0_0_0_1px_#f4b4b4]"
                        : "bg-[#fff3d6] text-[#a16207] shadow-[inset_0_0_0_1px_#f5d58a]",
                    )}
                  >
                    {item.left}
                  </em>
                  <b className="mt-0.5 block text-[10.5px]">{item.title}</b>
                  <small className="flex items-center gap-1 text-[9px] text-[#4b5563]">
                    <span className="flex">
                      <Av tone="green" size={14} />
                      <Av tone="purple" size={14} />
                    </span>
                    Front-end Board • Card 0013
                  </small>
                </div>
              ))}
            </div>
          </PdCard>
        </div>
      </div>
    </>
  );
}

function MemoForm({ form }: { form: MemoDraft }) {
  const field = (value: string | null, placeholder: string, caret: boolean, demo: string) => (
    <div
      data-demo={demo}
      className="min-h-5 rounded-[5px] px-[7px] py-1 shadow-[inset_0_0_0_1px_#d1d5db]"
    >
      {value === null ? (
        <span className="text-[#9ca3af]">{placeholder}</span>
      ) : (
        <Typed text={value} caret={caret} />
      )}
    </div>
  );
  const label = "mt-0.5 text-[8.5px] font-bold text-[#6b7280]";

  return (
    <div className="bh-pop grid gap-[3px] rounded-[7px] p-2 text-[10px] shadow-[inset_0_0_0_1px_#d6d9e0]">
      <div className="flex justify-between">
        <b>Add Memo</b>
        <BxIcon name="x" size={12} />
      </div>
      <span className={label}>TITLE</span>
      {field(form.title, "Add a subject", form.typing === "title", "memo-title")}
      <span className={label}>CONTENT</span>
      {field(form.text, "Type a message", form.typing === "text", "memo-text")}
      <span className={label}>COLOR</span>
      <div className="flex gap-[5px]">
        {MEMO_COLORS.map((color, index) => (
          <i
            key={color}
            data-demo={`memo-color-${index}`}
            className={cn(
              "size-4 rounded",
              index === form.color
                ? "shadow-[0_0_0_2px_#2556c5]"
                : "shadow-[inset_0_0_0_1px_#e5e7eb]",
            )}
            style={{ background: color }}
          />
        ))}
      </div>
      <b
        data-demo="memo-create"
        className="mt-[3px] inline-flex items-center gap-1 justify-self-center rounded-[5px] bg-[#2556c5] px-2.5 py-1 text-[9.5px] font-normal text-white"
      >
        <BxIcon name="share2" size={11} />
        Create memo
      </b>
    </div>
  );
}
