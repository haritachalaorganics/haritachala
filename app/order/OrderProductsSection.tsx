'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import productsData from '@/data/products.json';
import SlideUp from '@/components/animations/SlideUp';
import FadeIn from '@/components/animations/FadeIn';

interface Product {
  name: string;
  available: string[];
  tagline?: string;
  description?: string;
  images: string[];
  variants?: Array<{
    size: string;
    price: string;
  }>;
  ingredients?: string[];
}

export default function OrderProductsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Filter US products with images
  const usProducts = (productsData.products as Product[]).filter(
    (product) =>
      (product.available.includes('US') || product.available.includes('Both')) &&
      product.images &&
      product.images.length > 0
  );

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % usProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + usProducts.length) % usProducts.length);
  };

  if (usProducts.length === 0) {
    return null;
  }

  const currentProduct = usProducts[currentIndex];

  return (
    <section 
      className="py-16 md:py-24"
      style={{ backgroundColor: 'var(--background-pink)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp>
          <h2 
            className="afacad-regular text-3xl md:text-4xl text-center mb-12 uppercase text-center sm:text-center md:text-center"
            style={{ color: 'var(--foreground-pink)' }}
          >
            Browse Our Products
          </h2>
        </SlideUp>

        <FadeIn delay={0.2}>
          <div className="relative">
            {/* Main Product Card */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                {/* Product Image */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={currentProduct.images[0] || 'https://placehold.co/400x400/png'}
                    alt={currentProduct.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/400x400/png';
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-center space-y-6">
                  <div>
                    <h3 
                      className="afacad-regular text-2xl md:text-3xl mb-2"
                      style={{ color: 'var(--foreground-pink)' }}
                    >
                      {currentProduct.name}
                    </h3>
                    {currentProduct.tagline && (
                      <p 
                        className="rubik-light text-base md:text-lg italic"
                        style={{ color: 'var(--foreground-pink)' }}
                      >
                        {currentProduct.tagline}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  {currentProduct.variants && currentProduct.variants.length > 0 && (
                    <div className="space-y-2">
                      {currentProduct.variants.map((variant, idx) => (
                        <div key={idx}>
                          <p 
                            className="afacad-medium text-xl md:text-2xl"
                            style={{ color: 'var(--foreground-pink)' }}
                          >
                            {variant.price}
                          </p>
                          <p 
                            className="rubik-light text-sm md:text-base"
                            style={{ color: 'var(--foreground-pink)' }}
                          >
                            per {variant.size}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  {currentProduct.description && (
                    <div>
                      <h4 
                        className="afacad-medium text-sm uppercase tracking-wider mb-2"
                        style={{ color: 'var(--foreground-pink)' }}
                      >
                        Description
                      </h4>
                      <p 
                        className="rubik-light text-sm md:text-base leading-relaxed"
                        style={{ color: 'var(--foreground-pink)' }}
                      >
                        {currentProduct.description}
                      </p>
                    </div>
                  )}

                  {/* Ingredients */}
                  {currentProduct.ingredients && currentProduct.ingredients.length > 0 && (
                    <div>
                      <h4 
                        className="afacad-medium text-sm uppercase tracking-wider mb-2"
                        style={{ color: 'var(--foreground-pink)' }}
                      >
                        Ingredients
                      </h4>
                      <p 
                        className="rubik-light text-sm md:text-base leading-relaxed"
                        style={{ color: 'var(--foreground-pink)' }}
                      >
                        {currentProduct.ingredients.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            {usProducts.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full p-3 shadow-lg hover:scale-110 transition-transform z-10 text-white"
                  style={{ backgroundColor: 'var(--foreground-pink)' }}
                  aria-label="Previous product"
                >
                  <IoChevronBack size={28} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full p-3 shadow-lg hover:scale-110 transition-transform z-10 text-white"
                  style={{ backgroundColor: 'var(--foreground-pink)' }}
                  aria-label="Next product"
                >
                  <IoChevronForward size={28} />
                </button>
              </>
            )}
          </div>
        </FadeIn>

        {/* Carousel Indicators */}
        {usProducts.length > 1 && (
          <FadeIn delay={0.4}>
            <div className="flex justify-center gap-2 mt-8">
              {usProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'bg-[var(--foreground-pink)] w-8'
                      : 'bg-[var(--foreground-pink)] opacity-30'
                  }`}
                  aria-label={`Go to product ${idx + 1}`}
                />
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
