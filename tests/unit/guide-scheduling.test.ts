// @vitest-environment node
import { afterEach, describe, expect, it } from "vitest";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { isGuidePublic, promoteDueGuideSource } from "@/lib/guide-scheduling.mjs";
import { publishDueGuides } from "@/scripts/publish-due-guides.mjs";

const NOW = new Date("2026-11-26T04:30:00.000Z");
const tempDirs: string[] = [];

afterEach(() => {
  for (const dir of tempDirs.splice(0)) rmSync(dir, { force: true, recursive: true });
});

describe("isGuidePublic", () => {
  it("keeps legacy guides without scheduling fields public", () => {
    expect(isGuidePublic({}, NOW)).toBe(true);
  });

  it("keeps draft and scheduled guides private", () => {
    expect(isGuidePublic({ status: "draft" }, NOW)).toBe(false);
    expect(isGuidePublic({ status: "scheduled", publishAt: "2026-11-26T12:00:00+08:00" }, NOW)).toBe(false);
  });

  it("keeps a prematurely published guide private until its publication time", () => {
    expect(isGuidePublic({ status: "published", publishAt: "2026-11-26T12:31:00+08:00" }, NOW)).toBe(false);
  });

  it("makes a published guide public at its exact publication time", () => {
    expect(isGuidePublic({ status: "published", publishAt: "2026-11-26T12:30:00+08:00" }, NOW)).toBe(true);
  });

  it("fails closed when a publication timestamp is invalid", () => {
    expect(isGuidePublic({ status: "published", publishAt: "tomorrow morning" }, NOW)).toBe(false);
  });

  it("fails closed when a publication timestamp has no timezone", () => {
    expect(isGuidePublic({ status: "published", publishAt: "2026-11-26T12:30:00" }, NOW)).toBe(false);
  });
});

describe("promoteDueGuideSource", () => {
  it("promotes a due scheduled guide without rewriting its body", () => {
    const source = `---\ntitle: "Due"\nstatus: scheduled\npublishAt: "2026-11-26T12:30:00+08:00"\n---\n\nBody text.\n`;

    const result = promoteDueGuideSource(source, NOW);

    expect(result.promoted).toBe(true);
    expect(result.source).toBe(source.replace("status: scheduled", "status: published"));
  });

  it("does not promote a future scheduled guide", () => {
    const source = `---\ntitle: "Future"\nstatus: scheduled\npublishAt: "2026-11-26T12:31:00+08:00"\n---\n\nBody text.\n`;

    expect(promoteDueGuideSource(source, NOW)).toEqual({ promoted: false, source });
  });

  it("rejects a scheduled guide with an invalid publication timestamp", () => {
    const source = `---\ntitle: "Invalid"\nstatus: scheduled\npublishAt: "later"\n---\n\nBody text.\n`;

    expect(() => promoteDueGuideSource(source, NOW)).toThrow(/publishAt/);
  });

  it("rejects a scheduled guide whose publication timestamp has no timezone", () => {
    const source = `---\ntitle: "Ambiguous"\nstatus: scheduled\npublishAt: "2026-11-26T12:30:00"\n---\n\nBody text.\n`;

    expect(() => promoteDueGuideSource(source, NOW)).toThrow(/publishAt/);
  });
});

describe("publishDueGuides", () => {
  it("writes only due guides and reports their slugs", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "getsgpr-guides-"));
    tempDirs.push(dir);
    const duePath = path.join(dir, "due.md");
    const futurePath = path.join(dir, "future.md");
    writeFileSync(duePath, `---\nstatus: scheduled\npublishAt: "2026-11-26T12:30:00+08:00"\n---\n\nDue.\n`);
    writeFileSync(futurePath, `---\nstatus: scheduled\npublishAt: "2026-11-26T12:31:00+08:00"\n---\n\nFuture.\n`);

    expect(publishDueGuides(dir, NOW)).toEqual(["due"]);
    expect(readFileSync(duePath, "utf8")).toContain("status: published");
    expect(readFileSync(futurePath, "utf8")).toContain("status: scheduled");
  });
});
