import Link from "next/link";
import type { Crumbs as CrumbsBlock } from "@/content/types";
import { RichText } from "@/components/ui/RichText";

export function Crumbs({ items }: Pick<CrumbsBlock, "items">) {
  return (
    <div className="container-x">
      <div className="text-[13px] text-slate-400 pt-3.5">
        {items.map((it, i) => (
          <span key={i}>
            {i > 0 && " › "}
            {it.href ? <Link href={it.href} className="text-slate-400"><RichText value={it.label} /></Link> : <RichText value={it.label} />}
          </span>
        ))}
      </div>
    </div>
  );
}
