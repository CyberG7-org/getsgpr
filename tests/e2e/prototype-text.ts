import { readFileSync } from "node:fs";
import { join } from "node:path";
import { FORBIDDEN } from "../../lib/compliance";

const NOTE_PREFIX = ["layout note", "placeholder structure", "mark up as schema.org", "placeholder copy", "layout of the page shown after"];
export function norm(s: string) {
  return s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim().toLowerCase();
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
  // Filter builder notes per line (i.e. per source element), before splitting into
  // sentences — a note's second sentence must not leak through just because the
  // NOTE_PREFIX only matches the note's opening words.
  for (const line of html.split(/\n+/)) {
    const trimmedLine = norm(line);
    if (!trimmedLine) continue;
    if (NOTE_PREFIX.some((p) => trimmedLine.startsWith(p))) continue;
    for (const raw of trimmedLine.split(/(?<=[.!?…])\s+/)) {
      const s = norm(raw);
      if (s.length < 24) continue;
      if (FORBIDDEN.some((re) => re.test(s.replace(/\[[^\]]+\]/g, " ")))) continue;
      out.add(s);
    }
  }
  return [...out];
}
