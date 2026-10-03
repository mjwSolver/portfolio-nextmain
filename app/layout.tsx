import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import GridBackground from "./components/GridBackground";
import MotionProvider from "./components/MotionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Data scientist and software engineer at Metrodata. Snowflake and Databricks projects, deep learning research and front-end development.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: {
    default: "Marcell Jeremy Wiradinata, data scientist and software engineer",
    template: "%s | Marcell Jeremy Wiradinata",
  },
  description,
  authors: [{ name: "Marcell Jeremy Wiradinata" }],
  keywords: ["Data Scientist", "Software Engineer", "Snowflake", "Databricks", "Machine Learning", "Computer Vision", "Next.js", "Swift"],
  openGraph: {
    type: "website",
    title: "Marcell Jeremy Wiradinata",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f7fa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <GridBackground />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
