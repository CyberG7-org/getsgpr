import type { Metadata } from "next";
import { Bricolage_Grotesque, Work_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ActionBar } from "@/components/layout/ActionBar";
import { ChatWidget } from "@/components/widgets/ChatWidget";
import { Reveal } from "@/components/ui/Reveal";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  weight: "variable",
  variable: "--font-bricolage",
  display: "swap",
});
const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://getsgpr.com"),
  title: "GetSGPR",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-SG" className={`${bricolage.variable} ${workSans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "LocalBusiness", name: SITE.name, legalName: SITE.legalName,
          identifier: SITE.uen, url: SITE.url, telephone: SITE.phoneDisplay,
          address: { "@type": "PostalAddress", streetAddress: "18 Boon Lay Way, #04-118, Tradehub 21", postalCode: "609966", addressCountry: "SG" },
          areaServed: "Singapore",
        }) }} />
        <Header />
        <Reveal />
        {children}
        <Footer />
        <ActionBar />
        <ChatWidget />
      </body>
    </html>
  );
}
