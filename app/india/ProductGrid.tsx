"use client";

import { useEffect, useRef, useState } from 'react';
import ScrollButton from '@/components/ScrollButton';

interface ProductVariant {
  weight: string;
  price: number;
}

interface OrganicProduct {
  name: string;
  tamil?: string;
  telugu?: string;
  category?: string;
  variants?: ProductVariant[];
  ingredients?: string;
}

interface ProductGridProps {
  groupedProducts: {
    category: string;
    products: OrganicProduct[];
  }[];
}

function getCategoryId(category: string) {
  return `india-category-${category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`;
}

function getWhatsAppLink(productName: string) {
  const phoneNumber = '919320097980';
  const message = `Hello, I am interested in buying ${productName}`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

interface CategoryCarouselProps {
  category: string;
  products: OrganicProduct[];
}

function CategoryCarousel({ category, products }: CategoryCarouselProps) {
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
    <section id={getCategoryId(category)} className="scroll-mt-28 mb-10 md:mb-12 lg:mb-14">
      <div className="mb-5 md:mb-6 text-center">
        <h3
          className="afacad-regular text-2xl md:text-3xl lg:text-4xl uppercase"
          style={{ color: 'var(--foreground-white)' }}
        >
          {category}
        </h3>
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
          className={`flex gap-6 overflow-x-auto scrollbar-hide px-4 py-4 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {products.map((product, productIndex) => (
            <article
              key={`${category}-${product.name}-${productIndex}`}
              className="flex-shrink-0 w-[300px] sm:w-[340px] md:w-[360px] min-h-[360px] bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-white/30 overflow-hidden flex flex-col"
            >
              <div className="p-5 md:p-6 text-center flex flex-col flex-1">
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

                {product.variants && product.variants.length > 0 && (
                  <div className="flex justify-center flex-wrap gap-2 mt-4">
                    {product.variants.map((variant, variantIndex) => (
                      <span
                        key={`${product.name}-${variant.weight}-${variant.price}-${variantIndex}`}
                        className="rubik-regular text-sm md:text-base px-4 py-1.5 rounded-full"
                        style={{
                          backgroundColor: 'var(--background-purple)',
                          color: 'var(--foreground-white)',
                        }}
                      >
                        {variant.weight} • ₹{variant.price}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-5">
                  <a
                    href={getWhatsAppLink(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rubik-bold uppercase tracking-wide text-base md:text-lg px-6 py-3 rounded-lg border-2 transition-all duration-300 hover:opacity-80"
                    style={{
                      borderColor: 'var(--foreground-purple)',
                      color: 'var(--foreground-purple)',
                    }}
                    aria-label={`Buy ${product.name} on WhatsApp`}
                  >
                    Buy Now
                  </a>
                </div>
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
    </section>
  );
}

export default function ProductGrid({ groupedProducts }: ProductGridProps) {
  const scrollToCategory = (category: string) => {
    const section = document.getElementById(getCategoryId(category));
    if (!section) return;

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="w-full pb-12 md:pb-16 lg:pb-20 pt-0" style={{ backgroundColor: 'var(--background-purple)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <div
            className="grid gap-2 md:gap-3 max-w-3xl mx-auto"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            }}
          >
            {groupedProducts.map(({ category }, categoryIndex) => (
              <button
                key={`${category}-${categoryIndex}`}
                type="button"
                onClick={() => scrollToCategory(category)}
                className="rubik-regular text-xs md:text-sm px-3 md:px-4 py-2 rounded-full border transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95 whitespace-nowrap w-full"
                style={{
                  borderColor: 'var(--foreground-white)',
                  color: 'var(--foreground-white)',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {groupedProducts.length === 0 ? (
          <p className="rubik-regular text-center text-base md:text-lg" style={{ color: 'var(--foreground-white)' }}>
            No products found for the current search.
          </p>
        ) : (
          groupedProducts.map(({ category, products }, index) => (
            <div key={`${category}-${index}`}>
              <CategoryCarousel category={category} products={products} />
              {index < groupedProducts.length - 1 && (
                <div className="border-t border-white/60 mb-10 md:mb-12 lg:mb-14" />
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}