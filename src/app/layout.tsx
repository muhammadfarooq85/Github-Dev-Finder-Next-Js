import type { Metadata } from "next";
import Head from "next/head";
import { Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/themeProvider";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "GitHub Dev Finder | Discover Developers Instantly",
  description:
    "Dev Finder is a modern Next.js app to search and view GitHub developer profiles with real-time data. Built using GitHub API, it offers sleek UI and developer stats at a glance.",
  keywords: [
    "GitHub Dev Finder",
    "GitHub profile search",
    "GitHub user finder",
    "Next.js GitHub API",
    "Developer finder app",
    "GitHub users",
    "GitHub stats viewer",
    "React GitHub app",
  ],
  authors: [{ name: "Muhammad Farooq", url: "https://farooqfolio.vercel.app" }],
  openGraph: {
    title: "GitHub Dev Finder",
    description:
      "Easily search and explore GitHub developer profiles using this sleek and responsive Next.js application.",
    url: "https://github-devv-finder.vercel.app",
    siteName: "GitHub Dev Finder",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <body className={`${spaceMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
