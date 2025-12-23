'use client';

import SlideUp from '@/components/animations/SlideUp';
import FadeIn from '@/components/animations/FadeIn';

export default function OrderHeroSection() {
  return (
    <section 
      className="relative w-full pt-32 pb-24 md:pt-36 md:pb-32 lg:pt-40 lg:pb-40"
      style={{ backgroundColor: 'var(--background-blue)' }}
    >
      {/* White Gradient Overlay for NavBar */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none"></div>

      {/* Curved Bottom Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L1440 120L1440 0C1440 0 1080 120 720 120C360 120 0 0 0 0L0 120Z" fill="var(--background-purple)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        <SlideUp>
          <h1 
            className="alegreya-regular text-4xl md:text-5xl lg:text-6xl mb-4 text-center sm:text-center md:text-center"
            style={{ color: 'var(--foreground-blue)' }}
          >
            Order <span className="alegreya-italic">Now!</span>
          </h1>
        </SlideUp>
        <FadeIn delay={0.2}>
          <p 
            className="rubik-light text-lg md:text-xl max-w-3xl mx-auto text-center sm:text-center md:text-center"
            style={{ color: 'var(--foreground-blue)' }}
          >
            Place your order for our fresh, handcrafted organic products. Orders are accepted monthly—fill out the form below to reserve your favorites!
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
