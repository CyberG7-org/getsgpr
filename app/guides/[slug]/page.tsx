import { notFound } from "next/navigation";
import Image from "next/image";
import { Blocks } from "@/components/blocks/Blocks";
import { Shapes } from "@/components/ui/Shapes";
import { Section } from "@/components/ui/Section";
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

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Knowledge Centre", href: "/guides" },
    { label: guide.title },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `https://getsgpr.com${item.href}` : `https://getsgpr.com/guides/${guide.slug}`,
    })),
  };

  const topBlocks: Block[] = [
    {
      kind: "hero", variant: "plain",
      eyebrow: `Guide · ${guide.category}`,
      title: guide.title,
      small: "Last reviewed [[date]]",
      crumbs,
    },
  ];

  const bottomBlocks: Block[] = [
    { kind: "source", primary: guide.source },
    {
      kind: "cta",
      title: "Is your situation similar?",
      sub: "Start the free Readiness Review.",
      buttons: [{ label: "Get My Free PR Readiness Report", href: "/pr-readiness-review", style: "light" }],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Shapes preset="plain" />
      <main>
        <Blocks blocks={topBlocks} />
        <Section>
          {guide.image && guide.imageAlt && (
            <figure className="relative mx-auto mb-14 aspect-[16/7] max-w-[1040px] overflow-hidden rounded-[24px] border border-line bg-line-soft shadow-card max-[640px]:mb-10 max-[640px]:aspect-[4/3] max-[640px]:rounded-[18px]">
              <Image
                src={guide.image}
                alt={guide.imageAlt}
                fill
                priority
                sizes="(max-width: 640px) 100vw, 1040px"
                className="object-cover"
              />
            </figure>
          )}
          <article className="prose-x mx-auto max-w-[820px]" dangerouslySetInnerHTML={{ __html: guide.html }} />
        </Section>
        <Blocks blocks={bottomBlocks} />
      </main>
    </>
  );
}
