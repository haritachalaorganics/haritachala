'use client';

import Image from 'next/image';
import SlideUp from '@/components/animations/SlideUp';

export default function MenuHeroSection() {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden" style={{ backgroundColor: 'var(--background-pink)' }}>
      {/* Desktop/Large Screen Hero Video */}
      <div className="hidden lg:block absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-top"
        >
          <source src="/images/pages/our_products/ourProducts.heroSectionVideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Mobile/Tablet Hero Image */}
      <div className="block lg:hidden absolute inset-0">
        <Image
          src="/images/pages/our_products/ourProducts.heroSection.JPG"
          alt="Our Products"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* White Gradient Overlay for Navbar */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/85 via-white/50 to-transparent pointer-events-none z-10" />

      {/* Hero Text Content - Visible on all screens, positioned at bottom */}
      <div className="relative z-20 h-full flex items-end justify-center px-4 pb-6 md:pb-8 lg:pb-10">
        <SlideUp delay={0.3}>
          <div className="text-center max-w-4xl">
            
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
