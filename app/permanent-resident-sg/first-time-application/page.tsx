import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { prFirstTime } from "@/content/pages/pr-first-time";

export const metadata = pageMetadata(prFirstTime.meta);

export default function PrFirstTimePage() {
  return <Page content={prFirstTime} />;
}
