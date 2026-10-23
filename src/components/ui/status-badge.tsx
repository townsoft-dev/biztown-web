import { cn } from "@/lib/utils";

export type ProductStatus = "live" | "soon";

/** Trạng thái sản phẩm: Đang hoạt động (xanh) / Sắp ra mắt (cam nhạt). */
export function StatusBadge({
  status,
  label,
  className,
}: {
  status: ProductStatus;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[12px] leading-3 font-semibold whitespace-nowrap",
        status === "live" ? "bg-positive-bg text-positive" : "bg-accent-tint text-accent-text",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current" />
      {label}
    </span>
  );
}
