import Link from "next/link";
import { SITE } from "@/content/site";

const actionClass = "group grid min-h-[88px] grid-cols-[1fr_auto] content-center gap-x-4 gap-y-1 px-6 py-4 text-blue-100 no-underline transition-colors hover:bg-white/[.055] focus-visible:outline-blue-200 max-[640px]:min-h-[78px] max-[640px]:px-5";

export function GuideContactCard() {
  return (
    <aside
      aria-labelledby="guide-contact-title"
      className="relative mx-auto mt-12 max-w-[820px] overflow-hidden rounded-card border border-blue-300/25 bg-navy-700 text-blue-100 shadow-card"
    >
      <span aria-hidden="true" className="absolute -right-16 -top-24 size-[230px] rounded-full border border-blue-300/15" />
      <span aria-hidden="true" className="absolute -right-5 -top-14 size-[145px] rounded-full border border-blue-300/10" />
      <div className="relative px-8 py-8 max-[640px]:px-5 max-[640px]:py-6">
        <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-[.11em] text-blue-200">{SITE.guideContact.eyebrow}</p>
        <h2 id="guide-contact-title" className="text-[clamp(25px,3vw,34px)] leading-[1.12] text-on-dark">{SITE.guideContact.title}</h2>
        <p className="mt-3 max-w-[56ch] text-[15.5px] leading-7 text-blue-100">{SITE.guideContact.text}</p>
      </div>
      <address className="relative grid grid-cols-3 border-t border-blue-300/20 not-italic max-[720px]:grid-cols-1">
        <a href={SITE.emailUrl} className={actionClass}>
          <span className="text-[10.5px] font-semibold uppercase tracking-[.1em] text-blue-300">Email</span>
          <span aria-hidden="true" className="row-span-2 self-center text-blue-300 transition-transform group-hover:translate-x-0.5">↗</span>
          <strong className="truncate font-body text-[14px] font-semibold text-on-dark group-hover:underline">{SITE.email}</strong>
        </a>
        <a href={SITE.whatsappUrl} className={`${actionClass} border-l border-blue-300/20 max-[720px]:border-l-0 max-[720px]:border-t`}>
          <span className="text-[10.5px] font-semibold uppercase tracking-[.1em] text-blue-300">Message</span>
          <span aria-hidden="true" className="row-span-2 self-center text-blue-300 transition-transform group-hover:translate-x-0.5">↗</span>
          <strong className="font-body text-[14px] font-semibold text-on-dark group-hover:underline">WhatsApp us</strong>
        </a>
        <Link href="/book-a-call" className={`${actionClass} border-l border-blue-300/20 max-[720px]:border-l-0 max-[720px]:border-t`}>
          <span className="text-[10.5px] font-semibold uppercase tracking-[.1em] text-blue-300">Free consultation</span>
          <span aria-hidden="true" className="row-span-2 self-center text-blue-300 transition-transform group-hover:translate-x-0.5">→</span>
          <strong className="font-body text-[14px] font-semibold text-on-dark group-hover:underline">Book a call</strong>
        </Link>
      </address>
    </aside>
  );
}
