import type { NhaloContent } from "@/content/nhalo-types";
import type { Locale } from "@/i18n/config";

import { NhaloAudience } from "./audience";
import { NhaloDownloadBand } from "./download-band";
import { NhaloFeatures } from "./features";
import { NhaloHero } from "./hero";
import { DEFAULT_VARIANT } from "./hero-variant";
import { NhaloStart } from "./start";
import { NhaloWhy } from "./why";

/**
 * Chọn tiêu đề hero theo utm_campaign trước khi trang hiện (không nháy chữ): chạy đồng bộ
 * ngay trước hero, thêm một thẻ <style> ẩn bản mặc định và hiện bản khớp. Danh sách id + mẫu
 * lấy từ content (hero.variants); id chỉ gồm chữ thường và số nên ghép vào CSS an toàn.
 */
function HeroVariantScript({ variants }: { variants: NhaloContent["hero"]["variants"] }) {
  const rules = variants
    .filter((variant) => /^[a-z0-9]+$/.test(variant.id))
    .map((variant) => [variant.id, variant.match]);
  if (!rules.length) return null;
  const data = JSON.stringify(rules).replace(/</g, "\\u003c");
  const js = `try{var c=(new URLSearchParams(location.search).get("utm_campaign")||"").toLowerCase(),v=${data};for(var i=0;i<v.length;i++){if(new RegExp(v[i][1]).test(c)){var s=document.createElement("style");s.textContent='[data-nl-v="${DEFAULT_VARIANT}"]{display:none!important}[data-nl-v="'+v[i][0]+'"]{display:contents!important}';document.head.appendChild(s);break}}}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}

/** Trang sản phẩm NhàLo theo Figma "NhàLo · HTML V7 · VI · 1440". */
export function NhaloPage({ content, locale }: { content: NhaloContent; locale: Locale }) {
  return (
    <>
      <HeroVariantScript variants={content.hero.variants} />
      <NhaloHero content={content.hero} app={content.app} locale={locale} />
      <NhaloWhy content={content.why} />
      <NhaloFeatures content={content.features} app={content.app} />
      <NhaloAudience content={content.audience} roles={content.roles} app={content.app} />
      <NhaloStart content={content.start} faq={content.faq} locale={locale} />
      <NhaloDownloadBand content={content.band} locale={locale} />
    </>
  );
}
