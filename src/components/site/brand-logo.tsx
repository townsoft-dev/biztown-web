import Image from "next/image";

/** Logo BizTown (172×41.4): bản chữ navy cho Day, bản chữ sáng cho Night. */
export function BrandLogo() {
  return (
    <>
      <Image
        src="/images/home/biztown-logo.svg"
        alt="BizTown"
        width={172}
        height={42}
        priority
        className="theme-light-only h-[41.4px] w-[172px]"
      />
      <Image
        src="/images/home/biztown-logo-alt.svg"
        alt="BizTown"
        width={172}
        height={42}
        className="theme-dark-only h-[41.4px] w-[172px]"
      />
    </>
  );
}
