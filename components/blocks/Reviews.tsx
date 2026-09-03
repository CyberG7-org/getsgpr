import type { Reviews as ReviewsBlock } from "@/content/types";
import { TESTIMONIALS } from "@/content/testimonials";
import { SectionHead } from "@/components/ui/SectionHead";
import { Badge } from "@/components/ui/Badge";
import { Ph } from "@/components/ui/Ph";

export function Reviews(b: ReviewsBlock) {
  const items = TESTIMONIALS.slice(0, b.limit ?? 9);
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} title={b.title} sub={b.sub} />
      <div className="grid grid-cols-3 gap-[18px] max-[980px]:grid-cols-1">
        {items.map((t, i) => (
          <div key={t.name + i} className="reveal bg-white border border-line rounded-card p-[30px] grid gap-3 shadow-card" style={{ animationDelay: `${i * 0.06}s` }}>
            {t.verified === false && <Badge tone="gold">Pending verification</Badge>}
            <div className="font-display text-[40px] leading-[.6] text-blue-300">&ldquo;</div>
            <p className="text-[15.5px] text-slate-500">{t.quote}</p>
            <div className="text-[13.5px] text-slate-400 font-medium">
              {t.name} · {t.type} · <Ph label="Month, year" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
