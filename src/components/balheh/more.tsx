"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import type { BalhehAppCopy, BalhehMoreContent, BalhehMoreScreen } from "@/content/balheh-types";
import { cn } from "@/lib/utils";

import { BxIcon } from "./app/app-ui";
import {
  ActivityShot,
  AnalysisShot,
  GALLERY_H,
  GALLERY_W,
  LinksShot,
  NotificationShot,
  SettingsShot,
  type ShotMode,
  type ShotProps,
} from "./app/gallery-screens";
import { BalhehSection, BalhehSectionHead } from "./parts";

/** Thời gian mỗi tab khi tự chạy (file mẫu: GS.ms). */
const AUTO_MS = 7500;

const SHOTS: Record<BalhehMoreScreen, ComponentType<ShotProps>> = {
  ana: AnalysisShot,
  noti: NotificationShot,
  act: ActivityShot,
  set: SettingsShot,
  links: LinksShot,
};

/** Icon tab và ô vuông xanh trên thẻ chú thích (file mẫu: GICO). */
function ScreenIcon({ screen, size }: { screen: BalhehMoreScreen; size: number }) {
  if (screen === "act") {
    // "history" chưa có trong BxIcon nên vẽ riêng ở đây.
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="block shrink-0"
      >
        <path d="M3 3v5h5" />
        <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
        <path d="M12 7v5l4 2" />
      </svg>
    );
  }
  const name = ({ ana: "chart", noti: "bell", set: "gear", links: "link" } as const)[screen];
  return <BxIcon name={name} size={size} />;
}

