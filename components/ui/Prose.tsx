import { RichText } from "./RichText";
import { Kv } from "./Kv";
import type { ProseItem } from "@/content/types";

export function Prose({ content, className = "" }: { content: ProseItem[]; className?: string }) {
  return (
    <div className={`prose-x ${className}`}>
      {content.map((it, i) => {
        if ("p" in it) return <RichText key={i} as="p" value={it.p} />;
        if ("h3" in it) return <h3 key={i}>{it.h3}{it.smallSuffix && <> <span className="small">({it.smallSuffix})</span></>}</h3>;
        if ("ul" in it) return <ul key={i}>{it.ul.map((li, j) => <li key={j}><RichText value={li} /></li>)}</ul>;
        if ("ol" in it) return <ol key={i}>{it.ol.map((li, j) => <li key={j}><RichText value={li} /></li>)}</ol>;
        if ("small" in it) return <RichText key={i} as="p" className="small" value={it.small} />;
        if ("kv" in it) return <Kv key={i} rows={it.kv} />;
        return <p key={i}><strong><RichText value={it.strong} /></strong></p>;
      })}
    </div>
  );
}
