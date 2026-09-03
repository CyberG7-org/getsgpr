import { Eyebrow } from "./Eyebrow";
import { RichText } from "./RichText";
import type { Tone } from "@/content/types";

export function SectionHead({ eyebrow, eyebrowTone, title, sub, onDark }: { eyebrow?: string; eyebrowTone?: Tone; title?: string; sub?: string; onDark?: boolean }) {
  if (!eyebrow && !title && !sub) return null;
  return (
    <div className="reveal max-w-[780px] mb-10">
      {eyebrow && <Eyebrow tone={eyebrowTone} onDark={onDark}>{eyebrow}</Eyebrow>}
      {title && <h2 className={`mb-3.5 ${onDark ? "text-on-dark" : ""}`}><RichText value={title} /></h2>}
      {sub && <RichText as="p" className={`lead text-[18px] ${onDark ? "text-on-dark-muted" : ""}`} value={sub} />}
    </div>
  );
}
