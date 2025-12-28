import NavBar from '@/components/NavBar';
import OrderHeroSection from './OrderHeroSection';
import OrderFormSection from './OrderFormSection';
import OrderProductsSection from './OrderProductsSection';
import ContactUs from '@/components/ContactUs';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order - Buy Organic Artisanal Foods",
  description: "Order handcrafted organic foods from Haritachala Organics. Browse our selection of artisanal baked goods, preserves, and organic products. Available in California and India.",
  keywords: ["order organic food", "buy artisanal bakery", "organic products online", "handcrafted food order", "organic jams purchase", "artisan bread order", "California organic bakery"],
  openGraph: {
    title: "Order Organic Artisanal Foods - Haritachala Organics",
    description: "Order handcrafted organic foods from Haritachala Organics. Browse our selection of artisanal baked goods, preserves, and organic products.",
    type: "website",
    url: "/order",
    images: [
      {
        url: "/images/pages/our_products/ourProducts.contactUs.png",
        width: 1200,
        height: 630,
        alt: "Order from Haritachala Organics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Order Organic Artisanal Foods - Haritachala Organics",
    description: "Order handcrafted organic foods from Haritachala Organics. Browse our selection of artisanal baked goods, preserves, and organic products.",
    images: ["/images/pages/our_products/ourProducts.contactUs.png"],
  },
  alternates: {
    canonical: "/order",
  },
};

export default function OrderPage() {
  return (
    <div className="relative">
      {/* NavBar positioned absolutely over hero section */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <NavBar />
      </div>
      
      {/* Hero Section */}
      <OrderHeroSection />
      
      {/* Order Form Section */}
      <OrderFormSection />
      
      {/* Products Carousel Section */}
      <OrderProductsSection />
      
      {/* Contact Us Section */}
      <ContactUs bottomImage="/images/pages/our_products/ourProducts.contactUs.png" />
    </div>
  );
}
