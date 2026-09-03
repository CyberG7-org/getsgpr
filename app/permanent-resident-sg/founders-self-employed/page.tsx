import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { prFounders } from "@/content/pages/pr-founders";

export const metadata = pageMetadata(prFounders.meta);

export default function PrFoundersPage() {
  return <Page content={prFounders} />;
}
