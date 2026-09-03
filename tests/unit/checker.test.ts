import { describe, it, expect } from "vitest";
import { QUESTIONS, verdict } from "@/lib/checker";

describe("eligibility checker", () => {
  it("has six questions", () => expect(QUESTIONS).toHaveLength(6));
  it("rejected before → appeal verdict → concierge", () => {
    expect(verdict([0, 2, 0, 1, 2, 0])).toMatchObject({ v: "An appeal may be viable.", href: "/sgpr-premium-concierge" });
  });
  it("under one year → wait → lite", () => {
    expect(verdict([0, 0, 0, 0, 3, 0])).toMatchObject({ v: "Waiting is probably smarter.", href: "/sgpr-lite-diy-tier" });
  });
  it("already PR → citizenship path", () => {
    expect(verdict([3, 2, 0, 0, 2, 0]).v).toBe("You're on the citizenship path.");
  });
  it("tenure and income strong → partnered", () => {
    expect(verdict([0, 2, 0, 0, 2, 0])).toMatchObject({ v: "You're in a strong position.", href: "/sgpr-partnered-do-with-you" });
  });
  it("family → conversation → concierge", () => {
    expect(verdict([0, 1, 2, 0, 0, 0])).toMatchObject({ v: "Worth a conversation.", href: "/sgpr-premium-concierge" });
  });
  it("default → conversation → partnered", () => {
    expect(verdict([0, 1, 0, 0, 0, 0])).toMatchObject({ v: "Worth a conversation.", href: "/sgpr-partnered-do-with-you" });
  });
});
