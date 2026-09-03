import type { Stats as StatsBlock } from "@/content/types";
import { RichText } from "@/components/ui/RichText";

export function Stats({ items }: StatsBlock) {
  return (
    <div className="flex flex-wrap gap-[18px]">
      {items.map((it, i) => (
        <div key={i} className="bg-white border border-line rounded-card px-[30px] py-[26px] min-w-[240px] shadow-card">
          <div className="font-display text-[44px] font-semibold tracking-[-.035em] leading-none text-navy-700"><RichText value={it.value} /></div>
          <div className="text-[14.5px] text-slate-500 mt-2"><RichText value={it.label} /></div>
        </div>
      ))}
    </div>
  );
}
