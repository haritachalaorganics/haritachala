import type { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import IndiaHeroSection from './IndiaHeroSection';
import IndiaProductsSection from './IndiaProductsSection';
import ContactUs from '@/components/ContactUs';
import organicsProducts from '@/data/organics_products.json';

interface ProductVariant {
  weight: string;
  price: number;
}

interface OrganicProduct {
  name: string;
  tamil?: string;
  telugu?: string;
  variants?: ProductVariant[];
  ingredients?: string;
  image?: string;
}

export const metadata: Metadata = {
  title: 'India Organic Products',
  description:
    'Browse Haritachala Organics products available in India, including dried flowers and natural offerings crafted with care.',
  keywords: [
    'Haritachala Organics India',
    'organic products India',
    'Tiruvannamalai organic products',
    'dried flowers India',
    'organic hibiscus',
    'organic butterfly pea',
  ],
  openGraph: {
    title: 'Haritachala Organics India',
    description:
      'Explore products available in India from Haritachala Organics and connect with us in Tiruvannamalai.',
    type: 'website',
    url: '/india',
    images: [
      {
        url: '/images/organics_products/hibiscus.png',
        width: 1200,
        height: 630,
        alt: 'Haritachala Organics India Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haritachala Organics India',
    description:
      'Explore products available in India from Haritachala Organics and connect with us in Tiruvannamalai.',
    images: ['/images/organics_products/hibiscus.png'],
  },
  alternates: {
    canonical: '/india',
  },
};

export default function IndiaPage() {
  const products = organicsProducts.products as OrganicProduct[];

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 z-30">
        <NavBar />
      </div>

      <IndiaHeroSection />
      <IndiaProductsSection products={products} />
      <ContactUs
        bottomImage="/images/pages/faq/faq.contactUs.namaste.png"
        locationTitle="India"
        address="Sri Sainathuni Dhyana Mandiram, Girivalam Rd, Tiruvannamalai, Tamil Nadu"
        phoneNumber="+91 93200 97980"
        socialPhoneHref="tel:+919320097980"
      />
    </div>
  );
}