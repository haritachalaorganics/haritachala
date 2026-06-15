'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import ProductSearch from '@/app/product/ProductSearch';
import WelcomeSection from './WelcomeSection';
import OurProductsSection from './OurProductsSection';
import ProductGrid from './ProductGrid';
import ReasonsToLoveUs from './ReasonsToLoveUs';
import TeaCollection from './TeaCollection';
import PranaElixir from './PranaElixir';
import PournamiSales from './PournamiSales';

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
  stock: boolean;
  variants?: ProductVariant[];
  ingredients?: string | string[];
  description?: string;
  images?: string[];
}

function getProductCategories(p: OrganicProduct): string[] {
  if (p.categories && p.categories.length > 0) return p.categories;
  if (p.category) return [p.category];
  return [];
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
  const [showOnlyInStock, setShowOnlyInStock] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  // Popup: shows "How to Order" after shop is opened
  const [showHowToOrder, setShowHowToOrder] = useState(false);

  const [wantsShipping, setWantsShipping] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingAddressError, setShippingAddressError] = useState('');
  const [shippingAcknowledged, setShippingAcknowledged] = useState(false);
  const [isShippingAddressFocused, setIsShippingAddressFocused] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerNameError, setCustomerNameError] = useState('');
  const [isCustomerNameFocused, setIsCustomerNameFocused] = useState(false);

  // Position 2 (after We are Haritachala): products_intro.mp4
  const firstVideoRef = useRef<HTMLVideoElement>(null);
  // Position 5 (after Our Products): hero_section_india_slideshow.mp4
  const secondVideoRef = useRef<HTMLVideoElement>(null);

  const getProductId = (product: OrganicProduct) => `${product.name}__${product.category || ''}`;

  const addToCart = (product: OrganicProduct, selectedVariants: SelectedVariant[]) => {
    if (getProductCategories(product).some((c) => c.toLowerCase().includes('pournami'))) return;
    if (product.stock === false) return;
    if (selectedVariants.length === 0) return;

    const id = getProductId(product);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === id);

      if (existing) {
        const map = new Map<string, SelectedVariant>();
        existing.selectedVariants.forEach((v) => map.set(`${v.weight}-${v.price}`, { ...v }));
        selectedVariants.forEach((v) => {
          const key = `${v.weight}-${v.price}`;
          const e = map.get(key);
          map.set(key, e ? { ...e, quantity: e.quantity + v.quantity } : { ...v });
        });
        return prev.map((item) =>
          item.id === id ? { ...item, selectedVariants: Array.from(map.values()) } : item
        );
      }

      return [
        ...prev,
        {
          id,
          name: product.name,
          category: product.category,
          selectedVariants: selectedVariants.map((v) => ({ ...v })),
        },
      ];
    });
  };

  const updateCartVariantQuantity = (itemId: string, variantId: string, nextQty: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== itemId) return item;
          const nextVariants = item.selectedVariants
            .map((v) => (`${v.weight}-${v.price}` === variantId ? { ...v, quantity: nextQty } : v))
            .filter((v) => v.quantity > 0);
          return { ...item, selectedVariants: nextVariants };
        })
        .filter((item) => item.selectedVariants.length > 0)
    );
  };

  const removeFromCart = (itemId: string) =>
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));

  const totalCartItems = useMemo(
    () => cartItems.reduce((t, item) => t + item.selectedVariants.reduce((s, v) => s + v.quantity, 0), 0),
    [cartItems]
  );

  const totalCartAmount = useMemo(
    () =>
      cartItems.reduce(
        (t, item) => t + item.selectedVariants.reduce((s, v) => s + v.quantity * v.price, 0),
        0
      ),
    [cartItems]
  );

  const cartWhatsAppLink = useMemo(() => {
    const phone = '916369728545';
    const name = customerName.trim();
    const lines = cartItems.flatMap((item) =>
      item.selectedVariants.map(
        (v) => `${item.name} (${v.weight}) × ${v.quantity} = ₹${v.quantity * v.price}`
      )
    );
    const fulfillment =
      wantsShipping && shippingAddress.trim()
        ? `\nFulfillment: Shipping\nShipping Address: ${shippingAddress.trim()}\nNote: Shipping cost will be confirmed and added to the final total.`
        : `\nFulfillment: Pickup at Haritachala, Tiruvannamalai`;
    const msg =
      lines.length > 0
        ? `Hello, my name is ${name}. I would like to place an order for:\n\n${lines
            .map((l, i) => `${i + 1}. ${l}`)
            .join('\n')}\n\nProduct Total: ₹${totalCartAmount}${fulfillment}\n\nPlease confirm availability.`
        : `Hello, my name is ${name}. I would like to place an order.${fulfillment}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  }, [cartItems, customerName, totalCartAmount, wantsShipping, shippingAddress]);

  const handleBuyNow = () => {
    if (!customerName.trim()) { setCustomerNameError('Please enter your name before placing the order.'); return; }
    if (wantsShipping && !shippingAddress.trim()) { setShippingAddressError('Please enter a shipping address.'); return; }
    if (wantsShipping && !shippingAcknowledged) return;
    setCustomerNameError('');
    setShippingAddressError('');
    window.open(cartWhatsAppLink, '_blank', 'noopener,noreferrer');
  };

  const handleCloseShop = useCallback(() => {
    setIsShopOpen(false);
    setSearchTerm('');
    setShowHowToOrder(false);
  }, []);

  const handleShopNow = useCallback(() => {
    setIsCartOpen(false);
    setIsShopOpen(true);
    setTimeout(() => setShowHowToOrder(true), 600);
  }, []);

  // ESC closes whichever modal is foremost
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (isCartOpen) { setIsCartOpen(false); return; }
      if (isShopOpen) handleCloseShop();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCartOpen, isShopOpen, handleCloseShop]);

  // Body scroll lock when any modal is open
  useEffect(() => {
    if (!isCartOpen && !isShopOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isCartOpen, isShopOpen]);

  // First video (products_intro.mp4)
  useEffect(() => {
    const vid = firstVideoRef.current;
    if (!vid) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) vid.play().catch(() => {}); else vid.pause(); },
      { threshold: 0.35 }
    );
    obs.observe(vid);
    return () => { obs.disconnect(); vid.pause(); };
  }, []);

  // Second video (hero_section_india_slideshow.mp4) — seeks past slow intro
  useEffect(() => {
    const vid = secondVideoRef.current;
    if (!vid) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (vid.currentTime < 6) vid.currentTime = 6;
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(vid);
    return () => { obs.disconnect(); vid.pause(); };
  }, []);

  const isTeaCollection = (p: OrganicProduct) =>
    getProductCategories(p).some((c) => c.trim().toLowerCase() === 'tea collection');

  // Filter out Tea Collection everywhere
  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const base = products.filter((p) => {
      if (isTeaCollection(p)) return false;
      if (showOnlyInStock && p.stock === false) return false;
      return true;
    });
    if (!query) return base;
    return base.filter((p) => {
      const variantText = (p.variants || []).map((v) => `${v.weight} ${v.price}`).join(' ').toLowerCase();
      const ingredientsText = Array.isArray(p.ingredients)
        ? p.ingredients.join(' ').toLowerCase()
        : p.ingredients?.toLowerCase() || '';
      const descText = p.description?.toLowerCase() || '';
      return (
        p.name.toLowerCase().includes(query) ||
        p.tamil?.toLowerCase().includes(query) ||
        p.telugu?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query) ||
        ingredientsText.includes(query) ||
        descText.includes(query) ||
        variantText.includes(query)
      );
    });
  }, [products, searchTerm, showOnlyInStock]);

  const totalProductCount = useMemo(
    () => products.filter((p) => !isTeaCollection(p)).length,
    [products]
  );

  const groupedProducts = useMemo(() => {
    const groups = new Map<string, OrganicProduct[]>();
    filteredProducts.forEach((p) => {
      const cats = getProductCategories(p).map((c) => c.trim()).filter(Boolean);
      const effective = cats.length > 0 ? cats : ['UNCATEGORIZED'];
      effective.forEach((cat) => {
        const arr = groups.get(cat) || [];
        arr.push(p);
        groups.set(cat, arr);
      });
    });

    const sorted = Array.from(groups.entries())
      .map<CategoryProducts>(([category, ps]) => ({ category, products: ps }))
      .sort((a, b) => {
        const ap = isPreparedCategory(a.category);
        const bp = isPreparedCategory(b.category);
        if (ap && !bp) return -1;
        if (!ap && bp) return 1;
        return 0;
      });

    const bestSellers = filteredProducts.filter((p) => p.bestSeller);
    return bestSellers.length > 0
      ? [{ category: 'BEST SELLERS', products: bestSellers }, ...sorted]
      : sorted;
  }, [filteredProducts]);

  return (
    <>
      {/* 1. We are Haritachala Organics */}
      <WelcomeSection />

      {/* 2. First Video — products_intro.mp4 */}
      <section className="w-full" style={{ backgroundColor: '#000' }}>
        <video
          ref={firstVideoRef}
          muted
          loop
          playsInline
          className="block w-full h-[45vh] md:h-[70vh] object-cover"
          preload="metadata"
        >
          <source src="/images/pages/india/products_intro.mp4" type="video/mp4" />
        </video>
      </section>

      {/* 3. Products Available — always shows teaser; shop opens as modal */}
      <section
        id="products-india"
        className="w-full -mt-px pt-10 md:pt-12 lg:pt-16 pb-16 md:pb-20"
        style={{ backgroundColor: 'var(--background-pink)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2
              className="afacad-regular text-3xl md:text-4xl lg:text-5xl uppercase mb-4"
              style={{ color: 'var(--foreground-pink)' }}
            >
              Products Available in India
            </h2>
            <p
              className="alegreya-italic text-lg md:text-xl lg:text-2xl"
              style={{ color: 'var(--foreground-pink)' }}
            >
              Organically Grown, Sun-dried, and Handpicked with Love
            </p>
          </div>

          {/* Teaser card */}
          <div
            className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-10 text-center"
            style={{ borderTop: '4px solid var(--foreground-pink)' }}
          >
            <p
              className="afacad-regular text-6xl md:text-7xl leading-none mb-1"
              style={{ color: 'var(--foreground-pink)' }}
            >
              {totalProductCount}
            </p>
            <p
              className="rubik-regular text-xs uppercase tracking-[0.25em] mb-7"
              style={{ color: 'var(--foreground-pink)', opacity: 0.65 }}
            >
              products available
            </p>
            <p
              className="rubik-light text-base md:text-lg mb-8 leading-relaxed"
              style={{ color: 'var(--foreground-pink)' }}
            >
              From herbal powders and dried flowers to seasonal fruits and prepared wellness
              products — all organically grown and handpicked with love.
            </p>
            <button
              type="button"
              onClick={handleShopNow}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full rubik-regular uppercase tracking-widest text-white text-sm md:text-base transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg"
              style={{ backgroundColor: 'var(--foreground-pink)' }}
            >
              Shop Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Our Products Section */}
      <div id="our-products-section">
        <OurProductsSection />
      </div>

      {/* 5. Pournami Sales */}
      <PournamiSales />

      {/* 6. Tea Collection */}
      <TeaCollection products={products} />

      {/* 7. Prana Elixir */}
      <PranaElixir />

      {/* 8. Second Video — hero_section_india_slideshow.mp4 */}
      <section className="w-full" style={{ backgroundColor: '#000' }}>
        <video
          ref={secondVideoRef}
          muted
          loop
          playsInline
          className="block w-full h-[45vh] md:h-[70vh] object-cover"
          preload="metadata"
        >
          <source src="/images/pages/india/hero_section_india_slideshow.mp4" type="video/mp4" />
        </video>
      </section>

      {/* 9. Reasons to Love Us — each panel has a Shop Now button */}
      <ReasonsToLoveUs onShopNow={handleShopNow} />

      {/* ─────────────────────── SHOP MODAL ─────────────────────── */}
      {isShopOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col sm:items-center sm:justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Shop products"
        >
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/55 cursor-default"
            aria-label="Close shop"
            onClick={handleCloseShop}
          />

          {/* Panel — bottom sheet on mobile, centered on desktop */}
          <div
            className="relative w-full mt-auto sm:mt-0 sm:max-w-5xl max-h-[94vh] sm:max-h-[90vh] flex flex-col rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--background-pink)' }}
          >
            {/* Sticky header */}
            <div
              className="flex-shrink-0 flex items-center justify-between px-5 py-4 md:px-8 md:py-5"
              style={{ borderBottom: '1px solid rgba(196,115,90,0.2)' }}
            >
              <div>
                <h2
                  className="afacad-regular text-xl md:text-2xl uppercase"
                  style={{ color: 'var(--foreground-pink)' }}
                >
                  Products Available in India
                </h2>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <p
                    className="rubik-regular text-xs"
                    style={{ color: 'var(--foreground-pink)', opacity: 0.65 }}
                  >
                    {filteredProducts.length} products
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowOnlyInStock((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full rubik-regular text-xs border transition-all duration-200 hover:opacity-80"
                    style={{
                      borderColor: 'var(--foreground-pink)',
                      backgroundColor: showOnlyInStock ? 'var(--foreground-pink)' : 'transparent',
                      color: showOnlyInStock ? 'white' : 'var(--foreground-pink)',
                    }}
                    aria-pressed={showOnlyInStock}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: showOnlyInStock ? '#86efac' : 'rgba(196,115,90,0.4)' }}
                    />
                    In Stock Only
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                {/* Cart lives in the header so it's reachable without closing the shop */}
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full rubik-regular uppercase tracking-widest text-sm transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95 border bg-white"
                  style={{ borderColor: 'var(--foreground-purple)', color: 'var(--foreground-purple)' }}
                  aria-label={`Open cart, ${totalCartItems} item${totalCartItems !== 1 ? 's' : ''}`}
                >
                  <FaShoppingCart size={13} aria-hidden="true" />
                  Cart ({totalCartItems})
                </button>

                <button
                  type="button"
                  onClick={handleCloseShop}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full rubik-regular uppercase tracking-widest text-sm transition-all duration-300 hover:opacity-70 hover:scale-105 active:scale-95 border"
                  style={{ borderColor: 'var(--foreground-pink)', color: 'var(--foreground-pink)' }}
                  aria-label="Close shop"
                >
                  <FaTimes size={12} />
                  Close
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">

              {/* How to Order — inline banner, dismissible */}
              {showHowToOrder && (
                <div
                  className="mx-5 md:mx-8 mt-4 mb-0 rounded-xl border p-3.5 flex items-start justify-between gap-3 bg-white"
                  style={{ borderColor: 'rgba(100,93,171,0.35)' }}
                >
                  <p className="rubik-light text-sm leading-relaxed" style={{ color: 'var(--foreground-purple)' }}>
                    <strong className="rubik-medium">How to Order:</strong> Select quantities for any
                    products you want, then tap{' '}
                    <strong className="rubik-medium">Cart</strong> in the header above to review your
                    order and send it via WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowHowToOrder(false)}
                    className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full border transition-all hover:opacity-70 mt-0.5"
                    style={{ borderColor: 'var(--foreground-purple)', color: 'var(--foreground-purple)' }}
                    aria-label="Dismiss how to order tip"
                  >
                    <FaTimes size={9} />
                  </button>
                </div>
              )}

              <ProductSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                backgroundColor="var(--background-pink)"
                accentColor="var(--foreground-pink)"
                containerPaddingClass="pt-4 pb-6 md:pt-5 md:pb-8"
              />
              <ProductGrid groupedProducts={groupedProducts} onAddToCart={addToCart} />

              {/* Footer inside scroll area */}
              <div
                className="text-center py-6 px-4"
                style={{ borderTop: '1px solid rgba(196,115,90,0.15)' }}
              >
                <button
                  type="button"
                  onClick={handleCloseShop}
                  className="inline-flex items-center gap-2 rubik-regular text-sm uppercase tracking-widest px-8 py-3 rounded-full border transition-all duration-300 hover:opacity-70 hover:scale-105 active:scale-95"
                  style={{ borderColor: 'var(--foreground-pink)', color: 'var(--foreground-pink)' }}
                >
                  <FaTimes size={11} />
                  Close Shop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Floating cart button ── */}
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

      {/* ── Cart modal ── */}
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
              Orders can be picked up at Haritachala in Tiruvannamalai, or shipped to your address.
            </p>

            {cartItems.length === 0 ? (
              <div className="text-center py-6">
                <p className="rubik-regular text-base md:text-lg mb-6" style={{ color: 'var(--foreground-purple)' }}>
                  Your cart is empty.
                </p>
                <button
                  type="button"
                  onClick={handleShopNow}
                  className="inline-flex items-center gap-3 px-8 py-3 rounded-full rubik-regular uppercase tracking-widest text-white text-sm transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 shadow-md"
                  style={{ backgroundColor: 'var(--foreground-purple)' }}
                >
                  Shop Now
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
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
                                  <span className="rubik-bold text-sm min-w-6 text-center" style={{ color: 'var(--foreground-purple)' }}>
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

                <div className="mt-5 md:mt-6 space-y-5">
                  <div>
                    <p className="rubik-bold text-base md:text-lg" style={{ color: 'var(--foreground-purple)' }}>
                      Total Items: {totalCartItems}
                    </p>
                    <p className="rubik-bold text-base md:text-lg" style={{ color: 'var(--foreground-purple)' }}>
                      Product Total: ₹{totalCartAmount}
                    </p>
                  </div>

                  <div className="rounded-xl border p-4 space-y-4" style={{ borderColor: 'var(--foreground-purple)' }}>
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={wantsShipping}
                        onChange={(e) => {
                          setWantsShipping(e.target.checked);
                          if (!e.target.checked) {
                            setShippingAddress('');
                            setShippingAddressError('');
                            setShippingAcknowledged(false);
                          }
                        }}
                        className="w-4 h-4 accent-[#645DAB] cursor-pointer"
                      />
                      <span className="rubik-medium text-sm md:text-base" style={{ color: 'var(--foreground-purple)' }}>
                        Ship to me
                      </span>
                    </label>

                    {wantsShipping && (
                      <div className="space-y-3">
                        <div>
                          <label
                            htmlFor="shipping-address"
                            className="rubik-medium text-sm md:text-base mb-1 block"
                            style={{ color: 'var(--foreground-purple)' }}
                          >
                            Shipping Address (required)
                          </label>
                          <textarea
                            id="shipping-address"
                            rows={3}
                            value={shippingAddress}
                            onFocus={() => setIsShippingAddressFocused(true)}
                            onBlur={() => setIsShippingAddressFocused(false)}
                            onChange={(e) => {
                              setShippingAddress(e.target.value);
                              if (e.target.value.trim()) setShippingAddressError('');
                            }}
                            className={`w-full rounded-lg border px-3 py-2 rubik-regular text-sm md:text-base transition-colors duration-200 resize-none ${
                              isShippingAddressFocused ? 'placeholder:text-white/80' : 'placeholder:text-[var(--foreground-purple)]'
                            }`}
                            style={{
                              borderColor: 'var(--foreground-purple)',
                              backgroundColor: isShippingAddressFocused ? 'var(--foreground-purple)' : 'var(--foreground-white)',
                              color: isShippingAddressFocused ? 'var(--foreground-white)' : 'var(--foreground-purple)',
                            }}
                            placeholder="Street, city, state, PIN code"
                          />
                          {shippingAddressError && (
                            <p className="rubik-regular text-xs md:text-sm mt-1" style={{ color: 'var(--foreground-purple)' }}>
                              {shippingAddressError}
                            </p>
                          )}
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={shippingAcknowledged}
                            onChange={(e) => setShippingAcknowledged(e.target.checked)}
                            className="mt-0.5 w-4 h-4 accent-[#645DAB] cursor-pointer flex-shrink-0"
                          />
                          <span className="rubik-light text-xs md:text-sm leading-relaxed" style={{ color: 'var(--foreground-purple)' }}>
                            I understand that shipping costs vary by destination and will be confirmed separately before fulfillment. The shipping charge will be added to my product total.
                          </span>
                        </label>
                      </div>
                    )}
                  </div>

                  <div>
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
                        if (event.target.value.trim()) setCustomerNameError('');
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
                      disabled={
                        !customerName.trim() ||
                        (wantsShipping && (!shippingAddress.trim() || !shippingAcknowledged))
                      }
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
