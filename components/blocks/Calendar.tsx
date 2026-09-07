import type { CalendarBlock } from "@/content/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { GhlCalendar } from "@/components/widgets/GhlCalendar";

export function Calendar(b: CalendarBlock) {
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} title={b.title} sub={b.sub} />
      <div className="mx-auto max-w-[1080px] overflow-hidden rounded-card border border-line bg-white p-4 shadow-form max-[640px]:p-1">
        <GhlCalendar />
      </div>
    </>
  );
}
