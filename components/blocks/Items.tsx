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
          <div key={i} className="grid gap-1.5">
            <h4 className={`text-[18px] ${onDark ? "text-on-dark" : ""}`}><RichText value={it.title} /></h4>
            <RichText as="p" className="text-slate-500 text-[15.5px]" value={it.text} />
          </div>
        ))}
      </div>
      <FootRow foot={b.foot} />
    </>
  );
}
