// @vitest-environment node
import { describe, it, expect } from "vitest";
import { renderMarkdown, getCaseStudies, getCaseStudy } from "@/lib/markdown";

describe("renderMarkdown", () => {
  it("renders headings, placeholders and bold text", () => {
    const html = renderMarkdown("## H\n\nText [[Date]] **b**");
    expect(html).toContain("<h2>H</h2>");
    expect(html).toContain('<span class="ph" data-ph="Date">[Date]</span>');
    expect(html).toContain("<strong>b</strong>");
  });
});

describe("case studies", () => {
  it("returns three case studies with unique slugs", () => {
    const cases = getCaseStudies();
    expect(cases).toHaveLength(3);
    expect(new Set(cases.map((c) => c.slug)).size).toBe(3);
  });

  it("looks up a case study by slug", () => {
    expect(getCaseStudy("sample-reapplication")?.title).toBeDefined();
  });

  it("returns undefined for an unknown slug", () => {
    expect(getCaseStudy("does-not-exist")).toBeUndefined();
  });
});
