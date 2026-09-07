import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { bookCall } from "@/content/pages/book-call";

export const metadata = pageMetadata(bookCall.meta);

export default function BookCallPage() {
  return <Page content={bookCall} />;
}
