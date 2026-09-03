import { readFileSync } from "node:fs";
import { join } from "node:path";
import { FORBIDDEN } from "../../lib/compliance";

const NOTE_PREFIX = ["Layout note", "Placeholder structure", "Mark up as schema.org", "Placeholder copy", "Layout of the page shown after"];
export function norm(s: string) {
  return s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
}
export function prototypeSentences(key: string): string[] {
  let html = readFileSync(join(__dirname, "../../../reference/prototype", `${key}.html`), "utf8");
  html = html.slice(html.indexOf("<main>"), html.indexOf("</main>"));
  html = html.replace(/<(script|style|iframe)[\s\S]*?<\/\1>/g, "\n")
             .replace(/<div class="shapes"[\s\S]*?<\/div><\/div>/g, "\n")
             .replace(/<span class="ph">\[([^\]]+)\]<\/span>/g, "[$1]")
             .replace(/<[^>]+>/g, "\n")
             .replace(/&amp;/g, "&").replace(/&nbsp;/g, " ");
  const out = new Set<string>();
  for (const raw of html.split(/(?<=[.!?…])\s+|\n+/)) {
    const s = norm(raw);
    if (s.length < 24) continue;
    if (NOTE_PREFIX.some((p) => s.startsWith(p))) continue;
    if (FORBIDDEN.some((re) => re.test(s.replace(/\[[^\]]+\]/g, " ")))) continue;
    out.add(s);
  }
  return [...out];
}
