import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { GuideContactCard } from "@/components/guides/GuideContactCard";
import { SITE } from "@/content/site";

describe("GuideContactCard", () => {
  const html = renderToStaticMarkup(<GuideContactCard />);

  it("renders a labelled article contact callout", () => {
    expect(html).toContain('aria-labelledby="guide-contact-title"');
    expect(html).toContain('id="guide-contact-title"');
  });

  it("offers email, WhatsApp and booking links", () => {
    expect(html).toContain(`href="${SITE.emailUrl}"`);
    expect(html).toContain("WhatsApp us");
    expect(html).toContain('href="/book-a-call"');
  });
});
