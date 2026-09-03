import type { Honest as HonestBlock } from "@/content/types";
import { RichText } from "@/components/ui/RichText";

export function Honest({ title, text }: HonestBlock) {
  return (
    <div className="bg-amber-bg rounded-card px-[30px] py-[26px] max-w-[820px]">
      <h3 className="mb-2"><RichText value={title} /></h3>
      <RichText as="p" className="text-slate-500" value={text} />
    </div>
  );
}
