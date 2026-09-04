"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { NAV } from "@/content/nav";

export function MobileNav() {
  const path = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (menu) menu.open = false;
  }, [path]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuRef.current?.open) {
        menuRef.current.open = false;
        menuRef.current.querySelector("summary")?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <nav aria-label="Primary, compact" className="flex min-[1081px]:hidden items-center gap-1.5 ml-auto">
      <details ref={menuRef} className="mobile-menu relative">
        <summary className="min-h-11 px-3.5 inline-flex items-center gap-2 rounded-[9px] text-blue-100 text-[14px] font-semibold cursor-pointer hover:bg-[rgba(147,174,220,.12)]">
          <span aria-hidden="true" className="grid gap-[4px] w-4"><i className="h-[1.5px] bg-current rounded-full" /><i className="h-[1.5px] bg-current rounded-full" /><i className="h-[1.5px] bg-current rounded-full" /></span>
          Menu
        </summary>
        <div className="fixed top-[62px] inset-x-0 max-h-[calc(100dvh-148px)] overflow-y-auto bg-ink border-t border-[rgba(147,174,220,.18)] shadow-[0_24px_60px_rgba(3,8,20,.35)] px-[18px] py-5">
          <p className="text-[11px] uppercase tracking-[.12em] font-semibold text-blue-300 mb-2">Immigration services</p>
          <div className="grid grid-cols-2 gap-2 max-[520px]:grid-cols-1">
            {NAV.services.map((s) => (
              <Link key={s.href} href={s.href} className="min-h-14 px-3.5 py-2.5 rounded-[10px] bg-[rgba(147,174,220,.08)] border border-[rgba(147,174,220,.12)] text-on-dark no-underline text-[14px] font-semibold">
                {s.label}<small className="block text-on-dark-muted text-[11.5px] font-normal leading-[1.35] mt-0.5">{s.small}</small>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {NAV.primary.map((l) => <Link key={l.href} href={l.href} className="min-h-11 inline-flex items-center px-3.5 rounded-[9px] text-blue-100 no-underline text-[14px] font-medium hover:bg-[rgba(147,174,220,.1)]">{l.label}</Link>)}
          </div>
        </div>
      </details>
      <Link href="/book-a-call" className="min-h-11 inline-flex items-center bg-blue-300 text-navy-900 font-semibold no-underline text-[14px] px-3.5 rounded-[9px]">Book a call</Link>
    </nav>
  );
}
