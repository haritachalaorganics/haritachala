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
      <div className="relative z-20 h-full flex items-start pt-36 justify-center px-4 md:hidden">
        <Stagger className="text-center max-w-4xl">
          <StaggerItem>
            <h1 className="alegreya-regular text-4xl text-white mb-4 text-center sm:text-center md:text-center">
              cultivating <span className="alegreya-italic">connection</span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <h2 className="alegreya-regular text-4xl text-white mb-8 text-center sm:text-center md:text-center">
              one <span className="alegreya-italic">offering</span> at a time
            </h2>
          </StaggerItem>
          
          {/* Buttons */}
          <StaggerItem>
            <div className="flex flex-col gap-4 items-center sm:items-center md:items-center">
              <a href="/order" className="rubik-bold w-44 px-6 py-2.5 border-2 border-[#645DAB] text-[#645DAB] bg-transparent uppercase text-base hover:bg-[#645DAB] hover:text-white transition-all inline-block text-center sm:text-center md:text-center rounded-lg">
                Order Now
              </a>
              <a href="/products" className="rubik-bold w-44 px-6 py-2.5 border-2 border-[#645DAB] text-[#645DAB] bg-transparent uppercase text-base hover:bg-[#645DAB] hover:text-white transition-all inline-block text-center sm:text-center md:text-center rounded-lg">
                Our Products
              </a>
            </div>
          </StaggerItem>
        </Stagger>
      </div>

      {/* Hero Text and Buttons - Only visible on large screens */}
      <div className="hidden md:flex relative z-20 h-full items-end pb-6 md:pb-8 lg:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Stagger className="max-w-2xl">
            <StaggerItem>
              <h1 className="alegreya-regular text-3xl md:text-4xl lg:text-5xl text-white mb-2 text-center sm:text-center md:text-center lg:text-left">
                cultivating <span className="alegreya-italic">connections</span>
              </h1>
            </StaggerItem>
            <StaggerItem>
              <h2 className="alegreya-regular text-3xl md:text-4xl lg:text-5xl text-white mb-6 md:mb-8 text-center sm:text-center md:text-center lg:text-left">
                one <span className="alegreya-italic">offering</span> at a time
              </h2>
            </StaggerItem>
            
            {/* Buttons */}
            <StaggerItem>
              <div className="flex gap-4 md:gap-6 justify-center sm:justify-center md:justify-center lg:justify-start">
                <a href="/order" className="rubik-bold w-44 md:w-52 px-6 md:px-8 py-2.5 md:py-3 border-2 border-[#645DAB] lg:border-[#FFDCDC] text-[#645DAB] lg:text-[#FFDCDC] bg-transparent uppercase text-base md:text-lg hover:bg-[#645DAB] lg:hover:bg-[#FFDCDC] hover:text-white lg:hover:text-[#C4735A] transition-all inline-block text-center sm:text-center md:text-center rounded-lg">
                  Order Now
                </a>
                <a href="/products" className="rubik-bold w-44 md:w-52 px-6 md:px-8 py-2.5 md:py-3 border-2 border-[#645DAB] lg:border-[#FFDCDC] text-[#645DAB] lg:text-[#FFDCDC] bg-transparent uppercase text-base md:text-lg hover:bg-[#645DAB] lg:hover:bg-[#FFDCDC] hover:text-white lg:hover:text-[#C4735A] transition-all inline-block text-center sm:text-center md:text-center rounded-lg">
                  Our Products
                </a>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
