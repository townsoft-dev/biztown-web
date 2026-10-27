import Image from "next/image";

/**
 * Logo BizTown dạng biểu tượng trên thanh điều hướng trang sản phẩm (Figma: BizTown LOGO, 40×40):
 * không nền, hình 26.19×20.69 đặt lệch trong khung như file gốc. Dùng chung cho Day/Night.
 */
export function BizTownMark() {
  return (
    <span className="relative block size-10 shrink-0">
      <Image
        src="/images/home/biztown-mark.svg"
        alt=""
        width={26}
        height={21}
        className="absolute top-[11.74px] left-[6.68px] h-[20.69px] w-[26.19px]"
      />
    </span>
  );
}
