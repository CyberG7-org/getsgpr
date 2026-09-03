import type { Tone } from "@/content/types";

const TONES: Record<Tone, string> = {
  teal: "bg-teal-bg text-teal", red: "bg-red-bg text-red", amber: "bg-amber-bg text-amber",
  violet: "bg-violet-bg text-violet", green: "bg-green-bg text-green", gold: "bg-gold-bg text-gold",
  neutral: "bg-line-soft text-navy-700",
};
export const TONE_TEXT: Record<Tone, string> = {
  teal: "text-teal", red: "text-red", amber: "text-amber", violet: "text-violet", green: "text-green", gold: "text-gold", neutral: "text-navy-700",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: React.ReactNode }) {
  return <span className={`inline-block text-[12px] font-semibold tracking-[.04em] px-2.5 py-1 rounded-full w-fit ${TONES[tone]}`}>{children}</span>;
}
