export const FORBIDDEN: RegExp[] = [
  /high success rates?/i,
  /\bsuccess rates?\b/i,
  /(?<!never |not |cannot |no |you )guaranteed? approval/i,
  /ICA[- ]approved/i,
  /ICA[- ]partner/i,
  /ICA[- ]endorsed/i,
  /(?<!\d)(?<!not guarantee )(?<!you guarantee )\d{1,3}% (?:approval|success)/i,
];

export function stripPlaceholders(html: string): string {
  return html.replace(/<span class="ph"[^>]*>[\s\S]*?<\/span>/g, " ").replace(/\[\[[^\]]+\]\]/g, " ");
}

export function findViolations(text: string): string[] {
  const hits: string[] = [];
  for (const re of FORBIDDEN) {
    const m = text.match(re);
    if (m) {
      const match = m[0];
      // Check if this match is a substring of any earlier kept match
      const isSubstring = hits.some(earlier => earlier.includes(match));
      if (!isSubstring) {
        hits.push(match);
      }
    }
  }
  return hits;
}
