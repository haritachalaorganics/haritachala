"use client";

import { useEffect, useRef, useState } from 'react';
import ScrollButton from '@/components/ScrollButton';

interface ProductVariant {
  weight: string;
  price: number;
}

interface SelectedVariant extends ProductVariant {
  quantity: number;
}

interface OrganicProduct {
  name: string;
  tamil?: string;
  telugu?: string;
  category?: string;
  categories?: string[];
  bestSeller?: boolean;
  stock?: boolean;
  variants?: ProductVariant[];
  ingredients?: string | string[];
  description?: string;
  images?: string[];
}

interface ProductGridProps {
  groupedProducts: {
    category: string;
    products: OrganicProduct[];
  }[];
  onAddToCart: (product: OrganicProduct, selectedVariants: SelectedVariant[]) => void;
}

function getCategoryId(category: string) {
  return `india-category-${category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`;
}

interface CategoryCarouselProps {
  category: string;
  products: OrganicProduct[];
  onAddToCart: (product: OrganicProduct, selectedVariants: SelectedVariant[]) => void;
}

interface ProductCardProps {
  product: OrganicProduct;
  productKey: string;
  isCartEnabled: boolean;
  onAddToCart: (product: OrganicProduct, selectedVariants: SelectedVariant[]) => void;
}

function formatIngredients(ingredients?: string | string[]) {
  if (!ingredients) return '';
  if (Array.isArray(ingredients)) {
    return ingredients.join(', ');
  }
  return ingredients;
}

