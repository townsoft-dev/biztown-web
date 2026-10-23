import type { AppCopy, NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS } from "@/i18n/config";

import { Phone } from "./app/app-ui";
import { ContractScreen } from "./app/screens";
import { AnnotatedScreen, NhaloSectionHead, type AnnotationLayout } from "./parts";

/** Toạ độ chú thích theo Figma "Contract detail / Annotated screen": số lẻ bên trái, số chẵn bên phải. */
const LAYOUT: AnnotationLayout = {
  height: 845,
  calloutWidth: 367.5,
  phoneWidth: 252.8,
  callouts: [
    { side: "left", slot: 85, pin: 163 },
    { side: "right", slot: 165, pin: 330 },
    { side: "left", slot: 279, pin: 310 },
    { side: "right", slot: 384, pin: 417 },
    { side: "left", slot: 473, pin: 522 },
    { side: "right", slot: 603, pin: 589 },
  ],
};

/** "Mọi điều khoản nằm gọn trong một màn hình" (Figma: Contract detail). */
export function NhaloContract({
  content,
  app,
}: {
  content: NhaloContent["contract"];
  app: AppCopy;
}) {
  return (
    <section
      id={NHALO_SECTIONS.contract}
      className="bg-[radial-gradient(1008px_743px_at_0_495px,var(--nl-glow),transparent)] pt-[88px] max-md:py-16"
    >
      <div className="bt-wrap flex flex-col gap-11">
        <NhaloSectionHead tag={content.tag} title={content.title} lead={content.lead} />
        <AnnotatedScreen
          layout={LAYOUT}
          callouts={content.callouts}
          phone={
            <Phone height={1203} className="[--s:0.64]">
              <ContractScreen t={app} />
            </Phone>
          }
        />
      </div>
    </section>
  );
}
