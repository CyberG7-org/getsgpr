"use client";

import Script from "next/script";
import { SITE } from "@/content/site";

export function GhlCalendar() {
  const id = `${SITE.ghl.calendarId}_1788510358590`;

  return (
    <>
      <iframe
        src={`https://api.leadconnectorhq.com/widget/booking/${SITE.ghl.calendarId}`}
        title="Book a consultation with GetSGPR"
        allow="payment"
        scrolling="no"
        id={id}
        className="block min-h-[760px] w-full border-0 max-[640px]:min-h-[880px]"
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}
