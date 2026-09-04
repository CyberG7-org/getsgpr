"use client";

import Script from "next/script";
import { SITE } from "@/content/site";

export function GhlForm({ suffix = "form" }: { suffix?: string }) {
  const id = `inline-${SITE.ghl.formId}-${suffix}`;

  return (
    <>
      <iframe
        src={`https://api.leadconnectorhq.com/widget/form/${SITE.ghl.formId}`}
        id={id}
        title="Contact GetSGPR"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-activation-type="alwaysActivated"
        data-deactivation-type="neverDeactivate"
        data-form-name="Contact Us Form"
        data-height="815"
        data-layout-iframe-id={id}
        data-form-id={SITE.ghl.formId}
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
        style={{ width: "100%", height: 815, border: "none", display: "block" }}
        loading="lazy"
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </>
  );
}
