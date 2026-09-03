import type { Reviews as ReviewsBlock } from "@/content/types";
import Link from "next/link";
import { TESTIMONIALS } from "@/content/testimonials";
import { SectionHead } from "@/components/ui/SectionHead";
import { Badge } from "@/components/ui/Badge";

export function Reviews(b: ReviewsBlock) {
  const items = TESTIMONIALS.slice(0, b.limit ?? 9);
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} title={b.title} sub={b.sub} />
      <div className="grid grid-cols-3 gap-[18px] max-[980px]:grid-cols-1">
        {items.map((t, i) => (
          <article key={t.name + i} className="testimonial-card reveal bg-white border border-line rounded-card p-[30px] grid gap-3 shadow-card" style={{ animationDelay: `${i * 0.06}s` }}>
            <Badge tone="gold">Pending verification</Badge>
            <div className="font-display text-[40px] leading-[.6] text-blue-300">&ldquo;</div>
            <p className="text-[15.5px] text-slate-500">{t.quote}</p>
            <div className="text-[13.5px] text-slate-400 font-medium">
              {t.name} · {t.type}
            </div>
            <Link href={t.sourceUrl} className="text-[12px] text-slate-400 underline" target="_blank" rel="noreferrer">Published on the current GetSGPR website</Link>
          </article>
        ))}
      </div>
    </>
  );
}
