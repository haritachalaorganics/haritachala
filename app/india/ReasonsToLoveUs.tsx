"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaLeaf, FaShieldAlt, FaHandPaper, FaSun, FaFemale } from 'react-icons/fa';

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
    label: 'CHEMICAL FREE',
    title: '100% Organic and Sustainably Grown',
    description:
      'From seed to harvest, every botanical is grown without synthetic pesticides, herbicides, or chemical additives. Nurtured in living, untreated soil, our products are vibrant, pure, and rich in natural vitality.',
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
    label: 'HANDPICKED',
    title: 'Every Petal, Hand-Picked with Care',
    description:
      'Each flower, herb, and botanical is carefully harvested by hand at the peak of freshness. This attentive process preserves quality, potency, and the natural beauty of every harvest.',
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
    label: 'NATURALLY PRESERVED',
    title: 'Sun-Dried the Traditional Way',
    description:
      'Using the warmth of the natural sun, we gently dry our botanicals to preserve their nutrients, aroma, color, and flavor. Free from artificial heat and preservatives, this time-honored method honors both nature and tradition.',
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
function Panel({ panel, index, onShopNow }: { panel: PanelConfig; index: number; onShopNow?: () => void }) {
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
      {/* large tile — video aspect on mobile, 4/3 on desktop */}
      <div className="aspect-video md:aspect-[4/3]">
        <ParallaxTile
          src={img1}
          alt={panel.title}
          sizes="(max-width: 1024px) 100vw, 52vw"
          delay={0.1}
          isVisible={isVisible}
        />
      </div>
      {/* two smaller tiles — hidden on mobile */}
      <div className="hidden md:flex gap-2">
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
          className="afacad-regular absolute top-0 right-4 select-none pointer-events-none leading-none"
          style={{
            fontSize: '9rem',
            color: panel.cardAccentColor,
            opacity: 0.07,
          }}
        >
          {panel.number}
        </span>

        <div className={`relative z-10 p-6 md:p-10 lg:p-12 ${isReversed ? 'text-center lg:text-right' : 'text-center lg:text-left'}`}>
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
            className="rubik-light text-base md:text-lg leading-relaxed mb-8"
            style={{ color: panel.headingColor, opacity: 0.8 }}
          >
            {panel.description}
          </p>
          {onShopNow && (
            <div className={`flex ${isReversed ? 'justify-center lg:justify-end' : 'justify-center lg:justify-start'}`}>
              <button
                type="button"
                onClick={onShopNow}
                className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full rubik-regular uppercase tracking-widest text-white text-sm transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 shadow-md"
                style={{ backgroundColor: panel.cardAccentColor }}
              >
                Shop Now
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <article ref={panelRef} style={{ backgroundColor: panel.sectionBg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 lg:py-24">
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
const headerFeatures = [
  { Icon: FaLeaf, label: 'Organic' },
  { Icon: FaShieldAlt, label: 'Chemical Free' },
  { Icon: FaHandPaper, label: 'Hand Picked' },
  { Icon: FaSun, label: 'Sun-Dried' },
  { Icon: FaFemale, label: 'Women Empowered' },
];

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
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full py-8 md:py-10 text-center"
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

      <div className="flex flex-nowrap justify-center gap-2 sm:gap-6 md:gap-10 mt-8 px-2 sm:px-6">
        {headerFeatures.map(({ Icon, label }, i) => (
          <div
            key={label}
            className="flex flex-col items-center w-[52px] sm:w-auto"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.6s ease-out ${0.4 + i * 0.12}s, transform 0.6s ease-out ${0.4 + i * 0.12}s`,
            }}
          >
            <div
              className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center mb-2 sm:mb-3"
              style={{ boxShadow: '0 4px 20px rgba(196, 115, 90, 0.25)' }}
            >
              <Icon
                className="text-base sm:text-2xl md:text-3xl"
                style={{ color: 'var(--foreground-pink)' }}
              />
            </div>
            <p className="rubik-regular text-[8px] sm:text-xs md:text-sm text-white/90 text-center leading-tight">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Root export ───────────────────────────────────────────────────────── */
export default function ReasonsToLoveUs({ onShopNow }: { onShopNow?: () => void }) {
  return (
    <>
      <SectionHeader />
      {panels.map((panel, index) => (
        <Panel key={panel.id} panel={panel} index={index} onShopNow={onShopNow} />
      ))}
    </>
  );
}
