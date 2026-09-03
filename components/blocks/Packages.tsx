import type { Btn, PackagesBlock } from "@/content/types";
import { PACKAGES, type Package } from "@/content/packages";
import { SectionHead } from "@/components/ui/SectionHead";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RichText } from "@/components/ui/RichText";

const DEFAULT_NOTE =
  "Prices in SGD, [[include / exclude]] GST. ICA application fees and third-party costs are shown separately. No hidden consultancy fees. No approval guarantees. [Compare everything →](/packages)";

export function PackageCard({ p, i, showNotFor, cta }: { p: Package; i: number; showNotFor?: boolean; cta?: Btn }) {
  return (
    <div
      key={p.key}
      data-index={i}
      className={`card-hover border rounded-[22px] px-8 py-[34px] flex flex-col gap-3.5 shadow-card ${
        p.featured ? "bg-navy-900 border-navy-900 text-on-dark" : "bg-white border-line"
      }`}
    >
      <Badge tone={p.badge.tone}>{p.badge.label}</Badge>
      <div className={`font-display text-[22px] font-semibold tracking-[-.02em] ${p.featured ? "text-on-dark" : ""}`}>{p.name}</div>
      <div className={`font-display text-[46px] font-semibold tracking-[-.035em] leading-none ${p.featured ? "text-on-dark" : ""}`}>
        {p.price}
        <small className={`font-body text-[14px] font-normal ml-1.5 ${p.featured ? "text-on-dark-muted" : "text-slate-400"}`}>{p.priceNote}</small>
      </div>
      <p className={`text-[17px] ${p.featured ? "text-on-dark-muted" : "text-slate-500"}`}>{p.tagline}</p>
      <ul className={`pl-[18px] grid gap-[7px] text-[15px] list-disc ${p.featured ? "text-on-dark-muted" : "text-slate-500"}`}>
        {p.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
      </ul>
      <p className={`text-[14px] ${p.featured ? "text-on-dark-muted" : "text-slate-400"}`}>{p.bestFor}</p>
      {showNotFor && (
        <div className={`border-t pt-3 text-[13.5px] ${p.featured ? "border-[rgba(147,174,220,.2)] text-on-dark-muted" : "border-line-soft text-slate-400"}`}>
          <p className="mb-1">Not for:</p>
          <ul className="pl-[18px] grid gap-1 list-disc">
            {p.notFor.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </div>
      )}
      <div className="mt-auto"><Button {...(cta ?? p.cta)} /></div>
    </div>
  );
}

export function Packages(b: PackagesBlock) {
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} title={b.title} sub={b.sub} />
      <div className="grid grid-cols-3 gap-[18px] items-stretch max-[980px]:grid-cols-1">
        {PACKAGES.map((p, i) => <PackageCard key={p.key} p={p} i={i} showNotFor={b.showNotFor} />)}
      </div>
      <RichText as="p" className="note" value={b.note ?? DEFAULT_NOTE} />
    </>
  );
}
