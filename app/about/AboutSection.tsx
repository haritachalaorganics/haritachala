'use client';

import Image from 'next/image';
import ScaleIn from '@/components/animations/ScaleIn';
import Stagger from '@/components/animations/Stagger';
import StaggerItem from '@/components/animations/StaggerItem';
import SlideUp from '@/components/animations/SlideUp';

export default function AboutSection() {
  return (
    <>
      <section className="bg-[var(--background-purple)] py-16 md:py-16 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title - Centered on all screens */}
          <SlideUp delay={0.3}>
            <div className="text-center">
              <h2 className="afacad-regular text-3xl md:text-4xl lg:text-4xl text-[var(--foreground-white)] uppercase mb-6 text-center sm:text-center md:text-center">
                About Us
              </h2>
            </div>
          </SlideUp>

          <div className="w-full h-[1px] bg-[var(--foreground-white)] mb-8 md:mb-10"></div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image - Desktop only */}
            <ScaleIn delay={0.2} className="hidden md:block">
              <div className="relative w-full h-[500px] lg:h-[600px]">
                <Image
                  src="/images/pages/about/aboutUs.aboutUs.image1.jpg"
                  alt="About Haritachala Organics"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </ScaleIn>

            {/* Text Content */}
            <Stagger className="space-y-4 rubik-light text-base md:text-lg text-[var(--foreground-white)] leading-relaxed text-center sm:text-center md:text-center lg:text-left" staggerDelay={0.1}>
              <StaggerItem>
                <p>
                  Haritachala Organics was born from a shared vision - to come together to nurture both people and nature as a sincere offering of love, devotion, and gratitude to our Gurus, Sri Shirdi Sai Baba and Sri Sainathuni Sarath Babuji.
                </p>
              </StaggerItem>
              
              <StaggerItem>
                <p>
                  We belong to Saipatham (the path of Sai), as shown by our beloved Guruji, Sri Babuji. Located on Girivalam Road at the sacred foothills of Arunachala in Tiruvannamalai, India, Haritachala is more than just a farm - it's a living expression of spirituality, community living, sustainability and empowerment. United by our shared passions and a deep love for Haritachala, we began this project to keep our connection vibrant and alive.
                </p>
              </StaggerItem>

              {/* Image - Mobile only, positioned after second paragraph */}
              <StaggerItem>
                <ScaleIn className="md:hidden flex flex-col items-center my-6" delay={0.3}>
                  <div className="relative w-48 aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/images/pages/about/aboutUs.aboutUs.image1.jpg"
                      alt="About Haritachala Organics"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Image Caption */}
                  
                </ScaleIn>
              </StaggerItem>
              
              <StaggerItem>
                <p>
                  Inspired by our connection to Haritachala, we blend our love for organic farming, healthy living, sustainability, baking skills, and design skills in joyful service, crafting each product with Baba and Guruji's blessings to nourish body and soul.
                </p>
              </StaggerItem>
              
              <StaggerItem>
                <p>
                  We offer high-quality, organic, and wholesome products.
                </p>
              </StaggerItem>
              
              <StaggerItem>
                <p className="font-semibold">
                  100% of proceeds directly support Haritachala, our Sai Baba temple, spiritual retreats, our biodiverse organic farm, and the livelihoods of rural women.
                </p>
              </StaggerItem>
              
              <StaggerItem>
                <p>
                  We invite you to be part of this journey - where every product tells a story of love, purpose, and sacred connection.
                </p>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </section>
    </>
  );
}
