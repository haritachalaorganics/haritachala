"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ScrollButton from '@/components/ScrollButton';

interface OrganicProduct {
  name: string;
  category?: string;
  categories?: string[];
  description?: string;
  images?: string[];
  stock: boolean;
}

function getProductCategories(p: OrganicProduct): string[] {
  if (p.categories && p.categories.length > 0) return p.categories;
  if (p.category) return [p.category];
  return [];
}

const ACCENT_COLORS = ['var(--foreground-purple)', 'var(--foreground-pink)'];

interface Props {
  products: OrganicProduct[];
}

export default function TeaCollection({ products }: Props) {
  const [visible, setVisible] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const teas = products.filter((p) =>
    getProductCategories(p).some((c) => c.trim().toLowerCase() === 'tea collection')
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [teas.length]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  if (teas.length === 0) return null;

  return (
    <section style={{ backgroundColor: 'var(--background-purple)' }}>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 lg:py-24">

        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <p
            className="rubik-regular font-bold text-[10px] tracking-[0.3em] uppercase mb-3 text-white/70"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease-out' }}
          >
            BREW WITH OUR BOTANICALS
          </p>
          <h2
            className="afacad-regular text-4xl md:text-5xl lg:text-6xl uppercase mb-5 text-white"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(22px)',
              transition: 'opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s',
            }}
          >
            Tea Collection
          </h2>
          <p
            className="rubik-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-white/80"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(22px)',
              transition: 'opacity 0.7s ease-out 0.22s, transform 0.7s ease-out 0.22s',
            }}
          >
            Each of these beautiful teas can be crafted using our organically grown, sun-dried botanicals —
            bringing the garden&apos;s purest gifts directly to your cup. These are just a few of the many teas we offer.
          </p>
        </div>

        {/* Carousel with scroll buttons */}
        <div className="relative">
          {showLeft && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20">
              <ScrollButton direction="left" onClick={() => scroll('left')} buttonColor="#645DAB" arrowColor="#B3B0D1" />
            </div>
          )}

          <div
            ref={scrollRef}
            className="tea-scroll flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {teas.map((tea, i) => {
              const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
              return (
                <div
                  key={tea.name}
                  className="snap-start flex-shrink-0 w-[260px] sm:w-[300px] md:w-[320px] bg-white rounded-3xl shadow-xl overflow-hidden relative"
                  style={{
                    borderTop: `4px solid ${accent}`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(24px)',
                    transition: `opacity 0.65s ease-out ${0.3 + i * 0.08}s, transform 0.65s ease-out ${0.3 + i * 0.08}s`,
                  }}
                >
                  {tea.images?.[0] && (
                    <div className="relative w-full aspect-[3/2] sm:aspect-[4/3] overflow-hidden">
                      <Image
                        src={tea.images[0]}
                        alt={tea.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 320px"
                      />
                    </div>
                  )}

                  <span
                    className="afacad-regular absolute bottom-0 right-4 select-none pointer-events-none leading-none"
                    style={{ fontSize: '7rem', color: accent, opacity: 0.07 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative z-10 p-5 md:p-6">
                    <h3
                      className="afacad-regular text-2xl md:text-3xl leading-tight mb-2"
                      style={{ color: accent }}
                    >
                      {tea.name}
                    </h3>
                    {tea.description && (
                      <p
                        className="rubik-light text-sm md:text-base leading-relaxed"
                        style={{ color: accent, opacity: 0.8 }}
                      >
                        {tea.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {showRight && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20">
              <ScrollButton direction="right" onClick={() => scroll('right')} buttonColor="#645DAB" arrowColor="#B3B0D1" />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .tea-scroll::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
