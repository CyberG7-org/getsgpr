import type { Reviews as ReviewsBlock } from "@/content/types";
import { TESTIMONIALS } from "@/content/testimonials";
import { SectionHead } from "@/components/ui/SectionHead";

export function Reviews(b: ReviewsBlock) {
  const items = TESTIMONIALS.slice(0, b.limit ?? 9);
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} title={b.title} sub={b.sub} />
      <div className="grid grid-cols-3 gap-[18px] max-[980px]:grid-cols-1">
        {items.map((t, i) => (
          <article key={t.name + i} className="testimonial-card reveal flex min-h-[280px] flex-col rounded-card border border-line bg-white p-[30px] shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-blue-300/70 hover:shadow-[0_22px_50px_-30px_rgba(10,18,35,.5)]" style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] font-semibold uppercase tracking-[.12em] text-slate-400">Client feedback</span>
              <span role="img" aria-label={`${t.rating} out of 5 stars`} className="text-[15px] tracking-[.12em] text-gold"><span aria-hidden="true">★★★★★</span></span>
            </div>
            <blockquote className="mt-7 flex flex-1 flex-col">
              <span aria-hidden="true" className="font-display text-[48px] leading-[.55] text-blue-300">&ldquo;</span>
              <p className="mt-4 text-[16px] leading-7 text-slate-500">{t.quote}</p>
              <footer className="mt-auto pt-7">
                <div className="font-display text-[17px] font-semibold text-navy-700">{t.name}</div>
                <div className="mt-1 text-[12px] font-medium uppercase tracking-[.08em] text-slate-400">{t.type}</div>
              </footer>
            </blockquote>
          </article>
        ))}
      </div>
      <p className="mt-5 text-[12px] leading-5 text-slate-400">Feedback originally published by GetSGPR. Individual experiences vary, and ICA assesses every application on its own merits.</p>
    </>
  );
}
