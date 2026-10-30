"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import type { BalhehAppCopy, BalhehContent } from "@/content/balheh-types";
import { BALHEH_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { AppWindow, BxToast } from "./app/app-ui";
import { ChatView, type ChatDialog, type ChatMenu } from "./app/chat-view";
import { DashView, type MemoDraft } from "./app/dash-view";
import { BoardView } from "./app/views";
import { WikiView, type WikiDraft } from "./app/wiki-view";

/** Khổ gốc của cửa sổ ứng dụng trong Figma (App mock · bx). */
const WINDOW_W = 1120;
const WINDOW_H = 601;

/** Thời lượng mỗi chương (file mẫu: SCENE_MS) — phần demo chạy hết thì con trỏ bấm sang màn sau. */
const CHAPTER_MS = [12500, 20000, 15500, 12500];

/** Trạng thái các màn hình trong demo; INITIAL là màn hình tĩnh như Figma. */
type Demo = {
  drag: boolean;
  moved: boolean;
  composing: string | null;
  added: boolean;
  typed: string | null;
  sent: boolean;
  menu: ChatMenu;
  task: boolean;
  dialog: ChatDialog;
  thread: boolean;
  newHover: boolean;
  draft: WikiDraft | null;
  form: MemoDraft | null;
  memoAdded: boolean;
  tab: "up" | "od";
  /** Mục thanh bên con trỏ đang rê (trước khi bấm sang màn sau). */
  hover: string | null;
  toast: string | null;
};

const INITIAL: Demo = {
  drag: false,
  moved: false,
  composing: null,
  added: false,
  typed: null,
  sent: false,
  menu: null,
  task: false,
  dialog: null,
  thread: false,
  newHover: false,
  draft: null,
  form: null,
  memoAdded: false,
  tab: "up",
  hover: null,
  toast: null,
};

/**
 * Một nhịp của kịch bản: at = mốc ms; move = đưa con trỏ tới phần tử data-demo (fx/fy = vị trí
 * trong phần tử, ms = thời gian di chuyển); tap = vòng chạm; set = đổi trạng thái màn hình.
 */
type Beat = {
  at: number;
  move?: { key: string; fx: number; fy: number; ms: number };
  tap?: true;
  set?: Partial<Demo> | ((demo: Demo) => Partial<Demo>);
};

/** Ghi kịch bản tuần tự như file mẫu (await moveTo, click, typeInto…), mỗi lệnh cộng dồn thời gian. */
class Script {
  beats: Beat[] = [];
  t = 0;

  wait(ms: number) {
    this.t += ms;
    return this;
  }

  move(key: string, ms = 700, fx = 0.5, fy = 0.5) {
    this.beats.push({ at: this.t, move: { key, fx, fy, ms } });
    this.t += ms + 60;
    return this;
  }

  tap() {
    this.beats.push({ at: this.t, tap: true });
    this.t += 220;
    return this;
  }

  set(set: Beat["set"]) {
    this.beats.push({ at: this.t, set });
    return this;
  }

  /** Gõ từng chữ với nhịp hơi lệch cho giống người gõ. */
  type(text: string, speed: number, make: (value: string) => Beat["set"]) {
    [...text].forEach((_, index) => {
      this.t += speed + ((index * 7) % 5) * speed * 0.15;
      this.set(make(text.slice(0, index + 1)));
    });
    return this;
  }

  toast(text: string) {
    this.beats.push({ at: this.t, set: { toast: text } });
    this.beats.push({ at: this.t + 1800, set: { toast: null } });
    return this;
  }

  /** Cuối chương: chờ đủ thời lượng rồi bấm mục thanh bên của màn sau. */
  finish(minMs: number, nav: string, hover: string) {
    this.t = Math.max(this.t, minMs - 1500);
    this.move(nav, 800, 0.4);
    this.set({ hover });
    this.wait(350).tap().wait(150);
    return this;
  }
}

function draftSet(make: (draft: WikiDraft) => Partial<WikiDraft>) {
  return (demo: Demo) => (demo.draft ? { draft: { ...demo.draft, ...make(demo.draft) } } : {});
}

function formSet(patch: Partial<MemoDraft>) {
  return (demo: Demo) => (demo.form ? { form: { ...demo.form, ...patch } } : {});
}

/** Kịch bản từng chương, theo file HTML tham khảo (sceneBoard, sceneChat, sceneWiki, sceneDash). */
function buildScript(chapter: number, app: BalhehAppCopy): Script {
  const s = new Script();

  if (chapter === 0) {
    s.wait(500).move("card-move", 900, 0.35, 0.4).tap();
    // Thẻ và con trỏ cùng trượt sang cột "Đang làm".
    s.set({ drag: true }).move("add-1", 1100, 0.35, 0.4);
    s.set({ drag: false, moved: true }).wait(700);
    s.move("add-0", 800).tap().set({ composing: "" });
    s.move("nc-input", 300, 0.2);
    s.type(app.board.newCard, 55, (value) => ({ composing: value }));
    s.move("nc-add", 500).tap().set({ composing: null, added: true });
    return s.finish(CHAPTER_MS[0], "nav-chat", "chat");
  }

  if (chapter === 1) {
    const d = app.chat.demo;
    const openMenu = (item: number) => {
      s.move("mine", 600, 0.6, 0.35)
        .set({ menu: { open: "bar", hover: -1 } })
        .wait(300);
      s.move("mine-dots", 500)
        .tap()
        .set({ menu: { open: "menu", hover: -1 } });
      s.move(`menu-${item}`, 500, 0.4).set({ menu: { open: "menu", hover: item } });
      s.wait(250).tap();
    };
    s.wait(300).move("chat-input", 800, 0.3).tap().set({ typed: "" });
    s.type(d.msg, 45, (value) => ({ typed: value }));
    s.move("chat-send", 450).tap().set({ typed: null, sent: true }).wait(700);
    openMenu(1);
    s.set({ menu: null, task: true }).toast(d.taskToast).wait(900);
    openMenu(0);
    s.set({ menu: null, dialog: { title: null, ready: false } }).wait(450);
    s.move("dlg-title", 600, 0.25)
      .tap()
      .set({ dialog: { title: "", ready: false } });
    s.type(d.thread, 60, (value) => ({ dialog: { title: value, ready: false } }));
    s.set({ dialog: { title: d.thread, ready: true } });
    s.move("dlg-create", 500).tap().set({ dialog: null, thread: true }).toast(d.threadToast);
    return s.finish(CHAPTER_MS[1], "nav-wiki", "wiki");
  }

  if (chapter === 2) {
    const d = app.wiki.demo;
    s.wait(400).move("wiki-new", 900).set({ newHover: true }).wait(250).tap();
    s.set({
      newHover: false,
      draft: {
        title: null,
        attend: "",
        dec: "",
        todos: [],
        rel: false,
        checked: false,
        typing: null,
      },
    });
    s.move("wiki-title", 600, 0.15)
      .tap()
      .set(draftSet(() => ({ title: "", typing: "title" })));
    s.type(d.page, 55, (value) => draftSet(() => ({ title: value })));
    s.set(draftSet(() => ({ typing: "attend" })));
    s.type(d.attend, 32, (value) => draftSet(() => ({ attend: value })));
    s.set(draftSet(() => ({ typing: "dec" })));
    s.type(d.dec, 45, (value) => draftSet(() => ({ dec: value })));
    d.todos.forEach((todo, index) => {
      s.set(draftSet((draft) => ({ typing: "todo", todos: [...draft.todos, ""] })));
      s.type(todo, 30, (value) =>
        draftSet((draft) => ({
          todos: draft.todos.map((item, i) => (i === index ? value : item)),
        })),
      );
    });
    s.set(draftSet(() => ({ typing: null, rel: true })));
    s.move("wiki-check", 700, 0.03)
      .tap()
      .set(draftSet(() => ({ checked: true })));
    s.toast(d.saved);
    return s.finish(CHAPTER_MS[2], "rail-dash", "dash");
  }

  const d = app.dash.demo;
  s.wait(900).move("memo-add", 900).tap();
  s.set({ form: { title: null, text: null, color: 0, typing: null } });
  s.move("memo-title", 600, 0.3)
    .tap()
    .set(formSet({ title: "", typing: "title" }));
  s.type(d.title, 50, (value) => formSet({ title: value }));
  s.move("memo-text", 400, 0.3)
    .tap()
    .set(formSet({ text: "", typing: "text" }));
  s.type(d.text, 28, (value) => formSet({ text: value }));
  s.set(formSet({ typing: null }));
  s.move("memo-color-2", 400)
    .tap()
    .set(formSet({ color: 2 }));
  s.move("memo-create", 450).tap().set({ form: null, memoAdded: true }).toast(d.toast);
  s.wait(700).move("dead-od", 800).tap().set({ tab: "od" });
  return s.finish(CHAPTER_MS[3], "rail-board", "board");
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Hero trang Balheh: tiêu đề, hai nút, rồi demo 4 chương trong cửa sổ trình duyệt (Figma: Hero +
 * Hero / Stage). Demo tự chạy: con trỏ kéo thẻ, gõ tin nhắn, soạn wiki, thêm memo rồi bấm sang
 * màn sau; bấm tab để nhảy chương, ❚❚ để dừng (về màn hình tĩnh như Figma). Tự dừng khi cuộn
 * khỏi màn hình hoặc khi bật "giảm chuyển động".
 */
export function BalhehHero({
  content,
  app,
}: {
  content: BalhehContent["hero"];
  app: BalhehAppCopy;
}) {
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
      threshold: 0.2,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const playing = !paused && !reducedMotion && inView;
  const script = useMemo(() => buildScript(chapter, app), [chapter, app]);
  const next = useCallback(() => setChapter((index) => (index + 1) % 4), []);

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const target = (index + delta + 4) % 4;
    setChapter(target);
    tabRefs.current[target]?.focus();
  }

  const contact = `#${BALHEH_SECTIONS.contact}`;

  return (
    <section
      id={BALHEH_SECTIONS.top}
      className="relative overflow-hidden rounded-b-[40px] bg-[image:var(--bh-hero-bg)] pt-9 pb-10"
    >
      <div className="bt-wrap flex flex-col items-center text-center">
        <h1 className="max-w-[914px] text-[60px] leading-[62.4px] font-semibold tracking-[-2.1px] text-balance text-ink max-[1200px]:text-[52px] max-[1200px]:leading-[56px] max-[600px]:text-[38px] max-[600px]:leading-[42px] max-[600px]:tracking-[-1.2px]">
          {content.title.lead}
          <span className="bt-kw [--kw-from:var(--bh-kw-from)] [--kw-to:var(--bh-kw-to)]">
            {content.title.kw}
          </span>
          {content.title.tail}
        </h1>
        <p className="mt-3.5 max-w-[732px] text-[19px] leading-[29.45px] text-pretty text-ink-muted max-[600px]:text-[17px] max-[600px]:leading-[27px]">
          {content.lead}
        </p>
        <div className="mt-[22px] flex flex-wrap justify-center gap-3">
          <a href={contact} className="bt-btn bt-btn-primary">
            {content.cta}
          </a>
          <a href={contact} className="bt-btn bt-btn-outline">
            {content.consult}
          </a>
        </div>
        <p className="mt-3 text-[13.5px] leading-[21.6px] text-ink-muted">{content.note}</p>

        <div className="mt-[29px] flex w-full max-w-[1120px] flex-col">
          <div
            role="tablist"
            aria-label={content.chaptersLabel}
            // Màn hẹp: vẫn 1 hàng như hero NhàLo, ẩn tên chương (chỉ còn số + thanh tiến độ).
            className="flex items-end gap-6 px-1 pb-[18px] max-md:items-center max-md:gap-4"
          >
            {content.chapters.map((label, index) => {
              const selected = index === chapter;
              return (
                <button
                  key={label}
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
                      {label}
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
                          animation: playing ? `bt-fill ${script.t}ms linear forwards` : undefined,
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
              className="col-span-2 flex size-11 shrink-0 items-center justify-center justify-self-end rounded-full border border-[rgba(35,48,94,0.3)] text-[12px] text-ink dark:border-line"
            >
              <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
            </button>
          </div>

          <div ref={stageRef} role="tabpanel" aria-label={content.chapters[chapter]}>
            <ScaledStage>
              {(scale) => (
                <ChapterDemo
                  // Đổi chương hoặc dừng/chạy thì dựng lại demo từ đầu.
                  key={`${chapter}-${playing}`}
                  chapter={chapter}
                  playing={playing}
                  script={script}
                  scale={scale}
                  onDone={next}
                  app={app}
                />
              )}
            </ScaledStage>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Thu nhỏ cửa sổ 1120px cho vừa bề ngang khung chứa (giữ nguyên bố cục như Figma). */
function ScaledStage({ children }: { children: (scale: number) => ReactNode }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const update = () => setScale(Math.min(1, box.clientWidth / WINDOW_W));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={boxRef} className="relative w-full" style={{ height: WINDOW_H * scale }}>
      <div
        className="absolute top-0 left-1/2 origin-top"
        style={{ width: WINDOW_W, transform: `translateX(-50%) scale(${scale})` }}
      >
        {children(scale)}
      </div>
    </div>
  );
}

type Cursor = { x: number; y: number; ms: number; on: boolean; taps: number };

function ChapterDemo({
  chapter,
  playing,
  script,
  scale,
  onDone,
  app,
}: {
  chapter: number;
  playing: boolean;
  script: Script;
  scale: number;
  onDone: () => void;
  app: BalhehAppCopy;
}) {
  // Người dùng mẫu (avatar HU): tên ngắn trong chat, tên đầy đủ trong memo.
  const me = { short: app.chat.people[0].name, full: app.wiki.owner };
  const [demo, setDemo] = useState<Demo>(INITIAL);
  const [cursor, setCursor] = useState<Cursor>({ x: 560, y: 320, ms: 0, on: false, taps: 0 });
  const boxRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(scale);

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    if (!playing) return;

    const moveTo = ({ key, fx, fy, ms }: NonNullable<Beat["move"]>) => {
      const box = boxRef.current;
      const target = box?.querySelector(`[data-demo="${key}"]`);
      if (!box || !target) return;
      const from = box.getBoundingClientRect();
      const rect = target.getBoundingClientRect();
      const s = scaleRef.current || 1;
      setCursor((value) => ({
        ...value,
        on: true,
        ms,
        x: (rect.left - from.left + rect.width * fx) / s,
        y: (rect.top - from.top + rect.height * fy) / s,
      }));
    };

    const timers = script.beats.map((beat) =>
      window.setTimeout(() => {
        if (beat.move) moveTo(beat.move);
        if (beat.tap) setCursor((value) => ({ ...value, taps: value.taps + 1 }));
        const set = beat.set;
        if (set)
          setDemo((value) => ({ ...value, ...(typeof set === "function" ? set(value) : set) }));
      }, beat.at),
    );
    timers.push(window.setTimeout(onDone, script.t));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [playing, script, onDone]);

  const view = (["board", "chat", "wiki", "dash"] as const)[chapter];

  return (
    <div ref={boxRef} className="relative">
      <AppWindow view={view} hover={demo.hover}>
        <div key={view} className="bt-fade flex h-full flex-col">
          {chapter === 0 && (
            <BoardView
              t={app.board}
              drag={demo.drag}
              moved={demo.moved}
              composing={demo.composing}
              added={demo.added}
            />
          )}
          {chapter === 1 && (
            <ChatView
              t={app.chat}
              me={me.short}
              typed={demo.typed}
              sent={demo.sent}
              menu={demo.menu}
              task={demo.task}
              dialog={demo.dialog}
              thread={demo.thread}
            />
          )}
          {chapter === 2 && <WikiView t={app.wiki} draft={demo.draft} newHover={demo.newHover} />}
          {chapter === 3 && (
            <DashView
              t={app.dash}
              owner={me.full}
              form={demo.form}
              memoAdded={demo.memoAdded}
              tab={demo.tab}
            />
          )}
        </div>
        <BxToast text={demo.toast} />
      </AppWindow>

      {/* Con trỏ demo. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 left-0 z-30 drop-shadow-[0_3px_6px_rgba(0,0,0,0.25)] transition-[transform,opacity] ease-[cubic-bezier(0.45,0.05,0.25,1)]",
          cursor.on ? "opacity-100" : "opacity-0",
        )}
        style={{
          transform: `translate(${cursor.x}px, ${cursor.y}px)`,
          transitionDuration: `${cursor.ms}ms, 300ms`,
        }}
      >
        <span
          key={cursor.taps}
          className={cn(
            "absolute -top-2.5 -left-2.5 size-6 scale-0 rounded-full bg-[rgba(37,86,197,0.35)]",
            cursor.taps > 0 && "nl-tap",
          )}
        />
        <svg width={22} height={22} viewBox="0 0 24 24">
          <path
            d="M4 2l15 9.5-6.6 1.4 3.9 7.4-3 1.5-3.9-7.4L4 19z"
            fill="#1d1f24"
            stroke="#fff"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
