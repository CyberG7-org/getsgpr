import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { pkgConcierge } from "@/content/pages/pkg-concierge";

export const metadata = pageMetadata(pkgConcierge.meta);

export default function PkgConciergePage() {
  return <Page content={pkgConcierge} />;
}
