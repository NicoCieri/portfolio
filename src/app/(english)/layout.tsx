import type { ReactNode } from "react";
import { RootDocument } from "@/components/root-document";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("en");

export default function Layout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
