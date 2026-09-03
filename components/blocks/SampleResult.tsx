import Link from "next/link";
import { RichText } from "@/components/ui/RichText";

export function SampleResult() {
  return (
    <div className="bg-white border border-line rounded-card p-[30px] max-w-[760px] grid gap-4 shadow-card">
      <RichText as="p" value="**Ready to Prepare:** Based on your answers, your profile and evidence look ready to be assembled into an application. The work now is doing it well." />
      <RichText as="p" value="**Strengthen First:** Based on your answers, one or more factors would benefit from work before you apply. Doing that work first is usually better than applying and hoping." />
      <RichText as="p" value="**More Information Needed:** Your answers raise a question we cannot resolve without talking to you. That is not a bad sign; it means your situation needs a person, not a form." />
      <div className="grid grid-cols-2 max-[980px]:grid-cols-1 gap-5">
        <div>
          <h4 className="text-[12.5px] uppercase tracking-[.08em] text-slate-400 font-semibold mb-1.5">Strong areas</h4>
          <ul className="pl-[18px] text-[15px] text-slate-500 grid gap-1.5 list-disc"><li><RichText value="[[List]]" /></li></ul>
        </div>
        <div>
          <h4 className="text-[12.5px] uppercase tracking-[.08em] text-slate-400 font-semibold mb-1.5">Areas to strengthen</h4>
          <ul className="pl-[18px] text-[15px] text-slate-500 grid gap-1.5 list-disc"><li><RichText value="[[List]]" /></li></ul>
        </div>
      </div>
      <div>
        <h4 className="text-[12.5px] uppercase tracking-[.08em] text-slate-400 font-semibold mb-1.5">Your three next actions</h4>
        <ol className="pl-[18px] text-[15px] text-slate-500 grid gap-1.5 list-decimal">
          <li><RichText value="[[Generated from answers]]" /></li>
          <li><RichText value="[[Generated from answers]]" /></li>
          <li><RichText value="[[Generated from answers]]" /></li>
        </ol>
      </div>
      <div>
        <h4 className="text-[12.5px] uppercase tracking-[.08em] text-slate-400 font-semibold mb-1.5">Recommended package</h4>
        <RichText as="p" className="text-[15px] text-slate-500" value="[[Lite / Partnered / Concierge]] · S$[[price]] · [[one line on why]]." />
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <Link href="/contact" className="btn btn-primary">Book a 20-minute strategy call with <RichText value="[[consultant name]]" /></Link>
        <Link href="/packages" className="btn btn-ghost"><RichText value="[[Buy Lite / Book Partnered / Book a Concierge strategy call]]" /></Link>
      </div>
      <RichText as="p" className="small" value="Message us on WhatsApp to schedule (scheduling only, no documents). This result is a GetSGPR diagnostic and not a prediction of ICA's decision. ICA assesses every application on its own merits." />
    </div>
  );
}
