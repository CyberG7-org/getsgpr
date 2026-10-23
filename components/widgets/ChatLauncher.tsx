"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/content/site";

// One launcher, two channels: GHL live chat on the page, or WhatsApp (which cannot be embedded).
// Both reach the same GHL inbox, where the GHL assistant replies.
const WHATSAPP_GREEN = "#25D366";
const GHL_LOADER = "https://widgets.leadconnectorhq.com/loader.js";
// globals.css hides GHL's own <chat-widget> bubble unless <html> has this class.
const LIVE_CHAT_CLASS = "lc-chat-open";

type GhlChatWidget = { openWidget: () => void; isActive: () => boolean };
declare global { interface Window { leadConnector?: { chatWidget?: GhlChatWidget } } }

let ghlReady: Promise<GhlChatWidget> | null = null;

/** Loads the GHL chat widget once, on first use. Rejects if it does not load within 10 seconds. */
function loadGhlChat(): Promise<GhlChatWidget> {
  // A load that finished after an earlier timeout is still usable.
  if (window.leadConnector?.chatWidget) return Promise.resolve(window.leadConnector.chatWidget);
  ghlReady ??= new Promise<GhlChatWidget>((resolve, reject) => {
    const timer = setTimeout(() => { ghlReady = null; reject(new Error("GHL chat did not load")); }, 10_000);
    window.addEventListener("LC_chatWidgetLoaded", () => {
      clearTimeout(timer);
      if (window.leadConnector?.chatWidget) resolve(window.leadConnector.chatWidget);
      else { ghlReady = null; reject(new Error("GHL chat API missing")); }
    }, { once: true });
    const script = document.createElement("script");
    script.src = GHL_LOADER;
    script.dataset.resourcesUrl = "https://widgets.leadconnectorhq.com/chat-widget/loader.js";
    script.dataset.widgetId = SITE.ghl.chatWidgetId;
    document.body.appendChild(script);
  });
  return ghlReady;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.04c0-5.22 4.25-9.46 9.48-9.46 2.53 0 4.9.99 6.69 2.78a9.4 9.4 0 0 1 2.77 6.69c0 5.22-4.25 9.47-9.46 9.47zm8.06-17.53A11.33 11.33 0 0 0 12.05.63C5.77.63.66 5.73.66 12.01c0 2.01.52 3.97 1.52 5.69L.57 23.6l6.03-1.58a11.37 11.37 0 0 0 5.44 1.39h.01c6.28 0 11.39-5.1 11.39-11.38 0-3.04-1.18-5.9-3.33-8.05z" />
    </svg>
  );
}

export function ChatLauncher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [liveChat, setLiveChat] = useState<"idle" | "loading" | "open" | "failed">("idle");
  const launcherRef = useRef<HTMLButtonElement>(null);
  const firstActionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { if (open) firstActionRef.current?.focus(); }, [open]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); launcherRef.current?.focus(); }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  // GHL has no "closed" event, so watch isActive() and hand the corner back to our launcher when it closes.
  useEffect(() => {
    if (liveChat !== "open") return;
    const watch = setInterval(() => {
      if (window.leadConnector?.chatWidget?.isActive()) return;
      document.documentElement.classList.remove(LIVE_CHAT_CLASS);
      setLiveChat("idle");
    }, 500);
    return () => clearInterval(watch);
  }, [liveChat]);

  const openLiveChat = async () => {
    setLiveChat("loading");
    try {
      const chat = await loadGhlChat();
      document.documentElement.classList.add(LIVE_CHAT_CLASS);
      chat.openWidget();
      setOpen(false);
      setLiveChat("open");
    } catch {
      setLiveChat("failed");
    }
  };

  if (pathname === "/contact") return null;
  // Sit above the tablet/phone ActionBar, which shows on every page except /book-a-call.
  const offset = pathname === "/book-a-call" ? "bottom-5" : "bottom-[88px] min-[1201px]:bottom-5";

  return (
    <div className={`fixed ${offset} right-5 z-[95] flex flex-col items-end gap-3 ${liveChat === "open" ? "hidden" : ""}`}>
      {open && (
        <div id="chat-launcher-panel" role="dialog" aria-label="Chat with GetSGPR"
          className="w-[320px] max-w-[calc(100vw-40px)] overflow-hidden rounded-[18px] bg-white shadow-[0_24px_60px_rgba(3,8,20,.28)] border border-line">
          <div className="flex items-center gap-3 bg-ink px-4 py-3.5 text-white">
            <Image src="/email/getsgpr-logo.png" alt="" width={46} height={30} />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-[15px] leading-tight">GetSGPR</p>
              <p className="text-[12px] text-on-dark-muted">Chat here or on WhatsApp</p>
            </div>
            <button type="button" onClick={() => { setOpen(false); launcherRef.current?.focus(); }} aria-label="Close chat options"
              className="grid size-8 place-items-center rounded-full text-on-dark-muted hover:bg-white/10 hover:text-white cursor-pointer">✕</button>
          </div>
          <div className="bg-paper-alt px-4 py-4">
            <p className="max-w-[250px] rounded-[14px] rounded-tl-[4px] bg-white px-3.5 py-2.5 text-[14.5px] leading-snug text-navy-900 shadow-sm">
              Hi there! Ask us anything about your Singapore PR or citizenship application. Chat with us right here, or continue on WhatsApp.
            </p>
          </div>
          <div className="grid gap-2 px-4 pb-4 pt-1 bg-paper-alt">
            <button ref={firstActionRef} type="button" onClick={openLiveChat} disabled={liveChat === "loading"}
              className="flex min-h-[48px] items-center justify-center rounded-btn bg-ink font-semibold text-[15px] text-white cursor-pointer disabled:cursor-wait disabled:opacity-80">
              {liveChat === "loading" ? "Opening chat…" : "Chat here now"}
            </button>
            <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-btn font-semibold text-[15px] text-ink no-underline"
              style={{ background: WHATSAPP_GREEN }}>
              <WhatsAppIcon className="size-5" />Continue on WhatsApp
            </a>
            {liveChat === "failed" && (
              <p role="alert" className="text-center text-[12.5px] text-red">Live chat could not open right now. Please continue on WhatsApp.</p>
            )}
            <p className="mt-1 text-center text-[11.5px] text-slate-400">Please do not send passport, NRIC or FIN numbers.</p>
          </div>
        </div>
      )}
      <button ref={launcherRef} type="button" onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close chat options" : "Chat with GetSGPR"} aria-expanded={open} aria-controls="chat-launcher-panel"
        className="grid size-[58px] place-items-center rounded-full text-white shadow-[0_12px_30px_rgba(3,8,20,.3)] cursor-pointer transition-transform hover:scale-105"
        style={{ background: WHATSAPP_GREEN }}>
        <WhatsAppIcon className="size-8" />
      </button>
    </div>
  );
}
