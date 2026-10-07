import { LocalePage } from "@/components/locale-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata("en", "home");

export default function Page() {
  return <LocalePage locale="en" page="home" />;
}
