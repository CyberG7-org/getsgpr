import type { Block } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/ui/CtaBand";
import { SourceBlock } from "@/components/ui/SourceBlock";
import { Hero } from "./Hero"; import { Trust } from "./Trust"; import { Stats } from "./Stats"; import { Honesty } from "./Honesty";
import { Cards } from "./Cards"; import { Tiles } from "./Tiles"; import { Items } from "./Items"; import { Steps } from "./Steps";
import { Packages } from "./Packages"; import { Reviews } from "./Reviews"; import { ContactSplit } from "./ContactSplit"; import { Honest } from "./Honest";
import { SampleResult } from "./SampleResult"; import { Crumbs } from "./Crumbs"; import { Filters } from "./Filters"; import { SplitProse } from "./SplitProse";
import { Text } from "./Text"; import { TableBlock } from "./TableBlock"; import { FaqBlock } from "./FaqBlock";
import { ReadinessForm } from "@/components/widgets/ReadinessForm";
import { SectionHead } from "@/components/ui/SectionHead";

function isDraftCaseSection(b: Block) {
  return b.kind === "cards"
    && b.cards.length > 0
    && b.cards.every((card) => card.outcome && JSON.stringify(card).includes("[["));
}

function Inner({ b }: { b: Block }) {
  switch (b.kind) {
    case "stats": return <Stats {...b} />;
    case "honesty": return <Honesty {...b} />;
    case "cards": return <Cards {...b} />;
    case "tiles": return <Tiles {...b} />;
    case "items": return <Items {...b} />;
    case "steps": return <Steps {...b} onDark={b.tone === "dark"} />;
    case "packages": return <Packages {...b} />;
    case "reviews": return <Reviews {...b} />;
    case "faq": return <FaqBlock {...b} />;
    case "contact": return <ContactSplit {...b} />;
    case "source": return <SourceBlock primary={b.primary} />;
    case "table": return <TableBlock {...b} />;
    case "prose": return <SplitProse {...b} />;
    case "honest": return <Honest {...b} />;
    case "sampleResult": return <SampleResult />;
    case "filters": return <Filters {...b} />;
    case "text": return <Text {...b} />;
    case "readinessForm": return <><SectionHead eyebrow={b.eyebrow} title={b.title} sub={b.sub} /><ReadinessForm /></>;
    default: return null;
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (isDraftCaseSection(b)) return null;
        if (b.kind === "hero") return <Hero key={i} {...b} />;
        if (b.kind === "trust") return <Trust key={i} google={b.google} />;
        if (b.kind === "cta") return <CtaBand key={i} title={b.title} sub={b.sub} buttons={b.buttons} />;
        if (b.kind === "crumbs") return <Crumbs key={i} items={b.items} />;
        return <Section key={i} tone={b.tone} tight={b.tight} id={b.id}><Inner b={b} /></Section>;
      })}
    </>
  );
}
