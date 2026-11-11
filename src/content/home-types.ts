import type { AppMarkKind } from "@/components/ui/app-mark";
import type { ProductStatus } from "@/components/ui/status-badge";
import type { HomeSection, PageKey } from "@/i18n/config";

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
  /** Section mà từng nút cuộn tới (vd. "Nhận tư vấn" → contact); bỏ trống thì nút chưa dẫn đi đâu. */
  primaryTarget?: HomeSection;
  secondaryTarget?: HomeSection;
  scene: HeroScene;
};

/** Chữ trong các mockup minh hoạ của hero (dựng bằng HTML để dịch được và nét ở mọi cỡ). */
export type HeroScenesCopy = {
  /** Chương 1 — sơ đồ quỹ đạo: BizTown ở giữa, sản phẩm quay quanh, khách hàng vòng ngoài. */
  mission: {
    hub: string;
    people: { icon: string; label: string }[];
  };
  /** Chương 2 — lưới ứng dụng. */
  apps: { title: string; custom: string };
  /** Chương 3 — luồng "ghi chép → tự động xử lý → báo cáo". */
  paper: {
    steps: [string, string, string];
    note: string[];
    tasks: string[];
    report: { title: string; value: string; legend: [string, string, string] };
    /** Hai thẻ trắng nhỏ: việc khác cũng chạy qua luồng (icon Material Symbols). */
    others: { icon: string; title: string; sub: string }[];
  };
  /** Chương 4 — biểu đồ thời gian tiết kiệm và hai thông báo. */
  growth: {
    title: string;
    value: string;
    note: string;
    /** Thẻ nổi góc dưới trái: chi phí vận hành trước / sau (minh hoạ). */
    budget: {
      label: string;
      title: string;
      sub: string;
      before: { label: string; value: string };
      after: { label: string; value: string };
    };
    toasts: {
      app: "nhalo" | "balheh";
      name: string;
      time: string;
      title: string;
      sub: string;
      percent: number;
    }[];
  };
};

export type ProductLogo = "nhalo" | "balheh" | "chinchu";

export type ProductKey = "nhalo" | "chinchu" | "balheh" | "hr" | "finance" | "sales" | "custom";

export type Product = {
  key: ProductKey;
  chip: string;
  mark: AppMarkKind;
  /** Logo ảnh (NhàLo, Balheh, Chinchu) hoặc tên chữ in hoa. */
  name: { logo: ProductLogo } | { text: string };
  type?: "App" | "Website" | "Web + App";
  status?: ProductStatus;
  /** Nhãn phụ cạnh trạng thái (vd. Balheh: "App sắp ra mắt"). */
  note?: string;
  title: string;
  /** Đoạn mô tả ngắn dưới tiêu đề (tuỳ chọn). */
  desc?: string;
  /** Chữ trong minh hoạ dựng bằng HTML (sản phẩm chưa có mockup, vd. Chinchu). */
  visual?: { search: string; button: string; verified: string; perMonth: string };
  bullets: string[];
  chips: string[];
  primary: string;
  /** Trang chi tiết sản phẩm: nút chính ("Xem chi tiết") dẫn tới đây. */
  detail?: PageKey;
  /** Không có trang chi tiết: nút chính cuộn tới section này của trang chủ (vd. "Xem dịch vụ"). */
  primaryTarget?: HomeSection;
  /** Nút chính mở trang ngoài (vd. "Xem dịch vụ" → townsoftvina.com). */
  external?: "townsoft";
  /** Nút chính dẫn xuống khối Liên hệ thì chọn sẵn loại tư vấn này. */
  need?: LeadNeed;
};

/** Loại tư vấn chọn ở khối Liên hệ cuối trang chủ. */
export type LeadNeed = "product" | "custom" | "other";

export type LinkCard = {
  name: string;
  desc: string;
  mark: AppMarkKind;
  status?: ProductStatus;
  /** Trang chi tiết sản phẩm: bấm thẻ dẫn tới đây (không có thì dẫn tới slide sản phẩm). */
  detail?: PageKey;
};

