"use client";

import { QRCodeSVG } from "qrcode.react";
import { type CSSProperties, useEffect, useState, useSyncExternalStore } from "react";

import { AppMark } from "@/components/ui/app-mark";
import { siteConfig } from "@/config/site";
import type { AppCopy, HeroIntro, NhaloContent } from "@/content/nhalo-types";
import { localizedPath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { MsIcon, Phone } from "./app/app-ui";
import { HomeScreen, TenantBillScreen } from "./app/screens";
import { DEFAULT_VARIANT } from "./hero-variant";
import { StoreBadges } from "./parts";
import { useNhaloLinks } from "./use-link-code";

/**
 * Icon các việc NhàLo lo, nổi bồng bềnh ở khoảng trống quanh hai điện thoại: vị trí (theo khung
 * cụm hình), glyph hoặc ảnh, màu nền, nhịp bồng bềnh. `wide` = chỉ hiện từ màn sm trở lên.
 */
const BUBBLES: {
  key: string;
  icon?: string;
  img?: string;
  /** Ảnh phủ kín ô (logo vuông có nền riêng). */
  fill?: boolean;
  pos: string;
  tone: string;
  bob: string;
  wide?: boolean;
}[] = [
  {
    key: "bolt",
    icon: "bolt",
    pos: "top-[3%] -left-[9%] max-sm:left-[1%]",
    tone: "bg-[#ffd84d] text-[#7a4b00] -rotate-6",
    bob: "3.4s",
  },
  {
    key: "zalo",
    img: "/images/nhalo/logo-zalo.png",
    pos: "top-[1%] left-[62%] max-sm:top-[30%] max-sm:right-[1%] max-sm:left-auto",
    tone: "bg-white rotate-6",
    bob: "4.1s",
  },
  {
    key: "vietqr",
    img: "/images/nhalo/logo-vietqr.png",
    fill: true,
    pos: "top-[50%] -left-[12%]",
    tone: "-rotate-3",
    bob: "3.8s",
    wide: true,
  },
  {
    key: "water",
    icon: "water_drop",
    pos: "top-[40%] -right-[3%] max-sm:top-[52%] max-sm:right-[1%]",
    tone: "bg-[#3aa7f0] text-white rotate-6",
    bob: "4.4s",
  },
  {
    key: "bell",
    icon: "notifications_active",
    pos: "top-[2%] -right-[2%]",
    tone: "bg-[#ff5a4e] text-white -rotate-6",
    bob: "3.6s",
    wide: true,
  },
];

/** Mỗi thông báo hiện bao lâu trước khi đổi sang cái tiếp theo. */
const TOAST_MS = 2400;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Màn hình đầu trang /nhalo/ cho người bấm quảng cáo (khớp banner Batdongsan): nhãn "Miễn phí
 * trọn đời" kèm ghi chú, tiêu đề, 4 ý có tick (hoặc 3 bước theo nguồn), QR to để quét bằng điện
 * thoại (máy tính) hoặc hai nút store (điện thoại), nút Zalo / Messenger. Bên phải: màn Trang
 * chủ app + hai ô nổi (như banner tuần 1), điện thoại thứ hai nghiêng phía sau (hoá đơn người
 * thuê có VietQR) và thông báo trượt lên lần lượt.
 *
 * Tiêu đề / danh sách của mọi nguồn đều có sẵn trong HTML, mỗi bản bọc trong data-nl-v; script
 * ở nhalo-page.tsx chọn bản theo utm_campaign trước khi trang hiện nên chữ không nháy, không
 * nhảy bố cục.
 */
export function NhaloHeroIntro({
  content,
  app,
  locale,
}: {
  content: NhaloContent["hero"];
  app: AppCopy;
  locale: Locale;
}) {
  const links = useNhaloLinks();
  const intros: { id: string; intro: HeroIntro }[] = [
    { id: DEFAULT_VARIANT, intro: content.intro },
    ...content.variants.map((variant) => ({ id: variant.id, intro: variant })),
  ];
  // Chưa có link OA Zalo / fanpage Messenger thì nút tạm dẫn tới trang Liên hệ.
  const contact = localizedPath(locale, "contact");
  const chat = [
    {
      href: siteConfig.nhaloChat.zalo || contact,
      label: content.chat.zalo,
      icon: "chat",
      className: "bg-[#0068ff] shadow-[0_8px_20px_rgba(0,104,255,0.35)]",
    },
    {
      href: siteConfig.nhaloChat.messenger || contact,
      label: content.chat.messenger,
      icon: "send",
      className:
        "bg-[linear-gradient(135deg,#0099ff,#a033ff_60%,#ff5280)] shadow-[0_8px_20px_rgba(160,51,255,0.35)]",
    },
  ];

  return (
    <div className="bt-wrap relative grid items-center gap-x-10 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)]">
      <div className="flex min-w-0 flex-col items-start gap-5">
        {/* Nhãn "Miễn phí trọn đời" + ghi chú ngắn bên cạnh (xuống dòng trên màn hẹp). */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="rounded-full bg-accent px-6 py-2.5 text-[20px] leading-none font-bold text-on-accent shadow-[0_8px_20px_rgba(239,159,39,0.4)] max-sm:text-[17px]">
            {content.badge}
          </span>
          <span className="flex flex-col border-l-2 border-accent pl-3 text-[14px] leading-[1.45] font-medium text-ink-muted">
            {content.note.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </span>
        </div>

        <h1 className="text-[56px] leading-[1.12] font-semibold tracking-[-1.6px] text-balance max-lg:text-[44px] max-sm:text-[34px] max-sm:tracking-[-1px]">
          {intros.map(({ id, intro }) => (
            <span key={id} data-nl-v={id}>
              <span className="block text-ink">{intro.headline[0]}</span>
              <span className="bt-kw -my-[0.2em] block py-[0.2em]">{intro.headline[1]}</span>
            </span>
          ))}
        </h1>

        {/* Điện thoại: hai nút store dài bằng nhau ngay dưới tiêu đề (không cần QR). */}
        <StoreBadges
          store={content.store}
          links={links}
          equal
          className="w-full max-w-[400px] flex-nowrap lg:hidden"
        />

        {intros.map(({ id, intro }) => (
          <div key={id} data-nl-v={id}>
            <IntroList intro={intro} />
          </div>
        ))}

        {/* Máy tính: QR to để quét bằng điện thoại, kèm hai nút store dài bằng nhau. */}
        <div className="mt-1 flex items-center gap-5 rounded-[28px] border border-[rgba(239,159,39,0.35)] bg-white/55 p-3.5 pr-6 shadow-[0_16px_36px_rgba(166,95,0,0.14)] backdrop-blur-[10px] max-lg:hidden dark:bg-white/8">
          <span className="rounded-[20px] bg-white p-1.5 shadow-[0_4px_12px_rgba(35,48,94,0.1)]">
            <QRCodeSVG
              value={links.qr}
              size={156}
              level="M"
              marginSize={2}
              bgColor="#ffffff"
              fgColor="#18213f"
              title={content.qr.alt}
              className="block"
            />
          </span>
          <div className="flex w-[184px] flex-col gap-3">
            <p className="text-[16px] leading-[1.35] font-semibold text-ink">{content.qr.label}</p>
            <StoreBadges
              store={content.store}
              links={links}
              height={50}
              className="flex-col items-start gap-2.5"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {chat.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener" : undefined}
              className={cn(
                "flex h-12 items-center gap-2.5 rounded-full px-5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5",
                item.className,
              )}
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-white/22">
                <MsIcon name={item.icon} size={17} />
              </span>
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <HeroStage content={content} app={app} />
    </div>
  );
}

/**
 * Cụm hình bên phải: vầng sáng cam, điện thoại phụ nghiêng phía sau (hoá đơn người thuê có
 * VietQR), điện thoại chính (Trang chủ, như banner tuần 1) với hai ô nổi, thông báo trượt lên.
 */
function HeroStage({ content, app }: { content: NhaloContent["hero"]; app: AppCopy }) {
  const [toast, setToast] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const count = content.toasts.length;

  useEffect(() => {
    if (reducedMotion || count < 2) return;
    const timer = window.setInterval(() => setToast((index) => (index + 1) % count), TOAST_MS);
    return () => window.clearInterval(timer);
  }, [reducedMotion, count]);

  const current = content.toasts[toast];

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-[calc(832px*var(--s)+40px)] w-full max-w-[540px] [--r:220px] [--s:0.62] max-sm:[--r:158px] max-sm:[--s:0.56] lg:[--r:248px] lg:[--s:0.72]"
    >
      {/* Vầng sáng phía sau. */}
      <span className="absolute top-1/2 left-1/2 size-[calc(var(--r)*1.8)] -translate-1/2 rounded-full bg-[radial-gradient(circle,rgba(239,159,39,0.45),transparent_68%)] blur-[6px]" />

      <span className="absolute top-1/2 left-1/2 size-[calc(var(--r)*2)] -translate-1/2 rounded-full border border-dashed border-[rgba(239,159,39,0.5)]" />

      {/* Icon các việc NhàLo lo, nổi quanh hai máy. */}
      {BUBBLES.map((item) => (
        <span
          key={item.key}
          className={cn("bt-float absolute z-[4]", item.pos, item.wide && "max-sm:hidden")}
          style={{ "--bob": item.bob } as CSSProperties}
        >
          <span
            className={cn(
              "flex size-14 items-center justify-center overflow-hidden rounded-2xl shadow-[0_12px_26px_rgba(24,33,63,0.2)] ring-4 ring-white/80 max-sm:size-11 max-sm:rounded-xl dark:ring-white/15",
              item.tone,
            )}
          >
            {item.img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.img} alt="" className={item.fill ? "size-full" : "w-[74%]"} />
            ) : (
              <MsIcon name={item.icon ?? ""} size={28} />
            )}
          </span>
        </span>
      ))}

      {/* Mascot nằm ghế biển bấm điện thoại: việc nhà trọ đã có NhàLo lo. */}
      <BeachMascot className="absolute top-[62%] -left-[36%] z-[4] w-[250px] max-xl:hidden" />

      {/* Điện thoại phụ: hoá đơn người thuê nhận qua Zalo, có VietQR. */}
      <div className="absolute top-[7%] left-[40%] rotate-[6deg] [--s:0.56] max-sm:hidden lg:[--s:0.62]">
        <Phone device>
          <TenantBillScreen t={app} compact />
        </Phone>
      </div>

      {/* Điện thoại chính: Trang chủ + hai ô nổi. */}
      <div className="absolute top-0 left-[2%] z-[2] max-sm:left-1/2 max-sm:-translate-x-1/2">
        <Phone device>
          <HomeScreen t={app} />
        </Phone>
        <FloatCard
          label={content.floats.vacant}
          value="4"
          tone="green"
          className="bt-float top-[calc(112px*var(--s))] -right-[56px] [--bob:3.6s] max-sm:-right-[36px]"
        />
        <FloatCard
          label={content.floats.unpaid}
          value="18.100.000 đ"
          tone="orange"
          className="bt-float top-[calc(240px*var(--s))] -left-[60px] [--bob:4.2s] max-sm:-left-[34px]"
        />
      </div>

      {/* Thông báo trượt lên lần lượt (dữ liệu mẫu). */}
      {current && (
        <div className="absolute -right-[4%] bottom-[5%] z-[5] w-[350px] max-sm:right-1/2 max-sm:bottom-0 max-sm:w-[320px] max-sm:translate-x-1/2">
          <div
            key={toast}
            className="flex items-center gap-3.5 rounded-[20px] border border-gray-100 bg-white px-4 py-3.5 shadow-[0_1px_1px_rgba(35,48,94,0.06),0_18px_36px_rgba(24,33,63,0.24)] motion-safe:animate-[bh-pop-in_0.35s_ease-out]"
          >
            <AppMark mark={{ logo: "nhalo" }} size={46} radius={12} />
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate text-[16px] leading-[1.3] font-semibold text-navy max-sm:text-[15px]">
                {current.title}
              </span>
              <span className="truncate text-[13.5px] leading-[1.35] text-[#5a6283]">
                {current.sub}
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function IntroList({ intro }: { intro: HeroIntro }) {
  if (intro.steps) {
    return (
      <ol className="flex flex-col gap-3.5">
        {intro.steps.map((step, index) => (
          <li key={step.title} className="flex items-start gap-3.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-[17px] leading-none font-bold text-on-accent">
              {index + 1}
            </span>
            <span className="flex flex-col gap-0.5 pt-0.5">
              <span className="text-[19px] leading-[1.35] font-semibold text-ink">
                {step.title}
              </span>
              <span className="text-[15px] leading-[1.45] text-ink-muted">{step.desc}</span>
            </span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul className="flex flex-col gap-3">
      {intro.points?.map((point) => (
        <li key={point} className="flex items-start gap-3">
          <MsIcon name="check_circle" size={26} className="shrink-0 text-chip-paid" />
          <span className="text-[19px] leading-[1.4] font-medium text-ink max-sm:text-[17px]">
            {point}
          </span>
        </li>
      ))}
    </ul>
  );
}

function FloatCard({
  label,
  value,
  tone,
  className,
}: {
  label: string;
  value: string;
  tone: "green" | "orange";
  className: string;
}) {
  return (
    <span
      className={cn(
        "absolute z-[2] flex flex-col rounded-[16px] border-[3px] bg-white px-4 py-1.5 shadow-[0_14px_30px_rgba(24,33,63,0.18)] max-sm:px-3 max-sm:py-1",
        tone === "green" ? "border-chip-paid" : "border-accent",
        className,
      )}
    >
      <span className="text-[13px] leading-[1.3] font-semibold whitespace-nowrap text-app-secondary">
        {label}
      </span>
      <span
        className={cn(
          "text-[24px] leading-[1.2] font-bold whitespace-nowrap max-sm:text-[18px]",
          tone === "green" ? "text-app-green" : "text-orange-800",
        )}
      >
        {value}
      </span>
    </span>
  );
}

/** Mascot NhàLo đi biển: nằm ghế dưới ô, đeo kính râm, bấm điện thoại (Figma Logo-Stuff 377:2486). */
function BeachMascot({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG minh hoạ, không cần tối ưu ảnh
    <img
      src="/images/nhalo/mascot-beach.svg"
      alt=""
      aria-hidden="true"
      width={650}
      height={545}
      className={cn("h-auto", className)}
    />
  );
}
