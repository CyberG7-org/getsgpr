"use client";
import Script from "next/script";
import { SITE } from "@/content/site";

export function ChatWidget() {
  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id={SITE.ghl.chatWidgetId}
      strategy="afterInteractive"
    />
  );
}
