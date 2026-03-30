import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import RoseLogo from "@/components/marketing/rose-logo";

export const metadata: Metadata = {
  metadataBase: new URL("https://my-site-woad-omega.vercel.app"),
  title: {
    default: "Peekplay | Private pleasure, thoughtfully presented",
    template: "%s | Peekplay",
  },
  description:
    "Peekplay is a private pleasure brand focused on discreet delivery, curated essentials, and a more refined shopping experience.",
  openGraph: {
    title: "Peekplay | Private pleasure, thoughtfully presented",
    description:
      "Shop private pleasure essentials with discreet delivery, curated recommendations, and a calmer luxury experience.",
    url: "https://my-site-woad-omega.vercel.app",
    siteName: "Peekplay",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peekplay | Private pleasure, thoughtfully presented",
    description:
      "Shop private pleasure essentials with discreet delivery, curated recommendations, and a calmer luxury experience.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="top-banner">Private pleasure, thoughtfully presented.</div>
        <header className="site-header">
          <div className="shell header-inner">
            <Link href="/" className="brand">
              <span className="site-brand-lockup">
                <span className="site-brand-icon" aria-hidden="true">
                  <RoseLogo size={26} />
                </span>
                <span className="brand-wordmark">Peekplay</span>
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
