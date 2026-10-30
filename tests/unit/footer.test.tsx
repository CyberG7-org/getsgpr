import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/content/site";

describe("Footer", () => {
  const html = renderToStaticMarkup(<Footer />);
  it("carries the independence disclaimer verbatim", () => {
    expect(html.replace(/&amp;/g, "&")).toContain(SITE.disclaimer);
  });
  it("shows legal name, UEN, address, phone, email and opening hours", () => {
    expect(html).toContain("SGPR Immigration Singapore");
    expect(html).toContain("UEN 53408306D");
    expect(html).toContain("The Adelphi, 1 Coleman Street, #05-14");
    expect(html).toContain("+65 8934 0818");
    expect(html).toContain('href="mailto:info@getsgpr.com"');
    expect(html).toContain("info@getsgpr.com");
    expect(html).toContain("9 AM–6 PM");
    expect(html).toContain("By appointment only");
  });
  it("renders the supplied GetSGPR logo", () => {
    expect(html).toContain("getsgpr-logo.png");
    expect(html).toContain('alt="GetSGPR"');
  });
  it("links every footer route", () => {
    for (const href of ["/permanent-resident-sg", "/packages", "/pr-readiness-review", "/about", "/guides", "/contact", "/privacy-data-security"])
      expect(html).toContain(`href="${href}"`);
    expect(html).not.toContain('href="/case-studies"');
  });
});
