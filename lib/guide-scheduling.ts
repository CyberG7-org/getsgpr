import matter from "gray-matter";

export type GuidePublication = {
  status?: string;
  publishAt?: string;
};

function parsePublicationTime(value: string): number | null {
  if (!/(?:Z|[+-]\d{2}:\d{2})$/.test(value)) return null;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : null;
}

export function isGuidePublic(guide: GuidePublication, now = new Date()): boolean {
  const status = guide.status ?? "published";
  if (status !== "published") return false;
  if (!guide.publishAt) return true;

  const publishAt = parsePublicationTime(guide.publishAt);
  return publishAt !== null && publishAt <= now.getTime();
}

export function promoteDueGuideSource(source: string, now = new Date()): { promoted: boolean; source: string } {
  const { data } = matter(source);
  if (data.status !== "scheduled") return { promoted: false, source };

  const publishAt = typeof data.publishAt === "string" ? parsePublicationTime(data.publishAt) : null;
  if (publishAt === null) {
    throw new Error("A scheduled guide must have a valid publishAt timestamp.");
  }
  if (publishAt > now.getTime()) return { promoted: false, source };

  const statusLine = /^(status:\s*)["']?scheduled["']?\s*$/m;
  if (!statusLine.test(source)) {
    throw new Error("A scheduled guide must declare status on its own frontmatter line.");
  }

  return { promoted: true, source: source.replace(statusLine, "$1published") };
}
