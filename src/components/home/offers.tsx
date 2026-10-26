import { AppMark, type AppMarkKind } from "@/components/ui/app-mark";
import type { HomeContent } from "@/content/home-types";
import { HOME_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { SectionHead } from "./parts";
import { Reveal } from "./reveal";

/** Lưới biểu tượng ứng dụng nghiêng -6° trong thẻ "Sản phẩm và Giải pháp sẵn có". */
const APP_GRID: AppMarkKind[] = [
  { logo: "nhalo" },
  { logo: "balheh" },
  { code: "HR", tone: "orange" },
  { code: "FN", tone: "slate" },
  { code: "SL", tone: "white" },
  { code: "BK", tone: "orange" },
  { code: "+", tone: "orange" },
];

/** Section "Hai cách BizTown đồng hành cùng bạn" (Figma: bt-section s-offers). */
export function Offers({ content }: { content: HomeContent["offers"] }) {
  return (
    <section id={HOME_SECTIONS.services} className="bt-wrap pt-[72px] pb-14">
      <SectionHead tag={content.tag} title={content.title} />
      <div className="mt-8 grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        {content.cards.map((card) => (
          <Reveal
            as="article"
            key={card.title}
            className={cn(
              "grid grid-cols-1 gap-4 overflow-hidden rounded-3xl p-10 max-sm:p-7 sm:grid-cols-[1fr_0.8fr]",
              card.art === "apps" ? "bg-card-warm" : "bg-card-soft",
            )}
          >
            <div className="flex min-w-0 flex-col items-start">
              <h3 className="text-[42px] leading-[45.4px] font-semibold tracking-[-1.26px] text-ink max-sm:text-[30px] max-sm:leading-9">
                {card.title}
              </h3>
              <ul className="mt-4 pl-[18px] text-[17px] leading-[30.6px] text-ink-muted">
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {/* "Xem tất cả ứng dụng" / "Xem dịch vụ" → section Khám phá. */}
              <a href={`#${HOME_SECTIONS.discover}`} className="bt-btn bt-btn-primary mt-7">
                {card.cta}
              </a>
            </div>
            <div aria-hidden="true" className="flex items-center justify-center">
              {card.art === "apps" ? <AppGrid /> : <BrowserMock />}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AppGrid() {
  return (
    <div className="grid -rotate-6 grid-cols-[repeat(3,64px)] gap-3.5">
      {APP_GRID.map((mark, index) =>
        "logo" in mark ? (
          <span
            key={index}
            className={cn(
              "flex size-16 items-center justify-center overflow-hidden rounded-[18px] shadow-[0_12px_32px_rgba(35,48,94,0.14)]",
              mark.logo === "balheh" && "border border-gray-100 bg-white",
            )}
          >
            <AppMark mark={mark} size={mark.logo === "nhalo" ? 64 : 40} surface="light" />
          </span>
        ) : (
          <AppMark
            key={index}
            mark={mark}
            size={64}
            radius={18}
            fontSize={18}
            className="shadow-[0_12px_32px_rgba(35,48,94,0.14)]"
          />
        ),
      )}
    </div>
  );
}

/** Khung trình duyệt giả nghiêng 4° trong thẻ "Web & App theo yêu cầu". */
function BrowserMock() {
  return (
    <div className="w-[257px] rotate-4 overflow-hidden rounded-2xl bg-white shadow-[0_12px_32px_rgba(35,48,94,0.14)]">
      <div className="flex min-h-[47.7px] gap-1.5 bg-gray-50 px-3 pt-2.5 pb-[11px]">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="size-[10.7px] bg-gray-100" />
        ))}
      </div>
      <div className="flex min-h-[240px] flex-col gap-2.5 p-5">
        <span className="h-[15.6px] w-[80.5px] rounded-[5px] bg-gray-100" />
        <span className="h-[103.7px] w-[205.8px] rounded-lg bg-orange-50" />
        <span className="h-[23.9px] w-[200.2px] rounded-[5px] bg-gray-100" />
        <span className="h-[19.7px] w-[140.4px] rounded-[5px] bg-gray-100" />
        <span className="h-[30.6px] w-[97.4px] rounded-full bg-accent" />
      </div>
    </div>
  );
}
