/**
 * Link tải NhàLo theo nơi đăng: biztown.vn/tai/<mã>/.
 * iPhone → App Store, Android → Google Play, máy tính → trang /nhalo/, đều kèm mã để đo nguồn.
 *
 * Nguồn (utm_source / utm_medium) suy ra từ mã, nên đặt mã mới không cần sửa code:
 * - f01, f02…       bài fanpage            → facebook / fanpage
 * - f01-ad1…        quảng cáo Meta         → facebook / paid
 * - g01-01, g02-01… nhóm 01, bài 01        → facebook / group
 * - w01, w02…       banner website         → banner / website-banner
 * - web, web-qr     người tự vào biztown.vn → biztown / website
 * - z…, zalo        Zalo OA                → zalo / oa
 * Đuôi "-qr" = người quét mã QR trên trang /nhalo/ (vd. w01-qr).
 * Danh sách mã đang dùng: bảng NhaLo-Chay-thu-3-huong.xlsx, sheet "Link & mã đo".
 */
export function linkSource(code: string): { source: string; medium: string } {
  if (/-ad\d*/.test(code)) return { source: "facebook", medium: "paid" };
  if (code.startsWith("web")) return { source: "biztown", medium: "website" };
  if (code.startsWith("w")) return { source: "banner", medium: "website-banner" };
  if (code.startsWith("g")) return { source: "facebook", medium: "group" };
  if (code.startsWith("f")) return { source: "facebook", medium: "fanpage" };
  if (code.startsWith("z")) return { source: "zalo", medium: "oa" };
  return { source: "other", medium: "other" };
}

/** Mã dựng sẵn lúc build (mã khác vẫn chạy, chỉ là render khi có người mở lần đầu). */
export const TAI_PREBUILT_CODES = [
  "f01",
  "f02",
  "f01-ad2",
  "f02-ad1",
  "fp",
  "g01-01",
  "g02-01",
  "g03-01",
  "w01",
  "w02",
  "web",
  "web-qr",
  "zalo",
];

export const TAI_CODE_PATTERN = /^[a-z0-9-]{1,40}$/;
