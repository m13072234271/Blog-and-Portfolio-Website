import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import DynamicTitle from "@/components/DynamicTitle";
import { BackgroundProvider } from "@/contexts/background";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Liang Junye's blog and portfolio website",
  description: "Liang Junye's blog and portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const bgDir = path.join(process.cwd(), "public/backgrounds");
  const images = fs.existsSync(bgDir)
    ? fs.readdirSync(bgDir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
    : [];

  return (
    <html lang="zh-CN" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="overflow-hidden">
        <DynamicTitle />
        <BackgroundProvider images={images}>
          {children}
        </BackgroundProvider>
      </body>
    </html>
  );
}
