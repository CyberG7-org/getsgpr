import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { citizenshipReadiness } from "@/content/pages/citizenship-readiness";

export const metadata = pageMetadata(citizenshipReadiness.meta);

export default function CitizenshipReadinessPage() {
  return <Page content={citizenshipReadiness} />;
}
