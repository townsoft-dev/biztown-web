import type { NhaloContent } from "@/content/nhalo-types";
import type { Locale } from "@/i18n/config";

import { NhaloContract } from "./contract";
import { NhaloDownloadBand } from "./download-band";
import { NhaloFaq } from "./faq";
import { NhaloFeatures } from "./features";
import { NhaloHero } from "./hero";
import { NhaloRoles } from "./roles";
import { NhaloStart } from "./start";
import { NhaloStrip } from "./strip";
import { NhaloUtilities } from "./utilities";

/** Trang sản phẩm NhàLo theo Figma "NhàLo · HTML V7 · VI · 1440". */
export function NhaloPage({ content, locale }: { content: NhaloContent; locale: Locale }) {
  return (
    <>
      <NhaloHero content={content.hero} app={content.app} />
      <NhaloStrip content={content.strip} />
      <NhaloFeatures content={content.features} app={content.app} />
      <NhaloUtilities content={content.utilities} locale={locale} />
      <NhaloContract content={content.contract} app={content.app} />
      <NhaloRoles content={content.roles} app={content.app} />
      <NhaloStart content={content.start} />
      <NhaloFaq content={content.faq} />
      <NhaloDownloadBand content={content.band} />
    </>
  );
}
