'use client';

import SlideUp from '@/components/animations/SlideUp';
import FadeIn from '@/components/animations/FadeIn';

export default function OrderHeroSection() {
  return (
    <section 
      className="relative w-full pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24"
      style={{ backgroundColor: 'var(--background-blue)' }}
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        <SlideUp>
          <h1 
            className="alegreya-regular text-4xl md:text-5xl lg:text-6xl mb-8 text-center sm:text-center md:text-center"
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