function ProductCard({ product, productKey, isCartEnabled, onAddToCart }: ProductCardProps) {
  const isInStock = product.stock !== false;
  const [variantQuantities, setVariantQuantities] = useState<number[]>(
    () => (product.variants || []).map(() => 0)
  );
  const [addedFeedback, setAddedFeedback] = useState<'idle' | 'added' | 'select'>('idle');
  const [imgError, setImgError] = useState(false);
  const firstImage = !imgError && product.images && product.images.length > 0 ? product.images[0] : null;

  useEffect(() => {
    if (addedFeedback === 'idle') return;
    const timer = window.setTimeout(() => setAddedFeedback('idle'), 900);
    return () => window.clearTimeout(timer);
  }, [addedFeedback]);

  const incrementVariant = (variantIndex: number) => {
    setVariantQuantities((previous) =>
      previous.map((quantity, index) => (index === variantIndex ? quantity + 1 : quantity))
    );
  };

  const decrementVariant = (variantIndex: number) => {
    setVariantQuantities((previous) =>
      previous.map((quantity, index) =>
        index === variantIndex ? Math.max(0, quantity - 1) : quantity
      )
    );
  };

  const handleAddToCart = () => {
    const selectedVariants = (product.variants || [])
      .map((variant, index) => ({
        ...variant,
        quantity: variantQuantities[index] || 0,
      }))
      .filter((variant) => variant.quantity > 0);

    if (selectedVariants.length === 0) {
      setAddedFeedback('select');
      return;
    }

    onAddToCart(product, selectedVariants);
    setAddedFeedback('added');
  };

  return (
    <article
      key={productKey}
      className="flex-shrink-0 w-[300px] sm:w-[340px] md:w-[360px] min-h-[360px] bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-white/30 overflow-hidden flex flex-col"
    >
      <div className="w-full h-48 flex-shrink-0 overflow-hidden bg-stone-100">
        {firstImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={firstImage}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3l18 18M3 8.25A2.25 2.25 0 015.25 6h13.5A2.25 2.25 0 0121 8.25v7.5" />
            </svg>
            <span className="rubik-regular text-xs text-stone-400">Image Not Available</span>
          </div>
        )}
      </div>

      <div className="p-5 md:p-6 text-center flex flex-col flex-1">
        <h3
          className="afacad-regular text-2xl md:text-3xl leading-tight mb-3"
          style={{ color: 'var(--foreground-pink)' }}
        >
          {product.name}
        </h3>

        <div className="mb-2">
          <span
            className="flex w-full items-center justify-center rubik-medium text-sm md:text-base px-3 py-1"
            style={{
              backgroundColor: isInStock ? 'var(--background-pink)' : '#E5E7EB',
              color: 'var(--foreground-white)',
            }}
          >
            {isInStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {product.ingredients && (
          <p className="rubik-light text-sm md:text-base" style={{ color: 'var(--foreground-pink)' }}>
            <span className="rubik-medium">Ingredients: </span>
            {formatIngredients(product.ingredients)}
          </p>
        )}

        {product.variants && product.variants.length > 0 && (
          <div className="mt-4 space-y-2 text-left">
            {product.variants.map((variant, variantIndex) => (
              <div
                key={`${product.name}-${variant.weight}-${variant.price}-${variantIndex}`}
                className="flex items-center justify-between gap-2"
              >
                <span
                  className="rubik-regular text-sm md:text-base px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: 'var(--background-pink)',
                    color: 'var(--foreground-pink)',
                  }}
                >
                  {variant.weight} • ₹{variant.price}
                </span>

                {isCartEnabled && isInStock && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => decrementVariant(variantIndex)}
                      className="w-8 h-8 rounded-full border text-base transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95"
                      style={{ borderColor: 'var(--foreground-pink)', color: 'var(--foreground-pink)' }}
                      aria-label={`Decrease ${variant.weight} quantity for ${product.name}`}
                    >
                      −
                    </button>
                    <span
                      className="rubik-bold text-sm min-w-6 text-center"
                      style={{ color: 'var(--foreground-pink)' }}
                    >
                      {variantQuantities[variantIndex] || 0}
                    </span>
                    <button
                      type="button"
                      onClick={() => incrementVariant(variantIndex)}
                      className="w-8 h-8 rounded-full border text-base transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95"
                      style={{ borderColor: 'var(--foreground-pink)', color: 'var(--foreground-pink)' }}
                      aria-label={`Increase ${variant.weight} quantity for ${product.name}`}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto pt-5">
          {isCartEnabled && isInStock ? (
            <button
              type="button"
              onClick={handleAddToCart}
              className="inline-flex w-full items-center justify-center rubik-bold uppercase tracking-wide text-base md:text-lg px-6 py-3 rounded-lg border-2 transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95"
              style={{
                borderColor: 'var(--foreground-pink)',
                color: 'var(--foreground-pink)',
              }}
              aria-label={`Add ${product.name} to cart`}
            >
              {addedFeedback === 'added' ? 'Added' : addedFeedback === 'select' ? 'Select Quantity' : 'Add to Cart'}
            </button>
          ) : (
            <span
              className="inline-flex w-full items-center justify-center rubik-bold uppercase tracking-wide text-sm md:text-base px-6 py-3 rounded-lg border-2"
              style={{
                borderColor: 'var(--foreground-pink)',
                color: 'var(--foreground-pink)',
              }}
            >
              {isInStock ? 'Not Available in Cart' : 'Out of Stock'}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function CategoryCarousel({ category, products, onAddToCart }: CategoryCarouselProps) {
  const isPournamiCategory = category.toLowerCase().includes('pournami');
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
          style={{ color: 'var(--foreground-pink)' }}
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
            <ProductCard
              key={`${category}-${product.name}-${productIndex}`}
              productKey={`${category}-${product.name}-${productIndex}`}
              product={product}
              isCartEnabled={
                !isPournamiCategory &&
                !((product.categories && product.categories.length > 0 ? product.categories : product.category ? [product.category] : []).some(c => c.toLowerCase().includes('pournami'))) &&
                product.stock !== false
              }
              onAddToCart={onAddToCart}
            />
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

export default function ProductGrid({ groupedProducts, onAddToCart }: ProductGridProps) {
  const scrollToCategory = (category: string) => {
    const section = document.getElementById(getCategoryId(category));
    if (!section) return;

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="w-full pb-12 md:pb-16 lg:pb-20 pt-0" style={{ backgroundColor: 'var(--background-pink)' }}>
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
                  borderColor: 'var(--foreground-pink)',
                  color: 'var(--foreground-pink)',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {groupedProducts.length === 0 ? (
          <p className="rubik-regular text-center text-base md:text-lg" style={{ color: 'var(--foreground-pink)' }}>
            No products found for the current search.
          </p>
        ) : (
          groupedProducts.map(({ category, products }, index) => (
            <div key={`${category}-${index}`}>
              <CategoryCarousel category={category} products={products} onAddToCart={onAddToCart} />
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