import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vertex Tech Team | Engineering Scalable Solutions",
  description: "Inside the Vertex Tech Team: Discover how we build scalable, secure, and smart solutions using cutting-edge technologies and innovative workflows.",
  keywords: ["Software Development", "React", "Next.js", "Engineering Team", "Vertex", "CRM Solutions", "Tech Showcase"],
  authors: [{ name: "Vertex Tech Team" }],
  openGraph: {
    title: "Vertex Tech Team Showcase",
    description: "Explore our technical skills, projects, and innovative workflow.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
