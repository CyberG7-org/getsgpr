import type { Ratio } from "@/content/types";

const RATIO: Record<Ratio, string> = { "4-3": "aspect-[4/3]", "16-9": "aspect-[16/9]", "3-4": "aspect-[3/4]", "1-1": "aspect-square" };

export function ImagePh({ ratio, label, className = "" }: { ratio: Ratio; label: string; className?: string }) {
  return (
    <div className={`${RATIO[ratio]} grid place-items-center text-slate-400 text-[12.5px] text-center p-4 font-medium border border-line rounded-card bg-[repeating-linear-gradient(135deg,var(--color-line-soft)_0_12px,#fff_12px_24px)] ${className}`}>
      {label}
    </div>
  );
}
