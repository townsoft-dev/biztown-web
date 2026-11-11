import type { AppMarkKind } from "@/components/ui/app-mark";
import type { ProductStatus } from "@/components/ui/status-badge";

import type { HomeSection, Locale, PageKey } from "./config";

/**
 * Đích của một liên kết ở thanh điều hướng/chân trang: một section của trang chủ, một trang,
 * hoặc chưa có (hiện chữ thường, không bấm được — chờ có trang thật).
 */
export type LinkTarget = { section: HomeSection } | { page: PageKey } | null;

export type NavLink = { label: string; to: LinkTarget };

export type FooterColumn = { title: string; links: NavLink[] };

/** Một sản phẩm trong menu thả xuống "Sản phẩm" ở thanh điều hướng. */
export type ProductMenuItem = {
  name: string;
  desc: string;
  mark: AppMarkKind;
  status: ProductStatus;
  /** Trang chi tiết; null nếu chưa có (hiện chữ thường, không bấm được). */
  to: LinkTarget;
};

/** Một dịch vụ trong cột "Dịch vụ" của menu thả xuống (chỉ để đọc, không bấm). */
export type ServiceMenuItem = {
  name: string;
  desc: string;
  /** Tên Material Symbol ở /images/nhalo/ms/. */
  icon: string;
};

/**
 * Chữ dùng chung (thanh điều hướng, metadata, chân trang). Nội dung chính của từng trang nằm
 * trong src/content/<locale>/. Kiểu lấy từ bản tiếng Việt nên thiếu key ở bản khác là lỗi TS.
 */
