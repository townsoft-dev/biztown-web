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
} as const;
