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
import { TagChip } from "@/components/ui/tag-chip";
import type { BalhehAppCopy, BalhehFeaturesContent } from "@/content/balheh-types";
import { cn } from "@/lib/utils";

import { BxIcon } from "./app/app-ui";
import { CARD_SHOT_H, CardDetailShot } from "./app/card-detail-view";
import { ChatThreadShot } from "./app/chat-thread-view";
import { WikiSearchShot } from "./app/wiki-search-view";
import { AnnotatedShot, type AnnoSide } from "./features-anno";
import { LinkStage } from "./features-link";
import { BalhehSection } from "./parts";

/** Khổ gốc cửa sổ ứng dụng (như hero); màn chi tiết thẻ cao hơn một chút. */
const SHOT_W = 1120;
const SHOT_H = 601;

/** Mỗi bước hiện 9 giây rồi tự sang bước sau (file mẫu: FLOW_MS). */
const STEP_MS = 9000;

/** Cột của từng chú thích, theo Figma (số 1–4 bên trái ở màn thẻ…). */
const SIDES: AnnoSide[][] = [
  ["l", "l", "l", "l", "r", "r", "r"],
  ["l", "l", "l", "l", "r", "r", "r", "r"],
  ["l", "l", "l", "r", "r", "r", "r"],
];

/** Ô màu + icon trước tiêu đề từng màn (Figma: q-board, q-chat, q-wiki). */
const SCREEN_TILES: { icon: "kanban" | "chat" | "doc"; className: string }[] = [
  { icon: "kanban", className: "bg-[#108aff] text-white" },
  { icon: "chat", className: "bg-[#744bfe] text-white" },
  { icon: "doc", className: "bg-[#20201e] text-white dark:bg-white dark:text-[#20201e]" },
];

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * "Cách Balheh hoạt động" (Figma: How it works / Flow): 4 bước dạng tab, mỗi bước một màn hình
 * Balheh có chú thích; bước Kết nối cho người xem tự bấm thử. Tự chuyển bước sau 9 giây khi
 * section đang trên màn hình; dừng hẳn khi người xem bấm/dùng phím, và không tự chạy khi bật
 * "giảm chuyển động".
 */
export function BalhehFeatures({
  content,
  app,
}: {
  content: BalhehFeaturesContent;
  app: BalhehAppCopy;
}) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = content.tabs.length;
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(!!entry?.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const playing = auto && inView && !reducedMotion;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % count), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [playing, active, count]);

  const stopAuto = useCallback(() => setAuto(false), []);

  function select(index: number) {
    stopAuto();
    setActive(index);
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const targets: Record<string, number> = {
      ArrowRight: (index + 1) % count,
      ArrowLeft: (index - 1 + count) % count,
      Home: 0,
      End: count - 1,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(target);
    tabRefs.current[target]?.focus();
  }

  return (
    <BalhehSection
      id="features"
      // Quầng xanh giữa section (Figma: Frame 1000000829 — radial 720×553, 38%).
      className="bg-[radial-gradient(720px_553px_at_50%_50%,rgba(120,185,255,0.38),transparent)] dark:bg-[radial-gradient(720px_553px_at_50%_50%,rgba(120,185,255,0.1),transparent)]"
    >
      <Reveal className="mx-auto flex max-w-[920px] flex-col items-center gap-[18px] text-center">
        <TagChip label={content.tag} />
        <h2 className="bt-h2 text-balance text-ink">
          {content.title.lead} <span className="sm:block">{content.title.kw}</span>
        </h2>
        <p className="bt-lead max-w-[720px] text-pretty">{content.lead}</p>
      </Reveal>

      <div ref={sectionRef}>
        {/* Thanh 4 bước (Figma: Steps · Journey step). */}
        <div
          role="tablist"
          aria-label={content.tag}
          className="relative mx-auto mt-[54px] grid max-w-[1000px] grid-cols-4 max-md:mt-10"
        >
          <span
            aria-hidden="true"
            className="absolute top-[23px] right-[12.5%] left-[12.5%] h-[3px] overflow-hidden rounded-[3px] bg-line max-md:top-[19px]"
          >
            <span
              className="block h-full rounded-[3px] bg-accent transition-[width] duration-500"
              style={{ width: `${(active / (count - 1)) * 100}%` }}
            />
          </span>
          {content.tabs.map((label, index) => {
            const selected = index === active;
            const done = index < active;
            return (
              <button
                key={label}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`bh-flow-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`bh-flow-panel-${index}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={(event) => onTabKey(event, index)}
                className="relative flex flex-col items-center gap-3 max-md:gap-2"
              >
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full text-[17px] leading-none font-bold transition-[background-color,color,box-shadow] duration-300 max-md:size-10 max-md:text-[15px]",
                    selected && "bg-accent text-on-accent shadow-[0_0_0_8px_rgba(239,159,39,0.18)]",
                    done && "bg-ink text-page",
                    !selected && !done && "border-2 border-line bg-page text-ink-muted",
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    "text-center text-[18px] leading-[1.3] font-semibold max-md:text-[14px]",
                    selected ? "text-ink" : "text-ink-muted",
                  )}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {content.tabs.map((label, index) => (
          <div
            key={label}
            id={`bh-flow-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`bh-flow-tab-${index}`}
            hidden={index !== active}
            className="mt-7 rounded-[36px] bg-card-soft max-md:rounded-[24px]"
          >
            <div className="bt-fade">
              {index < 3 ? (
                <ScreenPanel index={index} content={content} app={app} />
              ) : (
                <div className="p-10 max-lg:px-5 max-lg:py-6">
                  <LinkStage
                    content={content.link}
                    card={content.card}
                    app={app}
                    onInteract={stopAuto}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </BalhehSection>
  );
}

/** Một màn hình có chú thích (Figma: Panel · Giao việc / Trao đổi / Lưu tài liệu). */
function ScreenPanel({
  index,
  content,
  app,
}: {
  index: number;
  content: BalhehFeaturesContent;
  app: BalhehAppCopy;
}) {
  const screen = content.screens[index];
  const tile = SCREEN_TILES[index];
  let shot: ReactNode;
  let height = SHOT_H;
  if (index === 0) {
    shot = <CardDetailShot t={content.card} />;
    height = CARD_SHOT_H;
  } else if (index === 1) {
    shot = <ChatThreadShot t={app.chat} reply={content.chat.reply} />;
  } else {
    shot = <WikiSearchShot t={app.wiki} search={content.search} />;
  }

  return (
    <div className="px-6 pt-8 pb-8 max-lg:px-4 max-lg:pt-6 max-lg:pb-6">
      <h3 className="mx-auto flex max-w-[860px] items-center justify-center gap-3 text-center text-[26px] leading-[33px] font-semibold tracking-[-0.52px] text-balance text-ink max-md:text-[20px] max-md:leading-[1.35]">
        <span
          aria-hidden="true"
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-[10px]",
            tile.className,
          )}
        >
          <BxIcon name={tile.icon} size={18} />
        </span>
        {screen.title}
      </h3>
      <div className="mt-7 max-md:mt-5">
        <AnnotatedShot
          width={SHOT_W}
          height={height}
          sides={SIDES[index]}
          callouts={screen.callouts}
        >
          {shot}
        </AnnotatedShot>
      </div>
    </div>
  );
}
