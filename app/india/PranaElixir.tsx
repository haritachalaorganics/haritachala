"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const images = [
  '/images/pages/india/product_images/prana_daily_elixir_malt_powder/elixir_1.JPG',
  '/images/pages/india/product_images/prana_daily_elixir_malt_powder/NYR04351.JPG',
  '/images/pages/india/product_images/prana_daily_elixir_malt_powder/products_6.JPG',
  '/images/pages/india/product_images/prana_daily_elixir_malt_powder/NYR04428.JPG',
  '/images/pages/india/product_images/prana_daily_elixir_malt_powder/NYR04228.JPG',
];

export default function PranaElixir() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ backgroundColor: 'var(--background-pink)' }}>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 lg:py-24">

        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <p
            className="rubik-regular font-bold text-[10px] tracking-[0.3em] uppercase mb-3"
            style={{
              color: 'var(--foreground-pink)',
              opacity: visible ? 0.7 : 0,
              transition: 'opacity 0.6s ease-out',
            }}
          >
            FEATURED PRODUCT
          </p>
          <h2
            className="afacad-regular text-4xl md:text-5xl lg:text-6xl uppercase mb-5"
            style={{
              color: 'var(--foreground-pink)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(22px)',
              transition: 'opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s',
            }}
          >
            Prana Elixir
          </h2>
          
        </div>

        {/* Video + Text */}
        <div
          className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center justify-center mb-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out 0.3s, transform 0.7s ease-out 0.3s',
          }}
        >
          {/* YouTube embed */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/sEr7nIzEEbM"
                title="Prana Elixir — Haritachala Organics"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* Text card */}
          <div className="w-full lg:w-1/2 flex">
            <div
              className="w-full bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col justify-center"
              style={{ borderTop: '4px solid var(--foreground-pink)' }}
            >
              <p
                className="rubik-regular text-[10px] tracking-[0.28em] uppercase mb-4 font-bold"
                style={{ color: 'var(--foreground-pink)' }}
              >
                ABOUT THE MALT
              </p>
              <p
                className="rubik-light text-sm md:text-base leading-relaxed mb-5"
                style={{ color: 'var(--foreground-pink)' }}
              >
                Rooted in a family recipe passed down through generations, Prana Elixir was first prepared as
                a daily ritual to restore strength and vitality. Each batch is sprouted naturally, slow
                sun-dried, lightly toasted, and gently ground — seven ingredients working in harmony under
                the guidance of a Siddha doctor and nutritionist.
              </p>
              <p
                className="rubik-regular text-[10px] tracking-[0.28em] uppercase mb-3 font-bold"
                style={{ color: 'var(--foreground-pink)' }}
              >
                HOW TO PREPARE
              </p>
              <p
                className="rubik-light text-sm md:text-base leading-relaxed mb-5"
                style={{ color: 'var(--foreground-pink)' }}
              >
                Boil 200 ml of water. Mix 1 tablespoon of Prana Elixir with a little water until smooth,
                then stir into boiling water until it thickens. Add cardamom, saffron, or blue pea flower
                for infusion. Sweeten as desired — or use the malt to make soft dosas or banana pancakes.
              </p>
              <p
                className="alegreya-italic text-base md:text-lg"
                style={{ color: 'var(--foreground-pink)', opacity: 0.7 }}
              >
                Nourishment made with intention — shared with love.
              </p>
            </div>
          </div>
        </div>

        {/* Image gallery */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out 0.45s, transform 0.7s ease-out 0.45s',
          }}
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={src}
                alt={`Prana Elixir ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
