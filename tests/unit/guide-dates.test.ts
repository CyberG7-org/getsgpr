import { describe, expect, it } from "vitest";
import { formatGuideCreatedAt } from "@/lib/guide-dates";

describe("formatGuideCreatedAt", () => {
  it("formats guide timestamps in Singapore time", () => {
    expect(formatGuideCreatedAt("2026-09-03T13:39:20+08:00")).toBe("3 Sept 2026, 1:39 PM SGT");
  });

  it("rejects invalid timestamps", () => {
    expect(() => formatGuideCreatedAt("not-a-date")).toThrow(/createdAt/);
  });
});
