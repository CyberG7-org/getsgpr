import type { Steps as StepsBlock } from "@/content/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { RichText } from "@/components/ui/RichText";

export function Steps(b: StepsBlock & { onDark?: boolean }) {
  const three = b.steps.length === 3;
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} title={b.title} sub={b.sub} onDark={b.onDark} />
      <div className={`process-grid grid gap-[18px] max-[980px]:grid-cols-1 ${three ? "grid-cols-3" : "grid-cols-4"}`}>
        {b.steps.map((s, i) => (
          <div
            key={i}
            className={`process-card reveal ${
              b.onDark
                ? "bg-white/5 border border-[rgba(147,174,220,.2)] rounded-card px-[26px] py-7"
                : "bg-white border border-line rounded-card px-[26px] py-7 shadow-card"
            }`}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <span className={`block text-[12.5px] font-semibold tracking-[.08em] uppercase mb-2.5 ${b.onDark ? "text-blue-300" : "text-navy-700"}`}>
              <RichText value={s.when} />
            </span>
            <h4 className={`mb-2 ${b.onDark ? "text-on-dark" : "text-navy-900"}`}><RichText value={s.title} /></h4>
            <RichText as="p" className={`text-[15px] leading-[1.6] ${b.onDark ? "text-on-dark-muted" : "text-slate-500"}`} value={s.text} />
          </div>
        ))}
      </div>
      {b.note && <RichText as="p" className={`note ${b.onDark ? "text-on-dark-muted" : ""}`} value={b.note} />}
    </>
  );
}
