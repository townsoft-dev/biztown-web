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
        to: null,
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
    { label: "Blog", to: null },
    { label: "Liên hệ", to: { section: "contact" } },
  ] satisfies NavLink[] as NavLink[],
  meta: {
    home: {
      title: "BizTown — Bình dân hoá công nghệ cho mọi doanh nghiệp",
      description:
        "Hệ sinh thái phần mềm quản trị và tự động hoá dành cho cá nhân, hộ kinh doanh và doanh nghiệp SME: NhàLo, Balheh và web/app theo yêu cầu.",
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
    nhalo: {
      title: "NhàLo — Quản lý nhà trọ, ghi điện nước và gửi hoá đơn tự động",
      description:
        "NhàLo giúp chủ nhà trọ ghi chỉ số điện nước, tạo hoá đơn cho cả dãy trọ và gửi cho người thuê kèm mã QR chuyển khoản.",
    },
  } satisfies Record<PageKey, { title: string; description: string }>,
  footer: {
    description:
      "Hệ sinh thái phần mềm cho doanh nghiệp vừa và nhỏ. Một sản phẩm của Townsoft Vina — đội ngũ Việt Nam & Hàn Quốc.",
    socialLabel: "Mạng xã hội",
    columns: [
      [
        {
          title: "Ứng dụng",
          links: [
            { label: "NhàLo", to: { page: "nhalo" } },
            { label: "Balheh", to: { section: "products" } },
            { label: "BizTown Nhân sự (sắp ra mắt)", to: null },
            { label: "BizTown Hóa đơn (sắp ra mắt)", to: null },
            { label: "BizTown Tồn kho (sắp ra mắt)", to: null },
          ],
        },
        {
          title: "Bắt đầu",
          links: [{ label: "Đăng ký dùng thử", to: { section: "contact" } }],
        },
      ],
      [
        {
          title: "Giải pháp theo ngành",
          links: [
            { label: "Nhà cho thuê", to: { section: "audience" } },
            { label: "Bán lẻ & cửa hàng", to: { section: "audience" } },
            { label: "Dịch vụ & spa", to: { section: "audience" } },
            { label: "Văn phòng nhỏ", to: { section: "audience" } },
            { label: "Hộ kinh doanh", to: { section: "audience" } },
          ],
        },
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
            { label: "Tuyển dụng", to: null },
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
            { label: "Liên hệ", to: { section: "contact" } },
            { label: "Báo lỗi", to: { page: "support" } },
          ],
        },
        {
          title: "Chính sách",
          links: [
            { label: "Điều khoản sử dụng", to: null },
            { label: "Chính sách bảo mật", to: { page: "privacy" } },
            { label: "Xoá tài khoản & dữ liệu", to: { page: "deleteAccount" } },
          ],
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
        to: null,
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
    { label: "Blog", to: null },
    { label: "Contact", to: { section: "contact" } },
  ],
  meta: {
    home: {
      title: "BizTown — Technology made accessible for every business",
      description:
        "A management and automation software ecosystem for individuals, household businesses and SMEs: NhàLo, Balheh and custom web/app development.",
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
    nhalo: {
      title: "NhàLo — Rental management, utility readings and automatic invoices",
      description:
        "NhàLo helps landlords record electricity and water readings, create invoices for a whole building and send them to tenants with a bank-transfer QR code.",
    },
  },
  footer: {
    description:
      "A software ecosystem for small and medium businesses. A product of Townsoft Vina — a Vietnamese & Korean team.",
    socialLabel: "Social media",
    columns: [
      [
        {
          title: "Apps",
          links: [
            { label: "NhàLo", to: { page: "nhalo" } },
            { label: "Balheh", to: { section: "products" } },
            { label: "BizTown HR (coming soon)", to: null },
            { label: "BizTown Invoices (coming soon)", to: null },
            { label: "BizTown Inventory (coming soon)", to: null },
          ],
        },
        {
          title: "Get started",
          links: [{ label: "Sign up for a trial", to: { section: "contact" } }],
        },
      ],
      [
        {
          title: "Solutions by industry",
          links: [
            { label: "Rental properties", to: { section: "audience" } },
            { label: "Retail & shops", to: { section: "audience" } },
            { label: "Services & spas", to: { section: "audience" } },
            { label: "Small offices", to: { section: "audience" } },
            { label: "Household businesses", to: { section: "audience" } },
          ],
        },
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
            { label: "Careers", to: null },
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
            { label: "Contact", to: { section: "contact" } },
            { label: "Report a bug", to: { page: "support" } },
          ],
        },
        {
          title: "Policies",
          links: [
            { label: "Terms of use", to: null },
            { label: "Privacy policy", to: { page: "privacy" } },
            { label: "Account & data deletion", to: { page: "deleteAccount" } },
          ],
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
