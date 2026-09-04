import type { Hero as HeroBlock } from "@/content/types";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RichText } from "@/components/ui/RichText";
import { ButtonRow } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EligibilityChecker } from "@/components/widgets/EligibilityChecker";
import { PackageCard } from "@/components/blocks/Packages";
import { PACKAGES } from "@/content/packages";
import { HeroBackgroundVideo } from "@/components/ui/HeroBackgroundVideo";

export function Hero(b: HeroBlock) {
  const { aside } = b;
  const two = aside !== undefined && aside.kind !== "image";
  const centered = b.centered && !two;
  return (
    <section className={`hero-banner hero-${b.variant} relative isolate overflow-hidden py-24 pb-[88px] max-[980px]:py-14 text-on-dark on-dark`}>
      <HeroBackgroundVideo />
      <div className="hero-shade" aria-hidden="true" />
      <div className={`container-x relative z-10 grid gap-14 items-center max-[980px]:grid-cols-1 max-[980px]:gap-8 ${two ? "grid-cols-[6.5fr_5.5fr]" : "grid-cols-1"}`}>
        <div className={`hero-copy ${centered ? "mx-auto text-center" : ""}`}>
          {b.crumbs && b.crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className={`mb-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-on-dark-muted ${centered ? "justify-center" : ""}`}>
              {b.crumbs.map((item, index) => (
                <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                  {index > 0 && <span aria-hidden="true" className="text-blue-300/60">›</span>}
                  {item.href ? (
                    <Link href={item.href} className="text-on-dark-muted no-underline transition-colors hover:text-white hover:underline">
                      <RichText value={item.label} />
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-on-dark"><RichText value={item.label} /></span>
                  )}
                </span>
              ))}
            </nav>
          )}
          {b.eyebrow && <Eyebrow tone={b.eyebrowTone} onDark><RichText value={b.eyebrow} /></Eyebrow>}
          <h1 className={`mb-5 max-w-[18ch] text-on-dark [text-shadow:0_2px_28px_rgba(0,0,0,.34)] ${centered ? "mx-auto" : ""}`}><RichText value={b.title} /></h1>
          {b.badge && <p className="small mb-4"><Badge><RichText value={b.badge} /></Badge></p>}
          {b.sub && <RichText as="p" className="lead mb-[18px] text-on-dark" value={b.sub} />}
          {b.small && <RichText as="p" className="small mb-[26px] max-w-[60ch] text-on-dark-muted" value={b.small} />}
          <ButtonRow buttons={b.buttons} className={centered ? "justify-center" : ""} />
          {b.under && <RichText as="p" className="small mt-3.5 text-on-dark-muted" value={b.under} />}
        </div>
        {aside?.kind === "checker" && <EligibilityChecker />}
        {aside?.kind === "package" && <PackageCard p={PACKAGES.find((x) => x.key === aside.pkg)!} i={0} cta={aside.cta} />}
      </div>
    </section>
  );
}
