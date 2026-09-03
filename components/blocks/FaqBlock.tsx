import type { Faq } from "@/content/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { FaqList } from "@/components/ui/FaqList";
import { RichText } from "@/components/ui/RichText";

export function FaqBlock(b: Faq) {
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} title={b.title} />
      <FaqList items={b.items} schema={b.schema} openFirst={b.openFirst} />
      {b.note && <RichText as="p" className="note" value={b.note} />}
    </>
  );
}
