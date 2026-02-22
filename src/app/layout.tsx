import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "LetterMetrics - Newsletter Analytics That Actually Make Sense",
  description: "Stop flying blind. The analytics dashboard built strictly for newsletter creators, replacing GA4 with insights you can actually use.",
  keywords: ["newsletter analytics", "substack analytics", "beehiiv analytics", "ghost analytics", "newsletter metrics", "email analytics"],
  authors: [{ name: "Yaksh" }],
  openGraph: {
    title: "LetterMetrics - Newsletter Analytics That Actually Make Sense",
    description: "The analytics dashboard built strictly for newsletter creators. Cross-platform insights, sponsor-ready reports, and engagement scoring.",
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
      <body className={`${inter.variable} ${sourceSerif.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
