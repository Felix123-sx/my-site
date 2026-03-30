import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import RoseLogo from "@/components/marketing/rose-logo";

export const metadata: Metadata = {
  metadataBase: new URL("https://my-site-woad-omega.vercel.app"),
  title: {
    default: "Northstar Supply | Thoughtful wellness essentials",
    template: "%s | Northstar Supply",
  },
  description:
    "A modern wellness shop focused on discreet delivery, curated products, and clear guidance for first-time and returning buyers.",
  openGraph: {
    title: "Northstar Supply | Thoughtful wellness essentials",
    description:
      "Shop intimate wellness essentials with discreet delivery, curated recommendations, and a calmer buying experience.",
    url: "https://my-site-woad-omega.vercel.app",
    siteName: "Northstar Supply",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Northstar Supply | Thoughtful wellness essentials",
    description:
      "Shop intimate wellness essentials with discreet delivery, curated recommendations, and a calmer buying experience.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="top-banner">Discreet delivery. Curated essentials. Clear guidance.</div>
        <header className="site-header">
          <div className="shell header-inner">
            <Link href="/" className="brand">
              <span className="site-brand-lockup">
                <span className="site-brand-icon" aria-hidden="true">
                  <RoseLogo size={26} />
                </span>
                <span>Northstar Supply</span>
              </span>
            </Link>
            <nav className="nav">
              <Link href="/#shop">Shop</Link>
              <Link href="/#why-us">Why us</Link>
              <Link href="/#faq">FAQ</Link>
              <Link href="/admin">Admin</Link>
              <Link href="/cart">Cart</Link>
            </nav>
          </div>
        </header>
        <main className="shell page">{children}</main>
      </body>
    </html>
  );
}
