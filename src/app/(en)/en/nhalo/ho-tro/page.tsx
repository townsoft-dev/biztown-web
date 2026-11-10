import { LocalePage } from "@/components/locale-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata("en", "nhaloHelp");

export default function Page() {
  return <LocalePage locale="en" page="nhaloHelp" />;
}
