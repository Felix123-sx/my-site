"use client";

import dynamic from "next/dynamic";

const LuxurySplash = dynamic(
  () => import("@/components/marketing/luxury-splash").then((module) => module.LuxurySplash),
  { ssr: false }
);

export function LuxurySplashEntry() {
  return <LuxurySplash />;
}
