/**
 * @typedef {{ status?: string, publishAt?: string }} GuidePublication
 */

function parsePublicationTime(value) {
  if (!/(?:Z|[+-]\d{2}:\d{2})$/.test(value)) return null;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : null;
}

function frontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  return match ? { block: match[1], full: match[0] } : null;
}

function frontmatterValue(block, key) {
  const match = block.match(new RegExp(`^${key}:\\s*(.*?)\\s*$`, "m"));
  if (!match) return undefined;
  const value = match[1];
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}

/**
 * @param {GuidePublication} guide
 * @param {Date} [now]
 */
export function isGuidePublic(guide, now = new Date()) {
  const status = guide.status ?? "published";
  if (status !== "published") return false;
  if (!guide.publishAt) return true;

  const publishAt = parsePublicationTime(guide.publishAt);
  return publishAt !== null && publishAt <= now.getTime();
}

/**
 * @param {string} source
 * @param {Date} [now]
 * @returns {{ promoted: boolean, source: string }}
 */
export function promoteDueGuideSource(source, now = new Date()) {
  const parsed = frontmatter(source);
  if (!parsed || frontmatterValue(parsed.block, "status") !== "scheduled") {
    return { promoted: false, source };
  }

  const publishAtValue = frontmatterValue(parsed.block, "publishAt");
  const publishAt = publishAtValue ? parsePublicationTime(publishAtValue) : null;
  if (publishAt === null) {
    throw new Error("A scheduled guide must have a valid publishAt timestamp.");
  }
  if (publishAt > now.getTime()) return { promoted: false, source };

  const statusLine = /^(status:\s*)["']?scheduled["']?\s*$/m;
  if (!statusLine.test(parsed.block)) {
    throw new Error("A scheduled guide must declare status on its own frontmatter line.");
  }

  const updatedFrontmatter = parsed.full.replace(statusLine, "$1published");
  return { promoted: true, source: updatedFrontmatter + source.slice(parsed.full.length) };
}
