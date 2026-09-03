import Link from "next/link";
import { SITE } from "@/content/site";
import { NAV, type Link as NavLink } from "@/content/nav";
import { Ph } from "@/components/ui/Ph";
import { Brand } from "./Brand";

function Col({ title, links }: { title: string; links: readonly NavLink[] }) {
  return (
    <div>
      <h4 className="text-on-dark text-[13px] tracking-[.08em] uppercase mb-3.5 font-body">{title}</h4>
      <ul className="list-none m-0 p-0 grid gap-[9px]">
        {links.map((l) => (
          <li key={l.href}>
            {l.external
              ? <a href={l.href} className="text-blue-100 no-underline hover:text-on-dark hover:underline">{l.label}</a>
              : <Link href={l.href} className="text-blue-100 no-underline hover:text-on-dark hover:underline">{l.label}</Link>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-on-dark-muted pt-[72px] pb-10 text-[14.5px]">
      <div className="container-x">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 max-[980px]:grid-cols-2 max-[560px]:grid-cols-1">
          <div className="grid gap-2.5">
            <Brand large gradientId="gm-footer" />
            <p>Independent Singapore immigration consultancy for PR, citizenship and Long Term Visit Pass applications. Evidence-led preparation, published prices, no approval guarantees.</p>
            <p>{SITE.legalName} · UEN {SITE.uen}<br />{SITE.address}<br />{SITE.phoneDisplay} · <Ph label={SITE.placeholders.email} /><br /><Ph label={SITE.placeholders.hours} /></p>
          </div>
          <Col title="Services" links={NAV.footer.services} />
          <Col title="Company" links={NAV.footer.company} />
          <Col title="Legal" links={NAV.footer.legal} />
        </div>
        <div className="border-t border-[rgba(147,174,220,.18)] mt-12 pt-6 grid gap-3 text-[13px] text-slate-400">
          <p>{SITE.disclaimer}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2"><span>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</span><span>{SITE.tagline}</span></div>
        </div>
      </div>
    </footer>
  );
}
