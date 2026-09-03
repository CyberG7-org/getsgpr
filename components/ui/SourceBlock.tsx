import { Ph } from "./Ph";
import { SITE } from "@/content/site";

export function SourceBlock({ primary, reviewedBy = true }: { primary: string; reviewedBy?: boolean }) {
  return (
    <div className="bg-white border border-line rounded-card px-[26px] py-[22px] text-[14px] text-slate-500 max-w-[820px]">
      <b className="block text-navy-700 mb-1.5 text-[12.5px] tracking-[.08em] uppercase">Reviewed against official ICA information</b>
      <div className="text-[13px] text-slate-400 mb-1.5">
        Last reviewed: <Ph label={SITE.placeholders.checkedOn} /> · Primary source: {primary}
        {reviewedBy && <> · Reviewed by: <Ph label="name, role" /></>}
      </div>
      GetSGPR is an independent consultancy and is not affiliated with or endorsed by ICA. Immigration policies and individual circumstances can change; ICA makes all final decisions.
    </div>
  );
}
