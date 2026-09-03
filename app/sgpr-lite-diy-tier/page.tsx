import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { pkgLite } from "@/content/pages/pkg-lite";

export const metadata = pageMetadata(pkgLite.meta);

export default function PkgLitePage() {
  return <Page content={pkgLite} />;
}
