import Image from 'next/image';
import NavBar from '@/components/NavBar';
import ContactUs from '@/components/ContactUs';
import productsData from '@/data/products.json';
import { notFound } from 'next/navigation';

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
      {/* Hero Section with curved overlay */}
      <section 
        className="relative w-full pt-32 pb-24 md:pt-36 md:pb-32 lg:pt-40 lg:pb-40"
        style={{ backgroundColor: bgColor }}
      >
        {/* White Gradient Overlay for NavBar */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none"></div>

        {/* NavBar */}
        <div className="absolute top-0 left-0 right-0 z-30">
          <NavBar />
        </div>

        {/* Curved Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L1440 120L1440 0C1440 0 1080 120 720 120C360 120 0 0 0 0L0 120Z" fill="var(--background-purple)"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 
              className="alegreya-regular text-3xl md:text-4xl lg:text-5xl mb-3"
              style={{ color: textColor }}
            >
              {product.name}
            </h1>
            {product.tagline && (
              <p 
                className="rubik-light text-base md:text-lg mb-3"
                style={{ color: textColor }}
              >
                {product.tagline}
              </p>
            )}
            {product.available && (
              <p 
                className="rubik-light text-sm md:text-base uppercase tracking-wider"
                style={{ color: textColor }}
              >
                Available in: {product.available.join(', ')}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Product Content */}
      <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: 'var(--background-purple)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 lg:p-16">
            
            {/* Product Image */}
            <div className="relative w-full max-w-md mx-auto aspect-square mb-10 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.images && product.images.length > 0 && product.images[0] ? product.images[0] : 'https://placehold.co/400x400/FFDCDC/C4735A?text=Haritachala+Organics'}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Price Section */}
            {product.variants && product.variants.length > 0 && (
              <div className="text-center mb-10">
                {product.variants.map((variant, index) => (
                  <div key={index} className="mb-3">
                    <p 
                      className="afacad-regular text-2xl md:text-3xl mb-1"
                      style={{ color: 'var(--foreground-purple)' }}
                    >
                      {variant.price}
                    </p>
                    <p 
                      className="afacad-light text-base md:text-lg"
                      style={{ color: 'var(--foreground-purple)' }}
                    >
                      per {variant.size}
                      {variant.note && ` (${variant.note})`}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="mb-10">
                <h2 
                  className="afacad-medium text-sm md:text-base uppercase tracking-wider mb-4"
                  style={{ color: 'var(--foreground-purple)' }}
                >
                  Description
                </h2>
                <p 
                  className="afacad-light text-base md:text-lg leading-relaxed"
                  style={{ color: 'var(--foreground-purple)' }}
                >
                  {product.description}
                </p>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mb-10">
                <h2 
                  className="afacad-medium text-sm md:text-base uppercase tracking-wider mb-4"
                  style={{ color: 'var(--foreground-purple)' }}
                >
                  Ingredients
                </h2>
                <p 
                  className="afacad-light text-base md:text-lg leading-relaxed"
                  style={{ color: 'var(--foreground-purple)' }}
                >
                  {product.ingredients.join(', ')}
                </p>
              </div>
            )}

            {/* Spelt Info */}
            {product.speltInfo && (
              <div className="mb-10">
                <h2 
                  className="afacad-medium text-sm md:text-base uppercase tracking-wider mb-4"
                  style={{ color: 'var(--foreground-purple)' }}
                >
                  Spelt Info
                </h2>
                <p 
                  className="afacad-light text-base md:text-lg leading-relaxed"
                  style={{ color: 'var(--foreground-purple)' }}
                >
                  {product.speltInfo}
                </p>
              </div>
            )}

            {/* Preparation */}
            {product.preparation && (
              <div className="mb-10">
                <h2 
                  className="afacad-medium text-sm md:text-base uppercase tracking-wider mb-4"
                  style={{ color: 'var(--foreground-purple)' }}
                >
                  Preparation
                </h2>
                <p 
                  className="afacad-light text-base md:text-lg leading-relaxed"
                  style={{ color: 'var(--foreground-purple)' }}
                >
                  {product.preparation}
                </p>
              </div>
            )}

            {/* Guidelines */}
            {product.guidelines && product.guidelines.length > 0 && (
              <div>
                <h2 
                  className="afacad-medium text-sm md:text-base uppercase tracking-wider mb-4"
                  style={{ color: 'var(--foreground-purple)' }}
                >
                  Guidelines
                </h2>
                <p 
                  className="afacad-light text-base md:text-lg leading-relaxed"
                  style={{ color: 'var(--foreground-purple)' }}
                >
                  {product.guidelines.join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <ContactUs bottomImage="/images/pages/our_products/ourProducts.contactUs.png" />
    </div>
  );
}
