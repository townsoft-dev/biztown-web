import type { AppMarkKind } from "@/components/ui/app-mark";
import type { ProductStatus } from "@/components/ui/status-badge";
import type { PageKey } from "@/i18n/config";

/**
 * Nội dung trang chủ theo ngôn ngữ (src/content/<locale>/home.ts). Cấu trúc bám các section
 * trong Figma "Homepage · VI · 1440"; component ở src/components/home/ chỉ lo hiển thị.
 */

/** Đoạn chữ có phần từ khoá tô gradient cam: ["Chúng tôi ", { kw: "công nghệ" }, " cho..."]. */
export type RichText = (string | { kw: string })[];

export type HeroScene = "cards" | "apps" | "paper" | "growth";

export type HeroChapter = {
  tab: string;
  title: RichText;
  lead: string;
  primary: string;
  secondary: string;
  scene: HeroScene;
};

export type ProductKey = "nhalo" | "balheh" | "hr" | "finance" | "sales" | "custom";

export type Product = {
  key: ProductKey;
  chip: string;
  mark: AppMarkKind;
  /** Logo ảnh (NhàLo, Balheh) hoặc tên chữ in hoa. */
  name: { logo: "nhalo" | "balheh" } | { text: string };
  type?: "App" | "Website";
  status?: ProductStatus;
  title: string;
  bullets: string[];
  chips: string[];
  primary: string;
  secondary: string;
  /** Trang chi tiết sản phẩm: nút chính ("Xem chi tiết") dẫn tới đây. */
  detail?: PageKey;
};

export type LinkCard = {
  name: string;
  desc: string;
  mark: AppMarkKind;
  status?: ProductStatus;
};

export type AudienceCard = {
  code: string;
  segment: string;
  title: string;
  desc: string;
  foot: string;
};

export type Stat = {
  label: string;
  value: number;
  suffix: string;
  desc: string;
};

export type JourneyStep = {
  label: string;
  desc: string;
  checks: string[];
};

export type Toast = {
  mark: AppMarkKind;
  title: string;
  meta: string;
};

export type Feature = { title: string; desc: string };

export type Principle = {
  media: string;
  tone: "orange" | "tint" | "gray" | "ink";
  kicker: string;
  title: string;
  desc: string;
};

export type HomeContent = {
  hero: {
    chapters: HeroChapter[];
    paidPill: string;
    pauseLabel: string;
    playLabel: string;
    chaptersLabel: string;
  };
  platform: {
    title: string;
    keyword: { first: string; other: string };
    lead: { first: string; other: string };
    pickerLabel: string;
    prevLabel: string;
    nextLabel: string;
    statusLabels: Record<ProductStatus, string>;
    products: Product[];
  };
  offers: {
    tag: string;
    title: string;
    cards: { title: string; items: string[]; cta: string; art: "apps" | "browser" }[];
  };
  discover: {
    tag: string;
    title: string;
    support: string;
    tabs: { apps: string; services: string };
    statusLabels: Record<ProductStatus, string>;
    apps: LinkCard[];
    services: LinkCard[];
  };
  audience: {
    tag: string;
    title: string;
    more: string;
    cards: AudienceCard[];
  };
  stats: {
    tag: string;
    title: string;
    lead: string;
    items: Stat[];
  };
  journey: {
    tag: string;
    title: string;
    lead: string;
    cta: string;
    /** Nhãn "Bước 1 / 4": {current} và {total} được thay bằng số. */
    stepOf: string;
    steps: JourneyStep[];
  };
  role: {
    tag: string;
    title: string;
    lead: string;
    cta: string;
    asideTitle: string;
    asideLinks: string[];
    toasts: Toast[];
  };
  why: {
    tag: string;
    title: string;
    /** Ảnh minh hoạ 4:5 ở giữa. Bỏ trống thì ẩn khung ảnh, 6 lý do xếp 2 cột. */
    media?: { src: string; alt: string };
    left: Feature[];
    right: Feature[];
  };
  principles: {
    tag: string;
    title: string;
    prevLabel: string;
    nextLabel: string;
    items: Principle[];
  };
  band: {
    tag: string;
    title: RichText;
    lead: string;
    inputLabel: string;
    cta: string;
  };
};
