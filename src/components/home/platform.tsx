"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Phone } from "@/components/nhalo/app/app-ui";
import { HomeScreen, TenantBillScreen } from "@/components/nhalo/app/screens";
import { MascotArt } from "@/components/nhalo/parts";
import { AppMark } from "@/components/ui/app-mark";
import { Icon } from "@/components/ui/icon";
import { StatusBadge } from "@/components/ui/status-badge";
import { siteConfig } from "@/config/site";
import type { HomeContent, Product, ProductKey, ProductLogo } from "@/content/home-types";
import type { AppCopy } from "@/content/nhalo-types";
import { HOME_SECTIONS, localizedPath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { CursorGlow } from "./cursor-glow";
import { Illustration } from "./parts";
import { Reveal } from "./reveal";

/** Mockup bên phải mỗi slide: khung Figma 599×h, file export có thêm 60/30px bóng đổ. */
const VISUALS: Record<
  Exclude<ProductKey, "chinchu" | "nhalo">,
  { src: string; height: number; exportHeight: number }
> = {
  // .webp thay .svg: bản SVG là 695 KB (236 KB sau nén) cho một ảnh toàn path, nằm ở slide
  // hiện mặc định nên tải trong mọi lượt vào trang chủ. Raster còn 126 KB.
  // Khổ 1416 px = 2× bề rộng hiển thị tối đa: ảnh rộng exportWidth/width = 708/599 ≈ 118%
  // của khung 599 px, tức 708 CSS px — lấy 599×2 là thiếu nét trên màn hình retina.
  // .webp thay .png: cùng khổ 1416×1002 nhưng 88 KB thay vì 189 KB (images.unoptimized
  // nên Next phục vụ nguyên file, không tự đổi định dạng).
  balheh: { src: "/images/home/products/balheh.webp", height: 439.5, exportHeight: 501 },
  hr: { src: "/images/home/products/hr.svg", height: 417, exportHeight: 470 },
  finance: { src: "/images/home/products/finance.svg", height: 498, exportHeight: 577 },
  sales: { src: "/images/home/products/sales.svg", height: 417, exportHeight: 488 },
  custom: { src: "/images/home/products/custom.svg", height: 416, exportHeight: 454 },
};

/** Section "Một hệ sinh thái | Đa dạng giải pháp" — chọn sản phẩm bằng chip, mũi tên, chấm. */
export function Platform({
  content,
  locale,
  nhaloApp,
}: {
  content: HomeContent["platform"];
  locale: Locale;
  nhaloApp: AppCopy;
}) {
  const { products } = content;
  const [active, setActive] = useState(0);
  const product = products[active];
  const go = (index: number) => setActive((index + products.length) % products.length);
  const first = active === 0;
  const tabsRef = useRef<HTMLDivElement>(null);

  // Màn hẹp chip cuộn ngang: đổi sản phẩm (mũi tên, chấm) thì kéo chip đang chọn vào giữa.
  // Chỉ cuộn ngang trong dải chip, không dùng scrollIntoView để trang không bị nhảy dọc.
  useEffect(() => {
    const list = tabsRef.current;
    const chip = list?.children[active] as HTMLElement | undefined;
    if (!list || !chip || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: chip.offsetLeft - (list.clientWidth - chip.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <section id={HOME_SECTIONS.products} className="bt-wrap pt-12 pb-16">
      {/* immediate: khối ngay dưới hero, trên màn hẹp lọt vào màn hình đầu — không để nó
          phụ thuộc vào lúc JS chạy xong. */}
      <Reveal immediate>
        <div className="flex flex-wrap items-center justify-center gap-x-[22px] text-center">
          <h2 className="bt-h2 lg:whitespace-nowrap">{content.title}</h2>
          <span
            aria-hidden="true"
            className="h-[54px] w-[3px] rounded-[3px] bg-accent max-sm:hidden"
          />
          {/* py: chữ tô gradient (background-clip: text) bị cắt mất dấu và chân chữ "g", "p"
              nếu hộp chữ sát dòng — nới hộp ra rồi bù lại bằng margin âm. */}
          <p className="bt-h2 bt-kw -my-[0.12em] py-[0.12em] lg:whitespace-nowrap">
            {first ? content.keyword.first : content.keyword.other}
          </p>
        </div>
        <p className="bt-lead mx-auto mt-[18px] max-w-[702px] text-center">
          {first ? content.lead.first : content.lead.other}
        </p>

        <div
          ref={tabsRef}
          role="tablist"
          aria-label={content.pickerLabel}
          // Màn hẹp: chip nằm 1 hàng, vuốt ngang để xem; tràn sát mép màn hình, chừa chỗ cho bóng.
          className="relative mt-8 flex flex-wrap justify-center gap-2.5 max-md:-mx-5 max-md:mt-6 max-md:[scrollbar-width:none] max-md:flex-nowrap max-md:justify-start max-md:overflow-x-auto max-md:px-5 max-md:pt-1 max-md:pb-6 max-md:[&::-webkit-scrollbar]:hidden"
        >
          {products.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(index)}
                className={cn(
                  "flex h-[52px] shrink-0 items-center justify-center gap-3 rounded-full border px-5 text-[15.5px] leading-none font-medium whitespace-nowrap transition-all duration-200",
                  selected
                    ? "border-transparent bg-accent text-on-accent shadow-[0_10px_30px_rgba(239,159,39,0.35)]"
                    : "border-chip-ring bg-chip text-ink-muted hover:-translate-y-0.5 hover:text-ink hover:shadow-[0_10px_24px_var(--shadow-navy)]",
                )}
              >
                <AppMark mark={item.mark} size={36} />
                {item.chip}
              </button>
            );
          })}
          {/* Cùng hàng với các nhãn: còn sản phẩm khác sắp ra mắt. */}
          <span className="flex h-[52px] shrink-0 items-center rounded-full border border-dashed border-line-strong px-6 text-[14.5px] whitespace-nowrap text-ink-muted italic">
            {content.more}
          </span>
        </div>
      </Reveal>

      <Reveal>
        <div className="relative mt-8 max-md:mt-3">
          <ProductSlide
            key={product.key}
            product={product}
            statusLabels={content.statusLabels}
            locale={locale}
            nhaloApp={nhaloApp}
          />
          <SlideArrow direction="prev" label={content.prevLabel} onClick={() => go(active - 1)} />
          <SlideArrow direction="next" label={content.nextLabel} onClick={() => go(active + 1)} />
        </div>

        <div className="mt-7 flex justify-center gap-2">
          {products.map((item, index) => (
            <button
              key={item.key}
              type="button"
              aria-label={item.chip}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
              className={cn(
                "h-2 rounded-full transition-all",
                index === active ? "w-7 bg-accent" : "w-2 bg-dot-idle",
              )}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function ProductSlide({
  product,
  statusLabels,
  locale,
  nhaloApp,
}: {
  product: Product;
  statusLabels: HomeContent["platform"]["statusLabels"];
  locale: Locale;
  nhaloApp: AppCopy;
}) {
  const visual = product.key === "chinchu" || product.key === "nhalo" ? null : VISUALS[product.key];

  return (
    <div className="bt-fade relative isolate grid grid-cols-1 gap-12 overflow-hidden rounded-[36px] border border-[rgba(239,159,39,0.22)] bg-[linear-gradient(153deg,rgba(255,255,255,0.96),rgba(255,255,255,0.74))] p-12 shadow-[0_40px_80px_rgba(166,95,0,0.14)] backdrop-blur-[8px] transition-shadow duration-300 hover:shadow-[0_48px_96px_rgba(166,95,0,0.22)] max-md:p-7 lg:h-[600px] lg:grid-cols-2 dark:bg-[linear-gradient(153deg,rgba(28,38,80,0.96),rgba(28,38,80,0.8))] dark:shadow-[0_40px_80px_rgba(0,0,0,0.3)]">
      <CursorGlow />
      <div className="flex min-w-0 flex-col items-start lg:justify-center">
        <div className="flex flex-wrap items-center gap-3">
          <ProductName name={product.name} />
          {product.type && (
            <span
              className={cn(
                "flex h-6 items-center rounded-full px-2.5 text-[12px] leading-3 font-semibold",
                product.type === "App"
                  ? "bg-navy text-white dark:bg-white dark:text-navy"
                  : "bg-[#1e6b3c] text-orange-50",
              )}
            >
              {product.type}
            </span>
          )}
          {product.status && (
            <StatusBadge status={product.status} label={statusLabels[product.status]} />
          )}
          {product.note && <StatusBadge status="soon" label={product.note} />}
        </div>

        <h3 className="mt-3.5 text-[38px] leading-[43.7px] font-semibold tracking-[-0.95px] text-balance text-ink max-sm:text-[30px] max-sm:leading-9">
          {product.title}
        </h3>

        {product.desc && (
          <p className="mt-3 text-[17px] leading-[27px] text-ink-muted">{product.desc}</p>
        )}

        <ul className="mt-[22px] flex flex-col gap-3.5">
          {product.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-center gap-3 text-[18px] leading-[26.1px] text-ink"
            >
              <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-accent text-on-accent shadow-[0_4px_12px_rgba(239,159,39,0.35)]">
                <Icon name="check" size={18} />
              </span>
              {bullet}
            </li>
          ))}
        </ul>

        <ul className="mt-[26px] flex flex-wrap gap-2">
          {product.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-line bg-card-soft px-4 py-2 text-[14px] leading-[22.4px] font-medium text-ink"
            >
              {chip}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3 max-sm:w-full max-sm:[&>*]:w-full">
          {product.detail ? (
            <Link
              href={localizedPath(locale, product.detail)}
              // "Xem chi tiết" lặp ở mọi slide. aria-label gắn thêm tên sản phẩm để trình đọc
              // màn hình và công cụ tìm kiếm biết link dẫn đi đâu, mà chữ hiển thị giữ nguyên.
              aria-label={`${product.primary} — ${productLabel(product.name)}`}
              className="bt-btn bt-btn-primary"
            >
              {product.primary}
            </Link>
          ) : product.external ? (
            <a
              href={siteConfig.townsoftUrl}
              target="_blank"
              rel="noopener"
              className="bt-btn bt-btn-primary"
            >
              {product.primary}
              <Icon name="arrow-up-right" size={18} className="ml-1.5" />
            </a>
          ) : product.primaryTarget ? (
            <a
              href={`#${HOME_SECTIONS[product.primaryTarget]}`}
              data-need={product.need}
              aria-label={`${product.primary} — ${productLabel(product.name)}`}
              className="bt-btn bt-btn-primary"
            >
              {product.primary}
            </a>
          ) : (
            <button type="button" className="bt-btn bt-btn-primary">
              {product.primary}
            </button>
          )}
        </div>
      </div>

      <div className="flex min-w-0 items-center justify-center">
        {product.key === "nhalo" ? (
          <NhaloVisual app={nhaloApp} />
        ) : visual ? (
          <Illustration
            src={visual.src}
            width={599}
            height={visual.height}
            exportWidth={708}
            exportHeight={visual.exportHeight}
            offsetX={60}
            offsetY={30}
          />
        ) : (
          product.visual && <ChinchuVisual copy={product.visual} />
        )}
      </div>
    </div>
  );
}

/**
 * Logo chữ của sản phẩm (bản Day / Night). Kích thước hiển thị theo Figma; Chinchu lấy từ
 * Figma "Logo-Stuff" › Summary (logo ngang 160×35, hiển thị cao ~38px cho cân với NhàLo).
 */
const WORDMARKS: Record<
  ProductLogo,
  { alt: string; light: string; dark: string; width: number; height: number }
> = {
  nhalo: {
    alt: "NhàLo",
    light: "/images/home/nhalo-logo.svg",
    dark: "/images/home/nhalo-logo-alt.svg",
    width: 172,
    height: 57.3,
  },
  balheh: {
    alt: "Balheh",
    light: "/images/home/balheh-logo.svg",
    // Mode Night: chữ "balheh", khối góc dưới trái và dấu check đổi trắng cho dễ đọc.
    dark: "/images/home/balheh-logo-dark.svg",
    width: 158,
    height: 46.5,
  },
  chinchu: {
    alt: "Chinchu",
    light: "/images/home/chinchu-logo.svg",
    dark: "/images/home/chinchu-logo-alt.svg",
    width: 174,
    height: 38,
  },
};

/** Tên sản phẩm dạng chữ thuần, cho aria-label (logo là ảnh nên không có chữ để đọc). */
function productLabel(name: Product["name"]) {
  return "text" in name ? name.text : WORDMARKS[name.logo].alt;
}

/** Tên sản phẩm: logo ảnh (NhàLo, Balheh, Chinchu) hoặc chữ in hoa giãn cách màu cam. */
function ProductName({ name }: { name: Product["name"] }) {
  if ("text" in name) {
    return (
      <span className="text-[14px] leading-[22.4px] font-bold tracking-[2.24px] text-accent-text uppercase">
        {name.text}
      </span>
    );
  }
  const logo = WORDMARKS[name.logo];
  const style = { width: logo.width, height: logo.height };
  return (
    <>
      <Image
        src={logo.light}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className="theme-light-only"
        style={style}
      />
      <Image
        src={logo.dark}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className="theme-dark-only"
        style={style}
      />
    </>
  );
}

/**
 * Minh hoạ Chinchu (chưa có mockup Figma): khung trình duyệt với ô tìm kiếm và vài tin cho
 * thuê mẫu gắn nhãn "đã xác minh qua NhàLo". Dữ liệu mẫu, màu theo logo Chinchu.
 */
const CHINCHU_LISTINGS = [
  { title: "Phòng trọ 25 m², có gác", place: "Cầu Giấy, Hà Nội", price: "3.500.000" },
  { title: "Căn hộ mini 1 phòng ngủ", place: "Phú Nhuận, TP.HCM", price: "5.800.000" },
  { title: "Phòng khép kín gần trường", place: "Thủ Đức, TP.HCM", price: "2.900.000" },
];

function ChinchuVisual({ copy }: { copy: NonNullable<Product["visual"]> }) {
  return (
    <div
      aria-hidden="true"
      className="w-full max-w-[520px] overflow-hidden rounded-[22px] border border-[#d7e6e4] bg-white text-left shadow-[0_24px_48px_rgba(18,100,95,0.16)]"
    >
      <div className="flex items-center gap-1.5 border-b border-[#e6efee] bg-[#f4f8f7] px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#e5e7eb]" />
        <span className="size-2.5 rounded-full bg-[#e5e7eb]" />
        <span className="size-2.5 rounded-full bg-[#e5e7eb]" />
      </div>
      <div className="flex flex-col gap-3.5 p-5">
        <div className="flex items-center gap-2.5 rounded-full border-[1.5px] border-[#12645f] px-4 py-2.5 text-[14px] text-[#5a6b8a]">
          <Icon name="map-pin" size={16} className="text-[#12645f]" />
          <span className="min-w-0 flex-1 truncate">{copy.search}</span>
          <span className="rounded-full bg-[#12645f] px-3 py-1 text-[12px] font-semibold text-white">
            {copy.button}
          </span>
        </div>
        {CHINCHU_LISTINGS.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3.5 rounded-2xl border border-[#e6efee] p-3"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#e7f1f0] text-[#12645f]">
              <Icon name="building" size={24} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-[15px] leading-[1.35] font-semibold text-[#18213f]">
                {item.title}
              </span>
              <span className="text-[12.5px] leading-[1.35] text-[#5a6b8a]">{item.place}</span>
              <span className="mt-0.5 w-fit rounded-full bg-[#e3f4ea] px-2 py-0.5 text-[11px] leading-[1.35] font-semibold text-[#1e6b3c]">
                ✓ {copy.verified}
              </span>
            </span>
            <span className="text-right text-[14px] leading-[1.3] font-bold whitespace-nowrap text-[#bb4e1a]">
              {item.price}
              <span className="block text-[11px] font-medium text-[#5a6b8a]">{copy.perMonth}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Minh hoạ NhàLo bằng chính giao diện app (như trang /nhalo/): điện thoại Trang chủ nghiêng
 * nhẹ phía trước, hoá đơn người thuê nhận qua Zalo xếp chồng lệch phía sau, cả hai đứng trên
 * một quầng sáng cam chung; mascot cầm túi tiền ngồi đè lên góc dưới để gắn hai máy làm một.
 */
function NhaloVisual({ app }: { app: AppCopy }) {
  return (
    <div className="relative mx-auto h-[500px] w-[440px] max-sm:h-[370px] max-sm:w-[280px]">
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-[440px] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(239,159,39,0.28),transparent)] max-sm:size-[280px]"
      />
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-[400px] -translate-1/2 rounded-full border-2 border-dashed border-[rgba(239,159,39,0.35)] motion-safe:animate-[bt-orbit_60s_linear_infinite] max-sm:size-[260px]"
      />
      <div className="absolute top-[48px] left-[196px] rotate-[8deg] [--s:0.52] max-sm:top-[34px] max-sm:left-[124px] max-sm:[--s:0.36]">
        <Phone device>
          <TenantBillScreen t={app} compact />
        </Phone>
      </div>
      <div className="absolute top-[6px] left-0 z-[2] -rotate-[4deg] [--s:0.6] max-sm:[--s:0.42]">
        <Phone device>
          <HomeScreen t={app} />
        </Phone>
      </div>
      <MascotArt
        name="tui-tien"
        className="bt-float absolute right-[-36px] bottom-[-14px] z-[3] w-[160px] [--bob:3.8s] max-sm:right-[-8px] max-sm:w-[96px]"
      />
    </div>
  );
}

function SlideArrow({
  direction,
  label,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        // Đặt theo khoảng cách cố định từ mép trên thẻ (không theo 50% chiều cao), để đổi sản
        // phẩm có nội dung dài ngắn khác nhau thì mũi tên vẫn đứng nguyên chỗ.
        "absolute top-[274px] z-10 flex size-[52px] items-center justify-center rounded-full border border-gray-100 bg-white text-[18px] text-navy shadow-[0_12px_32px_var(--shadow-navy)] transition-[translate,background-color,color] duration-200 hover:bg-accent hover:text-on-accent max-lg:top-[150px] max-md:hidden",
        direction === "prev" ? "-left-6 max-md:-left-2" : "-right-6 max-md:-right-2",
      )}
    >
      <span aria-hidden="true">{direction === "prev" ? "←" : "→"}</span>
    </button>
  );
}
