import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
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
  title: {
    default: "Haritachala Organics - Artisanal Organic Foods from California & India",
    template: "%s | Haritachala Organics"
  },
  description: "Discover handcrafted organic foods from Haritachala Organics. We offer artisanal baked goods, preserves, and organic products made with care in California and India.",
  keywords: ["organic food", "artisanal bakery", "handcrafted preserves", "organic products", "California bakery", "sustainable food", "organic jams", "artisan bread", "organic biscotti", "healthy snacks"],
  authors: [{ name: "Haritachala Organics" }],
  creator: "Haritachala Organics",
  publisher: "Haritachala Organics",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://haritachala.com'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Haritachala Organics",
    title: "Haritachala Organics - Artisanal Organic Foods",
    description: "Discover handcrafted organic foods from Haritachala Organics. We offer artisanal baked goods, preserves, and organic products made with care in California and India.",
    images: [
      {
        url: "/images/pages/home/homepage.herosection.img.png",
        width: 1200,
        height: 630,
        alt: "Haritachala Organics - Handcrafted Organic Foods",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haritachala Organics - Artisanal Organic Foods",
    description: "Discover handcrafted organic foods from Haritachala Organics. We offer artisanal baked goods, preserves, and organic products made with care.",
    images: ["/images/pages/home/homepage.herosection.img.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
