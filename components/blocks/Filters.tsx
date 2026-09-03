import type { Filters as FiltersBlock } from "@/content/types";

export function Filters({ chips }: FiltersBlock) {
  return (
    <div className="flex flex-wrap gap-2 mb-7">
      {chips.map((c, i) => (
        <span
          key={c}
          className={`border rounded-full px-4 py-[9px] text-[14.5px] font-medium min-h-[44px] inline-flex items-center ${
            i === 0 ? "bg-navy-700 text-on-dark border-navy-700" : "bg-white border-input-line"
          }`}
        >
          {c}
        </span>
      ))}
    </div>
  );
}
