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
 * Đuôi mã (nguồn vẫn suy theo phần đầu, vd. w01-trang → banner / website-banner):
 * - "-qr"    = QR in trên ấn phẩm / banner (vd. w01-qr: QR in trên banner tuần 1);
 * - "-trang" = QR hoặc nút store trên trang /nhalo/, theo utm_campaign người vào mang theo
 *              (vd. w01-trang: bấm banner w01 → vào /nhalo/ trên máy tính → quét QR trên trang).
 * Người tự vào /nhalo/ (không có utm_campaign): QR dùng "web-qr", nút store dùng "web".
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
  "w01-qr",
  "w01-trang",
  "w02",
  "w02-qr",
  "w02-trang",
  "web",
  "web-qr",
  "zalo",
];

export const TAI_CODE_PATTERN = /^[a-z0-9-]{1,40}$/;

/** Tham số `?p=ios|android` trên /tai/<mã>/: bắt buộc mở đúng store (nút store trên trang). */
export type TaiPlatform = "ios" | "android";

/**
 * Mã cho QR / nút store trên trang /nhalo/ theo utm_campaign của người vào: "<mã>-trang".
 * utm_campaign lạ, quá dài hoặc không có → null (QR dùng "web-qr", nút store "web").
 * Bỏ đuôi -qr / -trang sẵn có để không thành "w01-qr-trang".
 */
export function pageLinkCode(campaign: string | null | undefined): string | null {
  if (!campaign) return null;
  const base = campaign
    .trim()
    .toLowerCase()
    .replace(/-(qr|trang)$/, "");
  const code = `${base}-trang`;
  if (!base || !TAI_CODE_PATTERN.test(code)) return null;
  return code;
}

/** Đường dẫn /tai/<mã>/ (kèm ?p= nếu bắt buộc store). */
export function taiPath(code: string, platform?: TaiPlatform) {
  return `/tai/${code}/${platform ? `?p=${platform}` : ""}`;
}
