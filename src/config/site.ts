/** Thông tin site — nguồn duy nhất cho chân trang, metadata và sitemap. */
function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://biztown.vn";
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  url: getSiteUrl(),
  email: "dreamnguyen@townsoftvina.com",
  themeColor: "#23305e",
} as const;
