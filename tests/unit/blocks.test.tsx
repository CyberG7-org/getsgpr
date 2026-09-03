import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Blocks } from "@/components/blocks/Blocks";
import type { Block } from "@/content/types";

const blocks: Block[] = [
  { kind: "hero", variant: "dark", eyebrow: "Singapore PR consultancy", title: "Build a stronger application.", sub: "Sub **bold**", buttons: [{ label: "Go", href: "/packages", style: "light" }] },
  { kind: "trust", google: true },
  { kind: "cards", columns: 4, title: "Four services.", cards: [{ tone: "teal", badge: "PR", title: "Permanent Residence", text: "Text", tags: ["A", "B"], link: { label: "Learn more →", href: "/permanent-resident-sg" } }] },
  { kind: "steps", title: "How it works", tone: "dark", steps: [{ when: "Day 0", title: "Free consultation", text: "T" }] },
  { kind: "packages" },
  { kind: "reviews", title: "What clients say.", limit: 3 },
  { kind: "faq", title: "FAQ", items: [{ q: "Q?", a: "A" }], schema: true },
  { kind: "cta", title: "Know where you stand.", buttons: [{ label: "Start", href: "/pr-readiness-review", style: "light" }] },
];
const html = renderToStaticMarkup(<Blocks blocks={blocks} />);

describe("Blocks", () => {
  it("renders one h1 from the hero and h2s from block titles", () => {
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain("Four services.");
    expect(html).toContain("How it works");
  });
  it("renders trust facts and Google placeholders", () => {
    expect(html).toContain("UEN 53408306D");
    expect(html).toContain("Tradehub 21");
    expect(html).toContain('data-ph="Google rating"');
  });
  it("renders all three packages with live prices", () => {
    for (const p of ["S$197", "S$497", "S$1,997"]) expect(html).toContain(p);
  });
  it("renders testimonials with the verification badge", () => {
    expect(html).toContain("John Tan");
    expect(html).toContain("Pending verification");
  });
  it("renders the CTA band buttons", () => {
    expect(html).toContain('href="/pr-readiness-review"');
  });
});