const vi = {
  siteName: "BizTown",
  skipToContent: "Bỏ qua, đến nội dung chính",
  navLabel: "Điều hướng chính",
  localeSwitcherLabel: "Ngôn ngữ",
  themeToggle: "Đổi chế độ sáng/tối",
  menuToggle: "Mở/đóng menu",
  backToTop: "Lên đầu trang",
  homeLabel: "BizTown — trang chủ",
  startFree: "Bắt đầu miễn phí",
  productMenu: {
    label: "Sản phẩm",
    statusLabels: { live: "Đang hoạt động", soon: "Sắp ra mắt" },
    all: "Xem tất cả sản phẩm",
    more: "Và nhiều sản phẩm khác sắp ra mắt…",
    items: [
      {
        name: "NhàLo",
        desc: "Quản lý nhà cho thuê",
        mark: { logo: "nhalo" },
        status: "live",
        to: { page: "nhalo" },
      },
      {
        name: "Chinchu",
        desc: "Tìm nhà cho thuê chính chủ, uy tín",
        mark: { logo: "chinchu" },
        status: "soon",
        to: null,
      },
      {
        name: "Balheh",
        desc: "Quản lý dự án, tài liệu, chat nhóm",
        mark: { logo: "balheh" },
        status: "live",
        to: { page: "balheh" },
      },
    ] satisfies ProductMenuItem[] as ProductMenuItem[],
    services: {
      label: "Dịch vụ",
      lead: "Web & app theo yêu cầu, kinh nghiệm outsourcing từ 2020",
      items: [
        { name: "Thiết kế website", desc: "Landing page, bán hàng, nghiệp vụ", icon: "language" },
        { name: "Phát triển app", desc: "Ứng dụng iOS và Android", icon: "smartphone" },
        {
          name: "Số hoá quy trình",
          desc: "Chuyển đổi số, cải tiến nghiệp vụ",
          icon: "account_tree",
        },
        { name: "Tích hợp & bảo trì", desc: "Nền tảng thứ 3, nâng cấp", icon: "extension" },
      ] satisfies ServiceMenuItem[] as ServiceMenuItem[],
      cta: "Xem dịch vụ",
    },
  },
  nav: [
    { label: "Sản phẩm & Dịch vụ", to: { section: "products" } },
    { label: "Về BizTown", to: { section: "about" } },
    { label: "Liên hệ", to: { page: "contact" } },
  ] satisfies NavLink[] as NavLink[],
  meta: {
    home: {
      title: "BizTown — Hệ sinh thái phần mềm quản trị và tự động hoá",
      description:
        "Nền tảng hệ sinh thái phần mềm quản trị và tự động hoá cho cá nhân, hộ kinh doanh và doanh nghiệp SME tại Việt Nam. Dùng thử miễn phí, hỗ trợ cài đặt.",
    },
    nhalo: {
      title: "NhàLo - Ứng dụng quản lý nhà trọ — Miễn phí cho chủ nhà",
      description:
        "Ghi điện nước, tạo hoá đơn và gửi cho cả dãy trọ kèm mã QR chuyển khoản, ngay trên điện thoại. Miễn phí, người thuê không cần cài app.",
    },
    balheh: {
      title: "Balheh — Công cụ quản lý dự án, chat nhóm và wiki",
      description:
        "Giao việc trên bảng Kanban, trao đổi theo kênh và lưu tài liệu wiki trong cùng một dự án. Đăng nhập bằng Google hoặc Microsoft, không cần cài.",
    },
    contact: {
      title: "Liên hệ tư vấn phần mềm và thiết kế web, app",
      description:
        "Cần tư vấn phần mềm quản lý nhà trọ, quản lý dự án hay làm website, app theo yêu cầu? Để lại thông tin, chúng tôi liên hệ lại trong một ngày làm việc.",
    },
    support: {
      title: "Hỗ trợ khách hàng và hướng dẫn sử dụng phần mềm",
      description:
        "Hướng dẫn cài đặt và sử dụng, câu hỏi thường gặp, cách báo lỗi sự cố và liên hệ đội hỗ trợ cho ứng dụng quản lý nhà trọ NhàLo cùng các sản phẩm BizTown khác.",
    },
    privacy: {
      title: "Chính sách quyền riêng tư ứng dụng NhàLo",
      description:
        "Ứng dụng NhàLo thu thập dữ liệu gì của chủ nhà và người thuê, dùng và chia sẻ ra sao, lưu trong bao lâu, cùng quyền xem, chỉnh sửa và xoá dữ liệu đó.",
    },
    deleteAccount: {
      title: "Xoá tài khoản NhàLo và toàn bộ dữ liệu nhà trọ",
      description:
        "Các bước xoá tài khoản NhàLo ngay trong ứng dụng hoặc qua email: dữ liệu phòng, hợp đồng và hoá đơn nào bị xoá, cùng thời gian lưu trữ còn lại.",
    },
    nhaloPrivacy: {
      title: "Chính sách quyền riêng tư ứng dụng NhàLo",
      description:
        "Ứng dụng NhàLo thu thập dữ liệu gì của chủ nhà và người thuê, dùng và chia sẻ ra sao, lưu trong bao lâu, cùng quyền xem, chỉnh sửa và xoá dữ liệu đó.",
    },
    nhaloDeleteAccount: {
      title: "Xoá tài khoản NhàLo và toàn bộ dữ liệu nhà trọ",
      description:
        "Các bước xoá tài khoản NhàLo ngay trong ứng dụng hoặc qua email: dữ liệu phòng, hợp đồng và hoá đơn nào bị xoá, cùng thời gian lưu trữ còn lại.",
    },
    nhaloGuide: {
      title: "Hướng dẫn sử dụng NhàLo — app quản lý nhà trọ",
      description:
        "Từng bước dùng NhàLo: đăng ký, thêm nhà, cho thuê phòng, ghi chỉ số điện nước, tạo và gửi hoá đơn qua Zalo, thu tiền, gia hạn, trả phòng và giao nhà cho người quản lý.",
    },
    nhaloHelp: {
      title: "Hỏi đáp và báo lỗi NhàLo",
      description:
        "Câu hỏi thường gặp về app quản lý nhà trọ NhàLo và form gửi câu hỏi, báo lỗi nhanh cho đội NhàLo.",
    },
  } satisfies Record<PageKey, { title: string; description: string }>,
  footer: {
    tagline:
      "Hệ sinh thái phần mềm quản trị và tự động hoá cho cá nhân, hộ kinh doanh và doanh nghiệp SME.",
    maker: "Thương hiệu của Townsoft Vina",
    taxCode: "MST: 0109151007",
    address: "6, Ngõ 7 Lê Đức Thọ, Từ Liêm, Hà Nội",
    socialLabel: "BizTown trên mạng xã hội",
    columns: [
      {
        title: "Sản phẩm",
        links: [
          { label: "NhàLo", to: { page: "nhalo" } },
          { label: "Balheh", to: { page: "balheh" } },
          { label: "Chinchu (sắp ra mắt)", to: { section: "products" } },
        ],
      },
      {
        title: "Dịch vụ",
        links: [
          { label: "Thiết kế website", to: { section: "services" } },
          { label: "Phát triển app", to: { section: "services" } },
        ],
      },
      {
        title: "Hỗ trợ",
        links: [
          { label: "Liên hệ", to: { page: "contact" } },
          { label: "Trung tâm hỗ trợ", to: { page: "support" } },
        ],
      },
    ] satisfies FooterColumn[] as FooterColumn[],
    copyright: "© 2026 BizTown · Townsoft Vina",
  },
  companyName: "Công ty TNHH Townsoft Vina",
};

export type Dictionary = typeof vi;

