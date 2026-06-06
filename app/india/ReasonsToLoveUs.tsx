"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface PanelConfig {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  images: [string, string, string];
  sectionBg: string;
  cardAccentColor: string;
  labelColor: string;
  headingColor: string;
}

const panels: PanelConfig[] = [
  {
    id: 'organic',
    number: '01',
    label: 'PURE & NATURAL',
    title: 'Grown Without Chemicals. Pure from the Source.',
    description:
      'From seed to harvest, every botanical is cultivated without synthetic pesticides, herbicides, or additives. Our blue pea flowers grow in rich, untreated soil — vibrant, pure, and brimming with natural goodness.',
    images: [
      '/images/pages/india/general_images/staff_bluepea_1.JPG',
      '/images/pages/india/general_images/staff_bluepea_2.JPG',
      '/images/pages/india/general_images/staff_bluepea_3.JPG',
    ],
    sectionBg: 'var(--background-pink)',
    cardAccentColor: 'var(--foreground-pink)',
    labelColor: 'var(--foreground-blue)',
    headingColor: 'var(--foreground-pink)',
  },
  {
    id: 'handpicked',
    number: '02',
    label: 'HANDCRAFTED',
    title: 'Every Petal, Hand-Picked with Love.',
    description:
      'No machines, no shortcuts. Every hibiscus flower, herb, and botanical is gently hand-harvested at peak freshness by our dedicated team. This devotion ensures only the finest quality reaches you.',
    images: [
      '/images/pages/india/general_images/staff_hib_1.JPG',
      '/images/pages/india/general_images/staff_hib_2.JPG',
      '/images/pages/india/general_images/staff_hib_3.JPG',
    ],
    sectionBg: 'var(--background-blue)',
    cardAccentColor: 'var(--foreground-blue)',
    labelColor: 'var(--foreground-pink)',
    headingColor: 'var(--foreground-blue)',
  },
  {
    id: 'sundried',
    number: '03',
    label: 'SUN-DRIED',
    title: 'Sun-Kissed. Naturally Preserved.',
    description:
      "Harnessing the generous Indian sun, we slowly sun-dry every product to lock in its nutrients, fragrance, and flavor. No artificial heat, no preservatives — just pure, time-honored drying passed down through generations.",
    images: [
      '/images/pages/india/general_images/staff_drying_1.JPG',
      '/images/pages/india/general_images/staff_drying_2.JPG',
      '/images/pages/india/general_images/staff_drying_3.JPG',
    ],
    sectionBg: 'var(--background-purple)',
    cardAccentColor: 'var(--foreground-purple)',
    labelColor: 'var(--foreground-blue)',
    headingColor: 'var(--foreground-purple)',
  },
  {
    id: 'women',
    number: '04',
    label: 'OUR COMMUNITY',
    title: 'Empowering Women. Rooted in Spirit.',
    description:
      'Every purchase directly supports the livelihoods of the remarkable rural women of Haritachala. With devotion and care, they are the living soul behind every product — nurturing life, community, and one another.',
    images: [
      '/images/pages/india/general_images/staff_praying_1.JPG',
      '/images/pages/india/general_images/staff_praying_2.JPG',
      '/images/pages/india/general_images/staff_smiling.JPG',
    ],
    sectionBg: 'var(--background-pink)',
    cardAccentColor: 'var(--foreground-pink)',
    labelColor: 'var(--foreground-blue)',
    headingColor: 'var(--foreground-pink)',
  },
];

