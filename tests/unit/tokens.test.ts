import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

const css = readFileSync("app/globals.css", "utf8");
const TOKENS: Record<string, string> = {
  ink: "#0A1223", "navy-900": "#111B33", "navy-700": "#1B2B57", "navy-500": "#111E42",
  "blue-300": "#93AEDC", "blue-200": "#A9BFE4", "blue-100": "#C6D2E6", "blue-50": "#CFDDF5",
  "slate-500": "#4C5670", "slate-400": "#7C879C", "slate-300": "#9AA4B8",
  line: "#E7EBF3", "line-soft": "#EDF1F8", "input-line": "#DFE4EF",
  paper: "#F6F8FC", "paper-alt": "#EEF2F9", "paper-warm": "#F7F4EF", "paper-cool": "#EDF1F8",
  "on-dark": "#EFF3FA", "on-dark-muted": "#B9C8E2",
  teal: "#0E7C86", "teal-bg": "#DFF1F2", red: "#C0272D", "red-bg": "#FBE9EA",
  amber: "#B26A00", "amber-bg": "#FBF0DE", violet: "#5B4B9E", "violet-bg": "#EAE7F5",
  green: "#1F7A4D", "green-bg": "#E3F3EA", gold: "#9A6A0C", "gold-bg": "#F7EAC9",
};

describe("globals.css tokens", () => {
  for (const [name, hex] of Object.entries(TOKENS)) {
    it(`defines --color-${name}: ${hex}`, () => {
      expect(css).toMatch(new RegExp(`--color-${name}:\\s*${hex}`, "i"));
    });
  }
  it("disables animation under prefers-reduced-motion", () => {
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
  });
  it("defines the three keyframes", () => {
    for (const k of ["riseIn", "floaty", "spinSlow"]) expect(css).toContain(`@keyframes ${k}`);
  });
});
