"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";

import { AppMark } from "@/components/ui/app-mark";
import type { AppCopy, NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { Phone, dots } from "./app/app-ui";
import {
  BatchScreen,
  BillsScreen,
  InvoiceScreen,
  ReadingScreen,
  TenantBillScreen,
  batchTotal,
  type InvoiceStatus,
} from "./app/screens";
import { Mascot, StoreBadges } from "./parts";

/** Mỗi chương chạy 6,5 giây rồi tự chuyển (Figma: NhàLo / Hero stage). */
const CHAPTER_MS = 6500;

/** Trạng thái các màn hình trong demo. */
type Demo = {
  typed: string;
  recorded: boolean;
  typing: boolean;
  pressed: string | null;
  selected: number;
  status: InvoiceStatus;
  sheet: boolean;
  channel: number;
  tenant: boolean;
  view: "list" | "detail";
  paid: boolean;
  highlight: boolean;
};

const INITIAL: Demo = {
  typed: "",
  recorded: false,
  typing: false,
  pressed: null,
  selected: 0,
  status: "draft",
  sheet: false,
  channel: -1,
  tenant: false,
  view: "list",
  paid: false,
  highlight: false,
};

/**
 * Kịch bản từng chương (theo file HTML tham khảo): at = mốc ms; move = đưa con trỏ tới phần tử
 * data-demo; tap = vòng chạm; set = đổi trạng thái màn hình; step = sáng bước thứ mấy ở cột
 * chú thích; toast = hiện thông báo thành công.
 */
type Beat = {
  at: number;
  move?: string;
  tap?: true;
  set?: Partial<Demo>;
  step?: number;
  toast?: true;
};

const SCRIPT: Beat[][] = [
  [
    { at: 500, move: "cv" },
    { at: 1200, tap: true },
    { at: 1250, set: { typing: true }, step: 0 },
    { at: 1600, set: { typed: "1" } },
    { at: 1800, set: { typed: "13" } },
    { at: 2000, set: { typed: "134" } },
    { at: 2200, set: { typed: "1.348" }, step: 1 },
    { at: 3100, move: "save" },
    { at: 3800, tap: true },
    { at: 3850, set: { pressed: "save" } },
    { at: 4100, set: { pressed: null, recorded: true, typing: false }, step: 2 },
    { at: 4200, toast: true },
  ],
  [
    { at: 300, step: 0 },
    { at: 600, move: "all" },
    { at: 1300, tap: true },
    { at: 1350, set: { pressed: "all" } },
    { at: 1550, set: { pressed: null, selected: 1 }, step: 1 },
    { at: 1750, set: { selected: 2 } },
    { at: 1950, set: { selected: 3 } },
    { at: 2150, set: { selected: 4 } },
    { at: 3000, move: "go" },
    { at: 3700, tap: true },
    { at: 3750, set: { pressed: "go" }, step: 2 },
    { at: 4000, set: { pressed: null } },
    { at: 4100, toast: true },
  ],
  [
    { at: 500, set: { sheet: true } },
    { at: 1300, move: "sms" },
    { at: 2000, tap: true },
    { at: 2050, set: { channel: 0 }, step: 0 },
    { at: 2800, move: "send" },
    { at: 3500, tap: true },
    { at: 3550, set: { pressed: "send" }, step: 1 },
    { at: 3800, set: { pressed: null, sheet: false, status: "sent" } },
    { at: 3900, toast: true },
    { at: 4300, set: { tenant: true }, step: 2 },
  ],
  [
    { at: 600, move: "c103" },
    { at: 1300, tap: true },
    { at: 1350, set: { highlight: true }, step: 0 },
    { at: 1700, set: { view: "detail", status: "sent" } },
    { at: 2500, move: "paid" },
    { at: 3200, tap: true },
    { at: 3250, set: { pressed: "paid" }, step: 1 },
    { at: 3500, set: { pressed: null, status: "paid" } },
    { at: 4300, set: { view: "list", paid: true, highlight: true }, step: 2 },
    { at: 4400, toast: true },
    { at: 5400, set: { highlight: false } },
  ],
];

/** Trạng thái cuối chương — dùng khi tạm dừng hoặc người dùng bật "giảm chuyển động". */
function finalDemo(chapter: number): Demo {
  const merged = SCRIPT[chapter].reduce<Demo>(
    (state, beat) => ({ ...state, ...beat.set }),
    INITIAL,
  );
  return { ...merged, pressed: null, highlight: false, typing: false };
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Hero trang NhàLo: tiêu đề, nút tải app, rồi demo 4 chương (Figma: Hero + NhàLo / Hero stage).
 * Demo tự chạy như video: con trỏ di chuyển, chạm, nhập số, hiện thông báo; bấm tab để nhảy
 * chương, ❚❚ để dừng. Tự dừng khi cuộn khỏi màn hình hoặc khi bật "giảm chuyển động".
 */
export function NhaloHero({ content, app }: { content: NhaloContent["hero"]; app: AppCopy }) {
  const [chapter, setChapter] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(!!entry?.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const playing = !paused && !reducedMotion && inView;
  const next = useCallback(() => setChapter((index) => (index + 1) % 4), []);

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const target = (index + delta + 4) % 4;
    setChapter(target);
    tabRefs.current[target]?.focus();
  }

  return (
    <section
      id={NHALO_SECTIONS.top}
      className="relative overflow-hidden rounded-b-[40px] bg-[image:var(--nl-hero-bg)] pt-14 pb-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[800px] bg-[linear-gradient(var(--nl-hero-grid)_1px,transparent_1px),linear-gradient(90deg,var(--nl-hero-grid)_1px,transparent_1px)] [mask-image:linear-gradient(180deg,#000_70%,transparent)] bg-size-[96px_96px]"
      />

      <div className="bt-wrap relative flex flex-col items-center text-center">
        <h1 className="bt-hero-title max-w-[1080px] pt-[22px] text-balance">
          <span className="block text-ink">{content.title[0]}</span>
          <span className="bt-kw -my-[0.2em] block py-[0.2em]">{content.title[1]}</span>
        </h1>
        <p className="bt-lead mt-[18px] mb-7 max-w-[680px] text-pretty">{content.lead}</p>
        <StoreBadges store={content.store} tone="hero" className="justify-center" />
        <p className="mt-3.5 text-[14px] leading-[22.4px] text-ink-muted">{content.note}</p>

        <div className="mt-11 flex w-full max-w-[1120px] flex-col gap-[18px]">
          <div
            role="tablist"
            aria-label={content.chaptersLabel}
            // Màn hẹp: vẫn 1 hàng như hero trang chủ, ẩn tên chương (chỉ còn số + thanh tiến độ).
            className="flex items-end gap-6 max-md:items-center max-md:gap-4"
          >
            {content.chapters.map((item, index) => {
              const selected = index === chapter;
              return (
                <button
                  key={item.tab}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setChapter(index)}
                  onKeyDown={(event) => onTabKey(event, index)}
                  className="flex min-w-0 flex-1 flex-col gap-2 text-left"
                >
                  <span className="flex items-center gap-3 whitespace-nowrap">
                    <span className="text-[14px] leading-none font-bold text-accent-text">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "truncate text-[17px] leading-none font-semibold max-md:sr-only",
                        selected ? "text-ink" : "text-ink-muted",
                      )}
                    >
                      {item.tab}
                    </span>
                  </span>
                  <span className="h-[3px] w-full overflow-hidden rounded-[3px] bg-bar-track">
                    {index < chapter && <span className="block h-full w-full bg-accent" />}
                    {selected && (
                      <span
                        // key đổi theo chương/trạng thái để thanh chạy lại từ đầu.
                        key={`${chapter}-${playing}`}
                        className="block h-full bg-accent"
                        style={{
                          width: playing ? 0 : "100%",
                          animation: playing
                            ? `bt-fill ${CHAPTER_MS}ms linear forwards`
                            : undefined,
                        }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? content.playLabel : content.pauseLabel}
              title={paused ? content.playLabel : content.pauseLabel}
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[rgba(35,48,94,0.3)] text-[12px] text-ink dark:border-line"
            >
              <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
            </button>
          </div>

          <div ref={stageRef}>
            <ChapterDemo
              // Đổi chương hoặc dừng/chạy thì dựng lại demo từ đầu (hoặc ở trạng thái cuối).
              key={`${chapter}-${playing}`}
              chapter={chapter}
              playing={playing}
              onDone={next}
              content={content}
              app={app}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type Cursor = { x: number; y: number; on: boolean; taps: number };

function ChapterDemo({
  chapter,
  playing,
  onDone,
  content,
  app,
}: {
  chapter: number;
  playing: boolean;
  onDone: () => void;
  content: NhaloContent["hero"];
  app: AppCopy;
}) {
  const [demo, setDemo] = useState<Demo>(() => (playing ? INITIAL : finalDemo(chapter)));
  const [step, setStep] = useState(playing ? -1 : 2);
  const [toast, setToast] = useState(!playing);
  const [cursor, setCursor] = useState<Cursor>({ x: 0, y: 0, on: false, taps: 0 });
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing) return;

    const moveTo = (key: string) => {
      const box = boxRef.current;
      const target = box?.querySelector(`[data-demo="${key}"]`);
      if (!box || !target) return;
      const from = box.getBoundingClientRect();
      const rect = target.getBoundingClientRect();
      setCursor((value) => ({
        ...value,
        on: true,
        x: rect.left - from.left + rect.width * 0.6,
        y: rect.top - from.top + rect.height * 0.55,
      }));
    };

    const timers = SCRIPT[chapter].map((beat) =>
      window.setTimeout(() => {
        if (beat.move) moveTo(beat.move);
        if (beat.tap) setCursor((value) => ({ ...value, taps: value.taps + 1 }));
        if (beat.set) setDemo((value) => ({ ...value, ...beat.set }));
        if (beat.step !== undefined) setStep(beat.step);
        if (beat.toast) setToast(true);
      }, beat.at),
    );
    timers.push(window.setTimeout(onDone, CHAPTER_MS));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [chapter, playing, onDone]);

  const chapterCopy = content.chapters[chapter];

  return (
    <div
      ref={boxRef}
      role="tabpanel"
      aria-label={chapterCopy.tab}
      className="relative grid grid-cols-1 items-center gap-10 rounded-[32px] border border-[var(--nl-panel-ring)] bg-white/70 p-6 text-left shadow-[0_30px_60px_rgba(166,95,0,0.16)] md:grid-cols-[auto_1fr] md:p-10 min-[75rem]:min-h-[740px] min-[75rem]:grid-cols-[1fr_316px_1fr] dark:bg-card/75 dark:shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
    >
      {/* Cột chú thích chương (Figma: Chapter caption). */}
      <div
        aria-live="polite"
        className="flex flex-col gap-3 self-start md:col-span-2 min-[75rem]:col-span-1 min-[75rem]:pt-10"
      >
        <p className="text-[14px] leading-none font-semibold text-accent-text">
          {String(chapter + 1).padStart(2, "0")} / 04
        </p>
        <h2 className="text-[24px] leading-[38.4px] font-bold text-ink">{chapterCopy.title}</h2>
        <p className="text-[16px] leading-[25.6px] text-ink-muted">{chapterCopy.lead}</p>
        <ol className="flex flex-col gap-2.5 pt-2.5">
          {chapterCopy.steps.map((label, index) => {
            const lit = index <= step;
            return (
              <li key={label} className="flex items-start gap-2.5">
                <span
                  className={cn(
                    "flex size-[22px] shrink-0 items-center justify-center rounded-full text-[12px] leading-none font-semibold transition-colors duration-300",
                    lit
                      ? "bg-accent text-on-accent"
                      : "bg-gray-100 text-ink-muted dark:bg-card-gray",
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    "text-[14px] leading-[22.4px] transition-colors duration-300",
                    lit ? "text-ink" : "text-ink-muted",
                  )}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Điện thoại + thông báo thành công (Figma: Demo phone). */}
      <div className="relative justify-self-center [--s:0.66] sm:[--s:0.8]">
        {/* Cả 4 chương cùng một khung 316×666 (màn 812, --s 0.8) như Figma Hero / Stage. */}
        <Phone>
          <DemoScreen chapter={chapter} demo={demo} app={app} />
        </Phone>
        <div
          role="status"
          className={cn(
            "absolute bottom-[calc(85px*var(--s)/0.8)] left-1/2 z-[6] flex w-[320px] max-w-[calc(100vw-56px)] items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-[0_1px_1px_rgba(35,48,94,0.06),0_12px_28px_rgba(24,33,63,0.18)] transition-all duration-300",
            toast
              ? "-translate-x-1/2 opacity-100"
              : "pointer-events-none -translate-x-1/2 translate-y-2 opacity-0",
          )}
        >
          {toast && (
            <>
              <AppMark mark={{ logo: "nhalo" }} size={36} radius={9} />
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[14px] leading-[18.9px] font-semibold text-navy">
                  {chapterCopy.toast.title}
                </span>
                <span className="text-[12px] leading-[16.2px] text-[#5a6283]">
                  {chapterCopy.toast.sub}
                </span>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Thẻ tóm tắt + linh vật (Figma: Chapter summary). */}
      <div className="hidden flex-col items-center gap-3.5 md:flex">
        <Summary chapter={chapter} demo={demo} content={content} app={app} />
      </div>

      {/* Con trỏ demo. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 left-0 z-30 drop-shadow-[0_3px_6px_rgba(0,0,0,0.28)] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.45,0.05,0.3,1)]",
          cursor.on ? "opacity-100" : "opacity-0",
        )}
        style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
      >
        <span
          key={cursor.taps}
          className={cn(
            "absolute -top-3.5 -left-3.5 size-7 scale-0 rounded-full bg-accent/45",
            cursor.taps > 0 && "nl-tap",
          )}
        />
        <svg width={26} height={30} viewBox="0 0 26 30">
          <path
            d="M3 2l19 12-8.5 1.6L18 25l-3.6 1.8-4.6-9.4L3 23z"
            fill="#fff"
            stroke="#18213f"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}

function DemoScreen({ chapter, demo, app }: { chapter: number; demo: Demo; app: AppCopy }) {
  if (chapter === 0) {
    return (
      <ReadingScreen
        t={app}
        typed={demo.typed}
        recorded={demo.recorded}
        typing={demo.typing}
        pressed={demo.pressed === "save"}
      />
    );
  }
  if (chapter === 1) {
    return (
      <BatchScreen
        t={app}
        selected={demo.selected}
        pressAll={demo.pressed === "all"}
        pressGo={demo.pressed === "go"}
      />
    );
  }
  if (chapter === 2 || demo.view === "detail") {
    return (
      <InvoiceScreen
        t={app}
        status={demo.status}
        sheet={demo.sheet}
        channel={demo.channel}
        pressSend={demo.pressed === "send"}
        pressPaid={demo.pressed === "paid"}
      />
    );
  }
  return <BillsScreen t={app} paid={demo.paid} highlight={demo.highlight} />;
}

function Summary({
  chapter,
  demo,
  content,
  app,
}: {
  chapter: number;
  demo: Demo;
  content: NhaloContent["hero"];
  app: AppCopy;
}) {
  const s = content.summary;

  if (chapter === 2 && demo.tenant) {
    return (
      <div className="bt-fade flex flex-col items-center gap-3.5">
        <p className="text-center text-[14px] leading-none font-semibold text-ink">
          {s.tenantLabel}
        </p>
        {/* Figma: khung 197.5×417 — màn 812 chuẩn ở tỉ lệ 0.5, nội dung rút gọn. */}
        <Phone className="[--s:0.5]">
          <TenantBillScreen t={app} compact />
        </Phone>
      </div>
    );
  }

  let card = null;
  if (chapter === 0) {
    const complete = demo.recorded || demo.typed === "1.348";
    card = (
      <SummaryCard
        title={s.reading.title}
        rows={[
          [s.reading.previous, "1.284"],
          [s.reading.current, demo.recorded ? "1.348" : demo.typed || "—"],
          [s.reading.used, complete ? "64 kWh" : "—"],
          [s.reading.amount, complete ? "243.200đ" : "—"],
        ]}
      />
    );
  } else if (chapter === 1) {
    card = (
      <SummaryCard
        title={s.batch.title}
        rows={[
          [s.batch.ready, "4"],
          [s.batch.missing, "1"],
          [s.batch.total, `${dots(batchTotal(demo.selected))}đ`],
        ]}
      />
    );
  } else if (chapter === 3) {
    card = (
      <div className="flex w-full flex-col gap-[5px] rounded-[18px] border border-line bg-card p-[18px] shadow-[0_12px_32px_var(--shadow-navy)]">
        <p className="text-[14px] leading-[22.4px] text-ink-muted">{s.collect.title}</p>
        <p className="text-[21px] leading-[27.3px] font-semibold text-ink">
          {demo.paid ? "14.916.800đ" : "18.100.000đ"}
        </p>
      </div>
    );
  }

  return (
    <>
      {card}
      <span className="relative">
        <Mascot size={170} className="bt-float" />
        <span className="absolute top-[158px] -left-[37px] w-[150px] rounded-[16px_16px_16px_4px] bg-white py-2.5 pr-9 pl-3.5 text-[13px] leading-[17.55px] font-semibold text-navy shadow-[0_12px_16px_rgba(35,48,94,0.14)]">
          {content.bubble}
        </span>
      </span>
    </>
  );
}

function SummaryCard({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="flex w-full flex-col gap-[5px] rounded-[18px] border border-line bg-card p-[18px] text-[14px] shadow-[0_12px_32px_var(--shadow-navy)]">
      <p className="leading-[22.4px] text-ink-muted">{title}</p>
      {rows.map(([label, value]) => (
        <div key={label} className="flex gap-2.5 border-b border-line py-[9px]">
          <span className="flex-1 leading-[22.4px] text-ink-muted">{label}</span>
          <span className="flex-1 text-right font-semibold text-ink">{value}</span>
        </div>
      ))}
    </div>
  );
}
