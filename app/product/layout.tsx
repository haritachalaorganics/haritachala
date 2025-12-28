import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu - Organic Bakery Products & Preserves",
  description: "Explore our full menu of handcrafted organic products. Browse artisanal breads, biscotti, organic jams, preserves, and specialty items available in the US and India.",
  keywords: ["organic menu", "artisanal bakery products", "organic bread", "handmade preserves", "organic jams", "biscotti", "spelt bread", "organic bakery menu", "artisan food products"],
  openGraph: {
    title: "Menu - Haritachala Organics Product Catalog",
    description: "Explore our full menu of handcrafted organic products. Browse artisanal breads, biscotti, organic jams, preserves, and specialty items.",
    type: "website",
    url: "/product",
    images: [
      {
        url: "/images/pages/menu/menu.herosection.img.png",
        width: 1200,
        height: 630,
        alt: "Haritachala Organics Product Menu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Menu - Haritachala Organics Product Catalog",
    description: "Explore our full menu of handcrafted organic products. Browse artisanal breads, biscotti, organic jams, preserves, and specialty items.",
    images: ["/images/pages/menu/menu.herosection.img.png"],
  },
  alternates: {
    canonical: "/product",
  },
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
