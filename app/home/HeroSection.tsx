'use client';

import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';
import Stagger from '@/components/animations/Stagger';
import StaggerItem from '@/components/animations/StaggerItem';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Desktop/Large Tablet Hero Video */}
      <div className="hidden md:block absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-top"
        >
          <source src="/images/pages/home/hero_section_video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Mobile/Small Tablet Hero Image */}
      <div className="block md:hidden absolute inset-0">
        <Image
          src="/images/pages/home/homepage.herosection.img.png"
          alt="Haritachala Hero"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>

      {/* White Gradient Overlay for Navbar */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/85 via-white/50 to-transparent pointer-events-none z-10" />

      {/* Hero Text Content - Only visible on small screens */}
      <div className="relative z-20 h-full flex items-start pt-32 justify-center px-4 md:hidden">
        <Stagger className="text-center max-w-4xl">
          <StaggerItem>
            <h1 className="alegreya-regular text-4xl text-white mb-4">
              cultivating <span className="alegreya-italic">connection</span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <h2 className="alegreya-regular text-4xl text-white">
              one <span className="alegreya-italic">offering</span> at a time
            </h2>
          </StaggerItem>
        </Stagger>
      </div>

      {/* Hero Text and Buttons - Only visible on large screens */}
      <div className="hidden md:flex relative z-20 h-full items-end pb-6 md:pb-8 lg:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Stagger className="max-w-2xl">
            <StaggerItem>
              <h1 className="alegreya-regular text-3xl md:text-4xl lg:text-5xl text-white mb-2">
                cultivating <span className="alegreya-italic">connections</span>
              </h1>
            </StaggerItem>
            <StaggerItem>
              <h2 className="alegreya-regular text-3xl md:text-4xl lg:text-5xl text-white mb-6 md:mb-8">
                one <span className="alegreya-italic">offering</span> at a time
              </h2>
            </StaggerItem>
            
            {/* Buttons */}
            <StaggerItem>
              <div className="flex gap-4 md:gap-6">
                <button className="rubik-regular px-6 md:px-8 py-2.5 md:py-3 bg-[#FFDCDC] text-[#C4735A] uppercase text-xs md:text-sm hover:opacity-90 hover:scale-105 transition-all">
                  Learn More
                </button>
                <button className="rubik-regular px-6 md:px-8 py-2.5 md:py-3 bg-[#B3B0D1] text-white uppercase text-xs md:text-sm hover:opacity-90 hover:scale-105 transition-all">
                  Our Products
                </button>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
