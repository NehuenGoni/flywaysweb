import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { montserrat, trajan } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadPopup } from "@/components/contact/LeadPopup";
import { siteConfig } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Córdoba Dove Hunting`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Córdoba Dove Hunting`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Córdoba Dove Hunting`,
    description: siteConfig.description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  areaServed: "Córdoba, Argentina",
  knowsAbout: [
    "Dove hunting",
    "Mixed bag wingshooting",
    "Fly fishing",
    "Big game hunting",
  ],
  award: ["Orvis Endorsed Lodge", "Beretta Trident Lodge"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html
      lang="en"
      className={`${trajan.variable} ${montserrat.variable} h-full antialiased`}
    >
      {/* GA4 / Meta / Ads se configuran dentro de este contenedor GTM.
          Sin NEXT_PUBLIC_GTM_ID el contenedor no se carga. */}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <LeadPopup />
      </body>
    </html>
  );
}
