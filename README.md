# biztown.vn — trang tĩnh cho BizTown Rent Manager

Bốn trang công khai phục vụ việc nộp ứng dụng lên App Store và Google Play.
Chạy trên **GitHub Pages**, tên miền **biztown.vn**.

| Đường dẫn | Khai vào đâu |
|---|---|
| `/` | — |
| `/support` | **Support URL** — App Store Connect, bắt buộc |
| `/privacy` | **Privacy Policy URL** — App Store Connect và Google Play, bắt buộc |
| `/delete-account` | **Delete Account URL** — Google Play → Data safety, bắt buộc |

## Vì sao repo này tách riêng

Mã nguồn ứng dụng nằm ở repo **`townsoft-dev/biztown-rent`**, để **private**.
GitHub Pages chỉ miễn phí với repo **public**, nên phần web tách ra đây: trang
web vốn để công khai, còn mã nguồn thì đóng.

## ⚠️ `privacy/index.html` là file SINH RA, đừng sửa tay

Nội dung chính sách quyền riêng tư tồn tại ở **ba nơi**, phải sửa cùng lúc:

1. `docs/PRIVACY-POLICY.md` trong repo `biztown-rent` — **bản gốc**.
2. `src/assets/legal/privacy-{vi,en,ko}.txt` trong repo `biztown-rent` — bản hiển
   thị bên trong ứng dụng.
3. `privacy/index.html` trong repo này — **sinh tự động** từ bản gốc.

Cách cập nhật trang `/privacy`:

```sh
# trong repo biztown-rent
python3 tools/build_privacy.py       # sinh lại web/privacy/index.html
cp web/privacy/index.html <repo này>/privacy/index.html
```

Sửa thẳng vào HTML ở đây sẽ bị ghi đè ở lần sinh kế tiếp, và khiến bản trên web
lệch với bản trong ứng dụng.

Ba trang còn lại (`index.html`, `support/`, `delete-account/`) viết tay, sửa trực
tiếp được.

## Xem thử tại máy

```sh
python3 -m http.server 8899
```

Rồi mở http://localhost:8899.

## Triển khai

Đẩy lên nhánh `main` là GitHub Pages tự dựng lại sau khoảng một phút.

File **`CNAME`** giữ tên miền `biztown.vn` — GitHub Pages đọc nó, xoá đi là mất
tên miền tuỳ chỉnh. File **`.nojekyll`** tắt Jekyll để GitHub phục vụ file
nguyên trạng.

## Cấu hình đang dùng

- Settings → Pages → Source: **Deploy from a branch**, nhánh `main`, thư mục `/`.
- Custom domain: `biztown.vn`, bật **Enforce HTTPS**.
- DNS: 4 bản ghi `A` tại `@` trỏ về `185.199.108–111.153`. Hướng dẫn chi tiết cho
  người quản lý tên miền: `docs/HUONG-DAN-TRO-TEN-MIEN.md` trong repo
  `biztown-rent`.
