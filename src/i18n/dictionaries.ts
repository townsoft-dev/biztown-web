import type { Locale, PageKey } from "./config";

/**
 * Chữ dùng chung (thanh điều hướng, metadata, chân trang). Nội dung chính của từng trang nằm
 * trong src/content/<locale>/. Kiểu lấy từ bản tiếng Việt nên thiếu key ở bản khác là lỗi TS.
 */
const vi = {
  appName: "BizTown Rent Manager",
  skipToContent: "Bỏ qua, đến nội dung chính",
  navLabel: "Trang thông tin",
  localeSwitcherLabel: "Ngôn ngữ",
  nav: {
    home: "Trang chủ",
    support: "Hỗ trợ",
    privacy: "Chính sách quyền riêng tư",
    deleteAccount: "Xoá tài khoản",
  },
  meta: {
    home: {
      title: "BizTown Rent Manager",
      description: "Ứng dụng quản lý nhà trọ và hoá đơn tiền trọ hàng tháng dành cho chủ nhà.",
    },
    support: {
      title: "Hỗ trợ",
      description:
        "Hướng dẫn sử dụng, câu hỏi thường gặp và cách liên hệ hỗ trợ BizTown Rent Manager.",
    },
    privacy: {
      title: "Chính sách quyền riêng tư",
      description:
        "Chính sách quyền riêng tư của ứng dụng BizTown Rent Manager: dữ liệu thu thập, cách sử dụng, chia sẻ, lưu trữ và quyền của người dùng.",
    },
    deleteAccount: {
      title: "Yêu cầu xoá tài khoản",
      description:
        "Cách xoá tài khoản BizTown Rent Manager và toàn bộ dữ liệu: các bước thực hiện, dữ liệu bị xoá và thời gian lưu trữ.",
    },
  } satisfies Record<PageKey, { title: string; description: string }>,
  companyName: "Công ty TNHH Townsoft Vina",
};

export type Dictionary = typeof vi;

const en: Dictionary = {
  appName: "BizTown Rent Manager",
  skipToContent: "Skip to main content",
  navLabel: "Information pages",
  localeSwitcherLabel: "Language",
  nav: {
    home: "Home",
    support: "Support",
    privacy: "Privacy policy",
    deleteAccount: "Delete account",
  },
  meta: {
    home: {
      title: "BizTown Rent Manager",
      description: "An app for landlords to manage rental properties and monthly rent invoices.",
    },
    support: {
      title: "Support",
      description:
        "How-to guides, frequently asked questions and how to contact BizTown Rent Manager support.",
    },
    privacy: {
      title: "Privacy policy",
      description:
        "BizTown Rent Manager privacy policy: what data is collected, how it is used, shared and stored, and your rights.",
    },
    deleteAccount: {
      title: "Request account deletion",
      description:
        "How to delete your BizTown Rent Manager account and all its data: the steps, what gets deleted and how long anything is kept.",
    },
  },
  companyName: "Townsoft Vina Co., Ltd.",
};

const DICTIONARIES: Record<Locale, Dictionary> = { vi, en };

export function getDictionary(locale: Locale) {
  return DICTIONARIES[locale];
}

/** Tên hiển thị của từng ngôn ngữ, viết bằng chính ngôn ngữ đó. */
export const LOCALE_NAMES: Record<Locale, string> = {
  vi: "Tiếng Việt",
  en: "English",
};
