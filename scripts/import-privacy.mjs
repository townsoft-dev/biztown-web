#!/usr/bin/env node
// Nhập nội dung chính sách quyền riêng tư từ file HTML do repo biztown-rent sinh ra
// (`python3 tools/build_privacy.py` → web/privacy/index.html).
//
// Cách dùng:
//   pnpm import:privacy <đường-dẫn-tới>/biztown-rent/web/privacy/index.html
//
// Script cắt hai khối <div data-lang="vi"> và <div data-lang="en"> trong <main>, ghi ra
// src/content/privacy/{vi,en}.html. Trang /privacy và /en/privacy đọc hai file này lúc build.
// Đừng sửa tay hai file đó: lần nhập sau sẽ ghi đè.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const source = process.argv[2];
if (!source) {
  console.error("Thiếu đường dẫn: pnpm import:privacy <biztown-rent>/web/privacy/index.html");
  process.exit(1);
}

const html = readFileSync(source, "utf8").replace(/\r\n/g, "\n");
const match = html.match(
  /<div data-lang="vi">\n([\s\S]*?)\n {2}<\/div>\s*<div data-lang="en" hidden>\n([\s\S]*?)\n {2}<\/div>\s*<\/main>/,
);
if (!match) {
  console.error(
    "Không tìm thấy hai khối data-lang vi/en trong <main>. Cấu trúc file sinh ra đã đổi?",
  );
  process.exit(1);
}

/** Bỏ thụt lề 4 dấu cách của khối gốc. */
const dedent = (block) => block.replace(/^ {4}/gm, "").trim() + "\n";

/** Link nội bộ của bản tiếng Anh trỏ sang trang /en/... tương ứng. */
const localizeLinks = (block) =>
  block.replace(/href="\/(support|privacy|delete-account)?"/g, (_, page) =>
    page ? `href="/en/${page}"` : 'href="/en"',
  );

const outDir = join(dirname(fileURLToPath(import.meta.url)), "../src/content/privacy");
writeFileSync(join(outDir, "vi.html"), dedent(match[1]));
writeFileSync(join(outDir, "en.html"), localizeLinks(dedent(match[2])));
console.log(`Đã ghi ${outDir}/vi.html và en.html`);
