"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ScrollButton from '@/components/ScrollButton';

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

interface ProductGridProps {
  products: OrganicProduct[];
}

function getImagePath(imagePath?: string) {
  if (!imagePath) return '/images/organics_products/hibiscus.png';
  return imagePath.replace('/images/organic_products/', '/images/organics_products/');
}

export default function ProductGrid({ products }: ProductGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [products.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      const newScrollLeft =
        direction === 'left'
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="w-full pb-12 md:pb-16 lg:pb-20 pt-0" style={{ backgroundColor: 'var(--background-purple)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8 md:mb-12">
          <h2 className="afacad-regular text-3xl md:text-4xl lg:text-5xl uppercase mb-4 text-center" style={{ color: 'var(--foreground-white)' }}>
            Products Available in India
          </h2>
          <p className="alegreya-italic text-lg md:text-xl lg:text-2xl text-center" style={{ color: 'var(--foreground-white)' }}>
            Organically Grown, Sun-dried, and, Handpicked with Love
          </p>
        </div>

        <div className="relative">
          {showLeftButton && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20">
              <ScrollButton direction="left" onClick={() => scroll('left')} />
            </div>
          )}

          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onScroll={checkScroll}
            className={`flex gap-6 overflow-x-auto scrollbar-hide px-4 py-8 ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {products.map((product) => (
              <article
                key={product.name}
                className="flex-shrink-0 w-[300px] sm:w-[340px] md:w-[360px] bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-white/30 overflow-hidden"
              >
                <div className="relative w-full h-64 md:h-72 p-3 bg-white">
                  <Image
                    src={getImagePath(product.image)}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 300px, (max-width: 768px) 340px, 360px"
                    className="object-contain p-2"
                  />
                </div>

                <div className="p-5 md:p-6 text-center">
                  {product.variants && product.variants.length > 0 && (
                    <div className="flex justify-center flex-wrap gap-2 mb-4">
                      {product.variants.map((variant) => (
                        <span
                          key={`${product.name}-${variant.weight}`}
                          className="rubik-regular text-sm md:text-base px-4 py-1.5 rounded-full"
                          style={{
                            backgroundColor: 'var(--background-purple)',
                            color: 'var(--foreground-white)',
                          }}
                        >
                          {variant.weight}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3
                    className="afacad-regular text-2xl md:text-3xl leading-tight mb-3"
                    style={{ color: 'var(--foreground-purple)' }}
                  >
                    {product.name}
                  </h3>

                  {product.tamil && (
                    <p className="rubik-light text-sm md:text-base mb-1" style={{ color: 'var(--foreground-purple)' }}>
                      {product.tamil}
                    </p>
                  )}

                  {product.telugu && (
                    <p className="rubik-light text-sm md:text-base mb-3" style={{ color: 'var(--foreground-purple)' }}>
                      {product.telugu}
                    </p>
                  )}

                  {product.ingredients && (
                    <p className="rubik-light text-sm md:text-base" style={{ color: 'var(--foreground-purple)' }}>
                      {product.ingredients}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>

          {showRightButton && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20">
              <ScrollButton direction="right" onClick={() => scroll('right')} />
            </div>
          )}

          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}