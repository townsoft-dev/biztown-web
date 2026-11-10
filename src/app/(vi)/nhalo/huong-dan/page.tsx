import { LocalePage } from "@/components/locale-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata("vi", "nhaloGuide");

export default function Page() {
  return <LocalePage locale="vi" page="nhaloGuide" />;
}
