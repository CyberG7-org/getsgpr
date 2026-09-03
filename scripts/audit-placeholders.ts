import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["content", "components", "app"];
const rows: { file: string; label: string }[] = [];

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx|md)$/.test(name)) {
      const src = readFileSync(p, "utf8");
      for (const m of src.matchAll(/\[\[([^\]]+)\]\]|<Ph label="([^"]+)"/g)) rows.push({ file: p, label: m[1] ?? m[2] });
    }
  }
}
for (const r of ROOTS) walk(r);
const byLabel = new Map<string, Set<string>>();
for (const r of rows) byLabel.set(r.label, (byLabel.get(r.label) ?? new Set()).add(r.file));
console.log(`| Placeholder | Occurrences | Files |\n|---|---|---|`);
for (const [label, files] of [...byLabel].sort((a, b) => b[1].size - a[1].size))
  console.log(`| ${label} | ${rows.filter((r) => r.label === label).length} | ${[...files].join("<br>")} |`);
console.log(`\n${rows.length} placeholders across ${byLabel.size} labels.`);
