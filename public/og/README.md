# Ảnh Open Graph (ảnh xem trước khi chia sẻ link)

Bốn file PNG trong thư mục này là **ảnh tạm do script sinh ra**, chỉ để thẻ chia sẻ không bị
trắng. **Hãy thay bằng ảnh xuất từ Figma "BizTown Brandsite".**

| File | Dùng cho trang | Khai ở |
| --- | --- | --- |
| `biztown.png` | `/`, `/en/` và mọi trang không có ảnh riêng (Hỗ trợ, các trang pháp lý) | `src/lib/seo.ts` → `OG_IMAGE_DEFAULT` |
| `nhalo.png` | `/nhalo/`, `/en/nhalo/` | `src/lib/seo.ts` → `OG_IMAGES.nhalo` |
| `balheh.png` | `/balheh/`, `/en/balheh/` | `src/lib/seo.ts` → `OG_IMAGES.balheh` |
| `lien-he.png` | `/lien-he/`, `/en/lien-he/` | `src/lib/seo.ts` → `OG_IMAGES.contact` |

## Yêu cầu khi thay

- **Kích thước đúng 1200 × 630 px** (khai cứng trong `siteConfig.ogImage`). Sai kích thước thì
  Zalo và Facebook sẽ cắt ảnh.
- **Định dạng PNG hoặc JPG.** Không dùng SVG — Zalo, Facebook, Messenger, LinkedIn đều không
  đọc được SVG.
- **Dưới 300 KB** để thẻ xem trước tải nhanh; Facebook giới hạn 8 MB nhưng Zalo chậm hơn nhiều.
- **Chữ quan trọng nằm trong vùng giữa 1200 × 600**: một số nơi cắt mép trên/dưới.
- Ảnh dùng chung cho cả bản tiếng Việt và tiếng Anh. Nếu cần tách theo ngôn ngữ, đổi
  `OG_IMAGES` trong `src/lib/seo.ts` thành `Record<Locale, …>`.

## Thêm ảnh cho trang mới

Thêm một dòng vào `OG_IMAGES` trong `src/lib/seo.ts`, key là `PageKey` trong
`src/i18n/config.ts`. Trang không khai thì tự dùng `biztown.png`.

## Kiểm tra sau khi thay

- Facebook: <https://developers.facebook.com/tools/debug/>
- LinkedIn: <https://www.linkedin.com/post-inspector/>
- Zalo: dán link vào một cuộc trò chuyện với chính mình (Zalo không có công cụ debug công khai,
  và cache khá lâu — đổi ảnh xong nên thêm `?v=2` khi thử lại).
