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
            <div className="text-center">
              <h2 className="afacad-regular text-3xl md:text-4xl lg:text-4xl text-[var(--foreground-pink)] uppercase mb-6 text-center sm:text-center md:text-center">
                The Giggling Geckos
              </h2>
            </div>
          </SlideUp>
          <div className="w-full h-[1px] bg-[var(--foreground-pink)] mb-8 md:mb-10"></div>
          
          <FadeIn delay={0.5}>
            <div className="space-y-6 rubik-light text-base md:text-lg text-[var(--foreground-pink)] leading-relaxed mb-10 text-center sm:text-center md:text-center">
              <p>
                Haritachala Bakery began with a group of us who met at a summer camp at Haritachala in 2023—fondly known as the Giggling Geckos. What started as friendship and laughter has grown into a shared passion for creating and giving back.
              </p>
              
              <p>
                Learn more about us and the journey that brought us here.
              </p>
            </div>
          </FadeIn>

          <SlideUp delay={0.7}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                buttonText="Living in Laughter Website"
                buttonOutlineColor="#C4735A"
                href="https://livinginlaughter.squarespace.com/"
                openInNewTab={true}
              />
              
              <Button 
                buttonText="Our YouTube Channel"
                buttonOutlineColor="#C4735A"
                href="https://www.youtube.com/@724Giggling.Geckos"
                openInNewTab={true}
              />
            </div>
          </SlideUp>
        </ScaleIn>
      </div>
    </section>
  );
}
