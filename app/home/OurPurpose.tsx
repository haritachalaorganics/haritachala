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
    <section className="w-full bg-[#D5E7F2] py-16 md:py-16 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <SlideUp>
          <div className="text-center">
            <h2 className="afacad-regular text-3xl md:text-4xl lg:text-4xl text-[#0D4F78] mb-6 text-center sm:text-center md:text-center">
              OUR PURPOSE
            </h2>
          </div>
        </SlideUp>
        <div className="w-full h-[1px] bg-[#0D4F78] mb-8 md:mb-10"></div>

        {/* Content Container */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Text Content */}
          <Stagger className="space-y-6 text-[#0D4F78]" staggerDelay={0.15}>
            {/* First paragraph */}
            <StaggerItem>
              <p className="rubik-light text-base md:text-lg leading-relaxed text-center sm:text-center md:text-center lg:text-left">
                Haritachala Organics is a non-profit initiative founded by a devoted team of spiritual seekers and volunteers, as a sincere offering of love, devotion, and gratitude to our Gurus: Sri Shirdi Sai Baba and Sri Sainathuni Sarath Babuji.
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="rubik-light text-base md:text-lg leading-relaxed text-center sm:text-center md:text-center lg:text-left">
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
              <p className="rubik-light text-base md:text-lg leading-relaxed text-center sm:text-center md:text-center lg:text-left">
                100% of proceeds directly support Haritachala, our Sai Baba temple, spiritual retreats, our biodiverse organic farm, and the livelihoods of rural women.
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="rubik-light text-base md:text-lg leading-relaxed text-center sm:text-center md:text-center lg:text-left">
                Inspired by our connection to Haritachala, we blend our love for healthy living, sustainability, baking skills, and design skills in joyful service, crafting each product with Baba and Guruji's blessings to nourish body and soul.
              </p>
            </StaggerItem>

            {/* Button */}
            <StaggerItem>
              <div className="pt-4 flex justify-center md:justify-start">
                <Button 
                  buttonOutlineColor="#0D4F78"
                  buttonText="Watch Our Story"
                  href="https://www.youtube.com/watch?v=Y6curd_tVNs&t=1s"
                />
              </div>
            </StaggerItem>
          </Stagger>

          {/* Image Container - Only visible on medium screens and up */}
          <ScaleIn className="hidden md:block" delay={0.4}>
            <div className="relative w-full h-[400px] lg:h-[500px]">
              <Image
                src="/images/pages/home/homepage.ourpurpose.img.jpg"
                alt="Haritachala Sainathuni Dhyana Mandiram"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}
