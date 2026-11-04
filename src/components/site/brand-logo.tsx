import Image from "next/image";

/**
 * Logo BizTown (172×41.4): bản chữ navy cho Day, bản chữ sáng cho Night.
 *
 * Không đặt `priority`: phần tử LCP của mọi trang là khối chữ ở đầu trang, không phải logo,
 * nên preload logo chỉ tranh băng thông với font và CSS trong những mili-giây đầu.
 *
 * Nhưng vẫn `loading="eager"` cho cả hai bản: logo nằm ngay đầu trang, và bản không hợp chế độ
 * sáng/tối đang bị `display: none` (xem .theme-light-only / .theme-dark-only ở globals.css) —
 * để lazy thì trình duyệt hoãn tải, đổi chế độ sẽ thấy logo trống một nhịp.
 */
export function BrandLogo() {
  return (
    <>
      <Image
        src="/images/home/biztown-logo.svg"
        alt="BizTown"
        width={172}
        height={42}
        loading="eager"
        className="theme-light-only h-[41.4px] w-[172px]"
      />
      <Image
        src="/images/home/biztown-logo-alt.svg"
        alt="BizTown"
        width={172}
        height={42}
        loading="eager"
        className="theme-dark-only h-[41.4px] w-[172px]"
      />
    </>
  );
}
