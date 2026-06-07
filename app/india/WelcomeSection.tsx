"use client";

import { useEffect, useRef } from 'react';
import OurProductsSection from './OurProductsSection';
import ReasonsToLoveUs from './ReasonsToLoveUs';

export default function WelcomeSection() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = heroVideoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (videoElement.currentTime < 6) videoElement.currentTime = 6;
          videoElement.play().catch(() => {});
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
                  href="https://wa.me/916369728545"
                  className="underline hover:opacity-75 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +91 63697 28545
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

      <section className="w-full" style={{ backgroundColor: '#000' }}>
        <video
          ref={heroVideoRef}
          muted
          playsInline
          className="block w-full h-[70vh] object-cover"
          preload="metadata"
        >
          <source src="/images/pages/india/hero_section_india_slideshow.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Our Products */}
      <OurProductsSection />
    </>
  );
}
