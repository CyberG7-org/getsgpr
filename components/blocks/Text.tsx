import Link from "next/link";
import type { Text as TextBlock, Foot } from "@/content/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { RichText } from "@/components/ui/RichText";
import { ButtonRow, Button } from "@/components/ui/Button";

export function FootRow({ foot }: { foot?: Foot }) {
  if (!foot) return null;
  return (
    <div className="text-[14.5px] text-slate-400 mt-7 flex flex-wrap gap-x-6 gap-y-2 items-baseline">
      {foot.text && <RichText as="span" value={foot.text} />}
      {foot.link && <Link href={foot.link.href}>{foot.link.label}</Link>}
      {foot.button && <Button {...foot.button} />}
    </div>
  );
}

export function Text(b: TextBlock) {
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} title={b.title} sub={b.sub} />
      {b.paragraphs?.map((p, i) => <RichText key={i} as="p" className="lead mb-3.5" value={p} />)}
      <ButtonRow buttons={b.buttons} className="mt-4" />
      <FootRow foot={b.foot} />
    </>
  );
}