/* ─── Parallax image tile ───────────────────────────────────────────────── */
function ParallaxTile({
  src,
  alt,
  sizes,
  delay = 0,
  isVisible,
}: {
  src: string;
  alt: string;
  sizes: string;
  delay?: number;
  isVisible: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    let rafId = 0;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      // normalised position: 0 = element bottom at viewport top, 1 = element top at viewport bottom
      const progress = 1 - rect.top / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      // translate from +25px (entering) to -25px (leaving) — image feels slower than scroll
      inner.style.transform = `translateY(${(0.5 - clamped) * 50}px)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-2xl shadow-md hover:shadow-xl"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
        transition: `opacity 0.75s ease-out ${delay}s, transform 0.75s ease-out ${delay}s, box-shadow 0.4s ease`,
      }}
    >
      <div
        ref={innerRef}
        style={{
          position: 'absolute',
          top: '-12%',
          bottom: '-12%',
          left: 0,
          right: 0,
          willChange: 'transform',
        }}
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </div>
    </div>
  );
}

/* ─── Single panel ──────────────────────────────────────────────────────── */
function Panel({ panel, index }: { panel: PanelConfig; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const isReversed = index % 2 !== 0;
  const [img1, img2, img3] = panel.images;

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── image column ── */
  const imageColumn = (
    <div
      className="w-full lg:w-[52%] flex-shrink-0 flex flex-col gap-2"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : `translateX(${isReversed ? '60px' : '-60px'})`,
        transition: 'opacity 0.85s ease-out 0.05s, transform 0.85s ease-out 0.05s',
      }}
    >
      {/* large tile */}
      <div className="aspect-[4/3]">
        <ParallaxTile
          src={img1}
          alt={panel.title}
          sizes="(max-width: 1024px) 100vw, 52vw"
          delay={0.1}
          isVisible={isVisible}
        />
      </div>
      {/* two smaller tiles */}
      <div className="flex gap-2">
        <div className="flex-1 aspect-[4/3]">
          <ParallaxTile
            src={img2}
            alt={`${panel.label} detail`}
            sizes="(max-width: 1024px) 50vw, 26vw"
            delay={0.2}
            isVisible={isVisible}
          />
        </div>
        <div className="flex-1 aspect-[4/3]">
          <ParallaxTile
            src={img3}
            alt={`${panel.label} detail`}
            sizes="(max-width: 1024px) 50vw, 26vw"
            delay={0.3}
            isVisible={isVisible}
          />
        </div>
      </div>
    </div>
  );

  /* ── text card ── */
  const textCard = (
    <div
      className="w-full lg:w-[48%] flex items-center"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : `translateX(${isReversed ? '-60px' : '60px'})`,
        transition: 'opacity 0.85s ease-out 0.25s, transform 0.85s ease-out 0.25s',
      }}
    >
      <div
        className="w-full bg-white rounded-3xl shadow-xl overflow-hidden relative"
        style={{ borderTop: `5px solid ${panel.cardAccentColor}` }}
      >
        {/* watermark number */}
        <span
          className="afacad-regular absolute bottom-0 right-4 select-none pointer-events-none leading-none"
          style={{
            fontSize: '9rem',
            color: panel.cardAccentColor,
            opacity: 0.07,
          }}
        >
          {panel.number}
        </span>

        <div className={`relative z-10 p-8 md:p-10 lg:p-12 ${isReversed ? 'text-center lg:text-right' : 'text-center lg:text-left'}`}>
          <p
            className="rubik-regular text-[10px] tracking-[0.28em] uppercase mb-4 font-bold"
            style={{ color: panel.labelColor }}
          >
            {panel.label}
          </p>
          <h3
            className="afacad-regular text-2xl md:text-3xl lg:text-4xl leading-tight mb-5"
            style={{ color: panel.headingColor }}
          >
            {panel.title}
          </h3>
          <p
            className="rubik-light text-base md:text-lg leading-relaxed"
            style={{ color: panel.headingColor, opacity: 0.8 }}
          >
            {panel.description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <article ref={panelRef} style={{ backgroundColor: panel.sectionBg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        <div
          className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}
        >
          {imageColumn}
          {textCard}
        </div>
      </div>
    </article>
  );
}

/* ─── Section header ────────────────────────────────────────────────────── */
function SectionHeader() {
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
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full py-16 md:py-20 text-center"
      style={{ backgroundColor: 'var(--foreground-pink)' }}
    >
      <p
        className="rubik-regular font-bold text-[10px] tracking-[0.3em] uppercase mb-3 text-white/70"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease-out',
        }}
      >
        WHY HARITACHALA
      </p>
      <h2
        className="afacad-regular text-4xl md:text-5xl lg:text-6xl uppercase text-white"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(22px)',
          transition: 'opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s',
        }}
      >
        Reasons to Love Us
      </h2>
      <p
        className="rubik-light text-base md:text-lg mt-5 max-w-xl mx-auto text-white/80"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(22px)',
          transition: 'opacity 0.7s ease-out 0.22s, transform 0.7s ease-out 0.22s',
        }}
      >
        Everything we create is rooted in love, nature, and community.
      </p>
    </div>
  );
}

/* ─── Root export ───────────────────────────────────────────────────────── */
export default function ReasonsToLoveUs() {
  return (
    <>
      <SectionHeader />
      {panels.map((panel, index) => (
        <Panel key={panel.id} panel={panel} index={index} />
      ))}
    </>
  );
}
