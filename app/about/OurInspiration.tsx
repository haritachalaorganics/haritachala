'use client';

import Image from 'next/image';
import ScaleIn from '@/components/animations/ScaleIn';
import SlideUp from '@/components/animations/SlideUp';
import FadeIn from '@/components/animations/FadeIn';

export default function OurInspiration() {
  return (
    <section className="bg-[var(--background-blue)] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* White container box */}
        <ScaleIn className="bg-white rounded-lg p-8 md:p-12 lg:p-16" delay={0.2}>
          <SlideUp delay={0.4}>
            <h2 className="rubik-light text-3xl md:text-4xl lg:text-5xl text-[var(--foreground-blue)] text-center uppercase mb-12">
              Our Inspiration
            </h2>
          </SlideUp>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image - smaller size */}
            <ScaleIn delay={0.6} className="relative w-full h-[300px] md:h-[350px] lg:h-[400px] order-2 md:order-1">
              <Image
                src="/images/pages/about/aboutUs.OurInspiration.png"
                alt="Our Inspiration"
                fill
                className="object-cover object-top rounded-lg"
              />
            </ScaleIn>

            {/* Quote */}
            <FadeIn delay={0.6} className="flex items-center justify-center order-1 md:order-2">
              <div className="space-y-6">
                <blockquote className="rubik-light text-xl md:text-2xl lg:text-3xl text-[var(--foreground-blue)] leading-relaxed">
                  "If you have a talent, it is a gift from Baba. Make it an offering to him, which will be a means of remembering him. It is both an expression and an experience of Baba."
                </blockquote>
                <p className="rubik-light text-lg md:text-xl text-[var(--foreground-blue)] text-right">
                  — Sri Babuji
                </p>
              </div>
            </FadeIn>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
