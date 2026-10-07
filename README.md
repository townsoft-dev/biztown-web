# biztown.vn — website của BizTown Rent Manager

Các trang công khai phục vụ việc nộp ứng dụng lên App Store và Google Play, song ngữ
Việt/Anh. Viết bằng **Next.js, xuất tĩnh** (`output: "export"`): build ra thư mục `out/`
chỉ gồm HTML/CSS/JS, chạy được trên bất kỳ static host nào (ở đây: Nginx trên server Lightsail).

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

**CI/CD** (`.github/workflows/ci-cd.yml`):

- Pull request vào `main`: `lint`, `typecheck`, `format:check`, `build` (không deploy). Nhánh khác không chạy CI.
- Chỉ nhánh **`main`**: build xong thì deploy lên server Lightsail (chung máy với Balheh),
  dùng ba secret `LIGHTSAIL_HOST`, `LIGHTSAIL_USER` (= `ubuntu`), `LIGHTSAIL_KEY_PEM`.

Trên server, mọi thứ nằm trong `/home/ubuntu/biztown-web`:

```
docker-compose.yml       # SỬA TAY trên server (mẫu: deploy/docker-compose.yml)
nginx/default.conf       # SỬA TAY trên server (mẫu: deploy/nginx/default.conf)
build/                   # CI ghi: nội dung out/ của lần deploy mới nhất
```

Container `biztown-web` (`nginx:1.26.3`) phục vụ `build/` ở `127.0.0.1:8090`.
`gateway-nginx` (network host, giữ 80/443) nhận `biztown.vn` và proxy về cổng này — giống
frontend Balheh (8080), dev (8088), storage (8081).

`docker-compose.yml` và `nginx/default.conf` do người quản lý server tạo và sửa tay; CI **không**
chép hai file này và không chạy `docker compose`. Hai file trong `deploy/` chỉ là mẫu tham khảo.

Mỗi lần deploy, CI giải nén bản build vào `build.new/`, đổi tên `build/` → `build.old/` và
`build.new/` → `build/` (gần như tức thì), rồi xoá `build.old/`. CI không kiểm tra site sau khi
deploy — xem trên server bằng `curl -sI http://127.0.0.1:8090/support/`. Muốn quay về một
bản cũ hơn: chạy lại workflow của commit đó (Actions → Re-run) hoặc `git revert` rồi push.

`trailingSlash: true` nên mỗi trang là `<trang>/index.html`; `/support` chuyển hướng sang
`/support/`. Trang 404 là `out/404.html`. Domain dùng cho canonical, hreflang, sitemap:
`NEXT_PUBLIC_SITE_URL` (mặc định `https://biztown.vn`).

### Tên miền

`gateway-nginx` (`/home/ubuntu/nginx-gateway`, do người phụ trách server quản lý) giữ TLS
và chứng chỉ Let's Encrypt cho `biztown.vn`, proxy về `127.0.0.1:8090`. Repo này không chứa
cấu hình gateway. Đổi cổng 8090 thì phải báo người phụ trách gateway sửa theo.

Trước đây site chạy trên GitHub Pages; đã bỏ hẳn khi chuyển sang server.
