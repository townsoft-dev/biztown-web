# biztown.vn — website của BizTown Rent Manager

Các trang công khai phục vụ việc nộp ứng dụng lên App Store và Google Play, song ngữ
Việt/Anh. Viết bằng **Next.js, xuất tĩnh** (`output: "export"`): build ra thư mục `out/`
chỉ gồm HTML/CSS/JS, chạy được trên bất kỳ static host nào (Nginx, GitHub Pages...).

| Đường dẫn (VI)    | Bản tiếng Anh        | Khai vào đâu                                                        |
| ----------------- | -------------------- | ------------------------------------------------------------------- |
| `/`               | `/en`                | —                                                                   |
| `/support`        | `/en/support`        | **Support URL** — App Store Connect, bắt buộc                       |
| `/privacy`        | `/en/privacy`        | **Privacy Policy URL** — App Store Connect và Google Play, bắt buộc |
| `/delete-account` | `/en/delete-account` | **Delete Account URL** — Google Play → Data safety, bắt buộc        |

**Không đổi bốn đường dẫn tiếng Việt** — chúng đã khai với hai store.

## Vì sao repo này tách riêng

Mã nguồn ứng dụng nằm ở repo **`townsoft-dev/biztown-rent`**, để **private**. Phần web
vốn để công khai nên tách ra đây.

## Công nghệ

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind CSS v4 ·
ESLint 9 + Prettier · pnpm. Cấu hình tooling lấy từ base `biztown` (landing page công ty).

Yêu cầu: Node.js ≥ 20.9, pnpm ≥ 10.

```sh
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # xuất tĩnh ra out/
pnpm preview      # phục vụ out/ tại http://localhost:8899 — giống môi trường thật nhất
pnpm lint         # ESLint
pnpm typecheck    # TypeScript
pnpm format       # Prettier
```

Trước khi commit: `pnpm lint` và `pnpm build` phải không lỗi.

## Cấu trúc

```
src/
├─ app/
│  ├─ (vi)/                  # Root layout + trang tiếng Việt: /, /support, /privacy, /delete-account
│  ├─ (en)/en/               # Root layout ở (en)/ + trang tiếng Anh dưới /en
│  ├─ global-not-found.tsx   # Trang 404 (out/404.html)
│  ├─ sitemap.ts  robots.ts
│  └─ globals.css            # Design tokens (màu lấy từ theme.dart của app) + kiểu chữ .doc
├─ components/
│  ├─ root-document.tsx      # <html>/<body>, metadata gốc dùng chung cho hai root layout
│  ├─ site-shell.tsx         # Header, điều hướng, nút chuyển ngôn ngữ, chân trang
│  └─ locale-page.tsx        # Ghép khung + nội dung theo (ngôn ngữ, trang)
├─ content/
│  ├─ vi/  en/               # Nội dung trang chủ, hỗ trợ, xoá tài khoản (TSX viết tay)
│  └─ privacy/               # vi.html, en.html — SINH RA, đừng sửa tay
├─ i18n/
│  ├─ config.ts              # Danh sách ngôn ngữ, danh sách trang, localizedPath()
│  └─ dictionaries.ts        # Chữ dùng chung: điều hướng, title, description, chân trang
├─ config/site.ts            # URL site, email liên hệ
└─ lib/seo.ts                # Metadata: canonical, hreflang, Open Graph
public/                      # Chép nguyên vào out/ (CNAME, .nojekyll)
scripts/import-privacy.mjs   # Nhập chính sách quyền riêng tư từ repo biztown-rent
```

Vì sao không dùng next-intl và URL `/vi`: xuất tĩnh thì không có server/proxy để chuyển
hướng theo ngôn ngữ, mà bốn URL tiếng Việt phải giữ nguyên ở gốc. Nên mỗi ngôn ngữ là một
route group có root layout riêng (`<html lang>` đúng ngay trong HTML), file `page.tsx` chỉ
là lớp mỏng gọi `LocalePage`.

## Sửa nội dung

- **Trang chủ, Hỗ trợ, Xoá tài khoản**: sửa `src/content/vi/*.tsx` và `src/content/en/*.tsx`
  (sửa cả hai bản). Link nội bộ của bản tiếng Anh trỏ về `/en/...`.
- **Thanh điều hướng, title, description**: `src/i18n/dictionaries.ts`.
- **Email liên hệ ở chân trang**: `src/config/site.ts`.
- **Màu**: khối `@theme` trong `src/app/globals.css`. Kiểu chữ nội dung (h2, danh sách,
  `.meta`, `.steps`, `.callout`, `.note`, bảng) ở khối `.doc` cùng file.

### ⚠️ Chính sách quyền riêng tư là nội dung SINH RA

Nội dung chính sách tồn tại ở **ba nơi**, phải sửa cùng lúc:

1. `docs/PRIVACY-POLICY.md` trong repo `biztown-rent` — **bản gốc**.
2. `src/assets/legal/privacy-{vi,en,ko}.txt` trong repo `biztown-rent` — bản trong ứng dụng.
3. `src/content/privacy/{vi,en}.html` trong repo này — **nhập tự động** từ bản gốc.

Cách cập nhật trang `/privacy`:

```sh
# trong repo biztown-rent
python3 tools/build_privacy.py                        # sinh lại web/privacy/index.html
# trong repo này
pnpm import:privacy <biztown-rent>/web/privacy/index.html
```

Script cắt hai khối `data-lang="vi"` / `"en"` ra hai file HTML và đổi link nội bộ của bản
tiếng Anh sang `/en/...`. Sửa tay hai file đó sẽ bị ghi đè ở lần nhập sau.

## Triển khai

`pnpm build` rồi đưa **toàn bộ thư mục `out/`** lên host. `trailingSlash: true` nên mỗi
trang là `<trang>/index.html`; `/support` và `/support/` đều vào được trên host phục vụ
`index.html` của thư mục (GitHub Pages tự làm; Nginx: `try_files $uri $uri/ =404;`).
Trang 404 là `out/404.html` (Nginx: `error_page 404 /404.html;`).

`public/CNAME` và `public/.nojekyll` được chép vào `out/` — chỉ có tác dụng khi host bằng
GitHub Pages. `.nojekyll` ở đây là **bắt buộc**: Jekyll bỏ qua thư mục bắt đầu bằng `_`,
mà toàn bộ JS/CSS nằm trong `out/_next/`.

Domain dùng cho canonical, hreflang, sitemap: `NEXT_PUBLIC_SITE_URL` (mặc định
`https://biztown.vn`).

### Cấu hình đang chạy (trước khi chuyển sang Next.js)

- GitHub Pages: Source **Deploy from a branch**, nhánh `main`, thư mục `/`. Custom domain
  `biztown.vn`, bật **Enforce HTTPS**.
- DNS (quản lý tại whoisdomain.kr): 4 bản ghi `A` tại `@` trỏ về `185.199.108–111.153`.
  Hướng dẫn: `docs/HUONG-DAN-TRO-TEN-MIEN.md` trong repo `biztown-rent`.

Cách deploy từ nhánh này **không dùng được nữa** vì gốc repo giờ là mã nguồn, không phải
HTML. Phải đổi cách deploy (GitHub Actions build `out/`, hoặc server riêng) **trước khi**
merge vào `main`.
