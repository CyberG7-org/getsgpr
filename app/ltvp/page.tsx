import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { ltvp } from "@/content/pages/ltvp";

export const metadata = pageMetadata(ltvp.meta);

export default function LtvpPage() {
  return <Page content={ltvp} />;
}
