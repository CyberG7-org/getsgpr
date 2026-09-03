import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { about } from "@/content/pages/about";

export const metadata = pageMetadata(about.meta);

export default function AboutPage() {
  return <Page content={about} />;
}
