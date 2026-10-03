import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import BackgroundDecor from "./components/BackgroundDecor";
import CursorEffect from "./components/CursorEffect";
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

export const metadata: Metadata = {
  title: {
    default: "Marcell Jeremy Wiradinata — Data Scientist & Software Engineer",
    template: "%s · Marcell Jeremy Wiradinata",
  },
  description:
    "Data scientist and software engineer building end-to-end data products: Snowflake & Databricks pipelines, deep learning research, and production front-ends.",
  authors: [{ name: "Marcell Jeremy Wiradinata" }],
  keywords: [
    "Data Scientist",
    "Software Engineer",
    "Snowflake",
    "Databricks",
    "Machine Learning",
    "Computer Vision",
    "Next.js",
    "Swift",
  ],
  openGraph: {
    type: "website",
    title: "Marcell Jeremy Wiradinata — Data Scientist & Software Engineer",
    description:
      "End-to-end data products: from warehouse pipelines to trained models to the interfaces people use.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f9fc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="relative min-h-dvh overflow-x-clip">
        <BackgroundDecor />
        <CursorEffect />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
