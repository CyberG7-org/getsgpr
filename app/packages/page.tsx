import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { packages } from "@/content/pages/packages";

export const metadata = pageMetadata(packages.meta);

export default function PackagesPage() {
  return <Page content={packages} />;
}
