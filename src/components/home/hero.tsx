"use client";

import { useEffect, useState, type ComponentProps } from "react";

import type { HomeContent } from "@/content/home-types";
import { HOME_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { HeroSceneArt } from "./hero-scenes";
import { Rich } from "./parts";

/** Thời gian mỗi chương trước khi tự chuyển (Figma: Smart animate sau 7 giây). */
const CHAPTER_MS = 7000;

/**
 * Hero 4 chương (Figma: Section / Hero). Tự chuyển chương sau 7 giây, bấm tab để nhảy chương,
 * nút ❚❚ để tạm dừng. Người dùng bật "giảm chuyển động" thì không tự chuyển.
 */
export function Hero({
  content,
  apps,
}: {
  content: HomeContent["hero"];
  /** Danh sách ứng dụng + nhãn trạng thái (dùng chung với khối "Khám phá") cho cảnh chương 2. */
  apps: Pick<HomeContent["discover"], "apps" | "statusLabels">;
}) {
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
            <HeroButton
              label={chapter.primary}
              consult={chapter.consult === "primary"}
              className="bt-btn bt-btn-primary"
            />
            <HeroButton
              label={chapter.secondary}
              consult={chapter.consult === "secondary"}
              className="bt-btn bt-btn-outline"
            />
          </div>
        </div>

        <HeroSceneBox
          scene={chapter.scene}
          copy={content.scenes}
          paidPill={content.paidPill}
          apps={apps.apps}
          statusLabels={apps.statusLabels}
        />
      </div>

      <div
        role="tablist"
        aria-label={content.chaptersLabel}
        // Màn hẹp: 4 chương xếp 2 hàng × 2 cột (như file mẫu), nút tạm dừng đứng bên phải.
        className="grid grid-cols-[repeat(4,minmax(0,1fr))_44px] items-center gap-6 pt-[25px] pb-2 max-md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_44px] max-md:gap-x-4 max-md:gap-y-5"
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
              className="flex min-w-0 flex-col gap-2 text-left"
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
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[rgba(35,48,94,0.3)] text-[12px] text-ink max-md:col-start-3 max-md:row-span-2 max-md:row-start-1 dark:border-line"
        >
          <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
        </button>
      </div>
    </section>
  );
}

/** Nút ở hero; nút "Nhận tư vấn" là link cuộn xuống section liên hệ. */
function HeroButton({
  label,
  consult,
  className,
}: {
  label: string;
  consult: boolean;
  className: string;
}) {
  return consult ? (
    <a href={`#${HOME_SECTIONS.contact}`} className={className}>
      {label}
    </a>
  ) : (
    <button type="button" className={className}>
      {label}
    </button>
  );
}

/**
 * Khung minh hoạ 644×540 của hero. Các thẻ đặt tuyệt đối theo toạ độ file mẫu; màn hẹp thì thu
 * nhỏ cả khung bằng scale để giữ bố cục (chữ vẫn là HTML nên không bị mờ).
 */
function HeroSceneBox(props: ComponentProps<typeof HeroSceneArt>) {
  return (
    <div aria-hidden="true" className="relative h-[540px] max-lg:h-[460px] max-sm:h-[292px]">
      {/* Quầng cam mờ phía sau (Figma: before). */}
      <div className="pointer-events-none absolute top-[81px] left-[65px] h-[845px] w-[1064px] bg-[radial-gradient(closest-side,rgba(239,159,39,0.45),rgba(239,159,39,0))] blur-[15px]" />
      <div
        key={props.scene}
        className="bt-fade absolute top-0 left-0 h-[540px] w-[644px] origin-top-left max-lg:scale-[0.85] max-sm:scale-[0.54]"
      >
        <HeroSceneArt {...props} />
      </div>
    </div>
  );
}
