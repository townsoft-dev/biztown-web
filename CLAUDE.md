@AGENTS.md

# biztown.vn — quy ước dự án

Xem README.md cho cấu trúc và cách sửa nội dung. Những điểm bắt buộc:

- **Site xuất tĩnh** (`output: "export"`). Không dùng thứ cần server: proxy/middleware,
  Server Actions, route handler đọc Request, `cookies()`/`headers()`, redirects/rewrites
  trong `next.config.ts`, next/image tối ưu ảnh. Mọi route khi build phải là `○`.
- **Không đổi** `/`, `/support`, `/privacy`, `/delete-account` — đã khai với App Store và
  Google Play. Tiếng Anh nằm dưới `/en`.
- **Không sửa tay `src/content/privacy/*.html`** — nhập bằng `pnpm import:privacy` từ repo
  biztown-rent.
- Sửa nội dung thì sửa **cả** `src/content/vi` và `src/content/en`; chữ dùng chung ở
  `src/i18n/dictionaries.ts`.
- Màu giữ theo app (`theme.dart`): token trong `@theme` của `src/app/globals.css`.
- Tra tài liệu mới nhất (Context7 hoặc `node_modules/next/dist/docs/`) trước khi viết code
  liên quan thư viện.
- Trước khi commit: `pnpm lint`, `pnpm typecheck`, `pnpm build` không lỗi.
