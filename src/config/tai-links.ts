/**
 * Link tải NhàLo theo nơi đăng: biztown.vn/tai/<mã>/.
 * iPhone → App Store, Android → Google Play, máy tính → trang /nhalo/, đều kèm mã để đo nguồn.
 * Thêm mã mới: thêm một dòng (chữ thường, số, gạch ngang). Mã chưa khai vẫn chạy, nguồn ghi "other".
 * Danh sách đầy đủ và ý nghĩa: bảng NhaLo-Chay-thu-3-huong.xlsx, sheet "Link & mã đo".
 */
export const TAI_LINKS: Record<string, { source: string; medium: string }> = {
  "meta-ht1": { source: "facebook", medium: "paid-awareness" },
  "meta-tn1": { source: "facebook", medium: "paid-messenger" },
  g01: { source: "facebook", medium: "group" },
  g02: { source: "facebook", medium: "group" },
  g03: { source: "facebook", medium: "group" },
  fp: { source: "facebook", medium: "fanpage" },
  zalo: { source: "zalo", medium: "oa" },
  "bds-01": { source: "batdongsan", medium: "banner" },
  "bds-02": { source: "batdongsan", medium: "banner" },
};

export const TAI_CODE_PATTERN = /^[a-z0-9-]{1,40}$/;
