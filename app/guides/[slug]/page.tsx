import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/Blocks";
import { Shapes } from "@/components/ui/Shapes";
import { Section } from "@/components/ui/Section";
import { ImagePh } from "@/components/ui/ImagePh";
import { pageMetadata } from "@/lib/metadata";
import { getGuides, getGuide } from "@/lib/markdown";
import type { Block } from "@/content/types";

// The static app/guides/singapore-pr-faq/ route takes precedence over this dynamic
// route for that exact path, but getGuides() is filtered defensively too (see brief).
export function generateStaticParams() {
  return getGuides()
    .filter((g) => g.slug !== "singapore-pr-faq")
    .map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return pageMetadata({
    title: `${guide.title} — GetSGPR Knowledge Centre`,
    description: guide.summary,
    path: `/guides/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide || guide.slug === "singapore-pr-faq") notFound();

  const topBlocks: Block[] = [
    {
      kind: "crumbs",
      items: [
        { label: "Home", href: "/" },
        { label: "Knowledge Centre", href: "/guides" },
        { label: guide.title },
      ],
    },
    {
      kind: "hero", variant: "plain",
      eyebrow: `Guide · ${guide.category}`,
      title: guide.title,
      small: "Last reviewed [[date]] · Reviewed by [[name, role]]",
    },
  ];

  const bottomBlocks: Block[] = [
    { kind: "source", primary: guide.source },
    {
      kind: "cta",
      title: "Not sure where you stand?",
      sub: "Start the free Readiness Review.",
      buttons: [{ label: "Get My Free PR Readiness Report", href: "/pr-readiness-review", style: "light" }],
    },
  ];

  return (
    <>
      <Shapes preset="plain" />
      <main>
        <Blocks blocks={topBlocks} />
        <Section>
          <div className="grid grid-cols-[5fr_7fr] max-[980px]:grid-cols-1 gap-14">
            <div>
              <ImagePh ratio="1-1" label="Photo of the guide's author, headshot" />
            </div>
            <div className="prose-x" dangerouslySetInnerHTML={{ __html: guide.html }} />
          </div>
        </Section>
        <Blocks blocks={bottomBlocks} />
      </main>
    </>
  );
}