/** Một dòng sản phẩm/dịch vụ nhỏ trong thẻ "Hai cách BizTown đồng hành". */
export type SolutionItem = {
  name: string;
  desc: string;
  /** Logo sản phẩm; dịch vụ dùng `icon` (tên Material Symbol ở /images/nhalo/ms/). */
  mark?: AppMarkKind;
  icon?: string;
  status?: ProductStatus;
  /** Trang chi tiết; không có thì dẫn tới slide sản phẩm. Dịch vụ không dẫn đi đâu. */
  detail?: PageKey;
};

export type SolutionCard = {
  kicker: string;
  title: string;
  bullets: string[];
  items: SolutionItem[];
  /** Dòng nhỏ cuối danh sách (vd. "Các sản phẩm khác sắp ra mắt…"). */
  more?: string;
  /** Nút phụ mở trang ngoài (vd. "Xem dịch vụ" → townsoftvina.com), đứng trước nút chính. */
  secondary?: { label: string; external: "townsoft" };
  /** Nút chính "Nhận tư vấn": cuộn xuống khối Liên hệ, chọn sẵn loại tư vấn `need`. */
  cta: string;
  need: LeadNeed;
};

/** Thông báo của form để lại liên hệ (khối Liên hệ cuối trang chủ). */
export type LeadFormCopy = {
  sending: string;
  sent: string;
  required: string;
  invalid: string;
  rateLimited: string;
  failed: string;
};

export type HomeContent = {
  hero: {
    chapters: HeroChapter[];
    scenes: HeroScenesCopy;
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
    /** Dòng nhỏ dưới các chip: còn sản phẩm khác sắp ra mắt. */
    more: string;
    products: Product[];
  };
  discover: {
    title: string;
    support: string;
    tabs: { apps: string; services: string };
    statusLabels: Record<ProductStatus, string>;
    /** Dòng nhỏ dưới danh sách ứng dụng: còn sản phẩm khác sắp ra mắt. */
    more: string;
    apps: LinkCard[];
    services: LinkCard[];
  };
  /** "Hai cách BizTown đồng hành cùng bạn": sản phẩm sẵn có và web/app theo yêu cầu. */
  solutions: {
    title: string;
    lead: string;
    statusLabels: Record<ProductStatus, string>;
    products: SolutionCard;
    services: SolutionCard;
  };
  /** Về BizTown: gộp dành cho ai, con số, vì sao chọn, cách đồng hành. */
  about: {
    title: RichText;
    lead: string;
    /** Doanh nghiệp gốc Townsoft Vina — để khách biết BizTown không phải công ty mới lập. */
    company: {
      kicker: string;
      title: RichText;
      /** "\n" = xuống dòng cố định trên màn rộng (xl), mỗi dòng căn đều hai bên. */
      desc: string;
      facts: { value: string; label: string }[];
      clientsLabel: string;
      /** Khách hàng tiêu biểu; country hiện cờ nhỏ (/images/flags/<country>.svg). */
      clients: { name: string; country: "kr" | "vn" }[];
      /** Tên nước, làm alt/title cho cờ. */
      countries: { kr: string; vn: string };
      cta: string;
    };
    audienceTitle: string;
    audience: { icon: string; title: string; desc: string }[];
    stats: { value: string; label: string }[];
    reasonsTitle: string;
    reasons: { icon: string; title: string; desc: string }[];
    stepsTitle: string;
    /** "\n" trong desc = xuống dòng cố định. */
    steps: { title: string; desc: string }[];
    /** Nhãn mốc cuối đường kẻ các bước (hình cúp). */
    stepsDone: string;
  };
  /** Khối Liên hệ cuối trang: chọn nhu cầu + để lại số điện thoại hoặc email. */
  contact: {
    title: [string, string];
    lead: string;
    needLabel: string;
    needs: { key: LeadNeed; label: string }[];
    /** Minh hoạ bên trái: các cặp hỏi – đáp hiện lần lượt như đang chat tư vấn. */
    chat: { ask: string; answer: string }[];
    inputLabel: string;
    cta: string;
    form: LeadFormCopy;
    /** Chữ giữa form và nút Liên hệ. */
    or: string;
    /** Nút mở trang Liên hệ đầy đủ. */
    page: string;
  };
};
