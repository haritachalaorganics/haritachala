import Image from 'next/image';
import Button from '@/components/Button';

export default function BehindTheScenes3() {
  return (
    <section className="bg-[var(--background-pink)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image - LEFT side */}
            <div className="relative w-full h-[250px] md:h-[300px] lg:h-[350px]">
              <Image
                src="/images/pages/inside_scoop/inside_scoop.bTS.3.png"
                alt="Year Reflection"
                fill
                className="object-contain rounded-lg"
              />
            </div>

            {/* Text Content - RIGHT side */}
            <div className="space-y-6">
              <div className="space-y-4 afacad-regular text-base md:text-lg text-[var(--foreground-pink)] leading-relaxed">
                <p>
                  A reflection on a year in the life of building Haritachala Bakery—this video captures the heart, growth, and joy behind our journey. From the first idea to the many hands that shaped it, we invite you to take a glimpse into how it all came to life.
                </p>
              </div>

              {/* Button */}
              <div className="pt-4">
                <Button
                  buttonOutlineColor="var(--foreground-pink)"
                  buttonText="VIEW HERE"
                  href="/menu"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
