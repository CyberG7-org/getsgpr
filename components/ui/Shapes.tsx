import type { CSSProperties } from "react";

type Shape = { c: string; s: CSSProperties };
const PRESETS: Record<"home" | "service" | "plain", Shape[]> = {
  home: [
    { c: "shp-ring spin-slow", s: { left: "-6%", top: "10%", width: 420, height: 420 } },
    { c: "shp-ring floaty", s: { left: "78%", top: "58%", width: 260, height: 260 } },
    { c: "shp-ring", s: { left: "80%", top: "60%", width: 200, height: 200 } },
    { c: "shp-bloom floaty", s: { left: "60%", top: "-10%", width: 520, height: 520 } },
    { c: "shp-bloom", s: { left: "10%", top: "70%", width: 420, height: 420 } },
    { c: "shp-dots", s: { left: "86%", top: "18%", width: 140, height: 100 } },
    { c: "shp-arc spin-slow", s: { left: "30%", top: "80%", width: 180, height: 180 } },
  ],
  service: [
    { c: "shp-ring", s: { left: "75%", top: "10%", width: 260, height: 260 } },
    { c: "shp-ring", s: { left: "77%", top: "12%", width: 200, height: 200 } },
    { c: "shp-square filled", s: { left: "8%", top: "15%", width: 120, height: 120 } },
    { c: "shp-ring spin-slow", s: { left: "15%", top: "65%", width: 240, height: 240 } },
    { c: "shp-bars", s: { left: "85%", top: "60%", width: 100, height: 60 } },
    { c: "shp-bloom", s: { left: "40%", top: "30%", width: 500, height: 500 } },
    { c: "shp-dots", s: { left: "55%", top: "80%", width: 120, height: 60 } },
  ],
  plain: [
    { c: "shp-bars", s: { left: "6%", top: "20%", width: 60, height: 120 } },
    { c: "shp-pill", s: { left: "82%", top: "20%", width: 30, height: 90 } },
    { c: "shp-pill", s: { left: "85%", top: "35%", width: 30, height: 140 } },
    { c: "shp-pill", s: { left: "88%", top: "55%", width: 30, height: 190 } },
    { c: "shp-ring spin-slow", s: { left: "20%", top: "70%", width: 220, height: 220 } },
    { c: "shp-bloom", s: { left: "55%", top: "-5%", width: 480, height: 480 } },
  ],
};

export function Shapes({ preset }: { preset: keyof typeof PRESETS }) {
  return (
    <div className="shapes" aria-hidden="true">
      {PRESETS[preset].map((p, i) => (
        <div key={i} className={p.c} style={p.s}>{p.c.includes("shp-bars") ? <><i /><i /><i /><i /></> : null}</div>
      ))}
    </div>
  );
}
