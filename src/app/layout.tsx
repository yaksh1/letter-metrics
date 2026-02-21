import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LetterMetrics - Newsletter Analytics That Actually Make Sense",
  description: "Stop flying blind. The analytics platform built strictly for newsletter creators. Cross-platform insights, sponsor-ready reports, and engagement scoring that GA4 can't touch.",
  keywords: ["newsletter analytics", "substack analytics", "beehiiv analytics", "ghost analytics", "newsletter metrics", "email analytics"],
  authors: [{ name: "Yaksh" }],
  openGraph: {
    title: "LetterMetrics - Newsletter Analytics That Actually Make Sense",
    description: "The analytics platform built strictly for newsletter creators. Cross-platform insights, sponsor-ready reports, and engagement scoring.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LetterMetrics - Newsletter Analytics That Actually Make Sense",
    description: "Stop flying blind. Built for newsletter creators, not data scientists.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
