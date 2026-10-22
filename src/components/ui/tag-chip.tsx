import { cn } from "@/lib/utils";

/** Nhãn nhỏ phía trên tiêu đề section (Figma: Tag chip). */
export function TagChip({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-card py-[7px] pr-4 pl-[7px] text-[14px] leading-[22.4px] font-medium whitespace-nowrap text-ink-muted shadow-[0_1px_1px_var(--shadow-soft)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex size-5 items-center justify-center rounded-full bg-accent"
      >
        <span className="size-1.5 rounded-full bg-on-accent" />
      </span>
      {label}
    </span>
  );
}
