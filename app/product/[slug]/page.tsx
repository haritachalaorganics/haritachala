import NavBar from '@/components/NavBar';
import ContactUs from '@/components/ContactUs';
import productsData from '@/data/products.json';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import type { Metadata } from 'next';

interface Product {
  name: string;
  available: string[];
  tagline?: string;
  description?: string;
  images: string[];
  variants?: Array<{
    size: string;
    price: string;
    note?: string;
  }>;
  ingredients?: string[];
  preparation?: string;
  guidelines?: string[];
  speltInfo?: string;
}

// Generate static params for all products
export async function generateStaticParams() {
  return productsData.products.map((product) => ({
    slug: product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  }));
}

// Generate metadata for each product
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  const product = productsData.products.find(
    (p) => p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === resolvedParams.slug
  ) as Product | undefined;

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const availability = product.available.join(', ');
  const description = product.description || product.tagline || `Discover our handcrafted ${product.name} - made with organic ingredients and care.`;
  const productSlug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return {
    title: `${product.name} - Organic Artisanal Product`,
    description: `${description} Available in ${availability}. ${product.ingredients ? 'Made with: ' + product.ingredients.slice(0, 5).join(', ') : ''}`,
    keywords: [
      product.name,
      'organic',
      'artisanal',
      'handcrafted',
      ...(product.ingredients || []).slice(0, 5),
      ...product.available,
    ],
    openGraph: {
      title: `${product.name} - Haritachala Organics`,
      description: description,
      type: 'website',
      url: `/product/${productSlug}`,
      images: product.images.length > 0 ? [
        {
          url: product.images[0],
          width: 1200,
          height: 630,
          alt: `${product.name} - Organic Artisanal Product`,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - Haritachala Organics`,
      description: description,
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
    alternates: {
      canonical: `/product/${productSlug}`,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Find the product by slug
  const product = productsData.products.find(
    (p) => p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === resolvedParams.slug
  ) as Product | undefined;

  if (!product) {
    notFound();
  }

  // Determine background and text colors based on availability
  const getColors = () => {
    if (product.available.includes('US') || product.available.includes('Both')) {
      return {
        bgColor: 'var(--background-pink)',
        textColor: 'var(--foreground-pink)',
        buttonColor: '#C4735A',
      };
    } else if (product.available.includes('India')) {
      return {
        bgColor: 'var(--background-blue)',
        textColor: 'var(--foreground-blue)',
        buttonColor: '#0D4F78',
      };
    } else if (product.available.includes('Full Moon')) {
      return {
        bgColor: 'var(--background-purple)',
        textColor: 'var(--foreground-purple)',
        buttonColor: '#645DAB',
      };
    }
    return {
      bgColor: 'var(--background-pink)',
      textColor: 'var(--foreground-pink)',
      buttonColor: '#C4735A',
    };
  };

  const { bgColor, textColor, buttonColor } = getColors();

  return (
    <div className="relative min-h-screen">
      {/* NavBar */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <NavBar />
      </div>
      
      {/* Product Detail Content */}
      <ProductDetailClient 
        product={product}
        bgColor={bgColor}
        textColor={textColor}
        buttonColor={buttonColor}
      />

      {/* Contact Us Section */}
      <ContactUs bottomImage="/images/pages/our_products/ourProducts.contactUs.png" />
    </div>
  );
}
