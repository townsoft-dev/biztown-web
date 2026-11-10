/** Thông tin site — nguồn duy nhất cho chân trang, metadata và sitemap. */
function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://biztown.vn";
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  url: getSiteUrl(),
  email: "biztownofficial@townsoftvina.com",
  // Mã xác minh quyền sở hữu biztown.vn trong Google Search Console (thẻ meta ở <head> mọi trang).
  googleSiteVerification: "DxBLIbJzXX7rMZQDC2kBOuvF9J2x7kEhNI3HdwKhIUU",
  themeColor: "#23305e",
  /**
   * Ảnh xem trước khi chia sẻ link (Open Graph / Twitter). Zalo, Facebook, Messenger và
   * LinkedIn đều cần 1200×630 PNG hoặc JPG — không nhận SVG. File nằm ở public/og/,
   * xem public/og/README.md để biết trang nào dùng ảnh nào.
   */
  ogImage: { width: 1200, height: 630 },
  /**
   * Link tải ứng dụng NhàLo. Bỏ tham số theo dõi của nút "Chia sẻ" trên store
   * (`pcampaignid`, `l=vi`) — chúng chỉ phục vụ việc đo nguồn chia sẻ, không nên nằm trong
   * link cố định trên site. Phần slug trong URL App Store không ảnh hưởng, Apple phân giải
   * theo `id`.
   */
  nhaloStores: {
    ios: {
      url: "https://apps.apple.com/vn/app/nh%C3%A0lo/id6812593676",
      appId: "6812593676",
    },
    android: {
      url: "https://play.google.com/store/apps/details?id=com.townsoftvina.biztown.nhalo",
      packageName: "com.townsoftvina.biztown.nhalo",
    },
  },
  /**
   * Nút "Hỏi qua Zalo" / "Nhắn Messenger" ở đầu trang /nhalo/. Để trống thì nút tự ẩn.
   * zalo: link OA dạng https://zalo.me/<id OA>; messenger: https://m.me/<tên fanpage NhàLo>.
   */
  nhaloChat: {
    zalo: "",
    messenger: "",
  },
  /**
   * Thông tin pháp nhân, dùng cho JSON-LD Organization (src/lib/structured-data.ts). Tách
   * từng phần thay vì một chuỗi địa chỉ để khai đúng schema.org/PostalAddress.
   *
   * sameAs: địa chỉ các trang mạng xã hội chính thức — tín hiệu xác thực thực thể khá mạnh
   * với Google. Hiện chưa có trang thật nên để rỗng; điền vào đây là JSON-LD tự có ngay.
   */
  company: {
    legalName: { vi: "Công ty TNHH Townsoft Vina", en: "Townsoft Vina Co., Ltd." },
    taxId: "0109151007",
    streetAddress: "6, Ngõ 7 Lê Đức Thọ",
    addressLocality: "Từ Liêm",
    addressRegion: "Hà Nội",
    addressCountry: "VN",
    sameAs: [] as string[],
  },
} as const;
