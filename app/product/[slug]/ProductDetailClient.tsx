'use client';

import Image from 'next/image';
import SlideUp from '@/components/animations/SlideUp';
import ScaleIn from '@/components/animations/ScaleIn';
import FadeIn from '@/components/animations/FadeIn';
import Stagger from '@/components/animations/Stagger';
import StaggerItem from '@/components/animations/StaggerItem';

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

interface ProductDetailClientProps {
  product: Product;
  bgColor: string;
  textColor: string;
  buttonColor: string;
}

export default function ProductDetailClient({ product, bgColor, textColor, buttonColor }: ProductDetailClientProps) {
  // Helper function to format field names for display
  const formatFieldName = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Fields to exclude from dynamic rendering
  const excludedFields = ['name', 'available', 'tagline', 'images', 'variants', 'description'];

  // Get all additional product fields dynamically
  const additionalFields = Object.entries(product).filter(
    ([key]) => !excludedFields.includes(key)
  );

  return (
    <>
      {/* Hero Section with Image Background */}
      <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={product.images && product.images.length > 0 && product.images[0] ? product.images[0] : 'https://placehold.co/1920x1080/FFDCDC/C4735A?text=Haritachala+Organics'}
            alt={product.name}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {/* Gradient Overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/40"></div>
        </div>

        {/* White Gradient Overlay for NavBar */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none"></div>

        {/* Hero Text with decorative elements */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <FadeIn delay={0.3}>
            <h1 className="alegreya-regular text-4xl md:text-5xl lg:text-6xl text-white text-center tracking-wide" style={{ textShadow: '2px 4px 12px rgba(0,0,0,0.5)' }}>
              Homemade with Love
            </h1>
          </FadeIn>
        </div>

        {/* Curved Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 80L1440 80L1440 0C1440 0 1080 80 720 80C360 80 0 0 0 0L0 80Z" style={{ fill: bgColor }} />
          </svg>
        </div>
      </section>

      {/* Product Card Section */}
      <section className="py-12 md:py-16 lg:py-20 -mt-2" style={{ backgroundColor: bgColor }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Product Card */}
          <ScaleIn delay={0.2}>
            <div 
              className="rounded-3xl shadow-2xl overflow-hidden bg-white"
            >
              {/* Card Content Grid */}
              <div className="grid md:grid-cols-2 gap-0">
                
                {/* Left Side - Product Image */}
                <div className="relative aspect-square md:aspect-auto">
                  <Image
                    src={product.images && product.images.length > 0 && product.images[0] ? product.images[0] : 'https://placehold.co/600x600/FFDCDC/C4735A?text=Haritachala+Organics'}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Right Side - Product Info */}
                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <Stagger staggerDelay={0.1}>
                    
                    {/* Product Title */}
                    <StaggerItem>
                      <h2 
                        className="alegreya-regular text-3xl md:text-4xl lg:text-5xl mb-4 text-center sm:text-center md:text-center lg:text-left"
                        style={{ color: textColor }}
                      >
                        {product.name}
                      </h2>
                    </StaggerItem>

                    {/* Tagline */}
                    {product.tagline && (
                      <StaggerItem>
                        <p 
                          className="rubik-light-italic text-lg md:text-xl mb-6 text-center sm:text-center md:text-center lg:text-left"
                          style={{ color: textColor }}
                        >
                          "{product.tagline}"
                        </p>
                      </StaggerItem>
                    )}

                    {/* Divider */}
                    <StaggerItem>
                      <div 
                        className="w-24 h-1 mb-6"
                        style={{ backgroundColor: textColor, opacity: 0.3 }}
                      ></div>
                    </StaggerItem>

                    {/* Price */}
                    {product.variants && product.variants.length > 0 && (
                      <StaggerItem>
                        <div className="mb-6 text-center sm:text-center md:text-center lg:text-left">
                          {product.variants.map((variant, index) => (
                            <div key={index} className="mb-2">
                              <p 
                                className="afacad-regular text-3xl md:text-4xl"
                                style={{ color: textColor }}
                              >
                                {variant.price}
                              </p>
                              <p 
                                className="afacad-light text-base md:text-lg opacity-80"
                                style={{ color: textColor }}
                              >
                                per {variant.size}
                                {variant.note && ` (${variant.note})`}
                              </p>
                            </div>
                          ))}
                        </div>
                      </StaggerItem>
                    )}

                    {/* Available In */}
                    {product.available && (
                      <StaggerItem>
                        <div className="mb-6">
                          <p 
                            className="rubik-regular text-sm uppercase tracking-wider mb-2 opacity-70"
                            style={{ color: textColor }}
                          >
                            Available In
                          </p>
                          <p 
                            className="rubik-light text-base md:text-lg"
                            style={{ color: textColor }}
                          >
                            {product.available.join(', ')}
                          </p>
                        </div>
                      </StaggerItem>
                    )}

                    {/* Description */}
                    {product.description && (
                      <StaggerItem>
                        <p 
                          className="rubik-light text-base md:text-lg leading-relaxed"
                          style={{ color: textColor }}
                        >
                          {product.description}
                        </p>
                      </StaggerItem>
                    )}

                  </Stagger>
                </div>
              </div>
            </div>
          </ScaleIn>

          {/* Additional Product Details Cards */}
          {additionalFields.length > 0 && (
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              {additionalFields.map(([key, value], index) => {
                if (!value || (Array.isArray(value) && value.length === 0)) return null;
                
                return (
                  <FadeIn key={key} delay={0.6 + index * 0.1}>
                    <div 
                      className="rounded-2xl shadow-lg p-6 md:p-8 h-full bg-white"
                    >
                      <h3 
                        className="afacad-medium text-lg md:text-xl uppercase tracking-wider mb-4"
                        style={{ color: textColor }}
                      >
                        {formatFieldName(key)}
                      </h3>
                      
                      {Array.isArray(value) ? (
                        <ul className="space-y-2">
                          {value.map((item, i) => (
                            <li 
                              key={i}
                              className="rubik-light text-sm md:text-base leading-relaxed flex items-start"
                              style={{ color: textColor }}
                            >
                              <span className="mr-2 opacity-50">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p 
                          className="rubik-light text-sm md:text-base leading-relaxed"
                          style={{ color: textColor }}
                        >
                          {String(value)}
                        </p>
                      )}
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
