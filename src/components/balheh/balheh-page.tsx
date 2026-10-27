import type { BalhehContent } from "@/content/balheh-types";

import { BalhehBand } from "./band";
import { BalhehFaq } from "./faq";
import { BalhehFeatures } from "./features";
import { BalhehHero } from "./hero";
import { BalhehManage } from "./manage";
import { BalhehMission } from "./mission";
import { BalhehMore } from "./more";
import { BalhehRoles } from "./roles";
import { BalhehStart } from "./start";
import { BalhehStrip } from "./strip";

/** Trang sản phẩm Balheh theo Figma "Balheh · Homepage · VI · 1440". */
export function BalhehPage({ content }: { content: BalhehContent }) {
  return (
    <>
      <BalhehHero content={content.hero} app={content.app} />
      <BalhehStrip content={content.strip} />
      <BalhehFeatures content={content.features} app={content.app} />
      <BalhehMore content={content.more} app={content.app} />
      <BalhehMission content={content.mission} />
      <BalhehManage content={content.manage} />
      <BalhehRoles content={content.roles} />
      <BalhehStart content={content.start} />
      <BalhehFaq content={content.faq} />
      <BalhehBand content={content.band} />
    </>
  );
}
