import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promoteDueGuideSource } from "../lib/guide-scheduling.mjs";

export function publishDueGuides(directory, now = new Date()) {
  const promoted = [];

  for (const file of readdirSync(directory).filter((name) => name.endsWith(".md")).sort()) {
    const filePath = path.join(directory, file);
    const source = readFileSync(filePath, "utf8");
    const result = promoteDueGuideSource(source, now);
    if (!result.promoted) continue;

    writeFileSync(filePath, result.source);
    promoted.push(file.replace(/\.md$/, ""));
  }

  return promoted;
}

function main() {
  const directory = path.join(process.cwd(), "content", "guides");
  const promoted = publishDueGuides(directory);
  if (promoted.length === 0) {
    console.log("No scheduled guides are due.");
    return;
  }
  console.log(`Published ${promoted.length} guide(s): ${promoted.join(", ")}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
