import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { findViolations, stripPlaceholders } from "../lib/compliance";

const ROOTS = ["content", "components", "app"];
const EXT = /\.(ts|tsx|md)$/;
let failed = false;

function walk(dir: string, out: string[] = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (EXT.test(name)) out.push(p);
  }
  return out;
}

for (const root of ROOTS) {
  for (const file of walk(root)) {
    const text = stripPlaceholders(readFileSync(file, "utf8"));
    const hits = findViolations(text);
    if (hits.length) {
      failed = true;
      console.error(`✗ ${file}: ${hits.join(", ")}`);
    }
  }
}
if (failed) { console.error("Compliance lint failed."); process.exit(1); }
console.log("Compliance lint passed.");
