import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { appeal } from "@/content/pages/appeal";

export const metadata = pageMetadata(appeal.meta);

export default function AppealPage() {
  return <Page content={appeal} />;
}
