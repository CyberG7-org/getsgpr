import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { readiness } from "@/content/pages/readiness";

export const metadata = pageMetadata(readiness.meta);

export default function ReadinessPage() {
  return <Page content={readiness} />;
}
