import type { SectionTone } from "@/content/types";

const TONES: Record<SectionTone, string> = {
  default: "", alt: "bg-paper-alt", dark: "bg-navy-900 text-on-dark on-dark",
  warm: "bg-[linear-gradient(135deg,var(--color-paper-cool),var(--color-paper-warm))]",
};

export function Section({ tone = "default", tight, id, children }: { tone?: SectionTone; tight?: boolean; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`${tight ? "py-10" : "py-[76px] max-[980px]:py-12"} ${TONES[tone]}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}
