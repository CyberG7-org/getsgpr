import type { Tiles as TilesBlock } from "@/content/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { RichText } from "@/components/ui/RichText";
import { Button } from "@/components/ui/Button";

export function Tiles(b: TilesBlock) {
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} title={b.title} sub={b.sub} />
      <div className="grid grid-cols-4 gap-[18px] max-[980px]:grid-cols-1">
        {b.tiles.map((t, i) => (
          <div key={i} className={`border rounded-card px-6 py-[26px] shadow-card ${t.ours ? "bg-teal-bg border-transparent" : "bg-white border-line"}`}>
            <span className={`block text-[12.5px] font-semibold tracking-[.08em] mb-2.5 ${t.ours ? "text-teal" : "text-navy-700"}`}><RichText value={t.n} /></span>
            <h4 className="mb-1.5"><RichText value={t.title} /></h4>
            <RichText as="p" className="text-[14.5px] text-slate-500 leading-[1.55]" value={t.text} />
          </div>
        ))}
      </div>
      {b.after && (
        <div className="grid grid-cols-2 max-[980px]:grid-cols-1 items-center mt-7 gap-4">
          <RichText as="p" className="lead" value={b.after.text} />
          <div><Button {...b.after.button} /></div>
        </div>
      )}
      {b.note && <RichText as="p" className="note" value={b.note} />}
    </>
  );
}
