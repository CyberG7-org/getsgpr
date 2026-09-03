import Link from "next/link";
import type { Cards as CardsBlock, Card } from "@/content/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { Badge } from "@/components/ui/Badge";
import { RichText } from "@/components/ui/RichText";
import { ImagePh } from "@/components/ui/ImagePh";
import { FootRow } from "./Text";

const COLS = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" } as const;
const TAG: Record<string, string> = { teal: "bg-teal-bg text-teal", red: "bg-red-bg text-red", amber: "bg-amber-bg text-amber", violet: "bg-violet-bg text-violet" };

function CardView({ c, i }: { c: Card; i: number }) {
  return (
    <div className={`accent-card ${c.tone ? `accent-${c.tone}` : ""} card-hover reveal bg-white border border-line rounded-card px-8 py-[34px] max-[980px]:px-6 max-[980px]:py-[30px] flex flex-col gap-2.5 shadow-card`} style={{ animationDelay: `${i * 0.06}s` }}>
      {c.badge && !c.outcome && <Badge tone={c.tone}>{c.badge}</Badge>}
      {c.outcome && <><Badge tone="green"><RichText value={c.badge ?? "[[Verified outcome]]"} /></Badge><ImagePh ratio="16-9" label={c.outcome.imageLabel} /></>}
      <h3 className="text-[22px] max-[980px]:text-[18px]"><RichText value={c.title} /></h3>
      {c.outcome && <RichText as="p" className="text-[13.5px] text-slate-400" value={c.outcome.meta} />}
      {c.text && <RichText as="p" className="text-slate-500 text-[15.5px] leading-[1.62]" value={c.text} />}
      {c.bullets && <ul className="pl-[18px] text-slate-500 text-[15px] grid gap-1.5 list-disc">{c.bullets.map((b) => <li key={b}><RichText value={b} /></li>)}</ul>}
      {c.outcome && (
        <dl className="mt-1.5 grid grid-cols-[110px_1fr] gap-x-3 gap-y-1.5 text-[14.5px]">
          <dt className="text-slate-400">Challenge</dt><dd className="m-0 text-slate-500"><RichText value={c.outcome.challenge} /></dd>
          <dt className="text-slate-400">What we did</dt><dd className="m-0 text-slate-500"><RichText value={c.outcome.did} /></dd>
          <dt className="text-slate-400">Result</dt><dd className="m-0 text-slate-500"><RichText value={c.outcome.result} /></dd>
        </dl>
      )}
      {c.tags && <div className="flex flex-wrap gap-1.5">{c.tags.map((t) => <span key={t} className={`text-[12.5px] font-medium px-2.5 py-1 rounded-full ${c.tone && TAG[c.tone] ? TAG[c.tone] : "bg-line-soft text-slate-500"}`}>{t}</span>)}</div>}
      {(c.link ?? (c.outcome && { label: "Read the full case →", href: c.outcome.href })) && (() => { const l = c.link ?? { label: "Read the full case →", href: c.outcome!.href }; return <Link href={l.href} className="mt-auto pt-2 font-semibold text-[15px] no-underline hover:underline">{l.label}</Link>; })()}
    </div>
  );
}

export function Cards(b: CardsBlock) {
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} eyebrowTone={b.eyebrowTone} title={b.title} sub={b.sub} />
      <div className={`grid gap-[18px] max-[980px]:grid-cols-1 max-[980px]:gap-3.5 ${COLS[b.columns]}`} style={b.maxWidth ? { maxWidth: b.maxWidth } : undefined}>
        {b.cards.map((c, i) => <CardView key={c.title + i} c={c} i={i} />)}
      </div>
      {b.note && <RichText as="p" className="note" value={b.note} />}
      <FootRow foot={b.foot} />
    </>
  );
}
