import { Reveal } from "@/components/home/reveal";
import { TagChip } from "@/components/ui/tag-chip";
import { siteConfig } from "@/config/site";
import type { MarkTitle, StoreBadge } from "@/content/nhalo-types";
import { cn } from "@/lib/utils";

/** Tiêu đề hai dòng, dòng sau có vạch tô cam (Figma: Title + Highlighted phrase). */
export function MarkedTitle({ title, className }: { title: MarkTitle; className?: string }) {
  return (
    <h2 className={cn("bt-h2 text-balance text-ink", className)}>
      <span className="block">{title.lead}</span>
      <span className="bt-mark">{title.mark}</span>
    </h2>
  );
}

/** Tag chip + tiêu đề + đoạn dẫn căn giữa (Figma: Section heading). */
export function NhaloSectionHead({
  tag,
  title,
  lead,
}: {
  tag: string;
  title: MarkTitle;
  /** Một đoạn, hoặc mảng các dòng ngắt sẵn (màn rộng không xuống dòng giữa cụm từ). */
  lead?: string | string[];
}) {
  return (
    <Reveal className="mx-auto flex max-w-[1100px] flex-col items-center gap-[18px] text-center">
      <TagChip label={tag} />
      <MarkedTitle title={title} />
      {typeof lead === "string" && <p className="bt-lead max-w-[720px] text-pretty">{lead}</p>}
      {Array.isArray(lead) && (
        <p className="bt-lead text-balance">
          {lead.map((line) => (
            <span key={line} className="lg:block lg:whitespace-nowrap">
              {line}{" "}
            </span>
          ))}
        </p>
      )}
    </Reveal>
  );
}

/**
 * Nút store chính hãng (file gốc của Apple / Google, bản tiếng Việt và tiếng Anh) — giữ
 * nguyên màu, tỉ lệ, chữ theo hướng dẫn thương hiệu. `ratio` = rộng / cao của file (đã cắt sát
 * viền), để hai nút cao bằng nhau mà vẫn lấp đầy hàng.
 */
const STORES = [
  {
    name: "App Store",
    platform: "ios",
    ratio: 119.66 / 40,
    src: { vi: "/images/nhalo/badge-app-store-vi.svg", en: "/images/nhalo/badge-app-store-en.svg" },
    href: siteConfig.nhaloStores.ios.url,
  },
  {
    name: "Google Play",
    platform: "android",
    ratio: 646 / 192,
    src: {
      vi: "/images/nhalo/badge-google-play-vi.png",
      en: "/images/nhalo/badge-google-play-en.png",
    },
    href: siteConfig.nhaloStores.android.url,
  },
] as const;

/**
 * Hai nút tải app (Figma: pill / store). Mặc định là link store thật; trang /nhalo/ truyền
 * `links` là link store kèm mã nguồn và hàm ghi lượt bấm (tai_click trên GA4).
 * `store.badge` chỉ còn dùng nếu cần gắn lại nhãn kiểu "Sắp có" cho một sản phẩm khác.
 *
 * Không đặt rel="nofollow": đây là link biên tập chính đáng tới trang chính thức của ứng
 * dụng, và chính nó giúp Google nối thực thể NhàLo trên web với listing trên store.
 */
export function StoreBadges({
  store,
  links,
  equal,
  height = 52,
  className,
}: {
  store: StoreBadge;
  /**
   * Link store kèm mã nguồn + hàm ghi lượt bấm (use-link-code.ts). Chỉ truyền từ component
   * client, vì có hàm onClick.
   */
  links?: { ios: string; android: string; onClick?: (platform: "ios" | "android") => void };
  /** Hai nút giãn lấp đầy hàng (vẫn cao bằng nhau), thay cho chiều cao cố định. */
  equal?: boolean;
  /** Chiều cao nút (px) khi không `equal`. */
  height?: number;
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)}>
      {STORES.map((item) => (
        <li
          key={item.name}
          className={cn("relative", equal ? "min-w-0" : "shrink-0")}
          style={equal ? { flex: `${item.ratio} 1 0` } : undefined}
        >
          <a
            href={links ? links[item.platform] : item.href}
            onClick={links?.onClick ? () => links.onClick?.(item.platform) : undefined}
            target="_blank"
            rel="noopener"
            className="block rounded-[10px] transition-transform hover:-translate-y-0.5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG/PNG gốc của store */}
            <img
              src={item.src[store.lang]}
              alt={`${store.prefix} ${item.name}`}
              width={Math.round(height * item.ratio)}
              height={height}
              className={cn("block", equal && "h-auto w-full")}
            />
          </a>
          {store.badge && (
            <span className="absolute top-[-11px] right-[-11px] rounded-[11px] bg-accent px-2 py-[3px] text-[10px] leading-4 font-bold whitespace-nowrap text-on-accent">
              {store.badge}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/** Kích thước gốc (Figma "NhàLo · Homepage mascots") của từng dáng mascot ở public/images/nhalo/mascot/. */
const MASCOT_ART = {
  "tui-tien": [385, 352],
  "bang-mien-phi": [396, 478],
  "lo-dau-chi-tay": [300, 400],
  "giao-chia-khoa": [509, 373],
  "tai-nghe": [373, 386],
  "band-chi-noi-dung": [640, 480],
  "band-mua-tien": [640, 480],
  "band-thanh-thoi": [640, 480],
} as const;

export type MascotArtName = keyof typeof MASCOT_ART;

/** Một dáng mascot (SVG trang trí, không mang nội dung — alt rỗng). Cỡ hiển thị đặt bằng className. */
export function MascotArt({ name, className }: { name: MascotArtName; className?: string }) {
  const [width, height] = MASCOT_ART[name];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG minh hoạ, không cần tối ưu ảnh
    <img
      src={`/images/nhalo/mascot/${name}.svg`}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      loading="lazy"
      className={cn("pointer-events-none h-auto select-none", className)}
    />
  );
}