const en: Dictionary = {
  siteName: "BizTown",
  skipToContent: "Skip to main content",
  navLabel: "Main navigation",
  localeSwitcherLabel: "Language",
  themeToggle: "Toggle light/dark mode",
  menuToggle: "Toggle menu",
  backToTop: "Back to top",
  homeLabel: "BizTown — home",
  startFree: "Start for free",
  productMenu: {
    label: "Products",
    statusLabels: { live: "Live", soon: "Coming soon" },
    all: "See all products",
    more: "And more products coming soon…",
    items: [
      {
        name: "NhàLo",
        desc: "Rental property management",
        mark: { logo: "nhalo" },
        status: "live",
        to: { page: "nhalo" },
      },
      {
        name: "Chinchu",
        desc: "Trusted owner-listed rentals",
        mark: { logo: "chinchu" },
        status: "soon",
        to: null,
      },
      {
        name: "Balheh",
        desc: "Projects, documents and team chat",
        mark: { logo: "balheh" },
        status: "live",
        to: { page: "balheh" },
      },
    ],
    services: {
      label: "Services",
      lead: "Custom web & apps, outsourcing since 2020",
      items: [
        { name: "Website design", desc: "Landing pages, stores, business tools", icon: "language" },
        { name: "App development", desc: "iOS and Android apps", icon: "smartphone" },
        {
          name: "Process digitising",
          desc: "Digital transformation, better operations",
          icon: "account_tree",
        },
        {
          name: "Integration & upkeep",
          desc: "Third-party platforms, upgrades",
          icon: "extension",
        },
      ],
      cta: "See services",
    },
  },
  nav: [
    { label: "Products & Services", to: { section: "products" } },
    { label: "About", to: { section: "about" } },
    { label: "Contact", to: { page: "contact" } },
  ],
  meta: {
    home: {
      title: "BizTown — A management and automation software ecosystem",
      description:
        "A management and automation software ecosystem for individuals, household businesses and SMEs in Vietnam. Free to start, with hands-on setup support.",
    },
    nhalo: {
      title: "NhàLo — Rental property management, free for landlords",
      description:
        "Record utility readings, create invoices for a whole building and send them to tenants with a bank-transfer QR code, from your phone. Tenants need no app.",
    },
    balheh: {
      title: "Balheh — Project boards, team chat and a document wiki",
      description:
        "Assign work on Kanban boards, talk in channels and keep documents in a wiki, all in one project. Free to use, sign in with Google or Microsoft, no install.",
    },
    contact: {
      title: "Contact us — software advice and custom builds",
      description:
        "Need advice on rental or project management software, or a custom website or app? Leave your details and the BizTown team will reply within one business day.",
    },
    support: {
      title: "Help centre, user guides and how to report a bug",
      description:
        "Setup and how-to guides, frequently asked questions, how to report a bug and how to reach the support team for NhàLo and the other BizTown apps.",
    },
    privacy: {
      title: "NhàLo app privacy policy for landlords and tenants",
      description:
        "What the NhàLo app collects from landlords and tenants, how it is used, shared and stored, how long it is kept, and your rights over that data.",
    },
    deleteAccount: {
      title: "Delete your NhàLo account and all rental data",
      description:
        "How to delete your NhàLo account from inside the app or by email: which rooms, contracts and invoices are removed, and how long anything is retained.",
    },
    nhaloPrivacy: {
      title: "NhàLo app privacy policy for landlords and tenants",
      description:
        "What the NhàLo app collects from landlords and tenants, how it is used, shared and stored, how long it is kept, and your rights over that data.",
    },
    nhaloDeleteAccount: {
      title: "Delete your NhàLo account and all rental data",
      description:
        "How to delete your NhàLo account from inside the app or by email: which rooms, contracts and invoices are removed, and how long anything is retained.",
    },
    nhaloGuide: {
      title: "NhàLo user guide — rental management app",
      description:
        "Step-by-step NhàLo guide: sign up, add a house, rent out rooms, read meters, create and send invoices via Zalo, collect rent, renew, move out and hand houses to managers.",
    },
    nhaloHelp: {
      title: "NhàLo FAQ and bug reports",
      description:
        "Frequently asked questions about the NhàLo rental management app, plus a quick form to ask a question or report a bug.",
    },
  },
  footer: {
    tagline:
      "A management and automation software ecosystem for individuals, household businesses and SMEs.",
    maker: "A Townsoft Vina brand",
    taxCode: "Tax code: 0109151007",
    address: "6, Lane 7 Le Duc Tho, Tu Liem, Hanoi",
    socialLabel: "BizTown on social media",
    columns: [
      {
        title: "Products",
        links: [
          { label: "NhàLo", to: { page: "nhalo" } },
          { label: "Balheh", to: { page: "balheh" } },
          { label: "Chinchu (coming soon)", to: { section: "products" } },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Website design", to: { section: "services" } },
          { label: "App development", to: { section: "services" } },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Contact", to: { page: "contact" } },
          { label: "Help center", to: { page: "support" } },
        ],
      },
    ],
    copyright: "© 2026 BizTown · Townsoft Vina",
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
