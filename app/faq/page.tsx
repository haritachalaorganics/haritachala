import NavBar from '@/components/NavBar';
import ContactUs from '@/components/ContactUs';
import FAQHeroSection from './FAQHeroSection';
import FAQAccordion from './FAQAccordion';
import faqData from '@/data/faq.json';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions",
  description: "Find answers to common questions about Haritachala Organics products, ordering, shipping, ingredients, and more. Get all the information you need about our organic artisanal foods.",
  keywords: ["Haritachala FAQ", "organic food questions", "product information", "ordering questions", "shipping info", "organic ingredients", "bakery FAQ"],
  openGraph: {
    title: "FAQ - Haritachala Organics Frequently Asked Questions",
    description: "Find answers to common questions about Haritachala Organics products, ordering, shipping, ingredients, and more.",
    type: "website",
    url: "/faq",
    images: [
      {
        url: "/images/pages/faq/faq.contactUs.namaste.png",
        width: 1200,
        height: 630,
        alt: "Haritachala Organics FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - Haritachala Organics",
    description: "Find answers to common questions about Haritachala Organics products, ordering, shipping, ingredients, and more.",
    images: ["/images/pages/faq/faq.contactUs.namaste.png"],
  },
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  return (
    <div className="relative">
      {/* NavBar positioned absolutely over hero section */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <NavBar />
      </div>
      
      {/* Hero Section */}
      <FAQHeroSection />
      
      {/* FAQ Accordion Section */}
      <FAQAccordion faqs={faqData} />
      
      {/* Contact Us Section */}
      <ContactUs bottomImage="/images/pages/faq/faq.contactUs.namaste.png" imageSize="large" />
    </div>
  );
}
