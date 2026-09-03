import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { prFamily } from "@/content/pages/pr-family";

export const metadata = pageMetadata(prFamily.meta);

export default function PrFamilyPage() {
  return <Page content={prFamily} />;
}
