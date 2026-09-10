"use client";

import { useMemo, useSyncExternalStore } from "react";
import Script from "next/script";
import { SITE } from "@/content/site";

type BookingContext = {
  submissionId: string;
  firstName: string;
  email: string;
  checkerType: string;
  recommendedPackage: string;
};

const subscribe = () => () => undefined;
const serverSnapshot = () => null;
const browserSnapshot = () => {
  const submissionId = new URLSearchParams(window.location.search).get("rid");
  if (!submissionId) return null;
  try {
    const raw = sessionStorage.getItem("getsgpr-booking-context");
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<BookingContext>;
    return saved.submissionId === submissionId ? raw : null;
  } catch { return null; }
};

export function GhlCalendar() {
  const id = `${SITE.ghl.calendarId}_1788510358590`;
  const rawContext = useSyncExternalStore(subscribe, browserSnapshot, serverSnapshot);
  const context = useMemo(() => {
    if (!rawContext) return null;
    try {
      const saved = JSON.parse(rawContext) as Partial<BookingContext>;
      return typeof saved.email === "string" && typeof saved.checkerType === "string" && typeof saved.recommendedPackage === "string"
        ? saved as BookingContext
        : null;
    } catch { return null; }
  }, [rawContext]);

  return (
    <>
      {context && (
        <div className="mb-4 rounded-[16px] border border-blue-100 bg-paper px-5 py-4 text-center">
          <p className="text-[14px] font-semibold text-navy-900">Your {context.checkerType.toLowerCase()} result will be available for this call.</p>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-500">Please book with <strong>{context.email}</strong> so the appointment connects to your result and recommended {context.recommendedPackage} support.</p>
        </div>
      )}
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
