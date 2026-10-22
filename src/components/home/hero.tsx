"use client";

import { useEffect, useState, type CSSProperties } from "react";

import type { HeroScene, HomeContent } from "@/content/home-types";
import { cn } from "@/lib/utils";

import { Illustration, Rich } from "./parts";

/** Thời gian mỗi chương trước khi tự chuyển (Figma: Smart animate sau 7 giây). */
const CHAPTER_MS = 7000;

/**
 * Hero 4 chương (Figma: Section / Hero). Tự chuyển chương sau 7 giây, bấm tab để nhảy chương,
 * nút ❚❚ để tạm dừng. Người dùng bật "giảm chuyển động" thì không tự chuyển.
 */
export function Hero({ content }: { content: HomeContent["hero"] }) {
  const { chapters } = content;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const autoplay = !paused && !reducedMotion;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(
      () => setActive((index) => (index + 1) % chapters.length),
      CHAPTER_MS,
    );
    return () => window.clearTimeout(timer);
  }, [active, autoplay, chapters.length]);

  const chapter = chapters[active];

  return (
    <section className="bt-wrap">
      <div className="grid grid-cols-1 gap-14 pt-8 pb-5 lg:grid-cols-2">
        <div key={active} className="bt-fade flex flex-col justify-center lg:min-h-[525px]">
          <h1 className="bt-hero-title text-ink">
            <Rich text={chapter.title} />
          </h1>
          <p className="mt-6 max-w-[542px] text-[21px] leading-[32.5px] text-ink-muted max-sm:text-[17px] max-sm:leading-[27px]">
            {chapter.lead}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button type="button" className="bt-btn bt-btn-primary">
              {chapter.primary}
            </button>
            <button type="button" className="bt-btn bt-btn-outline">
              {chapter.secondary}
            </button>
          </div>
        </div>

        <HeroSceneBox scene={chapter.scene} paidPill={content.paidPill} />
      </div>

      <div
        role="tablist"
        aria-label={content.chaptersLabel}
        className="flex items-center gap-6 overflow-x-auto pt-[25px] pb-2"
      >
        {chapters.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.tab}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(index)}
              className="flex min-w-[140px] flex-1 flex-col gap-2 text-left"
            >
              <span className="flex items-center gap-3 whitespace-nowrap">
                <span className="text-[14px] leading-none font-bold text-accent-text">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "text-[17px] leading-none font-semibold",
                    selected ? "text-ink" : "text-ink-muted",
                  )}
                >
                  {item.tab}
                </span>
              </span>
              <span className="h-[3px] w-full overflow-hidden rounded-[3px] bg-bar-track">
                {selected && (
                  <span
                    // key đổi theo chương để thanh chạy lại từ đầu mỗi lần chuyển.
                    key={active}
                    className="block h-full bg-accent"
                    style={{
                      width: autoplay ? 0 : "100%",
                      animation: autoplay ? `bt-fill ${CHAPTER_MS}ms linear forwards` : undefined,
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
    </section>
  );
}

/**
 * Khung minh hoạ 644×540 của hero. Các thẻ đặt tuyệt đối theo toạ độ Figma; màn hẹp thì thu
 * nhỏ cả khung bằng scale để giữ bố cục.
 */
function HeroSceneBox({ scene, paidPill }: { scene: HeroScene; paidPill: string }) {
  return (
    <div aria-hidden="true" className="relative h-[540px] max-lg:h-[460px] max-sm:h-[292px]">
      {/* Quầng cam mờ phía sau (Figma: before). */}
      <div className="pointer-events-none absolute top-[81px] left-[65px] h-[845px] w-[1064px] bg-[radial-gradient(closest-side,rgba(239,159,39,0.45),rgba(239,159,39,0))] blur-[15px]" />
      <div
        key={scene}
        className="bt-fade absolute top-0 left-0 h-[540px] w-[644px] origin-top-left max-lg:scale-[0.85] max-sm:scale-[0.54]"
      >
        {scene === "cards" && (
          <>
            <Illustration
              src="/images/home/hero/ch1-dashboard.svg"
              width={469}
              height={288.8}
              exportWidth={589}
              exportHeight={409}
              offsetX={60}
              offsetY={30}
              priority
              className="absolute top-[43.9px] left-[42.8px]"
            />
            <Illustration
              src="/images/home/hero/ch1-rooms.svg"
              width={238}
              height={354}
              exportWidth={358}
              exportHeight={474}
              offsetX={60}
              offsetY={30}
              priority
              className="absolute top-[178.9px] left-[371.8px]"
            />
            <div className="bt-float absolute top-[458px] left-[70px] flex h-12 w-[227px] items-center gap-2.5 rounded-full bg-white px-5 py-3 text-[15px] leading-6 font-semibold whitespace-nowrap text-navy shadow-[0_20px_40px_rgba(166,95,0,0.18)]">
              <span className="size-2.5 rounded-full bg-paid" />
              {paidPill}
            </div>
          </>
        )}

        {scene === "apps" && (
          <div className="bt-float absolute top-[30px] left-0 w-[650px]">
            <Illustration
              src="/images/home/hero/ch2-apps.svg"
              width={650}
              height={470}
              exportWidth={752}
              exportHeight={580}
              offsetX={60}
              offsetY={30}
            />
          </div>
        )}

        {scene === "paper" && (
          <Illustration
            src="/images/home/hero/ch3-before-after.svg"
            width={650}
            height={500}
            exportWidth={762}
            exportHeight={640}
            offsetX={70}
            offsetY={36}
            className="absolute top-5 left-0"
          />
        )}

        {scene === "growth" && (
          <>
            <div
              className="bt-float absolute top-[60px] left-0 w-[460px]"
              style={{ "--bob": "3.6s" } as CSSProperties}
            >
              <Illustration
                src="/images/home/hero/ch4-chart.svg"
                width={460}
                height={409}
                exportWidth={580}
                exportHeight={519}
                offsetX={60}
                offsetY={30}
              />
            </div>
            <div className="bt-float absolute top-[-10px] left-[338.4px] w-[312px]">
              <Illustration
                src="/images/home/hero/ch4-notif1.svg"
                width={312}
                height={120}
                exportWidth={386}
                exportHeight={174}
                offsetX={32}
                offsetY={20}
              />
            </div>
            <div
              className="bt-float absolute top-[330px] left-[298.4px] w-[312px]"
              style={{ "--bob": "4s" } as CSSProperties}
            >
              <Illustration
                src="/images/home/hero/ch4-notif2.svg"
                width={312}
                height={120}
                exportWidth={426}
                exportHeight={174}
                offsetX={32}
                offsetY={20}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
