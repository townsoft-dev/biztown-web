import type { AppCopy, NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS } from "@/i18n/config";

import { AnnotatedScreen, type AnnoSide } from "./annotated-screen";
import { PHONE_SCALE, Phone } from "./app/app-ui";
import { ContractScreen } from "./app/screens";
import { NhaloSectionHead } from "./parts";

/** Số lẻ bên trái, số chẵn bên phải (Figma "Contract detail / Annotated screen"). */
const SIDES: AnnoSide[] = ["left", "right", "left", "right", "left", "right"];

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
          sides={SIDES}
          callouts={content.callouts}
          hint={app.scrollHint}
          phone={
            <Phone scroll="body" className={PHONE_SCALE}>
              <ContractScreen t={app} />
            </Phone>
          }
        />
      </div>
    </section>
  );
}
