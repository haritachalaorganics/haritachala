"use client";

import { useEffect, useRef, useState } from 'react';
import ScrollButton from '@/components/ScrollButton';
import ReasonsToLoveUs from './ReasonsToLoveUs';

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
  bestSeller?: boolean;
  stock?: boolean;
  variants?: ProductVariant[];
  ingredients?: string | string[];
  description?: string;
}

interface WelcomeSectionProps {
  products: OrganicProduct[];
  onAddToCart: (product: OrganicProduct, selectedVariants: SelectedVariant[]) => void;
}

interface BestSellerCardProps {
  product: OrganicProduct;
  productKey: string;
  onAddToCart: (product: OrganicProduct, selectedVariants: SelectedVariant[]) => void;
}

function formatIngredients(ingredients?: string | string[]) {
  if (!ingredients) return '';
  if (Array.isArray(ingredients)) {
    return ingredients.join(', ');
  }
  return ingredients;
}

function BestSellerCard({ product, productKey, onAddToCart }: BestSellerCardProps) {
  const isPournamiProduct = product.category?.toLowerCase().includes('pournami');
  const isInStock = product.stock !== false;
  const [variantQuantities, setVariantQuantities] = useState<number[]>(
    () => (product.variants || []).map(() => 0)
  );
  const [addedFeedback, setAddedFeedback] = useState<'idle' | 'added' | 'select'>('idle');

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
      <div className="p-5 md:p-6 text-center flex flex-col flex-1">
        <h3
          className="afacad-regular text-2xl md:text-3xl leading-tight mb-3"
          style={{ color: 'var(--foreground-purple)' }}
        >
          {product.name}
        </h3>

        <div className="mb-2">
          <span
            className="flex w-full items-center justify-center rubik-medium text-sm md:text-base px-3 py-1"
            style={{
              backgroundColor: isInStock ? 'var(--background-purple)' : '#E5E7EB',
              color: 'var(--foreground-white)',
            }}
          >
            {isInStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {product.ingredients && (
          <p className="rubik-light text-sm md:text-base" style={{ color: 'var(--foreground-purple)' }}>
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
                    backgroundColor: 'var(--background-purple)',
                    color: 'var(--foreground-white)',
                  }}
                >
                  {variant.weight} • ₹{variant.price}
                </span>

                {!isPournamiProduct && isInStock && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => decrementVariant(variantIndex)}
                      className="w-8 h-8 rounded-full border text-base transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95"
                      style={{ borderColor: 'var(--foreground-purple)', color: 'var(--foreground-purple)' }}
                      aria-label={`Decrease ${variant.weight} quantity for ${product.name}`}
                    >
                      −
                    </button>
                    <span
                      className="rubik-bold text-sm min-w-6 text-center"
                      style={{ color: 'var(--foreground-purple)' }}
                    >
                      {variantQuantities[variantIndex] || 0}
                    </span>
                    <button
                      type="button"
                      onClick={() => incrementVariant(variantIndex)}
                      className="w-8 h-8 rounded-full border text-base transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95"
                      style={{ borderColor: 'var(--foreground-purple)', color: 'var(--foreground-purple)' }}
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
          {!isPournamiProduct && isInStock ? (
            <button
              type="button"
              onClick={handleAddToCart}
              className="inline-flex w-full items-center justify-center rubik-bold uppercase tracking-wide text-base md:text-lg px-6 py-3 rounded-lg border-2 transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95"
              style={{
                borderColor: 'var(--foreground-purple)',
                color: 'var(--foreground-purple)',
              }}
              aria-label={`Add ${product.name} to cart`}
            >
              {addedFeedback === 'added' ? 'Added' : addedFeedback === 'select' ? 'Select Quantity' : 'Add to Cart'}
            </button>
          ) : (
            <span
              className="inline-flex w-full items-center justify-center rubik-bold uppercase tracking-wide text-sm md:text-base px-6 py-3 rounded-lg border-2"
              style={{
                borderColor: 'var(--foreground-purple)',
                color: 'var(--foreground-purple)',
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

export default function WelcomeSection({ products, onAddToCart }: WelcomeSectionProps) {
  const bestSellerScrollContainerRef = useRef<HTMLDivElement>(null);
  const [isBestSellerDragging, setIsBestSellerDragging] = useState(false);
  const [bestSellerStartX, setBestSellerStartX] = useState(0);
  const [bestSellerScrollLeft, setBestSellerScrollLeft] = useState(0);
  const [showBestSellerLeftButton, setShowBestSellerLeftButton] = useState(false);
  const [showBestSellerRightButton, setShowBestSellerRightButton] = useState(true);
  const bestSellerProducts = products.filter((product) => product.bestSeller);

  const checkBestSellerScroll = () => {
    if (bestSellerScrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = bestSellerScrollContainerRef.current;
      setShowBestSellerLeftButton(scrollLeft > 0);
      setShowBestSellerRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkBestSellerScroll();
    window.addEventListener('resize', checkBestSellerScroll);
    return () => {
      window.removeEventListener('resize', checkBestSellerScroll);
    };
  }, []);

  const scrollBestSellers = (direction: 'left' | 'right') => {
    if (bestSellerScrollContainerRef.current) {
      const scrollAmount = 320;
      const newScrollLeft =
        direction === 'left'
          ? bestSellerScrollContainerRef.current.scrollLeft - scrollAmount
          : bestSellerScrollContainerRef.current.scrollLeft + scrollAmount;

      bestSellerScrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleBestSellerMouseDown = (e: React.MouseEvent) => {
    setIsBestSellerDragging(true);
    setBestSellerStartX(e.pageX - (bestSellerScrollContainerRef.current?.offsetLeft || 0));
    setBestSellerScrollLeft(bestSellerScrollContainerRef.current?.scrollLeft || 0);
  };

  const handleBestSellerMouseMove = (e: React.MouseEvent) => {
    if (!isBestSellerDragging) return;
    e.preventDefault();
    const x = e.pageX - (bestSellerScrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - bestSellerStartX) * 2;
    if (bestSellerScrollContainerRef.current) {
      bestSellerScrollContainerRef.current.scrollLeft = bestSellerScrollLeft - walk;
    }
  };

  const handleBestSellerMouseUp = () => {
    setIsBestSellerDragging(false);
  };

  const handleBestSellerMouseLeave = () => {
    setIsBestSellerDragging(false);
  };

  return (
    <>
      {/* We are Haritachala Organics */}
      <section
        id="we-are-haritachala"
        className="w-full py-16 md:py-20 lg:py-24 -mt-1 relative z-10"
        style={{ backgroundColor: 'var(--background-pink)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <h2
                className="afacad-regular text-3xl md:text-4xl lg:text-5xl uppercase text-center lg:text-left mb-6"
                style={{ color: 'var(--foreground-pink)' }}
              >
                We are Haritachala Organics
              </h2>

              <p
                className="rubik-light text-base md:text-lg text-center lg:text-left"
                style={{ color: 'var(--foreground-pink)' }}
              >
                100% of proceeds directly support Haritachala, our Sai Baba temple, spiritual retreats,
                our biodiverse organic farm, and the livelihoods of rural women.
              </p>

              <p
                className="rubik-light text-base md:text-lg text-center lg:text-left mt-4"
                style={{ color: 'var(--foreground-pink)' }}
              >
                This page lists Haritachala Organics products currently available in Tiruvannamalai for
                pickup at Haritachala. We do not offer delivery or shipping at this time.
              </p>

              <p
                className="alegreya-italic text-base md:text-lg text-center lg:text-left mt-4"
                style={{ color: 'var(--foreground-pink)' }}
              >
                For purchase inquiries, please contact us on WhatsApp at{' '}
                <a
                  href="https://wa.me/919320097980"
                  className="underline hover:opacity-75 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +91 93200 97980
                </a>
                . We also welcome you to visit us at Sri Sainathuni Dhyana Mandiram, Tamil Nadu, India.
              </p>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="block w-full h-auto"
              >
                <source src="/images/pages/india/welcomeToHaritachala.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Reasons to Love Us — 4 animated panels */}
      <ReasonsToLoveUs />

      {/* Best Sellers */}
      <section className="w-full py-8 md:py-10" style={{ backgroundColor: 'var(--background-purple)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3
            className="afacad-regular text-3xl md:text-4xl lg:text-5xl uppercase text-center mb-6 md:mb-8"
            style={{ color: 'var(--foreground-white)' }}
          >
            Best Sellers
          </h3>

          <div className="relative">
            {showBestSellerLeftButton && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20">
                <ScrollButton direction="left" onClick={() => scrollBestSellers('left')} />
              </div>
            )}

            <div
              ref={bestSellerScrollContainerRef}
              onMouseDown={handleBestSellerMouseDown}
              onMouseMove={handleBestSellerMouseMove}
              onMouseUp={handleBestSellerMouseUp}
              onMouseLeave={handleBestSellerMouseLeave}
              onScroll={checkBestSellerScroll}
              className={`flex items-stretch gap-4 md:gap-5 overflow-x-auto scrollbar-hide px-4 py-4 ${
                isBestSellerDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {bestSellerProducts.map((product, productIndex) => (
                <BestSellerCard
                  key={`${product.name}-${productIndex}`}
                  productKey={`${product.name}-${productIndex}`}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>

            {showBestSellerRightButton && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20">
                <ScrollButton direction="right" onClick={() => scrollBestSellers('right')} />
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
    </>
  );
}
