'use client';

import Image from 'next/image';
import ScaleIn from '@/components/animations/ScaleIn';
import SlideUp from '@/components/animations/SlideUp';
import FadeIn from '@/components/animations/FadeIn';

export default function OurInspiration() {
  return (
    <section className="bg-[var(--background-blue)] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title - outside white box */}
        <SlideUp delay={0.2}>
          <div className="text-center mb-8">
            <h2 className="afacad-regular text-2xl md:text-3xl lg:text-4xl text-[var(--foreground-blue)] uppercase mb-6 text-center sm:text-center md:text-center">
              Our Inspiration
            </h2>
          </div>
        </SlideUp>
        <div className="w-full h-[1px] bg-[var(--foreground-blue)] mb-8 md:mb-10"></div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* First Card - Sri Babuji Quote */}
          <ScaleIn className="bg-white rounded-lg p-6 md:p-8" delay={0.3}>
            <div className="space-y-6">
              {/* Title */}
              <h3 className="rubik-medium text-xl md:text-2xl text-[var(--foreground-blue)] text-center">
                Sri Sainathuni Sarath Babuji
              </h3>

              {/* Image */}
              <div className="relative w-full h-[250px] md:h-[280px]">
                <Image
                  src="/images/pages/about/aboutUs.OurInspiration.png"
                  alt="Our Inspiration"
                  fill
                  className="object-cover object-top rounded-lg"
                />
              </div>

              {/* Quote */}
              <div className="space-y-4">
                <blockquote className="rubik-light text-base md:text-lg text-[var(--foreground-blue)] leading-relaxed text-center sm:text-center md:text-center">
                  "If you have a talent, it is a gift from Baba. Make it an offering to him, which will be a means of remembering him. It is both an expression and an experience of Baba."
                </blockquote>
                <p className="rubik-light text-sm md:text-base text-[var(--foreground-blue)] text-right">
                  — Sri Babuji
                </p>
              </div>
            </div>
          </ScaleIn>

          {/* Second Card - Saibaba Quote */}
          <ScaleIn className="bg-white rounded-lg p-6 md:p-8" delay={0.4}>
            <div className="space-y-6">
              {/* Title */}
              <h3 className="rubik-medium text-xl md:text-2xl text-[var(--foreground-blue)] text-center">
                Shirdi Sai Baba
              </h3>

              {/* Image */}
              <div className="relative w-full h-[250px] md:h-[280px]">
                <Image
                  src="/images/pages/about/OurInspiration.SaiBaba.updated.JPG"
                  alt="Saibaba of Shirdi"
                  fill
                  className="object-cover object-top rounded-lg"
                />
              </div>

              {/* Quote */}
              <div className="space-y-4">
                <blockquote className="rubik-light text-base md:text-lg text-[var(--foreground-blue)] leading-relaxed">
                  "Have faith and patience. Then I will be always with you wherever you are and at all times."
                </blockquote>
                <p className="rubik-light text-sm md:text-base text-[var(--foreground-blue)] text-right">
                  — Saibaba of Shirdi
                </p>
              </div>
            </div>
          </ScaleIn>

          {/* Third Card - Ammagaru */}
          <ScaleIn className="bg-white rounded-lg p-6 md:p-8" delay={0.5}>
            <div className="space-y-6">
              {/* Title */}
              <h3 className="rubik-medium text-xl md:text-2xl text-[var(--foreground-blue)] text-center">
                Ammagaru
              </h3>

              {/* Image */}
              <div className="relative w-full h-[250px] md:h-[280px]">
                <Image
                  src="/images/pages/about/aboutUs.OurInspiration.Ammagaru.jpeg"
                  alt="Ammagaru"
                  fill
                  className="object-cover object-top rounded-lg"
                />
              </div>

              {/* Text */}
              <div className="space-y-4">
                <p className="rubik-light text-base md:text-lg text-[var(--foreground-blue)] leading-relaxed text-center">
                  Guiding us with unconditional love and blessings
                </p>
                <p className="rubik-light text-sm md:text-base text-[var(--foreground-blue)] text-right">
                </p>
              </div>
            </div>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}
