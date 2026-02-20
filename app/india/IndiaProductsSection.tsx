'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import ProductSearch from '@/app/product/ProductSearch';
import WelcomeSection from './WelcomeSection';
import ProductGrid from './ProductGrid';

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
  image?: string;
}

interface CartItem {
  id: string;
  name: string;
  category?: string;
  selectedVariants: SelectedVariant[];
}

interface CategoryProducts {
  category: string;
  products: OrganicProduct[];
}

interface IndiaProductsSectionProps {
  products: OrganicProduct[];
}

export default function IndiaProductsSection({ products }: IndiaProductsSectionProps) {
    const isPreparedCategory = (category?: string) =>
      (category || '').trim().toLowerCase() === 'prepared products';

  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerNameError, setCustomerNameError] = useState('');
  const [isCustomerNameFocused, setIsCustomerNameFocused] = useState(false);
  const bannerVideoRef = useRef<HTMLVideoElement>(null);

  const getProductId = (product: OrganicProduct) => `${product.name}__${product.category || ''}`;

  const addToCart = (product: OrganicProduct, selectedVariants: SelectedVariant[]) => {
    if (product.category?.toLowerCase().includes('pournami')) return;
    if (product.stock === false) return;
    if (selectedVariants.length === 0) return;

    const id = getProductId(product);
    setCartItems((previousItems) => {
      const existingItem = previousItems.find((item) => item.id === id);

      if (existingItem) {
        const mergedVariantMap = new Map<string, SelectedVariant>();

        existingItem.selectedVariants.forEach((variant) => {
          const variantId = `${variant.weight}-${variant.price}`;
          mergedVariantMap.set(variantId, { ...variant });
        });

        selectedVariants.forEach((variant) => {
          const variantId = `${variant.weight}-${variant.price}`;
          const existingVariant = mergedVariantMap.get(variantId);

          if (existingVariant) {
            mergedVariantMap.set(variantId, {
              ...existingVariant,
              quantity: existingVariant.quantity + variant.quantity,
            });
            return;
          }

          mergedVariantMap.set(variantId, { ...variant });
        });

        return previousItems.map((item) =>
          item.id === id
            ? {
                ...item,
                selectedVariants: Array.from(mergedVariantMap.values()),
              }
            : item
        );
      }

      return [
        ...previousItems,
        {
          id,
          name: product.name,
          category: product.category,
          selectedVariants: selectedVariants.map((variant) => ({ ...variant })),
        },
      ];
    });
  };

  const updateCartVariantQuantity = (itemId: string, variantId: string, nextQuantity: number) => {
    setCartItems((previousItems) =>
      previousItems
        .map((item) => {
          if (item.id !== itemId) return item;

          const nextVariants = item.selectedVariants
            .map((variant) => {
              const currentVariantId = `${variant.weight}-${variant.price}`;
              if (currentVariantId !== variantId) return variant;
              return {
                ...variant,
                quantity: nextQuantity,
              };
            })
            .filter((variant) => variant.quantity > 0);

          return {
            ...item,
            selectedVariants: nextVariants,
          };
        })
        .filter((item) => item.selectedVariants.length > 0)
    );
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((previousItems) => previousItems.filter((item) => item.id !== itemId));
  };

  const totalCartItems = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + item.selectedVariants.reduce((variantTotal, variant) => variantTotal + variant.quantity, 0),
        0
      ),
    [cartItems]
  );

  const totalCartAmount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          item.selectedVariants.reduce(
            (variantTotal, variant) => variantTotal + variant.quantity * variant.price,
            0
          ),
        0
      ),
    [cartItems]
  );

  const cartWhatsAppLink = useMemo(() => {
    const phoneNumber = '919320097980';
    const trimmedCustomerName = customerName.trim();
    const lines = cartItems.flatMap((item) =>
      item.selectedVariants.map(
        (variant) =>
          `${item.name} (${variant.weight}) × ${variant.quantity} = ₹${variant.quantity * variant.price}`
      )
    );
    const message =
      lines.length > 0
        ? `Hello, my name is ${trimmedCustomerName}. I would like to place an order for:\n\n${lines
            .map((line, index) => `${index + 1}. ${line}`)
            .join('\n')}\n\nTotal Amount: ₹${totalCartAmount}\nPlease confirm availability.`
        : `Hello, my name is ${trimmedCustomerName}. I would like to place an order.`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }, [cartItems, customerName, totalCartAmount]);

  const handleBuyNow = () => {
    if (!customerName.trim()) {
      setCustomerNameError('Please enter your name before placing the order.');
      return;
    }

    setCustomerNameError('');
    window.open(cartWhatsAppLink, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const videoElement = bannerVideoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoElement.play().catch(() => {
            // Silent fail for autoplay restrictions
          });
        } else {
          videoElement.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
      videoElement.pause();
    };
  }, []);

  useEffect(() => {
    if (!isCartOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isCartOpen]);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return products;

    return products.filter((product) => {
      const variantText = (product.variants || [])
        .map((variant) => `${variant.weight} ${variant.price}`)
        .join(' ')
        .toLowerCase();

      const ingredientsText = Array.isArray(product.ingredients)
        ? product.ingredients.join(' ').toLowerCase()
        : product.ingredients?.toLowerCase() || '';

      const descriptionText = product.description?.toLowerCase() || '';

      return (
        product.name.toLowerCase().includes(query) ||
        product.tamil?.toLowerCase().includes(query) ||
        product.telugu?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        ingredientsText.includes(query) ||
        descriptionText.includes(query) ||
        variantText.includes(query)
      );
    });
  }, [products, searchTerm]);

  const groupedProducts = useMemo(() => {
    const groups = new Map<string, OrganicProduct[]>();

    filteredProducts.forEach((product) => {
      const category = product.category?.trim() || 'UNCATEGORIZED';
      const existing = groups.get(category) || [];
      existing.push(product);
      groups.set(category, existing);
    });

    return Array.from(groups.entries())
      .map<CategoryProducts>(([category, categoryProducts]) => ({
        category,
        products: categoryProducts,
      }))
      .sort((first, second) => {
        const firstPrepared = isPreparedCategory(first.category);
        const secondPrepared = isPreparedCategory(second.category);

        if (firstPrepared && !secondPrepared) return -1;
        if (!firstPrepared && secondPrepared) return 1;
        return 0;
      });
  }, [filteredProducts]);

  return (
    <>
      <WelcomeSection products={products} onAddToCart={addToCart} />
      <section className="w-full" style={{ backgroundColor: 'var(--background-pink)' }}>
        <div className="w-full h-screen overflow-hidden">
          <video ref={bannerVideoRef} muted playsInline className="block w-full h-full object-cover" preload="metadata">
            <source src="/images/pages/india/products_intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      <section className="w-full -mt-px pt-8 md:pt-10 lg:pt-12 pb-2" style={{ backgroundColor: 'var(--background-pink)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-2 md:mb-3">
            <h2
              className="afacad-regular text-3xl md:text-4xl lg:text-5xl uppercase mb-4 text-center"
              style={{ color: 'var(--foreground-pink)' }}
            >
              Products Available in India
            </h2>
            <p
              className="alegreya-italic text-lg md:text-xl lg:text-2xl text-center"
              style={{ color: 'var(--foreground-pink)' }}
            >
              Organically Grown, Sun-dried, and Handpicked with Love
            </p>

            <p
              className="rubik-regular text-sm md:text-base text-center mt-3"
              style={{ color: 'var(--foreground-pink)' }}
            >
              Total Products: {filteredProducts.length}
            </p>
          </div>
        </div>
      </section>
      <ProductSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        backgroundColor="var(--background-pink)"
        accentColor="var(--foreground-pink)"
        containerPaddingClass="pt-1 pb-8 md:pt-2 md:pb-10"
      />
      <ProductGrid groupedProducts={groupedProducts} onAddToCart={addToCart} />

      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 shadow-lg rubik-bold uppercase tracking-wide text-sm md:text-base transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: 'var(--foreground-white)',
          color: 'var(--foreground-purple)',
          borderColor: 'var(--foreground-purple)',
        }}
        aria-label="Open cart"
      >
        <FaShoppingCart aria-hidden="true" />
        Cart ({totalCartItems})
      </button>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/45"
            aria-label="Close cart"
            onClick={() => setIsCartOpen(false)}
          />

          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-5 md:p-6 border"
            style={{
              backgroundColor: 'var(--foreground-white)',
              borderColor: 'var(--foreground-purple)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className="afacad-regular text-3xl md:text-4xl uppercase inline-flex items-center gap-2"
                style={{ color: 'var(--foreground-purple)' }}
              >
                <FaShoppingCart aria-hidden="true" />
                Your Cart
              </h3>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95"
                style={{ color: 'var(--foreground-purple)', borderColor: 'var(--foreground-purple)' }}
                aria-label="Close cart"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>

            <p className="rubik-regular text-sm md:text-base mb-4" style={{ color: 'var(--foreground-purple)' }}>
              Orders must be picked up at Haritachala in Tiruvannamalai. No delivery or shipping options are available.
            </p>

            {cartItems.length === 0 ? (
              <p className="rubik-regular text-base md:text-lg" style={{ color: 'var(--foreground-purple)' }}>
                Your cart is empty.
              </p>
            ) : (
              <>
                <div className="space-y-3 md:space-y-4">
                  {cartItems.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-xl border p-4"
                      style={{ borderColor: 'var(--foreground-purple)' }}
                    >
                      <div className="flex flex-col gap-3">
                        <div>
                          <h4 className="rubik-medium text-base md:text-lg" style={{ color: 'var(--foreground-purple)' }}>
                            {item.name}
                          </h4>
                          {item.category && (
                            <p className="rubik-light text-sm" style={{ color: 'var(--foreground-purple)' }}>
                              {item.category}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          {item.selectedVariants.map((variant) => {
                            const variantId = `${variant.weight}-${variant.price}`;

                            return (
                              <div key={`${item.id}-${variantId}`} className="flex items-center justify-between gap-3">
                                <div className="rubik-regular text-sm md:text-base" style={{ color: 'var(--foreground-purple)' }}>
                                  {variant.weight} • ₹{variant.price}
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => updateCartVariantQuantity(item.id, variantId, variant.quantity - 1)}
                                    className="w-8 h-8 rounded-full border text-base transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95"
                                    style={{ borderColor: 'var(--foreground-purple)', color: 'var(--foreground-purple)' }}
                                    aria-label={`Decrease ${variant.weight} quantity for ${item.name}`}
                                  >
                                    −
                                  </button>
                                  <span
                                    className="rubik-bold text-sm min-w-6 text-center"
                                    style={{ color: 'var(--foreground-purple)' }}
                                  >
                                    {variant.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => updateCartVariantQuantity(item.id, variantId, variant.quantity + 1)}
                                    className="w-8 h-8 rounded-full border text-base transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95"
                                    style={{ borderColor: 'var(--foreground-purple)', color: 'var(--foreground-purple)' }}
                                    aria-label={`Increase ${variant.weight} quantity for ${item.name}`}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            );
                          })}

                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="rubik-medium text-sm uppercase px-3 py-2 rounded border transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95"
                              style={{ borderColor: 'var(--foreground-purple)', color: 'var(--foreground-purple)' }}
                              aria-label={`Remove ${item.name}`}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-5 md:mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div>
                    <p className="rubik-bold text-base md:text-lg" style={{ color: 'var(--foreground-purple)' }}>
                      Total Items: {totalCartItems}
                    </p>
                    <p className="rubik-bold text-base md:text-lg" style={{ color: 'var(--foreground-purple)' }}>
                      Total Amount: ₹{totalCartAmount}
                    </p>
                  </div>
                  <div className="w-full md:w-auto md:min-w-[320px]">
                    <label
                      htmlFor="customer-name"
                      className="rubik-medium text-sm md:text-base mb-2 block"
                      style={{ color: 'var(--foreground-purple)' }}
                    >
                      Your Name (required)
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      value={customerName}
                      onFocus={() => setIsCustomerNameFocused(true)}
                      onBlur={() => setIsCustomerNameFocused(false)}
                      onChange={(event) => {
                        setCustomerName(event.target.value);
                        if (event.target.value.trim()) {
                          setCustomerNameError('');
                        }
                      }}
                      className={`w-full rounded-lg border px-3 py-2 rubik-regular text-sm md:text-base transition-colors duration-200 ${
                        isCustomerNameFocused ? 'placeholder:text-white/80' : 'placeholder:text-[var(--foreground-purple)]'
                      }`}
                      style={{
                        borderColor: 'var(--foreground-purple)',
                        backgroundColor: isCustomerNameFocused ? 'var(--foreground-purple)' : 'var(--foreground-white)',
                        color: isCustomerNameFocused ? 'var(--foreground-white)' : 'var(--foreground-purple)',
                      }}
                      placeholder="Enter your full name"
                    />
                    {customerNameError && (
                      <p className="rubik-regular text-xs md:text-sm mt-1" style={{ color: 'var(--foreground-purple)' }}>
                        {customerNameError}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={handleBuyNow}
                      className="mt-3 w-full inline-flex items-center justify-center gap-2 rubik-bold uppercase tracking-wide text-sm md:text-base px-5 py-3 rounded-lg border-2 transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      style={{
                        borderColor: 'var(--foreground-purple)',
                        color: 'var(--foreground-purple)',
                      }}
                      disabled={!customerName.trim()}
                    >
                      <FaShoppingCart aria-hidden="true" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}