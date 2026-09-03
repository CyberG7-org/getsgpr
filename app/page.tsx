import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { home } from "@/content/pages/home";

export const metadata = pageMetadata(home.meta);

export default function HomePage() {
  return <Page content={home} />;
}
