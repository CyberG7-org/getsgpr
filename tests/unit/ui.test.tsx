import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FaqList } from "@/components/ui/FaqList";
import { DataTable } from "@/components/ui/DataTable";
import { pageMetadata } from "@/lib/metadata";

describe("ui primitives", () => {
  it("Button maps style to btn classes and links internal hrefs", () => {
    const html = renderToStaticMarkup(<Button label="Go" href="/packages" style="primary" />);
    expect(html).toContain('class="btn btn-primary"');
    expect(html).toContain('href="/packages"');
  });
  it("Badge applies tone classes", () => {
    expect(renderToStaticMarkup(<Badge tone="teal">PR</Badge>)).toContain("bg-teal-bg text-teal");
  });
  it("FaqList renders details, opens the first when asked, emits FAQPage JSON-LD when schema is true", () => {
    const html = renderToStaticMarkup(<FaqList items={[{ q: "Q1?", a: "A1 **b**" }, { q: "Q2?", a: "A2" }]} schema openFirst />);
    expect(html).toContain("<details open");
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain("<strong>b</strong>");
  });
  it("DataTable renders ✓ as green check cells", () => {
    const html = renderToStaticMarkup(<DataTable columns={["Stage", "Lite"]} rows={[["Audit", "✓"]]} />);
    expect(html).toContain('class="text-center text-green font-bold"');
  });
  it("pageMetadata sets canonical", () => {
    expect(pageMetadata({ title: "T", description: "D", path: "/ltvp" }).alternates).toEqual({ canonical: "/ltvp" });
  });
});
