import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "@/lib/json-ld";

describe("serializeJsonLd", () => {
  it("prevents script termination while preserving the JSON value", () => {
    const value = { title: "</script><script>alert(1)</script>" };
    const serialized = serializeJsonLd(value);

    expect(serialized).not.toContain("<");
    expect(JSON.parse(serialized)).toEqual(value);
  });
});
