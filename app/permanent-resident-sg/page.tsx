import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { pr } from "@/content/pages/pr";

export const metadata = pageMetadata(pr.meta);

export default function PermanentResidentPage() {
  return <Page content={pr} />;
}
