import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { pkgPartnered } from "@/content/pages/pkg-partnered";

export const metadata = pageMetadata(pkgPartnered.meta);

export default function PkgPartneredPage() {
  return <Page content={pkgPartnered} />;
}
