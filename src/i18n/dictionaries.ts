import type { AppMarkKind } from "@/components/ui/app-mark";
import type { ProductStatus } from "@/components/ui/status-badge";

import type { HomeSection, Locale, PageKey } from "./config";

/**
 * Đích của một liên kết ở thanh điều hướng/chân trang: một section của trang chủ, một trang,
 * hoặc chưa có (hiện chữ thường, không bấm được — chờ có trang thật).
 */
export type LinkTarget = { section: HomeSection } | { page: PageKey } | null;

export type NavLink = { label: string; to: LinkTarget };

export type FooterColumn = { title: string; links: NavLink[] }[];

/** Một sản phẩm trong menu thả xuống "Sản phẩm" ở thanh điều hướng. */
export type ProductMenuItem = {
  name: string;
  desc: string;
  mark: AppMarkKind;
  status: ProductStatus;
  /** Trang chi tiết; null nếu chưa có (hiện chữ thường, không bấm được). */
  to: LinkTarget;
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
    label: "Danh sách sản phẩm",
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
  },
  nav: [
    { label: "Sản phẩm", to: { section: "products" } },
    { label: "Dịch vụ", to: { section: "services" } },
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
    nhaloTerms: {
      title: "Điều khoản dịch vụ ứng dụng NhàLo",
      description:
        "Điều khoản sử dụng app quản lý nhà trọ NhàLo của Townsoft Vina: tài khoản, trách nhiệm của chủ nhà với dữ liệu người thuê, phí, giới hạn trách nhiệm, xoá tài khoản và luật áp dụng.",
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
    description:
      "Hệ sinh thái phần mềm quản trị và tự động hoá cho cá nhân, hộ kinh doanh và doanh nghiệp SME. Một sản phẩm của Townsoft Vina — đội ngũ Việt Nam & Hàn Quốc.",
    taxCode: "MST: 0109151007",
    address: "6, Ngõ 7 Lê Đức Thọ, Từ Liêm, Hà Nội",
    socialLabel: "Mạng xã hội",
    columns: [
      [
        {
          title: "Sản phẩm",
          links: [
            { label: "NhàLo", to: { page: "nhalo" } },
            { label: "Chinchu (sắp ra mắt)", to: null },
            { label: "Balheh", to: { page: "balheh" } },
            { label: "Và nhiều sản phẩm khác…", to: null },
          ],
        },
      ],
      [
        {
          title: "Dịch vụ",
          links: [
            { label: "Thiết kế website", to: { section: "services" } },
            { label: "Phát triển app", to: { section: "services" } },
            { label: "Giải pháp theo yêu cầu", to: { section: "services" } },
            { label: "Bảo trì & đồng hành", to: { section: "services" } },
          ],
        },
      ],
      [
        {
          title: "Về BizTown",
          links: [
            { label: "Sứ mệnh & tầm nhìn", to: { section: "about" } },
            { label: "Triết lý sản phẩm", to: { section: "principles" } },
            { label: "Townsoft Vina", to: null },
            { label: "Tin tức", to: null },
          ],
        },
      ],
      [
        {
          title: "Hỗ trợ",
          links: [
            { label: "Trung tâm trợ giúp", to: { page: "support" } },
            { label: "Hướng dẫn sử dụng", to: { page: "support" } },
            { label: "Liên hệ", to: { page: "contact" } },
            { label: "Báo lỗi", to: { page: "support" } },
          ],
        },
        {
          title: "Chính sách",
          links: [{ label: "Điều khoản sử dụng", to: null }],
        },
      ],
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
    label: "Product list",
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
  },
  nav: [
    { label: "Products", to: { section: "products" } },
    { label: "Services", to: { section: "services" } },
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
    nhaloTerms: {
      title: "NhàLo app terms of service",
      description:
        "Terms of use for NhàLo, the rental management app by Townsoft Vina: accounts, landlords' duties for tenant data, fees, liability, account deletion and governing law.",
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
    description:
      "A management and automation software ecosystem for individuals, household businesses and SMEs. A product of Townsoft Vina — a Vietnamese & Korean team.",
    taxCode: "Tax code: 0109151007",
    address: "6, Lane 7 Le Duc Tho, Tu Liem, Hanoi",
    socialLabel: "Social media",
    columns: [
      [
        {
          title: "Products",
          links: [
            { label: "NhàLo", to: { page: "nhalo" } },
            { label: "Chinchu (coming soon)", to: null },
            { label: "Balheh", to: { page: "balheh" } },
            { label: "And more coming soon…", to: null },
          ],
        },
      ],
      [
        {
          title: "Services",
          links: [
            { label: "Website design", to: { section: "services" } },
            { label: "App development", to: { section: "services" } },
            { label: "Custom solutions", to: { section: "services" } },
            { label: "Maintenance & support", to: { section: "services" } },
          ],
        },
      ],
      [
        {
          title: "About BizTown",
          links: [
            { label: "Mission & vision", to: { section: "about" } },
            { label: "Product philosophy", to: { section: "principles" } },
            { label: "Townsoft Vina", to: null },
            { label: "News", to: null },
          ],
        },
      ],
      [
        {
          title: "Support",
          links: [
            { label: "Help center", to: { page: "support" } },
            { label: "User guides", to: { page: "support" } },
            { label: "Contact", to: { page: "contact" } },
            { label: "Report a bug", to: { page: "support" } },
          ],
        },
        {
          title: "Policies",
          links: [{ label: "Terms of use", to: null }],
        },
      ],
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
