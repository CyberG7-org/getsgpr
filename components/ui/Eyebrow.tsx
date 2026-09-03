import { TONE_TEXT } from "./Badge";
import type { Tone } from "@/content/types";

export function Eyebrow({ children, tone, onDark }: { children: React.ReactNode; tone?: Tone; onDark?: boolean }) {
  return <span className={`eyebrow ${onDark ? "text-blue-300" : tone ? TONE_TEXT[tone] : ""}`}>{children}</span>;
}
