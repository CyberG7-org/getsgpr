import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/Blocks";
import { Shapes } from "@/components/ui/Shapes";
import { Section } from "@/components/ui/Section";
import { ImagePh } from "@/components/ui/ImagePh";
import { Kv } from "@/components/ui/Kv";
import { pageMetadata } from "@/lib/metadata";
import { getCaseStudies, getCaseStudy } from "@/lib/markdown";
import type { Block } from "@/content/types";

export function generateStaticParams() {
  return getCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return pageMetadata({
    title: `${cs.title} — Client case — GetSGPR`,
    description: cs.outcome,
    path: `/case-studies/${cs.slug}`,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const topBlocks: Block[] = [
    {
      kind: "crumbs",
      items: [
        { label: "Home", href: "/" },
        { label: "Case studies", href: "/case-studies" },
        { label: cs.title },
      ],
    },
    {
      kind: "hero", variant: "plain",
      eyebrow: `Client case · ${cs.segment}`,
      title: cs.title,
      badge: cs.outcome,
    },
  ];

  const bottomBlocks: Block[] = [
    {
      kind: "cta",
      title: "Is your situation similar?",
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
              <ImagePh ratio="3-4" label={cs.imageLabel} />
              <p className="small mt-2.5">ICA outcome letter, redacted and published with the client&apos;s written consent. Identity numbers, addresses, reference numbers and dates of birth removed.</p>
            </div>
            <div className="prose-x">
              <h3>At a glance</h3>
              <Kv
                rows={[
                  { k: "Applicant profile", v: cs.profile },
                  { k: "Family context", v: cs.family },
                  { k: "Previous applications", v: cs.previous },
                  { k: "Package", v: cs.pkg },
                  { k: "Timeline", v: cs.timeline },
                ]}
              />
              <div className="prose-x" dangerouslySetInnerHTML={{ __html: cs.html }} />
              <p className="small">ICA assesses every application on its own merits. This case does not predict your outcome. Published with the client&apos;s written consent, which may be withdrawn at any time.</p>
            </div>
          </div>
        </Section>
        <Blocks blocks={bottomBlocks} />
      </main>
    </>
  );
}
