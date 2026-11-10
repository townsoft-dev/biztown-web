"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { Reveal } from "@/components/home/reveal";
import { AppMark } from "@/components/ui/app-mark";
import type { AppCopy, NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { AnnotatedScreen, type AnnoSide } from "./annotated-screen";
import { MsIcon, Phone } from "./app/app-ui";
import {
  AddHouseScreen,
  BatchScreen,
  BillsScreen,
  ReadingScreen,
  RentOutScreen,
  TenantBillScreen,
} from "./app/screens";
import { MascotArt, NhaloSectionHead } from "./parts";

const STEP_ICONS = ["home", "person", "bolt", "receipt_long", "send", "account_balance_wallet"];

/** Mọi chú thích nằm bên phải điện thoại; cột trái dành cho tiêu đề và các bước. */
const SIDES: AnnoSide[] = ["right", "right", "right", "right", "right", "right"];

/** Giữ lại bao lâu khi một bước đã chạy xong, trước khi sang bước sau. */
const HOLD_MS = 2600;

/** Điện thoại nhỏ hơn cỡ chuẩn để cả mục vừa một màn hình. */
const SCALE = "[--s:0.72] max-sm:[--s:0.7]";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Trạng thái các màn hình trong demo. */
type Demo = {
  rooms: number;
  phone: string;
  found: boolean;
  months: number;
  typing: "phone" | "cv" | null;
  typed: string;
  recorded: boolean;
  selected: number;
  paid: boolean;
  highlight: boolean;
  press: string | null;
};

const INITIAL: Demo = {
  rooms: 6,
  phone: "",
  found: false,
  months: 0,
  typing: null,
  typed: "",
  recorded: false,
  selected: 0,
  paid: false,
  highlight: false,
  press: null,
};

const A = (n: number) => `[data-anno="${n}"]`;
const D = (key: string) => `[data-demo="${key}"]`;

/** Một thao tác của con trỏ: lướt tới `cursor`, chạm, đổi màn hình (`set`), rồi các nhịp sau. */
type Act = { cursor: string; set?: Partial<Demo>; after?: [number, Partial<Demo>][] };

/**
 * Kịch bản một chú thích: `pin` là chỗ chấm số trỏ tới; con trỏ chạm vào `cursor` (mặc định
 * chính `pin`), có thể làm vài thao tác `pre` trước; xong thì chấm + thẻ giải thích hiện ra.
 */
type Spec = Partial<Act> & { pin: string; pre?: Act[] };

const SCRIPTS: { specs: Spec[]; tail?: [number, Partial<Demo>][] }[] = [
  // Thêm nhà: tên → bấm + hai lần (6 → 8 phòng, tên phòng tự thêm) → Tiếp tục.
  {
    specs: [
      { pin: A(2) },
      {
        pin: A(3),
        cursor: D("plus"),
        pre: [
          { cursor: D("plus"), set: { press: "plus", rooms: 7 }, after: [[250, { press: null }]] },
        ],
        set: { press: "plus", rooms: 8 },
        after: [[250, { press: null }]],
      },
      { pin: A(5), cursor: D("next"), set: { press: "next" }, after: [[250, { press: null }]] },
    ],
  },
  // Cho thuê: gõ SĐT → nhận ra hồ sơ cũ → +12 tháng → chỉ số → Cho thuê.
  {
    specs: [
      {
        pin: A(2),
        cursor: D("phone"),
        set: { typing: "phone" },
        after: [
          [220, { phone: "09" }],
          [220, { phone: "0912" }],
          [220, { phone: "0912 345" }],
          [350, { phone: "0912 345 678" }],
          [350, { found: true, typing: null }],
        ],
      },
      { pin: A(3), cursor: D("m12"), set: { months: 12 } },
      { pin: A(5) },
      { pin: A(6), cursor: D("save"), set: { press: "save" }, after: [[250, { press: null }]] },
    ],
  },
  // Ghi chỉ số: chọn tháng → gõ 1.348 cho P.103 → Lưu.
  {
    specs: [
      { pin: A(1) },
      {
        pin: D("cv"),
        set: { typing: "cv" },
        after: [
          [220, { typed: "1" }],
          [220, { typed: "13" }],
          [220, { typed: "134" }],
          [400, { typed: "1.348" }],
        ],
      },
      {
        pin: A(6),
        set: { press: "save" },
        after: [[250, { press: null, recorded: true, typing: null }]],
      },
    ],
  },
  // Tạo hoá đơn: chọn nhà/tháng → Chọn tất cả (tick lần lượt) → Tạo và gửi.
  {
    specs: [
      { pin: A(1) },
      {
        pin: D("all"),
        set: { press: "all" },
        after: [
          [200, { press: null, selected: 1 }],
          [200, { selected: 2 }],
          [200, { selected: 3 }],
          [350, { selected: 4 }],
        ],
      },
      { pin: A(6), set: { press: "go" }, after: [[250, { press: null }]] },
    ],
  },
  // Người thuê nhận: chỉ trỏ lần lượt.
  { specs: [{ pin: A(1) }, { pin: A(2) }, { pin: A(5) }] },
  // Thu tiền: tháng/nhà → nhãn quá hạn → chạm P.103, đánh dấu đã thu.
  {
    specs: [
      { pin: A(5) },
      { pin: A(4) },
      { pin: D("c103"), set: { highlight: true }, after: [[600, { paid: true }]] },
    ],
    tail: [[1000, { highlight: false }]],
  },
];

type Beat = {
  at: number;
  scroll?: string;
  move?: string;
  tap?: true;
  set?: Partial<Demo>;
  show?: number;
  toast?: true;
};

/** Trải kịch bản ra thành các mốc thời gian (ms) + tổng thời lượng. */
function timeline(step: number, toast: boolean) {
  const beats: Beat[] = [];
  let t = 500;
  const act = ({ cursor, set, after }: Act) => {
    beats.push({ at: t, scroll: cursor }, { at: t + 450, move: cursor });
    beats.push({ at: t + 1000, tap: true, set });
    t += 1100;
    for (const [ms, next] of after ?? []) {
      beats.push({ at: t, set: next });
      t += ms;
    }
  };
  const { specs, tail } = SCRIPTS[step];
  specs.forEach((spec, index) => {
    spec.pre?.forEach(act);
    act({ cursor: spec.cursor ?? spec.pin, set: spec.set, after: spec.after });
    beats.push({ at: t, show: index + 1 });
    t += 1000;
  });
  if (toast) {
    beats.push({ at: t, toast: true });
    t += 300;
  }
  for (const [ms, next] of tail ?? []) {
    beats.push({ at: t, set: next });
    t += ms;
  }
  return { beats, duration: t + HOLD_MS };
}

/** Trạng thái cuối của một bước (khi dừng, chọn bước, hoặc bật "giảm chuyển động"). */
function finalDemo(step: number): Demo {
  const { specs, tail } = SCRIPTS[step];
  const sets: Partial<Demo>[] = [];
  const collect = (act: Partial<Act>) => {
    if (act.set) sets.push(act.set);
    act.after?.forEach(([, next]) => sets.push(next));
  };
  specs.forEach((spec) => {
    spec.pre?.forEach(collect);
    collect(spec);
  });
  tail?.forEach(([, next]) => sets.push(next));
  const merged = sets.reduce<Demo>((state, next) => ({ ...state, ...next }), INITIAL);
  return { ...merged, press: null, typing: null, highlight: false };
}

function StepScreen({ step, demo, app }: { step: number; demo: Demo; app: AppCopy }) {
  // Trang hoá đơn người thuê không có thanh tiêu đề/thanh dưới: cả màn hình cuộn.
  if (step === 4) {
    return (
      <Phone key={step} scroll="screen" className={SCALE}>
        <TenantBillScreen t={app} />
      </Phone>
    );
  }
  return (
    <Phone key={step} scroll="body" className={SCALE}>
      {step === 0 && <AddHouseScreen t={app} rooms={demo.rooms} press={demo.press} />}
      {step === 1 && (
        <RentOutScreen
          t={app}
          phone={demo.phone}
          found={demo.found}
          months={demo.months}
          typing={demo.typing === "phone"}
          press={demo.press}
        />
      )}
      {step === 2 && (
        <ReadingScreen
          t={app}
          typed={demo.typed}
          recorded={demo.recorded}
          typing={demo.typing === "cv"}
          pressed={demo.press === "save"}
        />
      )}
      {step === 3 && (
        <BatchScreen
          t={app}
          selected={demo.selected}
          pressAll={demo.press === "all"}
          pressGo={demo.press === "go"}
        />
      )}
      {step === 5 && <BillsScreen t={app} paid={demo.paid} highlight={demo.highlight} />}
    </Phone>
  );
}

type Cursor = { x: number; y: number; on: boolean; taps: number };

/**
 * Một bước đang chiếu: con trỏ lướt tới từng chỗ, chạm, màn hình đổi theo (gõ số, tick, đã
 * thu…), rồi chấm số + thẻ giải thích hiện ra; xong cả bước thì báo `onDone`. Không chạy thì
 * hiện sẵn trạng thái cuối và mọi chú thích. Dựng lại (key) mỗi khi đổi bước hoặc dừng / chạy.
 */
function StepPlayer({
  step,
  playing,
  copy,
  app,
  start,
  onShown,
  onDone,
}: {
  step: number;
  playing: boolean;
  copy: NhaloContent["features"]["steps"][number];
  app: AppCopy;
  start: ReactNode;
  onShown: (count: number) => void;
  onDone: () => void;
}) {
  const total = copy.callouts.length;
  const [demo, setDemo] = useState<Demo>(() => (playing ? INITIAL : finalDemo(step)));
  const [shown, setShown] = useState(playing ? 0 : total);
  const [toast, setToast] = useState(false);
  const [cursor, setCursor] = useState<Cursor>({ x: 0, y: 0, on: false, taps: 0 });
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing) return;
    const box = boxRef.current;

    const find = (selector: string) => box?.querySelector<HTMLElement>(selector) ?? null;

    const scrollTo = (selector: string) => {
      const target = find(selector);
      const scroller = box?.querySelector<HTMLElement>("[data-scroller], .app-body");
      if (!target || !scroller) return;
      const V = scroller.getBoundingClientRect();
      const r = target.getBoundingClientRect();
      if (r.top < V.top + 24 || r.bottom > V.bottom - 24) {
        scroller.scrollBy({ top: r.top - V.top - V.height / 2 + r.height / 2, behavior: "smooth" });
      }
    };

    const moveTo = (selector: string) => {
      const target = find(selector);
      if (!box || !target) return;
      const from = box.getBoundingClientRect();
      const rect = target.getBoundingClientRect();
      setCursor((value) => ({
        ...value,
        on: true,
        x: rect.left - from.left + Math.min(rect.width * 0.6, rect.width - 12),
        y: rect.top - from.top + rect.height * 0.55,
      }));
    };

    const { beats, duration } = timeline(step, !!copy.toast);
    const timers = beats.map((beat) =>
      window.setTimeout(() => {
        if (beat.scroll) scrollTo(beat.scroll);
        if (beat.move) moveTo(beat.move);
        if (beat.tap) setCursor((value) => ({ ...value, taps: value.taps + 1 }));
        if (beat.set) setDemo((value) => ({ ...value, ...beat.set }));
        if (beat.show) {
          setShown(beat.show);
          onShown(beat.show);
        }
        if (beat.toast) setToast(true);
      }, beat.at),
    );
    timers.push(window.setTimeout(onDone, duration));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [playing, step, copy.toast, onShown, onDone]);

  const phone = (
    <div ref={boxRef} className="relative">
      <StepScreen step={step} demo={demo} app={app} />

      {copy.toast && (
        <div
          role="status"
          className={cn(
            "absolute top-[13%] left-1/2 z-[6] flex w-[290px] max-w-[calc(100vw-56px)] -translate-x-1/2 items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-[0_1px_1px_rgba(35,48,94,0.06),0_14px_30px_rgba(24,33,63,0.22)] transition-all duration-300",
            toast ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0",
          )}
        >
          {toast && (
            <>
              <AppMark mark={{ logo: "nhalo" }} size={36} radius={9} />
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[14px] leading-[1.35] font-semibold text-navy">
                  {copy.toast.title}
                </span>
                <span className="text-[12px] leading-[1.35] text-[#5a6283]">{copy.toast.sub}</span>
              </span>
            </>
          )}
        </div>
      )}

      {/* Con trỏ demo + vòng chạm. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 left-0 z-30 drop-shadow-[0_3px_6px_rgba(0,0,0,0.28)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.45,0.05,0.3,1)]",
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

  return (
    <AnnotatedScreen
      sides={SIDES}
      callouts={copy.callouts}
      targets={SCRIPTS[step].specs.map((spec) => spec.pin)}
      phone={phone}
      shown={shown}
      start={start}
    />
  );
}

/**
 * "Cách NhàLo hoạt động" (gộp demo tự chạy cũ ở hero với mục Tính năng): 4 bước, mỗi bước một
 * màn hình app có chấm số cam. Tự chạy như video — chấm 1, 2, 3… lần lượt hiện kèm thẻ giải
 * thích (màn hình tự cuộn tới chỗ đó), hiện hết thì sang bước sau. Bấm số bước để dừng lại xem
 * kỹ; ❚❚ / ▶ để dừng / chạy tiếp. Chỉ chạy khi mục đang trong màn hình và không bật "giảm
 * chuyển động" (khi đó hiện sẵn mọi chú thích).
 */
export function NhaloFeatures({
  content,
  app,
}: {
  content: NhaloContent["features"];
  app: AppCopy;
}) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const count = content.steps.length;
  const total = content.steps[active].callouts.length;
  const playing = !paused && inView && !reducedMotion;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(!!entry?.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const onShown = useCallback((value: number) => setProgress(value), []);
  const onDone = useCallback(() => {
    setActive((index) => (index + 1) % count);
    setProgress(0);
  }, [count]);

  // Đang chạy: thanh tiến độ theo số chú thích đã hiện; không chạy: bước đang xem đầy.
  const visible = playing ? progress : total;

  function pick(index: number) {
    setActive(index);
    setPaused(true);
  }

  function togglePlay() {
    // Chạy tiếp: chiếu lại bước đang xem từ đầu.
    setProgress(0);
    setPaused((value) => !value);
  }

  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const delta =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? 1
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? -1
          : 0;
    if (!delta) return;
    event.preventDefault();
    const target = (index + delta + count) % count;
    pick(target);
    tabRefs.current[target]?.focus();
  }

  const step = content.steps[active];

  const intro = (
    <div className="flex w-full flex-col gap-5 self-start min-[75rem]:pt-4">
      <div className="flex items-start gap-3">
        <div
          role="tablist"
          aria-label={content.tag}
          aria-orientation="vertical"
          className="flex flex-1 flex-col gap-1.5 max-[75rem]:grid max-[75rem]:grid-cols-6 max-[75rem]:gap-2 max-sm:grid-cols-3"
        >
          {content.steps.map((item, index) => {
            const selected = index === active;
            const progress = selected ? visible / item.callouts.length : index < active ? 1 : 0;
            return (
              <button
                key={item.tab}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`nl-step-${index}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`nl-panel-${index}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => pick(index)}
                onKeyDown={(event) => onKey(event, index)}
                className={cn(
                  "flex flex-col gap-2 rounded-2xl px-3.5 py-2.5 text-left transition-colors max-[75rem]:items-center max-[75rem]:px-1 max-[75rem]:text-center",
                  selected ? "bg-accent-tint" : "hover:bg-card-soft",
                )}
              >
                <span className="flex items-center gap-3 max-[75rem]:flex-col max-[75rem]:gap-1.5">
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-full text-[15px] leading-none font-bold transition-colors",
                      selected
                        ? "bg-accent text-on-accent"
                        : "border-2 border-line bg-card text-ink-muted",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={cn(
                      "text-[17px] leading-[1.3] font-semibold max-md:text-[13px]",
                      selected ? "text-ink" : "text-ink-muted",
                    )}
                  >
                    {item.tab}
                  </span>
                </span>
                <span className="h-[3px] w-full overflow-hidden rounded-[3px] bg-bar-track">
                  <span
                    className="block h-full bg-accent transition-[width] duration-500"
                    style={{ width: `${progress * 100}%` }}
                  />
                </span>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={paused ? content.playLabel : content.pauseLabel}
          title={paused ? content.playLabel : content.pauseLabel}
          className="mt-1.5 flex size-10 shrink-0 items-center justify-center rounded-full border border-[rgba(35,48,94,0.3)] text-[11px] text-ink dark:border-line"
        >
          <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
        </button>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id={NHALO_SECTIONS.features}
      className="bt-wrap scroll-mt-20 pt-6 pb-[72px] max-md:pb-14"
    >
      <NhaloSectionHead tag={content.tag} title={content.title} lead={content.lead} />

      <div className="relative mx-auto mt-10 max-w-[1264px] rounded-[32px] border border-[var(--nl-panel-ring)] bg-[linear-gradient(180deg,var(--accent-tint),transparent_85%)] px-8 pt-8 pb-6 max-sm:px-3">
        {/* Mascot ló đầu từ mép trái khung, tay chỉ vào điện thoại demo (màn rộng). */}
        <MascotArt
          name="lo-dau-chi-tay"
          className="absolute bottom-6 left-0 z-[1] w-[110px] max-[75rem]:hidden"
        />
        {/* Chỉ dựng màn hình của bước đang xem (Phone có key theo bước nên vùng cuộn về đầu). */}
        <div id={`nl-panel-${active}`} role="tabpanel" aria-labelledby={`nl-step-${active}`}>
          <StepPlayer
            key={`${active}-${playing}`}
            step={active}
            playing={playing}
            copy={step}
            app={app}
            onShown={onShown}
            onDone={onDone}
            start={
              <div className="flex w-full max-w-[400px] flex-col gap-4 justify-self-start max-[75rem]:max-w-none">
                <p className="flex items-center gap-3 text-[22px] leading-[1.3] font-bold text-ink max-[75rem]:hidden min-[75rem]:pt-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy text-accent">
                    <MsIcon name={STEP_ICONS[active]} size={22} />
                  </span>
                  {step.title}
                </p>
                {intro}
              </div>
            }
          />
        </div>
      </div>

      {/* "Và còn nữa": các tính năng phụ, mỗi thẻ vài dòng (giữ id cũ #dien-nuoc, #hop-dong). */}
      <div className="mx-auto mt-10 max-w-[1264px]">
        <h3 className="text-center text-[22px] leading-[1.3] font-bold text-ink">
          {content.more.title}
        </h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.more.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              id={item.anchor ? NHALO_SECTIONS[item.anchor] : undefined}
              style={{ transitionDelay: `${index * 90}ms` }}
              className="flex scroll-mt-28"
            >
              {/* Hiệu ứng rê chuột đặt ở lớp trong để không dính độ trễ hiện dần của Reveal. */}
              <div className="group relative flex w-full flex-col gap-2.5 overflow-hidden rounded-[24px] border border-line bg-card p-6 shadow-[0_12px_32px_var(--shadow-navy)] transition-[translate,box-shadow,border-color] duration-300 ease-out hover:-translate-y-2 hover:border-[rgba(239,159,39,0.6)] hover:shadow-[0_22px_44px_rgba(166,95,0,0.2)]">
                {/* Vầng cam loang ra từ góc khi rê chuột. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-[radial-gradient(circle,rgba(239,159,39,0.28),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="relative flex size-11 items-center justify-center rounded-xl bg-navy text-accent transition-[background-color,color,rotate,scale] duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-accent group-hover:text-on-accent">
                  <MsIcon name={item.icon} size={22} />
                </span>
                <span className="relative mt-1 text-[17px] leading-[1.35] font-semibold text-ink transition-colors duration-300 group-hover:text-accent-text">
                  {item.title}
                </span>
                <span className="relative text-[14.5px] leading-[1.55] text-ink-muted">
                  {item.desc}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
