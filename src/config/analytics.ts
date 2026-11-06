/**
 * Mã đo lường công khai (không phải bí mật — trình duyệt nào cũng đọc được).
 * Để trống thì không tải script tương ứng.
 *
 * - ga4Id: Google Analytics 4, dạng "G-XXXXXXXXXX" (Admin › Data streams › Web).
 * - metaPixelId: Meta Pixel, dãy số (Events Manager › Data sources).
 * - appStoreProviderToken: tham số `pt` của link chiến dịch App Store
 *   (App Store Connect › Analytics › Campaigns). Có thì App Store đếm lượt tải theo mã `ct`.
 */
export const analyticsConfig = {
  ga4Id: "G-08HP8FRMNH",
  metaPixelId: "1009333991448721",
  appStoreProviderToken: "129459545",
};
