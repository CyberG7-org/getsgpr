import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { parseRich } from "@/lib/rich";
import { RichText } from "@/components/ui/RichText";
import { Ph } from "@/components/ui/Ph";

describe("parseRich", () => {
  it("splits placeholders, bold and links", () => {
    expect(parseRich("Reply from [[Email]] within **24 hours**, see [pricing](/packages).")).toEqual([
      { t: "text", v: "Reply from " },
      { t: "ph", v: "Email" },
      { t: "text", v: " within " },
      { t: "strong", v: "24 hours" },
      { t: "text", v: ", see " },
      { t: "link", v: "pricing", href: "/packages" },
      { t: "text", v: "." },
    ]);
  });
  it("returns plain text untouched", () => {
    expect(parseRich("Plain.")).toEqual([{ t: "text", v: "Plain." }]);
  });
});

describe("RichText / Ph", () => {
  it("renders a gold placeholder span with data-ph", () => {
    expect(renderToStaticMarkup(<Ph label="Email" />)).toBe('<span class="ph" data-ph="Email">[Email]</span>');
  });
  it("renders inline nodes and a wrapper element", () => {
    const html = renderToStaticMarkup(<RichText as="p" className="small" value="Call **now** [[Hours]]" />);
    expect(html).toBe('<p class="small">Call <strong>now</strong> <span class="ph" data-ph="Hours">[Hours]</span></p>');
  });
});
