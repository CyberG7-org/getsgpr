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

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Strips markdown emphasis/code markers (`**`, `__`, `*`, `_`, `` ` ``) from a placeholder
 *  label so its raw text can be embedded inside an HTML tag's text content without remark
 *  re-parsing it as emphasis (CommonMark still parses inline text between raw HTML tags). */
function stripEmphasis(s: string): string {
  return s
    .replace(/\*\*([\s\S]+?)\*\*/g, "$1")
    .replace(/__([\s\S]+?)__/g, "$1")
    .replace(/\*([\s\S]+?)\*/g, "$1")
    .replace(/_([\s\S]+?)_/g, "$1")
    .replace(/`([\s\S]+?)`/g, "$1");
}

function placeholderSpan(rawLabel: string): string {
  const label = escapeHtml(stripEmphasis(rawLabel));
  return `<span class="ph" data-ph="${label}">[${label}]</span>`;
}

/** Converts Markdown to HTML (remark + remark-html). `[[X]]` placeholders are converted to
 *  the site's placeholder markup — `<span class="ph" data-ph="X">[X]</span>`, matching the
 *  convention used everywhere else on the site (see lib/rich.ts) — BEFORE the remark pass,
 *  so the label can be stripped of markdown emphasis markers and HTML-escaped (for both the
 *  `data-ph` attribute and the visible text) before it ever reaches remark's parser. Doing
 *  this after remark (as a post-hoc string replace on the rendered HTML) is unsafe: a label
 *  containing `**bold**` would already have been turned into `<strong>` by remark and leak
 *  into the attribute, and an unescaped `"` or `&` in a label would break the attribute or
 *  inject markup. remark-html's default `sanitize: true` would otherwise strip the `class`/
 *  `data-ph` attributes (and possibly the tag) from our injected raw HTML, so it is disabled
 *  here — safe because this only ever processes markdown authored by us, not user input. */
export function renderMarkdown(md: string): string {
  const withPlaceholders = md.replace(/\[\[([\s\S]+?)\]\]/g, (_m, label: string) => placeholderSpan(label));
  return String(remark().use(remarkHtml, { sanitize: false }).processSync(withPlaceholders));
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
