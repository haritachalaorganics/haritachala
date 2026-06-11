"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const productImagesTop = [
  { src: '/images/pages/india/general_images/products_1.JPG', alt: 'Haritachala organic products' },
  { src: '/images/pages/india/general_images/products_2.JPG', alt: 'Haritachala herbal products' },
  { src: '/images/pages/india/general_images/products_3.JPG', alt: 'Haritachala fresh produce' },
];

const productImagesBottom = [
  { src: '/images/pages/india/general_images/products_4.JPG', alt: 'Haritachala farm products' },
  { src: '/images/pages/india/general_images/products_5.JPG', alt: 'Haritachala wild greens' },
  { src: '/images/pages/india/general_images/products_6.JPG', alt: 'Haritachala seasonal harvest' },
];

function SectionHeader() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full py-10 md:py-20 text-center"
      style={{ backgroundColor: 'var(--foreground-blue)' }}
    >
      <p
        className="rubik-regular font-bold text-[10px] tracking-[0.3em] uppercase mb-3 text-white/70"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease-out' }}
      >
        WHAT WE OFFER
      </p>
      <h2
        className="afacad-regular text-4xl md:text-5xl lg:text-6xl uppercase text-white"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(22px)',
          transition: 'opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s',
        }}
      >
        Our Products
      </h2>
      <p
        className="rubik-light text-base md:text-lg mt-5 max-w-xl mx-auto text-white/80"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(22px)',
          transition: 'opacity 0.7s ease-out 0.22s, transform 0.7s ease-out 0.22s',
        }}
      >
        From our farm and forest to your hands — grown, foraged, and crafted with care.
      </p>
    </div>
  );
}

export default function OurProductsSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SectionHeader />

      <section
        ref={sectionRef}
        style={{ backgroundColor: 'var(--background-blue)' }}
        className="w-full py-10 md:py-20 lg:py-24"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top image strip */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-12">
            {productImagesTop.map((img, i) => (
              <div
                key={img.src}
                className="relative overflow-hidden rounded-xl shadow-md h-[120px] md:h-[200px]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
                  transition: `opacity 0.75s ease-out ${i * 0.15}s, transform 0.75s ease-out ${i * 0.15}s`,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 28vw"
                />
              </div>
            ))}
          </div>

          {/* White card */}
          <div
            className="bg-white rounded-2xl shadow-md px-5 py-6 md:px-10 md:py-10 mb-6 md:mb-12"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.75s ease-out 0.35s, transform 0.75s ease-out 0.35s',
            }}
          >
            <p
              className="rubik-light text-base md:text-lg leading-relaxed"
              style={{ color: 'var(--foreground-blue)' }}
            >
              Haritachala Organics offers prepared{' '}
              <strong className="rubik-medium">wellness products</strong>,{' '}
              <strong className="rubik-medium">herbal powders</strong>,{' '}
              <strong className="rubik-medium">seasonal fruits and vegetables</strong>,{' '}
              <strong className="rubik-medium">wild foraged greens</strong>,{' '}
              <strong className="rubik-medium">fresh herbs</strong>, and{' '}
              <strong className="rubik-medium">herbal teas</strong>. Our products are grown, harvested,
              and prepared with care using organic and regenerative practices, with an emphasis on
              preserving natural potency and working in harmony with the land. From small-batch Amla
              Candy and Prana Elixir to sun-dried herbal powders, fresh-cut herbs, and seasonal
              harvests, each offering reflects our commitment to sustainability, traditional wisdom,
              and wholesome nourishment.
            </p>
          </div>

          {/* Bottom image strip */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {productImagesBottom.map((img, i) => (
              <div
                key={img.src}
                className="relative overflow-hidden rounded-xl shadow-md h-[120px] md:h-[200px]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
                  transition: `opacity 0.75s ease-out ${0.5 + i * 0.15}s, transform 0.75s ease-out ${0.5 + i * 0.15}s`,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 28vw"
                />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