function ArrowIcon({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(flip && "rotate-180")}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Thu nhỏ cửa sổ 956px cho vừa bề ngang cột (giữ nguyên bố cục như Figma). */
function ScaledShot({ children }: { children: ReactNode }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const update = () => setScale(Math.min(1, box.clientWidth / GALLERY_W));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={boxRef} className="relative w-full" style={{ height: GALLERY_H * scale }}>
      <div
        className="absolute top-0 left-1/2 origin-top"
        style={{ width: GALLERY_W, transform: `translateX(-50%) scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * "Khám phá thêm": 5 tab màn hình phụ của Balheh (Figma: Section · Khám phá thêm + Explore more /
 * Gallery). Tự chuyển tab sau 7,5 giây (thanh mảnh dưới tab đang chọn chạy theo), dừng khi rê
 * chuột lên khung hoặc cuộn khỏi màn hình; bấm tab, mũi tên hay phím ←/→ thì tắt tự chạy.
 */
export function BalhehMore({ content, app }: { content: BalhehMoreContent; app: BalhehAppCopy }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const count = content.tabs.length;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = !!entry?.isIntersecting;
        setInView(visible);
        if (visible) setSeen(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const showBar = auto && !reducedMotion;
  const running = showBar && inView && !hover;
  const mode: ShotMode = reducedMotion ? "static" : seen ? "play" : "wait";

  function show(index: number) {
    setAuto(false);
    setActive((index + count) % count);
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const target = (index + delta + count) % count;
    show(target);
    tabRefs.current[target]?.focus();
  }

  const tab = content.tabs[active];
  const Shot = SHOTS[tab.screen];

  return (
    <BalhehSection id="more">
      <div ref={sectionRef}>
        <BalhehSectionHead
          tag={content.tag}
          title={content.title}
          lead={content.lead}
          // Figma tô màu chữ cụm từ khoá (accent-text) thay cho vạch cam dưới chữ.
          className="max-w-[900px] [&_.bt-mark]:bg-none [&_.bt-mark]:text-accent-text"
        />

        <div
          role="tablist"
          aria-label={content.tag}
          className="mt-10 flex flex-wrap justify-center gap-2 max-[980px]:-mx-5 max-[980px]:[scrollbar-width:none] max-[980px]:flex-nowrap max-[980px]:justify-start max-[980px]:overflow-x-auto max-[980px]:px-5 max-[980px]:pb-1 max-[980px]:[&::-webkit-scrollbar]:hidden"
        >
          {content.tabs.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.screen}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`bh-more-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="bh-more-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => show(index)}
                onKeyDown={(event) => onTabKey(event, index)}
                className={cn(
                  "relative inline-flex h-12 shrink-0 items-center gap-2.5 overflow-hidden rounded-full pr-5 pl-2 text-[15px] font-semibold whitespace-nowrap transition-colors",
                  selected
                    ? "bg-accent text-on-accent"
                    : "border border-line bg-card pl-[7px] text-ink-muted shadow-[0_1px_2px_var(--shadow-soft)] hover:text-ink",
                )}
              >
                <i
                  className={cn(
                    "grid size-8 place-items-center rounded-full not-italic",
                    selected ? "bg-white/60 text-on-accent" : "bg-card-soft text-ink",
                  )}
                >
                  <ScreenIcon screen={item.screen} size={16} />
                </i>
                {item.label}
                {selected && showBar && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-4 bottom-[5px] h-0.5 overflow-hidden rounded-[2px]"
                  >
                    <u
                      className="block h-full w-0 animate-[bt-fill_linear_forwards] bg-[rgba(24,33,63,0.5)]"
                      style={{
                        animationDuration: `${AUTO_MS}ms`,
                        animationPlayState: running ? "running" : "paused",
                      }}
                      onAnimationEnd={() => setActive((index + 1) % count)}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div
          className="relative mt-[22px]"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <NavButton label={content.prevLabel} onClick={() => show(active - 1)} side="left" />
          <div
            id="bh-more-panel"
            role="tabpanel"
            aria-labelledby={`bh-more-tab-${active}`}
            className="grid grid-cols-[280px_minmax(0,1fr)] items-center gap-9 rounded-[36px] border border-[rgba(16,138,255,0.12)] bg-[#eef5ff] p-[35px] max-[980px]:grid-cols-1 max-[980px]:gap-5 max-[980px]:rounded-3xl max-[980px]:p-5 dark:border-line dark:bg-card"
          >
            <div key={`text-${active}`} className="bt-fade">
              <span className="grid size-[52px] place-items-center rounded-2xl bg-[#108aff] text-white shadow-[0_12px_24px_rgba(16,138,255,0.3)]">
                <ScreenIcon screen={tab.screen} size={24} />
              </span>
              <h3 className="mt-4 mb-4 text-[30px] leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-ink max-[980px]:text-[24px]">
                {tab.title}
              </h3>
              <ul className="grid gap-3">
                {tab.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2.5 text-[16px] leading-[1.45] text-ink-muted"
                  >
                    <span className="mt-px grid size-[22px] shrink-0 place-items-center rounded-full bg-[#e8f2ff] text-[#108aff] dark:bg-[#108aff]/20 dark:text-[#6db6ff]">
                      <svg
                        viewBox="0 0 24 24"
                        width={12}
                        height={12}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div key={`shot-${active}`} className="bt-fade min-w-0" aria-hidden="true">
              <ScaledShot>
                <Shot app={app} shots={content.shots} mode={mode} />
              </ScaledShot>
            </div>
          </div>
          <NavButton label={content.nextLabel} onClick={() => show(active + 1)} side="right" />
        </div>
      </div>
    </BalhehSection>
  );
}

function NavButton({
  label,
  onClick,
  side,
}: {
  label: string;
  onClick: () => void;
  side: "left" | "right";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-[3] grid size-12 -translate-y-1/2 place-items-center rounded-full bg-card text-ink shadow-[0_12px_16px_var(--shadow-navy)] transition-colors hover:bg-accent hover:text-on-accent max-[980px]:hidden",
        side === "left" ? "-left-5" : "-right-5",
      )}
    >
      <ArrowIcon flip={side === "left"} />
    </button>
  );
}
