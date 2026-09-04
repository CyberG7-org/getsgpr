import type { ContactSplit as ContactSplitBlock } from "@/content/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { Prose } from "@/components/ui/Prose";
import { GhlForm } from "@/components/widgets/GhlForm";

export function ContactSplit(b: ContactSplitBlock) {
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} title={b.title} sub={b.sub} />
      <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-start gap-8 lg:gap-12 max-[980px]:grid-cols-1">
        <div className="bg-white border border-line rounded-card overflow-hidden shadow-form">
          <GhlForm />
        </div>
        <aside className="contact-info-card relative overflow-hidden rounded-card border border-line bg-white p-7 shadow-card sm:p-9" aria-label="Other ways to contact GetSGPR">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-blue-300" />
          <Prose content={b.prose} className="content-start max-w-none" />
        </aside>
      </div>
    </>
  );
}
