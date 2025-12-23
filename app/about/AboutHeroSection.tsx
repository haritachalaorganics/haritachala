'use client';

import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';

export default function AboutHeroSection() {
  return (
    <section className="relative w-full hidden md:block md:h-[70vh] lg:h-[85vh] overflow-hidden">
      {/* Desktop/Large Screen Hero Video */}
      <div className="hidden lg:block absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-top"
        >
          <source src="/images/pages/about/aboutUs.heroSectionVideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Mobile/Tablet Hero Image */}
      <div className="block lg:hidden absolute inset-0">
        <Image
          src="/images/pages/about/aboutUs.heroSection.png"
          alt="About Haritachala Organics"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* White Gradient Overlay for Navbar */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/85 via-white/50 to-transparent pointer-events-none z-10" />

      {/* Hero Text Content - Only visible on small/medium screens */}
      <div className="relative z-20 h-full flex items-center justify-center px-4 pb-20 lg:hidden">
        <SlideUp delay={0.3}>
          <div className="text-center max-w-4xl">
            <h1 className="alegreya-regular text-4xl text-[var(--foreground-blue)] text-center sm:text-center md:text-center">
            </h1>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
