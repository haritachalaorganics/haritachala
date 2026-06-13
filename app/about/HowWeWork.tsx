'use client';

import Image from 'next/image';
import Button from '@/components/Button';
import SlideUp from '@/components/animations/SlideUp';
import ScaleIn from '@/components/animations/ScaleIn';
import Stagger from '@/components/animations/Stagger';
import StaggerItem from '@/components/animations/StaggerItem';

export default function HowWeWork() {
  return (
    <section className="bg-[var(--background-purple)] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp>
          <div className="text-center">
            <h2 className="afacad-regular text-3xl md:text-4xl lg:text-4xl text-[var(--foreground-white)] uppercase mb-6 text-center sm:text-center md:text-center">
              How We Work
            </h2>
            <div className="w-full h-[1px] bg-[var(--foreground-white)] mb-8 md:mb-10"></div>
          </div>
        </SlideUp>
        
        {/* Image - Mobile/Tablet (appears first) */}
        <ScaleIn delay={0.3} className="lg:hidden mb-8">
          <div className="relative w-full h-[300px] md:h-[350px]">
            <Image
              src="/images/pages/about/aboutUs.howWeWork.png"
              alt="How We Work"
              fill
              className="object-contain rounded-lg"
              sizes="100vw"
            />
          </div>
        </ScaleIn>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <Stagger className="space-y-4 rubik-light text-base md:text-lg text-[var(--foreground-white)] leading-relaxed text-center sm:text-center md:text-center lg:text-left" staggerDelay={0.15}>
              <StaggerItem>
                <p>
                  Rooted in our love for Haritachala and guided by the blessings of Baba and Guruji, we approach everything we do as an act of joyful service.
                </p>
              </StaggerItem>
              
              <StaggerItem>
                <p>
                  Our small team, spread across the US and India, brings together diverse skills—from baking to designing to packaging. We meet twice a week on Google Meet to collaborate as a team and bring our ideas to life. These meetings are not just about work—they're a space to strengthen our friendships and nurture our shared spirit.
                </p>
              </StaggerItem>
              
              <StaggerItem>
                <p>
                  Every product is handcrafted in small batches using simple, high-quality ingredients, with care, integrity, and creativity in every step. We strive to make each item feel personal, thoughtful, and full of heart.
                </p>
              </StaggerItem>
            </Stagger>

            <SlideUp delay={0.6}>
              <div className="pt-4 flex justify-center lg:justify-start">
                <Button 
                  href="/inside_scoop"
                  buttonText="Get the Inside Scoop"
                  buttonOutlineColor="#FFFFFF"
                />
              </div>
            </SlideUp>
          </div>

          {/* Image - Desktop */}
          <ScaleIn delay={0.3} className="hidden lg:block">
            <div className="relative w-full h-[400px]">
              <Image
                src="/images/pages/about/aboutUs.howWeWork.png"
                alt="How We Work"
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}
