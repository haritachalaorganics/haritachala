'use client';

import Image from 'next/image';
import Button from '../../components/Button';
import SlideUp from '@/components/animations/SlideUp';
import FadeIn from '@/components/animations/FadeIn';
import ScaleIn from '@/components/animations/ScaleIn';
import Stagger from '@/components/animations/Stagger';
import StaggerItem from '@/components/animations/StaggerItem';

export default function OurPurpose() {
  return (
    <section className="w-full bg-[#D5E7F2] py-12 md:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <SlideUp>
          <h2 className="afacad-regular text-3xl md:text-4xl lg:text-4xl text-[#0D4F78] text-center mb-8 md:mb-10">
            OUR PURPOSE
          </h2>
        </SlideUp>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Text Content */}
          <Stagger className="flex-1 text-[#0D4F78] space-y-6" staggerDelay={0.15}>
            {/* First paragraph */}
            <StaggerItem>
              <p className="rubik-light text-sm md:text-base lg:text-base leading-relaxed">
                Haritachala Organics is a non-profit initiative founded by a devoted team of spiritual seekers and volunteers, as a sincere offering of love, devotion, and gratitude to our Gurus: Shirdi Sai Baba and Sri Sainathuni Sarath Babuji.
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="rubik-light text-sm md:text-base lg:text-base leading-relaxed">
                Located on Girivalam Road at the sacred foothills of Arunachala in Tiruvannamalai, India, Haritachala is more than just a farm - it's a living expression of spirituality, community living, sustainability and empowerment. We offer high-quality, organic, and wholesome products.
              </p>
            </StaggerItem>

            {/* Image Container - Only visible on small screens, positioned after first two paragraphs */}
            <StaggerItem>
              <ScaleIn className="lg:hidden flex flex-col items-center my-6" delay={0.3}>
                <div className="relative w-48 aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/pages/home/homepage.ourpurpose.img.jpg"
                    alt="Haritachala Sainathuni Dhyana Mandiram"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Image Caption */}
                <p className="rubik-light-italic text-[#0D4F78] text-xs mt-3 text-center max-w-xs">
                  Image: Haritachala, Sainathuni Dhyana Mandiram, Tiruvannamalai
                </p>
              </ScaleIn>
            </StaggerItem>

            {/* Remaining paragraphs */}
            <StaggerItem>
              <p className="rubik-light text-sm md:text-base lg:text-base leading-relaxed">
                100% of proceeds directly support our Sai Baba temple, spiritual retreats, our biodiverse organic farm, and the livelihoods of rural women.
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="rubik-light text-sm md:text-base lg:text-base leading-relaxed">
                Inspired by our connection to Haritachala, we blend our love for healthy living, sustainability, baking skills, and design skills in joyful service, crafting each product with Baba and Guruji's blessings to nourish body and soul.
              </p>
            </StaggerItem>

            {/* Button */}
            <StaggerItem>
              <div className="pt-4 flex justify-center lg:justify-start">
                <Button 
                  buttonOutlineColor="#0D4F78"
                  buttonText="Learn More"
                  href="/about"
                />
              </div>
            </StaggerItem>
          </Stagger>

          {/* Image Container - Only visible on large screens */}
          <ScaleIn className="hidden lg:flex flex-1 flex-col items-center max-w-md" delay={0.4}>
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/pages/home/homepage.ourpurpose.img.jpg"
                alt="Haritachala Sainathuni Dhyana Mandiram"
                fill
                className="object-cover"
              />
            </div>
            {/* Image Caption */}
            <FadeIn delay={0.6}>
              <p className="rubik-light-italic text-[#0D4F78] text-xs md:text-sm mt-3 text-center">
                Image: Haritachala, Sainathuni Dhyana Mandiram, Tiruvannamalai
              </p>
            </FadeIn>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}
