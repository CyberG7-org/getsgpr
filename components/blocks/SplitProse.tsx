import type { ProseBlock } from "@/content/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { Prose } from "@/components/ui/Prose";
import { ImagePh } from "@/components/ui/ImagePh";
import { SourceBlock } from "@/components/ui/SourceBlock";
import { FootRow } from "./Text";

export function SplitProse(b: ProseBlock) {
  const split = Boolean(b.image || b.source);
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} title={b.title} sub={b.sub} />
      {split ? (
        <div className="grid grid-cols-[5fr_7fr] max-[980px]:grid-cols-1 gap-14">
          {b.image ? (
            <div>
              <ImagePh ratio={b.image.ratio} label={b.image.label} />
              {b.image.caption && <p className="small mt-2">{b.image.caption}</p>}
            </div>
          ) : (
            <Prose content={b.content} />
          )}
          {b.image ? <Prose content={b.content} /> : <SourceBlock primary={b.source ?? ""} />}
        </div>
      ) : (
        <Prose content={b.content} />
      )}
      {b.images && (
        <div className="grid grid-cols-2 gap-[18px] mt-7">
          {b.images.map((im, i) => <ImagePh key={i} ratio={im.ratio} label={im.label} />)}
        </div>
      )}
      <FootRow foot={b.foot} />
    </>
  );
}
