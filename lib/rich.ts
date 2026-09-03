export type RichNode =
  | { t: "text"; v: string }
  | { t: "ph"; v: string }
  | { t: "strong"; v: string }
  | { t: "link"; v: string; href: string };

const TOKEN = /\[\[([^\]]+)\]\]|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function parseRich(src: string): RichNode[] {
  const out: RichNode[] = [];
  let last = 0;
  for (const m of src.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ t: "text", v: src.slice(last, i) });
    if (m[1] !== undefined) out.push({ t: "ph", v: m[1] });
    else if (m[2] !== undefined) out.push({ t: "strong", v: m[2] });
    else out.push({ t: "link", v: m[3], href: m[4] });
    last = i + m[0].length;
  }
  if (last < src.length) out.push({ t: "text", v: src.slice(last) });
  return out;
}
