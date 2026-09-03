import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { privacy } from "@/content/pages/privacy";

export const metadata = pageMetadata(privacy.meta);

export default function PrivacyDataSecurityPage() {
  return <Page content={privacy} />;
}
