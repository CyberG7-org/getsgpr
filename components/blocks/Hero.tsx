import type { Hero as HeroBlock } from "@/content/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RichText } from "@/components/ui/RichText";
import { ButtonRow } from "@/components/ui/Button";
import { ImagePh } from "@/components/ui/ImagePh";
import { Badge } from "@/components/ui/Badge";
import { EligibilityChecker } from "@/components/widgets/EligibilityChecker";
import { PackageCard } from "@/components/blocks/Packages";
import { PACKAGES } from "@/content/packages";

export function Hero(b: HeroBlock) {
  const dark = b.variant === "dark";
  const { aside } = b;
  const two = aside !== undefined;
  return (
    <section className={`relative py-24 pb-[88px] max-[980px]:py-14 ${dark ? "bg-[linear-gradient(180deg,var(--color-ink),var(--color-navy-900))] text-on-dark on-dark" : ""}`}>
      <div className={`container-x grid gap-14 items-center max-[980px]:grid-cols-1 max-[980px]:gap-8 ${two ? "grid-cols-[6.5fr_5.5fr]" : "grid-cols-1"}`}>
        <div>
          {b.eyebrow && <Eyebrow tone={b.eyebrowTone} onDark={dark}>{b.eyebrow}</Eyebrow>}
          <h1 className={`mb-5 max-w-[18ch] ${dark ? "text-on-dark" : ""}`}><RichText value={b.title} /></h1>
          {b.badge && <p className="small mb-4"><Badge><RichText value={b.badge} /></Badge></p>}
          {b.sub && <RichText as="p" className={`lead mb-[18px] ${dark ? "text-on-dark-muted" : ""}`} value={b.sub} />}
          {b.small && <RichText as="p" className={`small mb-[26px] max-w-[60ch] ${dark ? "text-on-dark-muted" : ""}`} value={b.small} />}
          <ButtonRow buttons={b.buttons} />
          {b.under && <RichText as="p" className={`small mt-3.5 ${dark ? "text-on-dark-muted" : ""}`} value={b.under} />}
        </div>
        {aside?.kind === "checker" && <EligibilityChecker />}
        {aside?.kind === "image" && <ImagePh ratio={aside.ratio} label={aside.label} className="min-h-[380px] max-[980px]:min-h-[240px]" />}
        {aside?.kind === "package" && <PackageCard p={PACKAGES.find((x) => x.key === aside.pkg)!} i={0} cta={aside.cta} />}
      </div>
    </section>
  );
}
