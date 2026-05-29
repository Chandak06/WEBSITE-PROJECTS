import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar.tsx";
import { CSPostHogProvider } from "./providers";
import PostHogPageView from "./posthog-pageview";
import { Suspense } from "react";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-Schibsted-Grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-Martian-Mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevEvent",
  description: "The Hub for Every Dev Event you mustn't Miss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased`}>
        <CSPostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <Navbar/>
          <div className="absolute inset-0 top-0 z-[-1] min-h-scree">
            <LightRays
            raysOrigin="top-center-offset"
            raysColor="#5dfeca"
            raysSpeed={0.5}
            lightSpread={0.8}
            rayLength={1.4}
            followMouse={true}
            mouseInfluence={0.02}
            noiseAmount={0}
            distortion={0.01}
          />
          </div>
          {children}
        </CSPostHogProvider>
      </body>
    </html>
  );
}
