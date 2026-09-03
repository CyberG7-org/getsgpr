import type { ContactSplit as ContactSplitBlock } from "@/content/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { Prose } from "@/components/ui/Prose";
import { GhlForm } from "@/components/widgets/GhlForm";

export function ContactSplit(b: ContactSplitBlock) {
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} title={b.title} sub={b.sub} />
      <div className="grid grid-cols-[5fr_7fr] max-[980px]:grid-cols-1 gap-14">
        <div className="bg-white border border-line rounded-card overflow-hidden shadow-form">
          <GhlForm />
        </div>
        <Prose content={b.prose} />
      </div>
    </>
  );
}
