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

  it("escapes double quotes inside a placeholder label", () => {
    const html = renderMarkdown('Text [[He said "yes"]]');
    // The attribute value is escaped, so the embedded quote cannot terminate it early.
    expect(html).toContain('data-ph="He said &quot;yes&quot;"');
    // The tag is well-formed: exactly one `<span class="ph" data-ph="...">` opener,
    // immediately followed by its matching closer, nothing broken in between.
    expect(html).toMatch(/<span class="ph" data-ph="He said &quot;yes&quot;">\[He said "yes"\]<\/span>/);
  });

  it("strips markdown emphasis markers from a placeholder label", () => {
    const html = renderMarkdown("Text [[Some **bold** text]]");
    expect(html).toContain('data-ph="Some bold text"');
    expect(html).toContain("[Some bold text]");
    expect(html).not.toContain("<strong>");
    expect(html).not.toContain("*");
  });

  it("escapes an ampersand inside a placeholder label", () => {
    const html = renderMarkdown("Text [[A & B]]");
    expect(html).toContain('data-ph="A &amp; B"');
    expect(html).toContain("&amp;");
  });

  it("still renders real markdown outside a placeholder in the same paragraph", () => {
    const html = renderMarkdown("Text [[Date]] and **b** too");
    expect(html).toContain('<span class="ph" data-ph="Date">[Date]</span>');
    expect(html).toContain("<strong>b</strong>");
  });

  it("matches a label containing a single closing bracket", () => {
    const html = renderMarkdown("Text [[a [b] c]]");
    expect(html).toContain('<span class="ph" data-ph="a [b] c">[a [b] c]</span>');
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
