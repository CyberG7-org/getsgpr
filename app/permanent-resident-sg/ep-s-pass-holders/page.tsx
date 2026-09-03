import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { prEp } from "@/content/pages/pr-ep";

export const metadata = pageMetadata(prEp.meta);

export default function PrEpPage() {
  return <Page content={prEp} />;
}
