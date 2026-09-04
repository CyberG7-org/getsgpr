import { Blocks } from "@/components/blocks/Blocks";
import { GhlCalendar } from "@/components/widgets/GhlCalendar";
import { Section } from "@/components/ui/Section";
import { Shapes } from "@/components/ui/Shapes";
import { pageMetadata } from "@/lib/metadata";
import type { Block } from "@/content/types";

export const metadata = pageMetadata({
  title: "Book a Free Consultation | GetSGPR",
  description: "Choose a convenient time for a complimentary consultation with GetSGPR.",
  path: "/book-a-call",
});

const hero: Block[] = [
  {
    kind: "hero",
    variant: "plain",
    eyebrow: "Book a consultation",
    title: "Choose a time that works for you.",
    sub: "Select an available slot below for your complimentary, non-obligatory consultation.",
    small: "No documents are needed for your first call.",
    centered: true,
  },
];

export default function BookACallPage() {
  return (
    <>
      <Shapes preset="plain" />
      <main>
        <Blocks blocks={hero} />
        <Section>
          <div className="mx-auto max-w-[1080px] overflow-hidden rounded-[24px] border border-line bg-white p-4 shadow-card max-[640px]:rounded-[18px] max-[640px]:p-1">
            <GhlCalendar />
          </div>
        </Section>
      </main>
    </>
  );
}
