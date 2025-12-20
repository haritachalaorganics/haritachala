import Image from 'next/image';
import Button from '@/components/Button';

export default function BehindTheScenes1() {
  return (
    <section className="bg-[var(--background-pink)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* Title */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="afacad-regular text-3xl md:text-4xl text-[var(--foreground-pink)] mb-4 uppercase">
            Behind the Scenes
          </h2>
        </div>

        {/* First Card */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6 md:mb-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image - LEFT side */}
            <div className="relative w-full h-[250px] md:h-[300px] lg:h-[350px]">
              <Image
                src="/images/pages/inside_scoop/inside_scoop.bTS.1.png"
                alt="Behind The Scenes"
                fill
                className="object-contain rounded-lg"
              />
            </div>

            {/* Text Content - RIGHT side */}
            <div className="space-y-6">
              <div className="space-y-4 afacad-regular text-base md:text-lg text-[var(--foreground-pink)] leading-relaxed">
                <p>
                  Every design—from our product packaging to our flyers—is crafted with care to reflect the sincerity and devotion of Haritachala Organics.
                </p>
              </div>

              {/* Button */}
              <div className="pt-4">
                <Button
                  buttonOutlineColor="var(--foreground-pink)"
                  buttonText="VIEW ALBUM"
                  href="https://photos.app.goo.gl/wgJMa4YtGeLCfiVS7"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Card */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content - LEFT side */}
            <div className="space-y-6 order-2 md:order-1">
              <div className="space-y-4 afacad-regular text-base md:text-lg text-[var(--foreground-pink)] leading-relaxed">
                <p>
                  Step into the heart of Haritachala Organics, where flour flies, laughter echoes, and every loaf is made with devotion. Our behind-the-scenes moments share the process that brings our offerings to life.
                </p>
              </div>

              {/* Button */}
              <div className="pt-4">
                <Button
                  buttonOutlineColor="var(--foreground-pink)"
                  buttonText="VIEW HERE"
                  href=""
                />
              </div>
            </div>

            {/* Image - RIGHT side */}
            <div className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] order-1 md:order-2">
              <Image
                src="/images/pages/inside_scoop/inside_scoop.bTS.2.png"
                alt="Haritachala Baking Process"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Third Card - Year Reflection */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mt-6 md:mt-8">
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
                  href="https://drive.google.com/file/d/1DOfvzgUS4kN4xyCdV5mI_MlqlhF9Bplh/view?usp=sharing"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
