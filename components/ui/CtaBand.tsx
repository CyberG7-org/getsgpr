import { RichText } from "./RichText";
import { ButtonRow } from "./Button";
import type { Btn } from "@/content/types";

export function CtaBand({ title, sub, buttons }: { title: string; sub?: string; buttons: Btn[] }) {
  return (
    <section className="bg-[linear-gradient(135deg,var(--color-navy-900),var(--color-navy-700))] text-on-dark py-[88px] on-dark">
      <div className="container-x reveal">
        <div className="cta-panel">
          <div>
            <span className="eyebrow text-blue-300">Your next step</span>
            <h2 className="text-on-dark mb-3">{title}</h2>
            {sub && <RichText as="p" className="lead text-on-dark-muted" value={sub} />}
          </div>
          <ButtonRow buttons={buttons} className="cta-actions" />
        </div>
      </div>
    </section>
  );
}
