import { Badge } from "@/components/ui/Badge";

export function SampleResult() {
  return (
    <div className="bg-white border border-line rounded-card p-[30px] max-w-[760px] grid gap-4 shadow-card">
      <Badge tone="gold">Sample only. Your result is written for your answers.</Badge>
      <div className="text-[22px] font-semibold text-navy-900">Strengthen First</div>
      <div className="grid grid-cols-2 max-[980px]:grid-cols-1 gap-5">
        <div>
          <h4 className="text-[12.5px] uppercase tracking-[.08em] text-slate-400 font-semibold mb-1.5">Strong areas</h4>
          <ul className="pl-[18px] text-[15px] text-slate-500 grid gap-1.5 list-disc">
            <li>Residence continuity</li>
            <li>Qualifications</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[12.5px] uppercase tracking-[.08em] text-slate-400 font-semibold mb-1.5">Areas to strengthen</h4>
          <ul className="pl-[18px] text-[15px] text-slate-500 grid gap-1.5 list-disc">
            <li>Evidence quality and timing</li>
            <li>Integration and roots</li>
          </ul>
        </div>
      </div>
      <div>
        <h4 className="text-[12.5px] uppercase tracking-[.08em] text-slate-400 font-semibold mb-1.5">Three actions</h4>
        <ol className="pl-[18px] text-[15px] text-slate-500 grid gap-1.5 list-decimal">
          <li>Obtain a current employment letter dated within the last month.</li>
          <li>Reconcile the employment dates on your CV, payslips and CPF statements.</li>
          <li>Gather evidence of community involvement from the last two years.</li>
        </ol>
      </div>
      <div>
        <h4 className="text-[12.5px] uppercase tracking-[.08em] text-slate-400 font-semibold mb-1.5">Suggested package</h4>
        <p className="text-[15px] text-slate-500">Partnered · S$497</p>
      </div>
    </div>
  );
}
