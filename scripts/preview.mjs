#!/usr/bin/env node
// `pnpm preview`: chạy bản build (.next/standalone/server.js) như trên server thật, ở
// http://localhost:8899. Biến môi trường (MAIL_USER, MS_*…) lấy từ .env.local rồi .env nếu có
// (biến đã có không bị ghi đè — giống thứ tự ưu tiên của Next).
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const server = join(root, ".next/standalone/server.js");
if (!existsSync(server)) {
  console.error("Chưa có bản build — chạy `pnpm build` trước.");
  process.exit(1);
}

// Đọc file env (KEY=VALUE mỗi dòng); không dùng process.loadEnvFile vì cần Node ≥ 20.12.
for (const envFile of [".env.local", ".env"].map((name) => join(root, name))) {
  if (!existsSync(envFile)) continue;
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match && process.env[match[1]] === undefined) {
      process.env[match[1]] = match[2].replace(/^(["'])(.*)\1$/, "$2");
    }
  }
}

process.env.PORT ??= "8899";
process.env.HOSTNAME ??= "localhost";
await import(pathToFileURL(server).href);
