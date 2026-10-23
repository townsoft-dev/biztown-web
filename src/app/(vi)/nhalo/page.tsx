import { LocalePage } from "@/components/locale-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata("vi", "nhalo");

export default function Page() {
  return <LocalePage locale="vi" page="nhalo" />;
}
