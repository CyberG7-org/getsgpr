import type { Honesty as HonestyBlock } from "@/content/types";
import { RichText } from "@/components/ui/RichText";

export function Honesty({ title, paragraphs }: HonestyBlock) {
  return (
    <div className="rounded-panel px-14 py-[68px] max-[980px]:px-6 max-[980px]:py-[34px] grid grid-cols-[5fr_7fr] max-[980px]:grid-cols-1 gap-12 bg-[linear-gradient(135deg,var(--color-paper-cool),var(--color-paper-warm))] reveal">
      <h2 className="text-[34px]"><RichText value={title} /></h2>
      <div className="grid gap-3.5">
        {paragraphs.map((p, i) => <RichText key={i} as="p" className="text-[16.5px] leading-[1.68] text-[#3D4B47]" value={p} />)}
      </div>
    </div>
  );
}
