import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { contact } from "@/content/pages/contact";

export const metadata = pageMetadata(contact.meta);

export default function ContactPage() {
  return <Page content={contact} />;
}
