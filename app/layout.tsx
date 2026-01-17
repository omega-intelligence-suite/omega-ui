import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { colors } from "@/config";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

export const viewport: Viewport = {
  themeColor: '#000000', // Ta couleur de bandeau
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover', // Pour supprimer les bordures blanches sur iPhone
}

export const metadata: Metadata = {
  title: "Omega Intelligence",
  description: "",
  icons: {
    apple: '/apple-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Omega Intelligence',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ backgroundColor: colors.background.main }}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
