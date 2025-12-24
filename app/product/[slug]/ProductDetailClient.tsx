'use client';

import { useState } from 'react';
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
  flyer?: string;
}

interface ProductDetailClientProps {
  product: Product;
  bgColor: string;
  textColor: string;
  buttonColor: string;
}

export default function ProductDetailClient({ product, bgColor, textColor, buttonColor }: ProductDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Helper function to format field names for display
  const formatFieldName = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Fields to exclude from dynamic rendering
  const excludedFields = ['name', 'available', 'availableThisMonth', 'tagline', 'images', 'variants', 'description', 'flyer'];

  // Get all additional product fields dynamically
  const additionalFields = Object.entries(product).filter(
    ([key]) => !excludedFields.includes(key)
  );

  // Carousel navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

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
                
                {/* Left Side - Product Image Carousel */}
                <div className="relative aspect-square md:aspect-auto">
                  <Image
                    src={product.images && product.images.length > 0 && product.images[currentImageIndex] ? product.images[currentImageIndex] : 'https://placehold.co/600x600/FFDCDC/C4735A?text=Haritachala+Organics'}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  
                  {/* Carousel Controls - Only show if more than 1 image */}
                  {product.images && product.images.length > 1 && (
                    <>
                      {/* Previous Button */}
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10"
                        aria-label="Previous image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                      </button>
                      
                      {/* Next Button */}
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10"
                        aria-label="Next image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                      
                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {product.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                              index === currentImageIndex
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
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
                        className="w-24 h-1 mb-6 mx-auto lg:mx-0"
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
                        <div className="mb-6 text-center lg:text-left">
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
                          className="rubik-light text-base md:text-lg leading-relaxed text-center lg:text-left"
                          style={{ color: textColor }}
                        >
                          {product.description}
                        </p>
                      </StaggerItem>
                    )}

                    {/* Flyer Button */}
                    {product.flyer && (
                      <StaggerItem>
                        <div className="mt-6 flex justify-center lg:justify-start">
                          <a
                            href={product.flyer}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 border-2 rounded-lg rubik-regular text-sm md:text-base uppercase tracking-wide hover:opacity-80 hover:scale-105 transition-all duration-300"
                            style={{ 
                              borderColor: buttonColor, 
                              color: buttonColor 
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            View Product Flyer
                          </a>
                        </div>
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
                          // Check if array contains objects (like essential_nutrients)
                          value.length > 0 && typeof value[0] === 'object' && value[0] !== null ? (
                            <div className="space-y-4">
                              {value.map((item, i) => (
                                <div key={i} className="space-y-1">
                                  <p 
                                    className="rubik-medium text-sm md:text-base"
                                    style={{ color: textColor, opacity: 0.9 }}
                                  >
                                    {item.ingredient}
                                  </p>
                                  <p 
                                    className="rubik-light text-sm md:text-base leading-7"
                                    style={{ color: textColor, opacity: 0.75 }}
                                  >
                                    {item.benefits}
                                  </p>
                                </div>
                              ))}
                            </div>
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
                                  <span>{String(item)}</span>
                                </li>
                              ))}
                            </ul>
                          )
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
