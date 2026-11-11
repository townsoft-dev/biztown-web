import { siteConfig } from "@/config/site";
import { localizedPath, type Locale, type PageKey } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { absoluteUrl } from "@/lib/seo";

/** Một câu hỏi thường gặp — khớp dạng dữ liệu sẵn có trong src/content/vi/nhalo.ts và balheh.ts */
export type FaqItem = { q: string; a: string };

type JsonLdObject = Record<string, unknown>;

/**
 * @id cố định cho pháp nhân và cho website, để mọi khối JSON-LD trên mọi trang cùng trỏ về
 * một thực thể thay vì tạo ra thực thể mới mỗi trang (Google gọi là entity consolidation).
 */
const ORG_ID = `${siteConfig.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;

/** Pháp nhân vận hành site. Xuất hiện trên mọi trang. */
function organization(locale: Locale): JsonLdObject {
  const dict = getDictionary(locale);
  const { company } = siteConfig;

  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: dict.siteName,
    legalName: company.legalName[locale],
    url: `${siteConfig.url}/`,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/icons/icon-512.png`,
      width: 512,
      height: 512,
    },
    image: `${siteConfig.url}/og/biztown.png`,
    email: siteConfig.email,
    taxID: company.taxId,
    vatID: company.taxId,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.streetAddress,
      addressLocality: company.addressLocality,
      addressRegion: company.addressRegion,
      addressCountry: company.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.email,
      availableLanguage: ["vi", "en"],
      url: absoluteUrl(locale, "contact"),
    },
    ...(company.sameAs.length > 0 ? { sameAs: company.sameAs } : {}),
  };
}

/** Website (chỉ khai ở trang chủ). Không khai SearchAction vì site chưa có tìm kiếm nội bộ. */
function website(locale: Locale): JsonLdObject {
  const dict = getDictionary(locale);
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    name: dict.siteName,
    url: absoluteUrl(locale, "home"),
    inLanguage: locale,
    publisher: { "@id": ORG_ID },
  };
}

/** Ứng dụng NhàLo / Balheh. Cả hai đang miễn phí nên khai Offer giá 0. */
const storeUrls = [siteConfig.nhaloStores.ios.url, siteConfig.nhaloStores.android.url];

function softwareApplication(locale: Locale, page: "nhalo" | "balheh"): JsonLdObject {
  const dict = getDictionary(locale);
  const { title, description } = dict.meta[page];
  const name = page === "nhalo" ? "NhàLo" : "Balheh";

  return {
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl(locale, page)}#software`,
    name,
    alternateName: title,
    description,
    url: absoluteUrl(locale, page),
    applicationCategory: "BusinessApplication",
    operatingSystem: page === "nhalo" ? "iOS, Android" : "Web",
    inLanguage: locale,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
    },
    // NhàLo đã lên App Store và Google Play: khai đường tải và trang chính thức trên store
    // để Google nối trang web với hai listing đó.
    ...(page === "nhalo"
      ? {
          downloadUrl: storeUrls,
          installUrl: storeUrls,
          sameAs: storeUrls,
        }
      : {}),
    publisher: { "@id": ORG_ID },
  };
  // Cố ý KHÔNG khai aggregateRating: Google yêu cầu điểm đánh giá phải hiển thị ngay trên
  // trang, khai mà trang không hiện là một trong những lý do bị phạt thủ công phổ biến nhất.
}

/**
 * Câu hỏi thường gặp. Lưu ý: từ 8/2023 Google chỉ hiện rich result FAQ cho site cơ quan nhà
 * nước và y tế, nên khối này không làm SERP đẹp hơn — giá trị của nó là giúp Google và các
 * công cụ trả lời bằng AI hiểu đúng nội dung trang.
 */
function faqPage(locale: Locale, page: PageKey, items: FaqItem[]): JsonLdObject {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(locale, page)}#faq`,
    inLanguage: locale,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function contactPage(locale: Locale): JsonLdObject {
  const dict = getDictionary(locale);
  return {
    "@type": "ContactPage",
    "@id": `${absoluteUrl(locale, "contact")}#contact`,
    name: dict.meta.contact.title,
    description: dict.meta.contact.description,
    url: absoluteUrl(locale, "contact"),
    inLanguage: locale,
    about: { "@id": ORG_ID },
  };
}

/** Các trang con cấp 2 (/nhalo/privacy/…) và trang cha tương ứng. */
const BREADCRUMB_PARENTS: Partial<Record<PageKey, PageKey>> = {
  nhaloPrivacy: "nhalo",
  nhaloDeleteAccount: "nhalo",
  nhaloTerms: "nhalo",
  nhaloGuide: "nhalo",
  nhaloHelp: "nhalo",
};

/**
 * Tên hiển thị trong breadcrumb. Không dùng title SEO: title viết cho kết quả tìm kiếm nên
 * dài ("Phần mềm quản lý nhà trọ NhàLo — Miễn phí cho chủ nhà"), còn breadcrumb cần tên ngắn.
 */
const BREADCRUMB_NAMES: Partial<Record<PageKey, string>> = {
  nhalo: "NhàLo",
  balheh: "Balheh",
};

function breadcrumbName(locale: Locale, page: PageKey) {
  const custom = BREADCRUMB_NAMES[page];
  if (custom) return custom;
  // Title của trang con có thể kèm phần mô tả sau dấu "—"; breadcrumb chỉ lấy vế đầu.
  return getDictionary(locale).meta[page].title.split(" — ")[0]!;
}

function breadcrumb(locale: Locale, page: PageKey): JsonLdObject | null {
  const parent = BREADCRUMB_PARENTS[page];
  if (!parent) return null;
  const dict = getDictionary(locale);

  const trail: { name: string; path: string }[] = [
    { name: dict.siteName, path: localizedPath(locale, "home") },
    { name: breadcrumbName(locale, parent), path: localizedPath(locale, parent) },
    { name: breadcrumbName(locale, page), path: localizedPath(locale, page) },
  ];

  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(locale, page)}#breadcrumb`,
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: `${siteConfig.url}${step.path}`,
    })),
  };
}

/**
 * Toàn bộ JSON-LD của một trang, gói trong một @graph duy nhất — cách Google khuyến nghị khi
 * một trang có nhiều thực thể, vì các khối tham chiếu nhau được bằng @id.
 */
export function buildStructuredData({
  locale,
  page,
  faq,
}: {
  locale: Locale;
  page: PageKey;
  /** Câu hỏi thường gặp của trang, nếu có (NhàLo, Balheh). */
  faq?: FaqItem[];
}): JsonLdObject {
  const graph: JsonLdObject[] = [organization(locale)];

  if (page === "home") graph.push(website(locale));
  if (page === "nhalo" || page === "balheh") graph.push(softwareApplication(locale, page));
  if (faq && faq.length > 0) graph.push(faqPage(locale, page, faq));
  if (page === "contact") graph.push(contactPage(locale));

  const crumbs = breadcrumb(locale, page);
  if (crumbs) graph.push(crumbs);

  return { "@context": "https://schema.org", "@graph": graph };
}
