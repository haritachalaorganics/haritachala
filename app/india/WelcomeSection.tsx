"use client";

import { useEffect, useRef, useState } from 'react';
import { FaLeaf, FaShieldAlt, FaHandPaper, FaSun, FaRecycle, FaFemale } from 'react-icons/fa';
import ScrollButton from '@/components/ScrollButton';

const highlights = [
  { label: 'Organic', icon: FaLeaf },
  { label: '100% Chemical Free', icon: FaShieldAlt },
  { label: 'Hand Picked', icon: FaHandPaper },
  { label: 'Sun-dried', icon: FaSun },
  { label: 'Sustainable', icon: FaRecycle },
  { label: 'Women Empowerment', icon: FaFemale },
];

export default function WelcomeSection() {
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
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 220;
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
    <>
      <section className="w-full py-16 md:py-16 lg:py-16 -mt-px" style={{ backgroundColor: 'var(--background-pink)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div>
              <h2
                className="afacad-regular text-3xl md:text-4xl lg:text-5xl uppercase text-center lg:text-left mb-6"
                style={{ color: 'var(--foreground-pink)' }}
              >
                We are Haritachala Organics
              </h2>

              <p className="rubik-light text-base md:text-lg text-center lg:text-left" style={{ color: 'var(--foreground-pink)' }}>
                100% of proceeds directly support Haritachala, our Sai Baba temple, spiritual retreats, our biodiverse organic farm, and the livelihoods of rural women.
              </p>
            </div>

            <div className="w-full max-w-3xl mx-auto lg:mx-0">
              <div className="rounded-2xl overflow-hidden shadow-lg bg-black/10 aspect-video">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover" preload="metadata">
                  <source src="/images/pages/india/welcomeToHaritachala.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-8 md:py-10" style={{ backgroundColor: 'var(--background-blue)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3
            className="afacad-regular text-3xl md:text-4xl lg:text-5xl uppercase text-center mb-6 md:mb-8"
            style={{ color: 'var(--foreground-blue)' }}
          >
            Reasons to love us
          </h3>

          <div className="relative">
            {showLeftButton && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20">
                <ScrollButton
                  direction="left"
                  onClick={() => scroll('left')}
                  buttonColor="var(--foreground-white)"
                  arrowColor="var(--foreground-blue)"
                />
              </div>
            )}

            <div
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onScroll={checkScroll}
              className={`flex items-start justify-start lg:justify-center gap-6 md:gap-8 overflow-x-auto scrollbar-hide px-4 py-4 ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {highlights.map(({ label, icon: Icon }) => (
                <div key={label} className="w-28 md:w-32 text-center flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-white border border-white/70 shadow-sm flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: 'var(--foreground-blue)' }} />
                  </div>
                  <p className="rubik-regular text-sm md:text-base leading-snug" style={{ color: 'var(--foreground-blue)' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {showRightButton && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20">
                <ScrollButton
                  direction="right"
                  onClick={() => scroll('right')}
                  buttonColor="var(--foreground-white)"
                  arrowColor="var(--foreground-blue)"
                />
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