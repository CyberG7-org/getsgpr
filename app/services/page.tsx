import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { services } from "@/content/pages/services";

export const metadata = pageMetadata(services.meta);

export default function ServicesPage() {
  return <Page content={services} />;
}
