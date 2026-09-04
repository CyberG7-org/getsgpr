import { Today } from "./Today";

export function SourceBlock({ primary }: { primary: string }) {
  return (
    <div className="self-start bg-white border border-line rounded-card px-7 py-6 text-[15.5px] leading-7 text-slate-500 max-w-[820px] shadow-card">
      <b className="block text-navy-700 mb-2 text-[14px] leading-5 tracking-[.08em] uppercase">Reviewed against official ICA information</b>
      <div className="text-[14.5px] leading-6 text-slate-400 mb-2">
        Checked: <Today /> · Primary source: {primary}
      </div>
      GetSGPR is an independent consultancy and is not affiliated with or endorsed by ICA. Immigration policies and individual circumstances can change; ICA makes all final decisions.
    </div>
  );
}
