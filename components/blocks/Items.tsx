import type { Items as ItemsBlock, SectionTone } from "@/content/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { RichText } from "@/components/ui/RichText";
import { FootRow } from "./Text";

const COLS = { 2: "grid-cols-2", 3: "grid-cols-3" } as const;

export function Items(b: ItemsBlock & { tone?: SectionTone }) {
  const onDark = b.tone === "dark";
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} title={b.title} sub={b.sub} onDark={onDark} />
      <div className={`grid gap-x-7 gap-y-[22px] max-[980px]:grid-cols-1 ${COLS[b.columns]}`}>
        {b.items.map((it, i) => (
          <div key={i} className={`item-panel reveal grid grid-cols-[42px_1fr] gap-3.5 items-start ${onDark ? "item-panel-dark" : ""}`} style={{ animationDelay: `${i * 0.05}s` }}>
            <span className="item-number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <div className="grid gap-1.5">
              <h4 className={`text-[18px] ${onDark ? "text-on-dark" : ""}`}><RichText value={it.title} /></h4>
              <RichText as="p" className={`${onDark ? "text-on-dark-muted" : "text-slate-500"} text-[15.5px]`} value={it.text} />
            </div>
          </div>
        ))}
      </div>
      <FootRow foot={b.foot} />
    </>
  );
}
