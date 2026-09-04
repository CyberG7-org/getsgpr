export type Tone = "teal" | "red" | "amber" | "violet" | "green" | "gold" | "neutral";
export type SectionTone = "default" | "alt" | "dark" | "warm";
export type Btn = { label: string; href: string; style: "primary" | "ghost" | "light" | "outline-dark" };
export type Ratio = "4-3" | "16-9" | "3-4" | "1-1";
export type ProseItem =
  | { p: string }
  | { h3: string; smallSuffix?: string }
  | { ul: string[] }
  | { ol: string[] }
  | { small: string }
  | { kv: { k: string; v: string }[] }
  | { strong: string };

export type PageMeta = { title: string; description: string; path: string };
export type Foot = { text?: string; link?: { label: string; href: string }; button?: Btn };

export type Hero = {
  kind: "hero"; variant: "dark" | "light" | "plain";
  eyebrow?: string; eyebrowTone?: Tone; title: string; sub?: string; small?: string; badge?: string;
  buttons?: Btn[]; under?: string; centered?: boolean;
  aside?: { kind: "checker" } | { kind: "image"; ratio: Ratio; label: string } | { kind: "package"; pkg: "lite" | "partnered" | "concierge"; cta?: Btn };
};
export type Trust = { kind: "trust"; google?: boolean };
export type Stats = { kind: "stats"; items: { value: string; label: string }[] };
export type Honesty = { kind: "honesty"; title: string; paragraphs: string[] };
export type Card = {
  tone?: Tone; badge?: string; title: string; text?: string; tags?: string[]; bullets?: string[];
  image?: { src: string; alt: string };
  link?: { label: string; href: string };
  outcome?: { imageLabel: string; meta: string; challenge: string; did: string; result: string; href: string };
};
export type Cards = { kind: "cards"; eyebrow?: string; eyebrowTone?: Tone; title?: string; sub?: string; columns: 2 | 3 | 4; maxWidth?: number; cards: Card[]; note?: string; foot?: Foot };
export type Tiles = { kind: "tiles"; eyebrow?: string; title: string; sub?: string; tiles: { n: string; title: string; text: string; ours?: boolean }[]; after?: { text: string; button: Btn }; note?: string };
export type Items = { kind: "items"; eyebrow?: string; title?: string; sub?: string; columns: 2 | 3; items: { title: string; text: string }[]; foot?: Foot };
export type Steps = { kind: "steps"; eyebrow?: string; title: string; sub?: string; light?: boolean; steps: { when: string; title: string; text: string }[]; note?: string };
export type PackagesBlock = { kind: "packages"; eyebrow?: string; title?: string; sub?: string; note?: string; showNotFor?: boolean };
export type Reviews = { kind: "reviews"; eyebrow?: string; title: string; sub?: string; limit?: number };
export type Faq = { kind: "faq"; eyebrow?: string; title: string; items: { q: string; a: string }[]; schema?: boolean; openFirst?: boolean; note?: string };
export type ContactSplit = { kind: "contact"; eyebrow?: string; title: string; sub?: string; prose: ProseItem[] };
export type CtaBandBlock = { kind: "cta"; title: string; sub?: string; buttons: Btn[] };
export type Source = { kind: "source"; primary: string };
export type Table = { kind: "table"; eyebrow?: string; title?: string; sub?: string; columns: string[]; rows: string[][]; note?: string; foot?: Foot };
export type ProseBlock = { kind: "prose"; eyebrow?: string; title?: string; sub?: string; content: ProseItem[]; source?: string; image?: { ratio: Ratio; label: string; caption?: string }; images?: { ratio: Ratio; label: string }[]; foot?: Foot };
export type Honest = { kind: "honest"; title: string; text: string };
export type SampleResult = { kind: "sampleResult"; title?: string; sub?: string };
export type Crumbs = { kind: "crumbs"; items: { label: string; href?: string }[] };
export type Filters = { kind: "filters"; chips: string[] };
export type Text = { kind: "text"; eyebrow?: string; title?: string; sub?: string; paragraphs?: string[]; buttons?: Btn[]; foot?: Foot };
export type ReadinessFormBlock = { kind: "readinessForm"; eyebrow?: string; title: string; sub?: string };

type Wrap = { tone?: SectionTone; tight?: boolean; id?: string };
export type Block = Wrap & (Hero | Trust | Stats | Honesty | Cards | Tiles | Items | Steps | PackagesBlock | Reviews | Faq | ContactSplit | CtaBandBlock | Source | Table | ProseBlock | Honest | SampleResult | Crumbs | Filters | Text | ReadinessFormBlock);

export type PageContent = { meta: PageMeta; shapes: "home" | "service" | "plain"; blocks: Block[] };
