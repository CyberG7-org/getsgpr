"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { NAV } from "@/content/nav";
import { Brand } from "./Brand";
import { MobileNav } from "./MobileNav";

const linkCls = "px-3.5 py-[9px] rounded-[9px] text-blue-100 no-underline text-[14.5px] font-medium transition-colors hover:bg-[rgba(147,174,220,.12)] hover:text-on-dark";

export function Header() {
  const pathname = usePathname();
  const servicesRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const menu = servicesRef.current;
    if (menu) menu.open = false;
  }, [pathname]);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      const menu = servicesRef.current;
      if (menu?.open && !menu.contains(event.target as Node)) menu.open = false;
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      const menu = servicesRef.current;
      if (event.key === "Escape" && menu?.open) {
        menu.open = false;
        menu.querySelector("summary")?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-[60] bg-[rgba(10,18,35,.92)] backdrop-blur-[12px] text-on-dark">
      <div className="container-x flex items-center gap-5 min-h-[62px]">
        <Brand />
        <nav aria-label="Primary" className="hidden min-[1081px]:flex items-center gap-0.5 ml-auto">
          <details ref={servicesRef} className="nav-details relative">
            <summary className={`${linkCls} cursor-pointer`}>Services</summary>
            <div className="absolute top-11 left-0 bg-white border border-line rounded-[14px] shadow-card min-w-[270px] p-2 grid">
              {NAV.services.map((s) => (
                <Link key={s.href} href={s.href} onClick={() => { if (servicesRef.current) servicesRef.current.open = false; }} className="px-3 py-2.5 rounded-[9px] text-navy-900 no-underline text-[15px] font-medium hover:bg-line-soft">
                  {s.label}<small className="block text-slate-400 text-[12.5px] font-normal mt-0.5">{s.small}</small>
                </Link>
              ))}
            </div>
          </details>
          {NAV.primary.map((l) => <Link key={l.href} href={l.href} className={linkCls}>{l.label}</Link>)}
          <Link href={NAV.cta.href} className="btn btn-light btn-sm ml-2.5">{NAV.cta.label}</Link>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
