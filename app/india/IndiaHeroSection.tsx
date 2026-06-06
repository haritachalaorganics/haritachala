'use client';

import Stagger from '@/components/animations/Stagger';
import StaggerItem from '@/components/animations/StaggerItem';

export default function IndiaHeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src="/images/pages/india/india_products_hero_section.mp4" type="video/mp4" />
      </video>

      {/* left-to-right dark gradient so text is legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />

      {/* top fade blends with navbar */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/85 via-white/50 to-transparent pointer-events-none z-10" />

      {/* Mobile — centered, near top */}
      <div className="relative z-20 h-full flex items-start pt-36 justify-center px-4 md:hidden">
        <Stagger className="text-center max-w-4xl">
          <StaggerItem>
            <h1 className="alegreya-regular text-4xl text-white mb-2 text-center">
              cultivating <span className="alegreya-italic">connection,</span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <h2 className="alegreya-regular text-4xl text-white mb-8 text-center">
              <span className="alegreya-italic">one offering</span> at a time
            </h2>
          </StaggerItem>
          <StaggerItem>
            <div className="flex flex-col gap-4 items-center">
              <a
                href="#products-india"
                className="rubik-bold w-44 px-6 py-2.5 border-2 border-[#FFDCDC] text-[#FFDCDC] bg-transparent uppercase text-base hover:bg-[#FFDCDC] hover:text-[#C4735A] transition-all inline-block text-center rounded-lg"
              >
                Order Now
              </a>
              <a
                href="#we-are-haritachala"
                className="rubik-bold w-44 px-6 py-2.5 border-2 border-[#FFDCDC] text-[#FFDCDC] bg-transparent uppercase text-base hover:bg-[#FFDCDC] hover:text-[#C4735A] transition-all inline-block text-center rounded-lg"
              >
                About Us
              </a>
            </div>
          </StaggerItem>
        </Stagger>
      </div>

      {/* Desktop — bottom-left */}
      <div className="hidden md:flex relative z-20 h-full items-end pb-6 md:pb-8 lg:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Stagger className="max-w-2xl">
            <StaggerItem>
              <h1 className="alegreya-regular text-3xl md:text-4xl lg:text-5xl text-white mb-2 text-center lg:text-left">
                cultivating <span className="alegreya-italic">connections,</span>
              </h1>
            </StaggerItem>
            <StaggerItem>
              <h2 className="alegreya-regular text-3xl md:text-4xl lg:text-5xl text-white mb-6 md:mb-8 text-center lg:text-left">
                <span className="alegreya-italic">one offering</span> at a time
              </h2>
            </StaggerItem>
            <StaggerItem>
              <div className="flex gap-4 md:gap-6 justify-center lg:justify-start">
                <a
                  href="#products-india"
                  className="rubik-bold w-44 md:w-52 px-6 md:px-8 py-2.5 md:py-3 border-2 border-[#FFDCDC] text-[#FFDCDC] bg-transparent uppercase text-base md:text-lg hover:bg-[#FFDCDC] hover:text-[#C4735A] transition-all inline-block text-center rounded-lg"
                >
                  Order Now
                </a>
                <a
                  href="#we-are-haritachala"
                  className="rubik-bold w-44 md:w-52 px-6 md:px-8 py-2.5 md:py-3 border-2 border-[#FFDCDC] text-[#FFDCDC] bg-transparent uppercase text-base md:text-lg hover:bg-[#FFDCDC] hover:text-[#C4735A] transition-all inline-block text-center rounded-lg"
                >
                  About Us
                </a>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
