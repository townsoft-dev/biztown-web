import type { ReactNode } from "react";

import { RootDocument, rootMetadata, rootViewport } from "@/components/root-document";

export const metadata = rootMetadata("en");
export const viewport = rootViewport;

export default function Layout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
