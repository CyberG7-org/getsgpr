import { RichText } from "./RichText";
import { ButtonRow } from "./Button";
import type { Btn } from "@/content/types";

export function CtaBand({ title, sub, buttons }: { title: string; sub?: string; buttons: Btn[] }) {
  return (
    <section className="bg-[linear-gradient(135deg,var(--color-navy-900),var(--color-navy-700))] text-on-dark py-[88px] on-dark">
      <div className="container-x reveal">
        <h2 className="text-on-dark mb-3">{title}</h2>
        {sub && <RichText as="p" className="lead text-on-dark-muted mb-7" value={sub} />}
        <ButtonRow buttons={buttons} />
      </div>
    </section>
  );
}
