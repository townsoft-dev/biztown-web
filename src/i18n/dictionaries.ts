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
    items: [
      {
        name: "NhàLo",
        desc: "Quản lý nhà cho thuê",
        mark: { logo: "nhalo" },
        status: "live",
        to: { page: "nhalo" },
      },
      {
        name: "Balheh",
        desc: "Quản lý dự án, tài liệu, chat nhóm",
        mark: { logo: "balheh" },
        status: "live",
        to: { page: "balheh" },
      },
      {
        name: "BizTown Nhân sự",
        desc: "Nhân sự, chấm công, bảng lương",
        mark: { code: "HR", tone: "orange" },
        status: "soon",
        to: null,
      },
      {
        name: "BizTown Hóa đơn",
        desc: "Thu chi, công nợ, lãi lỗ",
        mark: { code: "FN", tone: "slate" },
        status: "soon",
        to: null,
      },
      {
        name: "BizTown Tồn kho",
        desc: "Bán hàng, tồn kho, đơn hàng",
        mark: { code: "SL", tone: "white" },
        status: "soon",
        to: null,
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
      title: "BizTown — Phần mềm quản lý cho hộ kinh doanh và SME",
      description:
        "Hệ sinh thái phần mềm quản lý nhà trọ, dự án và vận hành cho hộ kinh doanh, doanh nghiệp nhỏ. Dùng thử miễn phí, hỗ trợ cài đặt bởi đội ngũ Việt – Hàn.",
    },
    nhalo: {
      title: "Phần mềm quản lý nhà trọ NhàLo — Miễn phí cho chủ nhà",
      description:
        "Ghi điện nước, tạo hoá đơn cho cả dãy trọ và gửi cho người thuê kèm mã QR chuyển khoản, ngay trên điện thoại. Miễn phí, người thuê không cần cài app.",
    },
    balheh: {
      title: "Balheh — Phần mềm quản lý dự án, chat nhóm và wiki",
      description:
        "Giao việc trên bảng Kanban, trao đổi theo kênh và lưu tài liệu wiki trong cùng một dự án. Dùng miễn phí, đăng nhập bằng Google hoặc Microsoft, không cần cài.",
    },
    contact: {
      title: "Liên hệ tư vấn phần mềm và thiết kế web, app",
      description:
        "Cần tư vấn phần mềm quản lý nhà trọ, quản lý dự án hay làm website, app theo yêu cầu? Để lại thông tin, chúng tôi liên hệ lại trong một ngày làm việc.",
    },
    support: {
      title: "Hỗ trợ khách hàng và hướng dẫn sử dụng phần mềm",
      description:
        "Hướng dẫn cài đặt và sử dụng, câu hỏi thường gặp, cách báo lỗi và liên hệ đội hỗ trợ cho ứng dụng BizTown Rent Manager cùng các sản phẩm BizTown khác.",
    },
    privacy: {
      title: "Chính sách quyền riêng tư ứng dụng Rent Manager",
      description:
        "Ứng dụng BizTown Rent Manager thu thập dữ liệu gì, dùng và chia sẻ ra sao, lưu trong bao lâu, cùng quyền truy cập, chỉnh sửa và xoá dữ liệu của bạn.",
    },
    deleteAccount: {
      title: "Xoá tài khoản Rent Manager và toàn bộ dữ liệu",
      description:
        "Các bước xoá tài khoản BizTown Rent Manager ngay trong ứng dụng hoặc qua email: dữ liệu nào bị xoá, dữ liệu nào còn lưu lại và lưu trong bao lâu.",
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
  } satisfies Record<PageKey, { title: string; description: string }>,
  footer: {
    description:
      "Hệ sinh thái phần mềm cho doanh nghiệp vừa và nhỏ. Một sản phẩm của Townsoft Vina — đội ngũ Việt Nam & Hàn Quốc.",
    taxCode: "MST: 0109151007",
    address: "6, Ngõ 7 Lê Đức Thọ, Từ Liêm, Hà Nội",
    socialLabel: "Mạng xã hội",
    columns: [
      [
        {
          title: "Sản phẩm",
          links: [
            { label: "NhàLo", to: { page: "nhalo" } },
            { label: "Balheh", to: { page: "balheh" } },
            { label: "BizTown Nhân sự (sắp ra mắt)", to: null },
            { label: "BizTown Hóa đơn (sắp ra mắt)", to: null },
            { label: "BizTown Tồn kho (sắp ra mắt)", to: null },
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
    items: [
      {
        name: "NhàLo",
        desc: "Rental property management",
        mark: { logo: "nhalo" },
        status: "live",
        to: { page: "nhalo" },
      },
      {
        name: "Balheh",
        desc: "Projects, documents and team chat",
        mark: { logo: "balheh" },
        status: "live",
        to: { page: "balheh" },
      },
      {
        name: "BizTown HR",
        desc: "HR, attendance and payroll",
        mark: { code: "HR", tone: "orange" },
        status: "soon",
        to: null,
      },
      {
        name: "BizTown Invoices",
        desc: "Income, expenses, debts, profit & loss",
        mark: { code: "FN", tone: "slate" },
        status: "soon",
        to: null,
      },
      {
        name: "BizTown Inventory",
        desc: "Sales, inventory and orders",
        mark: { code: "SL", tone: "white" },
        status: "soon",
        to: null,
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
      title: "BizTown — Management software for small businesses",
      description:
        "A software ecosystem for household businesses and SMEs in Vietnam: rental management, project management and custom web and app development. Free to start.",
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
        "Setup and how-to guides, frequently asked questions, how to report a bug and how to reach the support team for BizTown Rent Manager and other BizTown apps.",
    },
    privacy: {
      title: "Rent Manager privacy policy and your data rights",
      description:
        "What the BizTown Rent Manager app collects, how it is used, shared and stored, how long it is kept, and your rights to access, correct and delete that data.",
    },
    deleteAccount: {
      title: "Delete your Rent Manager account and all data",
      description:
        "How to delete your BizTown Rent Manager account from inside the app or by email: what data is removed, what is retained afterwards and for how long.",
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
  },
  footer: {
    description:
      "A software ecosystem for small and medium businesses. A product of Townsoft Vina — a Vietnamese & Korean team.",
    taxCode: "Tax code: 0109151007",
    address: "6, Lane 7 Le Duc Tho, Tu Liem, Hanoi",
    socialLabel: "Social media",
    columns: [
      [
        {
          title: "Products",
          links: [
            { label: "NhàLo", to: { page: "nhalo" } },
            { label: "Balheh", to: { page: "balheh" } },
            { label: "BizTown HR (coming soon)", to: null },
            { label: "BizTown Invoices (coming soon)", to: null },
            { label: "BizTown Inventory (coming soon)", to: null },
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
