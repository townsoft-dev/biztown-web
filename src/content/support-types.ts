import type { AppMarkKind } from "@/components/ui/app-mark";
import type { ProductStatus } from "@/components/ui/status-badge";
import type { PageKey } from "@/i18n/config";

export type SupportFaq = { q: string; a: string };

/** Một tab sản phẩm ở trang Hỗ trợ. */
export type SupportProduct = {
  key: "nhalo" | "balheh" | "chinchu" | "custom";
  name: string;
  mark: AppMarkKind;
  status: ProductStatus;
  /** Một câu giới thiệu ngắn đầu tab. */
  intro: string;
  /** Lối tắt (trang trong site hoặc trang ngoài). */
  links: { label: string; page?: PageKey; href?: string }[];
  faqs: SupportFaq[];
  /** Chưa có nội dung hỗ trợ: hiện khung "Sắp ra mắt" thay cho câu hỏi. */
  soon?: string;
};

/**
 * Trang Hỗ trợ (/support — đường dẫn đã khai với App Store, Google Play cho NhàLo): phần chung
 * cho mọi sản phẩm ở trên, hỗ trợ riêng từng sản phẩm chia tab bên dưới (NhàLo mở mặc định).
 */
export type SupportContent = {
  kicker: string;
  title: string;
  lead: string;
  channels: {
    email: { label: string; desc: string };
    zalo: { label: string; desc: string };
    contact: { label: string; desc: string };
  };
  provider: string;
  tipsTitle: string;
  tips: string[];
  productsTitle: string;
  productsLabel: string;
  statusLabels: Record<ProductStatus, string>;
  faqTitle: string;
};
