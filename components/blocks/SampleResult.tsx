import type { SampleResult as SampleResultBlock } from "@/content/types";
import { Button } from "@/components/ui/Button";

const actions = [
  "Obtain a current employment letter dated within the last month.",
  "Reconcile employment dates across your CV, payslips and CPF statements.",
  "Gather evidence of community involvement from the last two years.",
];

export function SampleResult({ title, sub }: Omit<SampleResultBlock, "kind">) {
  return (
    <div className="grid grid-cols-[.85fr_1.15fr] items-center gap-12 max-[980px]:grid-cols-1 max-[980px]:gap-8">
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[.14em] text-navy-700 mb-4">Your report, at a glance</p>
        <h2 className="mb-5">{title}</h2>
        <p className="text-[17px] leading-relaxed text-slate-500 mb-7">{sub}</p>
        <ul className="grid gap-4 mb-8 text-[15px] text-navy-900">
          {["A clear readiness outcome", "Your strengths and areas to improve", "Three actions to take next"].map((item) => (
            <li key={item} className="flex items-center gap-3"><span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white border border-line text-navy-700">✓</span>{item}</li>
          ))}
        </ul>
        <Button label="Start my free review" href="#form" style="primary" />
        <p className="mt-3 text-[13px] text-slate-500">About 10 minutes · No documents needed</p>
      </div>
      <article aria-label="Sample readiness report" className="overflow-hidden rounded-[24px] border border-line bg-white shadow-card">
        <div className="bg-navy-900 px-7 py-6 max-[480px]:px-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.14em] text-white/75">Sample readiness report</p>
          <h3 className="text-[28px] font-semibold text-white mb-2">Strengthen First</h3>
          <p className="text-[14px] leading-relaxed text-white/80">A few focused improvements before you prepare your application.</p>
        </div>
        <div className="p-7 max-[480px]:p-5">
          <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1 mb-6">
            <div className="rounded-xl bg-[#edf7f3] p-4">
              <h4 className="text-[13px] font-semibold text-[#235c49] mb-2">Strong areas</h4>
              <ul className="list-disc pl-4 text-[14px] leading-relaxed text-[#235c49] space-y-1"><li>Residence continuity</li><li>Qualifications</li></ul>
            </div>
            <div className="rounded-xl bg-[#fff7e7] p-4">
              <h4 className="text-[13px] font-semibold text-[#795313] mb-2">Areas to strengthen</h4>
              <ul className="list-disc pl-4 text-[14px] leading-relaxed text-[#795313] space-y-1"><li>Evidence quality and timing</li><li>Integration and roots</li></ul>
            </div>
          </div>
          <h4 className="text-[15px] font-semibold text-navy-900 mb-4">Your next three actions</h4>
          <ol className="grid gap-4">
            {actions.map((action, i) => <li key={action} className="flex gap-3 text-[14px] leading-relaxed text-slate-500"><span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#edf1f8] text-[12px] font-semibold text-navy-900">{i + 1}</span><span>{action}</span></li>)}
          </ol>
          <div className="mt-6 border-t border-line pt-4 flex flex-wrap items-center justify-between gap-2 text-[14px]"><span className="text-slate-500">Suggested support</span><span className="font-semibold text-navy-900">SGPR Partnered</span></div>
          <p className="mt-4 text-[12px] leading-relaxed text-slate-500">Illustrative example. Your result is based on your answers and is not an ICA decision or approval prediction.</p>
        </div>
      </article>
    </div>
  );
}
