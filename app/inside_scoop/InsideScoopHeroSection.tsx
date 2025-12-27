'use client';

import Image from 'next/image';
import SlideUp from '@/components/animations/SlideUp';
import Stagger from '@/components/animations/Stagger';
import StaggerItem from '@/components/animations/StaggerItem';

export default function InsideScoopHeroSection() {
  return (
    <section className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden">
      {/* Hero Video - All screens */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-top"
        >
          <source src="/images/pages/inside_scoop/insideScoop.heroSectionVideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* White Gradient Overlay for Navbar */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/85 via-white/50 to-transparent pointer-events-none z-10" />

      {/* Hero Text Content - Bottom of hero section */}
      <div className="relative z-20 h-full flex items-end justify-center px-4 pb-8 md:pb-12 lg:pb-16">
        <SlideUp delay={0.3}>
          <div className="text-center max-w-4xl mb-8 md:mb-12">
            <h1 className="alegreya-regular text-3xl md:text-4xl lg:text-5xl text-white text-center sm:text-center md:text-center">
            </h1>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
