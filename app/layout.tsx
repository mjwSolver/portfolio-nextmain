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
    default: "Marcell Jeremy Wiradinata | Data Scientist & Software Engineer",
    template: "%s | Marcell Jeremy Wiradinata",
  },
  description,
  authors: [{ name: "Marcell Jeremy Wiradinata", url: "https://github.com/mjwSolver" }],
  creator: "Marcell Jeremy Wiradinata",
  keywords: [
    "Marcell Jeremy Wiradinata",
    "Data Scientist",
    "Software Engineer",
    "Snowflake",
    "Databricks",
    "Machine Learning",
    "Computer Vision",
    "Next.js",
    "Swift",
    "Metrodata",
    "Indonesia Data Scientist",
  ],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "./",
    title: "Marcell Jeremy Wiradinata | Data Scientist & Software Engineer",
    description,
    siteName: "Marcell Jeremy Wiradinata Portfolio",
    images: [
      {
        url: "/assets/portfolio-preview.png",
        width: 1200,
        height: 630,
        alt: "Marcell Jeremy Wiradinata - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcell Jeremy Wiradinata | Data Scientist & Software Engineer",
    description,
    images: ["/assets/portfolio-preview.png"],
    creator: "@marcelljw",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f7fa",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Marcell Jeremy Wiradinata",
      jobTitle: "Data Scientist & Software Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Metrodata",
      },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Universitas Ciputra",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "Dongseo University",
        },
      ],
      description,
      sameAs: [
        "https://www.linkedin.com/in/marcell-jeremy-wiradinata-id",
        "https://github.com/mjwSolver",
      ],
      knowsAbout: [
        "Data Science",
        "Machine Learning",
        "Deep Learning",
        "Computer Vision",
        "Snowflake",
        "Databricks",
        "Next.js",
        "Software Engineering",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <GridBackground />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
