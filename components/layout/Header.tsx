"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { NAV, type Link as NavLink } from "@/content/nav";
import { Brand } from "./Brand";
import { MobileNav } from "./MobileNav";
import { BookCallButton } from "@/components/ui/BookCallButton";

const linkCls = "px-3.5 py-[9px] rounded-[9px] text-blue-100 no-underline text-[14.5px] font-medium transition-colors hover:bg-[rgba(147,174,220,.12)] hover:text-on-dark";

function NavMenu({ label, items }: { label: string; items: readonly NavLink[] }) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const close = () => { if (menuRef.current) menuRef.current.open = false; };

  useEffect(close, [pathname]);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      const menu = menuRef.current;
      if (menu?.open && !menu.contains(event.target as Node)) menu.open = false;
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      const menu = menuRef.current;
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
    <details ref={menuRef} className="nav-details relative">
      <summary className={`${linkCls} cursor-pointer`}>{label}</summary>
      <div className="absolute top-11 left-0 bg-white border border-line rounded-[14px] shadow-card min-w-[270px] p-2 grid">
        {items.map((s) => (
          <Link key={s.href} href={s.href} onClick={close} className="px-3 py-2.5 rounded-[9px] text-navy-900 no-underline text-[15px] font-medium hover:bg-line-soft">
            {s.label}<small className="block text-slate-400 text-[12.5px] font-normal mt-0.5">{s.small}</small>
          </Link>
        ))}
      </div>
    </details>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-[60] bg-[rgba(10,18,35,.92)] backdrop-blur-[12px] text-on-dark">
      <div className="container-x flex items-center gap-5 min-h-[62px]">
        <Brand />
        <nav aria-label="Primary" className="hidden min-[1201px]:flex items-center gap-0.5 ml-auto">
          {NAV.primary.map((l) => l.menu
            ? <NavMenu key={l.label} label={l.label} items={l.menu} />
            : l.href && <Link key={l.label} href={l.href} className={linkCls}>{l.label}</Link>)}
          <BookCallButton href={NAV.cta.href} />
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
