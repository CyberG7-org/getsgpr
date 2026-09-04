import type { ContactSplit as ContactSplitBlock } from "@/content/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { Prose } from "@/components/ui/Prose";
import { GhlCalendar } from "@/components/widgets/GhlCalendar";

export function ContactSplit(b: ContactSplitBlock) {
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} title={b.title} sub={b.sub} />
      <div className="mx-auto grid max-w-[1080px] gap-8">
        <div className="overflow-hidden rounded-card border border-line bg-white p-4 shadow-form max-[640px]:p-1">
          <GhlCalendar />
        </div>
        <aside className="contact-info-card relative overflow-hidden rounded-card border border-line bg-white p-7 shadow-card sm:p-9" aria-label="Other ways to contact GetSGPR">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-blue-300" />
          <Prose content={b.prose} className="content-start max-w-none" />
        </aside>
      </div>
    </>
  );
}
