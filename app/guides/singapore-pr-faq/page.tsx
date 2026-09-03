import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { faq } from "@/content/pages/faq";

export const metadata = pageMetadata(faq.meta);

export default function FaqPage() {
  return <Page content={faq} />;
}
