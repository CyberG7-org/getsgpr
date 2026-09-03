import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export type CaseStudy = {
  slug: string;
  title: string;
  segment: string;
  outcome: string;
  profile: string;
  family: string;
  previous: string;
  pkg: string;
  timeline: string;
  imageLabel: string;
  html: string;
};

export type Guide = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  html: string;
};

const CASE_STUDIES_DIR = path.join(process.cwd(), "content", "case-studies");
const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

/** Converts Markdown to HTML (remark + remark-html), then restores `[[X]]` placeholders
 *  — which remark passes through untouched as literal text — into the site's placeholder
 *  markup, matching the `[[X]]` → `<span class="ph" data-ph="X">[X]</span>` convention
 *  used everywhere else on the site (see lib/rich.ts). Must run AFTER remark so the
 *  brackets survive remark's processing intact. */
export function renderMarkdown(md: string): string {
  const html = String(remark().use(remarkHtml).processSync(md));
  return html.replace(/\[\[([^\]]+)\]\]/g, (_m, label: string) => `<span class="ph" data-ph="${label}">[${label}]</span>`);
}

type FrontMatter = Record<string, string>;

function readMarkdownDir(dir: string): { slug: string; data: FrontMatter; content: string }[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const slug = (data.slug as string | undefined) ?? file.replace(/\.md$/, "");
      return { slug, data: data as FrontMatter, content };
    });
}

let caseStudiesCache: CaseStudy[] | null = null;

export function getCaseStudies(): CaseStudy[] {
  if (!caseStudiesCache) {
    caseStudiesCache = readMarkdownDir(CASE_STUDIES_DIR).map(({ slug, data, content }) => ({
      slug,
      title: data.title,
      segment: data.segment,
      outcome: data.outcome,
      profile: data.profile,
      family: data.family,
      previous: data.previous,
      pkg: data.pkg,
      timeline: data.timeline,
      imageLabel: data.imageLabel,
      html: renderMarkdown(content),
    }));
  }
  return caseStudiesCache;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((cs) => cs.slug === slug);
}

let guidesCache: Guide[] | null = null;

export function getGuides(): Guide[] {
  if (!guidesCache) {
    guidesCache = readMarkdownDir(GUIDES_DIR).map(({ slug, data, content }) => ({
      slug,
      title: data.title,
      summary: data.summary,
      category: data.category,
      source: data.source,
      html: renderMarkdown(content),
    }));
  }
  return guidesCache;
}

export function getGuide(slug: string): Guide | undefined {
  return getGuides().find((g) => g.slug === slug);
}
