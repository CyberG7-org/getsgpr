import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { citizenship } from "@/content/pages/citizenship";

export const metadata = pageMetadata(citizenship.meta);

export default function CitizenshipPage() {
  return <Page content={citizenship} />;
}
