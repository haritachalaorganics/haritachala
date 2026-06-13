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
          preload="none"
          poster="/images/pages/inside_scoop/inside_scoop.heroSection.png"
          className="w-full h-full object-cover object-top"
        >
          <source src="/images/pages/inside_scoop/insideScoop.heroSectionVideo.mp4" type="video/mp4" />
        </video>
      </div>


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
