import { LocalePage } from "@/components/locale-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata("en", "contact");

export default function Page() {
  return <LocalePage locale="en" page="contact" />;
}
