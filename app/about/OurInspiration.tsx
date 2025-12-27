'use client';

import Image from 'next/image';
import ScaleIn from '@/components/animations/ScaleIn';
import SlideUp from '@/components/animations/SlideUp';
import FadeIn from '@/components/animations/FadeIn';

export default function OurInspiration() {
  return (
    <section className="bg-[var(--background-purple)] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title - outside white box */}
        <SlideUp delay={0.2}>
          <div className="text-center mb-8">
            <h2 className="afacad-regular text-2xl md:text-3xl lg:text-4xl text-white uppercase mb-6 text-center sm:text-center md:text-center">
              Our Inspiration
            </h2>
          </div>
        </SlideUp>
        <div className="w-full h-[1px] bg-white mb-8 md:mb-10"></div>

        {/* Top Two Cards Container */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
          <ScaleIn className="bg-white rounded-lg p-8 md:p-10" delay={0.4}>
            <div className="space-y-6">
              {/* Title */}
              <h3 className="rubik-medium text-xl md:text-2xl text-[var(--foreground-purple)] text-center uppercase">
                Sri Shirdi Sai Baba
              </h3>

              {/* Image */}
              <div className="relative w-full h-[250px] md:h-[280px]">
                <Image
                  src="/images/pages/about/OurInspiration.SaiBaba.Picture.JPG"
                  alt="Saibaba of Shirdi"
                  fill
                  className="object-cover object-top rounded-lg"
                />
              </div>

              {/* Quote */}
              <div className="space-y-4">
                <blockquote className="rubik-light text-base md:text-lg text-[var(--foreground-purple)] leading-relaxed text-center">
                  "Have faith and patience. Then I will be always with you wherever you are and at all times."
                </blockquote>
                <p className="rubik-light text-base md:text-lg text-[var(--foreground-purple)] text-center">
                  — Saibaba of Shirdi
                </p>
              </div>
            </div>
          </ScaleIn>
          {/* First Card - Sri Babuji Quote */}
          <ScaleIn className="bg-white rounded-lg p-8 md:p-10" delay={0.3}>
            <div className="space-y-6">
              {/* Title */}
              <h3 className="rubik-medium text-xl md:text-2xl text-[var(--foreground-purple)] text-center uppercase">
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
                <blockquote className="rubik-light text-base md:text-lg text-[var(--foreground-purple)] leading-relaxed text-center">
                  "If you have a talent, it is a gift from Baba. Make it an offering to him, which will be a means of remembering him. It is both an expression and an experience of Baba."
                </blockquote>
                <p className="rubik-light text-base md:text-lg text-[var(--foreground-purple)] text-center">
                  — Sri Babuji
                </p>
              </div>
            </div>
          </ScaleIn>
        </div>

        {/* Third Card - Ammagaru (Horizontal Layout) */}
        <ScaleIn className="bg-white rounded-lg p-8 md:p-10" delay={0.5}>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            {/* Image Section */}
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="space-y-4">
                {/* Title */}
                <h3 className="rubik-medium text-xl md:text-2xl text-[var(--foreground-purple)] text-center uppercase">
                  Pujya Ammagaru
                </h3>
                
                {/* Image */}
                <div className="relative w-full h-[250px] md:h-[320px]">
                  <Image
                    src="/images/pages/about/aboutUs.OurInspiration.Ammagaru.jpeg"
                    alt="Ammagaru"
                    fill
                    className="object-cover object-top rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div className="w-full md:w-2/3">
              <p className="rubik-light text-base md:text-lg text-[var(--foreground-purple)] leading-relaxed text-center md:text-left">
                  Pujya Ammagaru, whom we lovingly call Ammama, has led a pious life rooted in devoted seva, dedicating her entire life to serving her Guru. Her life itself is a reflection of devotion, grace, and divine presence. Ammagaru is endlessly encouraging and generously shares her creativity and ideas with us, inspiring us to think beyond limits. With wisdom and discretion, she offers thoughtful feedback on our ideas, gently guiding us.
                <br /><br />
                Ammama is fiercely loving and unwaveringly supportive of the success of the bakery, never saying no, always encouraging us to try new things and believe in our journey. Her strength, blessings, and constant encouragement guide every step we take. Ammagaru's divine life of devotional service continues to inspire us, grounding our work in faith, courage, and love.
              </p>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
