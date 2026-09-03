import { RichText } from "./RichText";

export function FaqList({ items, schema, openFirst }: { items: { q: string; a: string }[]; schema?: boolean; openFirst?: boolean }) {
  return (
    <>
      <div className="faq max-w-[940px] border-t border-line">
        {items.map((it, i) => (
          <details key={it.q} open={openFirst && i === 0 ? true : undefined} className="border-b border-line">
            <summary className="cursor-pointer py-[22px] pr-6 font-semibold text-[17px] flex justify-between gap-4 text-navy-900">{it.q}</summary>
            <RichText as="div" className="pb-6 text-slate-500 text-[15.5px] leading-[1.62] max-w-[70ch]" value={it.a} />
          </details>
        ))}
      </div>
      {schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a.replace(/\[\[[^\]]+\]\]/g, "").replace(/\*\*/g, "").trim() } })),
        }) }} />
      )}
    </>
  );
}
