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
  const excludedFields = ['name', 'available', 'availableThisMonth', 'tagline', 'images', 'variants', 'description'];

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
            src="/images/pages/our_products/productDetail.heroSection.JPG"
            alt="Our Products"
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
                        className="afacad-medium text-base md:text-lg uppercase tracking-wider mb-5 pb-2 border-b-2"
                        style={{ color: textColor, borderColor: `${textColor}20` }}
                      >
                        {formatFieldName(key)}
                      </h3>
                      
                      {Array.isArray(value) ? (
                        // Render ingredients and guidelines as comma-separated text
                        key === 'ingredients' || key === 'guidelines' ? (
                          <p 
                            className="rubik-light text-sm md:text-base leading-7"
                            style={{ color: textColor, opacity: 0.85 }}
                          >
                            {value.join(', ')}
                          </p>
                        ) : (
                          // Render other arrays as bullet lists
                          <ul className="space-y-3">
                            {value.map((item, i) => (
                              <li 
                                key={i}
                                className="rubik-light text-sm md:text-base leading-7 flex items-start"
                                style={{ color: textColor, opacity: 0.85 }}
                              >
                                <span className="mr-3 mt-2 opacity-40">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )
                      ) : (
                        <div 
                          className="rubik-light text-sm md:text-base leading-7 space-y-4"
                          style={{ color: textColor, opacity: 0.85 }}
                        >
                          {String(value).split('\n\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
                        </div>
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
