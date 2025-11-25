'use client';

import Button from '@/components/Button';
import ScaleIn from '@/components/animations/ScaleIn';
import SlideUp from '@/components/animations/SlideUp';
import FadeIn from '@/components/animations/FadeIn';

export default function GigglingGeckos() {
  return (
    <section className="bg-[var(--background-pink)] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* White overlay box */}
        <ScaleIn className="bg-white rounded-lg p-8 md:p-12 lg:p-16 max-w-4xl mx-auto text-center" delay={0.2}>
          <SlideUp delay={0.4}>
            <h2 className="rubik-light text-3xl md:text-4xl lg:text-5xl text-[var(--foreground-pink)] uppercase mb-8">
              The Giggling Geckos
            </h2>
          </SlideUp>
          
          <FadeIn delay={0.5}>
            <div className="space-y-6 rubik-light text-base md:text-lg text-[var(--foreground-pink)] leading-relaxed mb-10">
              <p>
                Haritachala Bakery began with a group of us who met at a summer camp at Haritachala in 2023—fondly known as the Giggling Geckos. What started as friendship and laughter has grown into a shared passion for creating and giving back.
              </p>
              
              <p>
                Learn more about us and the journey that brought us here.
              </p>
            </div>
          </FadeIn>

          <SlideUp delay={0.7}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.livinginlaughter.org/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  buttonText="Living in Laughter Website"
                  buttonOutlineColor="#C4735A"
                />
              </a>
              
              <a 
                href="https://www.youtube.com/@724Giggling.Geckos" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  buttonText="Our YouTube Channel"
                  buttonOutlineColor="#C4735A"
                />
              </a>
            </div>
          </SlideUp>
        </ScaleIn>
      </div>
    </section>
  );
}
