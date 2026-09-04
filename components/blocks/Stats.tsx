import type { Stats as StatsBlock } from "@/content/types";
import { RichText } from "@/components/ui/RichText";

export function Stats({ items }: StatsBlock) {
  return (
    <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
      {items.map((it, i) => (
        <div key={i} className="min-w-0 bg-white border border-line rounded-card p-6 lg:px-[30px] lg:py-[26px] shadow-card">
          <h2 className="font-display text-[28px] lg:text-[32px] font-semibold tracking-[-.035em] leading-tight text-navy-700"><RichText value={it.value} /></h2>
          <div className="text-[14.5px] text-slate-500 mt-2"><RichText value={it.label} /></div>
        </div>
      ))}
    </div>
  );
}
