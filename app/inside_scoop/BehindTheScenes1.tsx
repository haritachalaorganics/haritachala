'use client';

import Image from 'next/image';
import Button from '@/components/Button';
import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';

export default function BehindTheScenes1() {
  return (
    <section className="bg-[var(--background-pink)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* Title */}
        <SlideUp>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="afacad-regular text-3xl md:text-4xl text-[var(--foreground-pink)] mb-6 uppercase text-center sm:text-center md:text-center">
              The Inside Scoop
            </h2>
            <div className="w-full h-[1px] bg-[var(--foreground-pink)]"></div>
          </div>
        </SlideUp>

        {/* First Card - Bakery Beginnings Documentary */}
        <FadeIn delay={0.2}>
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6 md:mb-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content - LEFT side */}
            <div className="space-y-6 order-2 md:order-1">
              <h3 className="afacad-regular text-2xl md:text-3xl text-[var(--foreground-pink)] text-center sm:text-center md:text-center lg:text-left">
                Bakery Beginnings Documentary
              </h3>
              <div className="space-y-4 rubik-light text-base md:text-lg text-[var(--foreground-pink)] leading-relaxed text-center sm:text-center md:text-center lg:text-left">
                <p>
                  Step into the heart of Haritachala Organics, where flour flies, laughter echoes, and every loaf is made with devotion. Our behind-the-scenes moments share the process that brings our offerings to life.
                </p>
              </div>

              {/* Button */}
              <div className="pt-4 flex justify-center lg:justify-start">
                <Button
                  buttonOutlineColor="var(--foreground-pink)"
                  buttonText="WATCH ON YOUTUBE"
                  href="https://www.youtube.com/watch?v=Y6curd_tVNs"
                />
              </div>
            </div>

            {/* YouTube Video - RIGHT side */}
            <div className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] order-1 md:order-2">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/Y6curd_tVNs"
                title="Haritachala Baking Process"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          </div>
        </FadeIn>

        {/* Second Card - Designs Album */}
        <FadeIn delay={0.3}>
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6 md:mb-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image - LEFT side */}
            <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px]">
              <Image
                src="/images/pages/inside_scoop/inside_scoop.bTS.1.png"
                alt="Behind The Scenes"
                fill
                className="object-contain rounded-lg"
              />
            </div>

            {/* Text Content - RIGHT side */}
            <div className="space-y-6">
              <h3 className="afacad-regular text-2xl md:text-3xl text-[var(--foreground-pink)] text-center sm:text-center md:text-center lg:text-left">
                Designs Album
              </h3>
              <div className="space-y-4 rubik-light text-base md:text-lg text-[var(--foreground-pink)] leading-relaxed text-center sm:text-center md:text-center lg:text-left">
                <p>
                  Every design—from our product packaging to our flyers—is crafted with care to reflect the sincerity and devotion of Haritachala Organics.
                </p>
              </div>

              {/* Button */}
              <div className="pt-4 flex justify-center lg:justify-start">
                <Button
                  buttonOutlineColor="var(--foreground-pink)"
                  buttonText="VIEW ALBUM"
                  href="https://photos.app.goo.gl/wgJMa4YtGeLCfiVS7"
                />
              </div>
            </div>
          </div>
          </div>
        </FadeIn>

        {/* Third Card - Bakery Beginnings Newsletter */}
        <FadeIn delay={0.4}>
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mt-6 md:mt-8">
          <div className="space-y-6">
            {/* Title */}
            <h3 className="afacad-regular text-2xl md:text-3xl text-[var(--foreground-pink)] text-center">
              Bakery Beginnings Newsletter
            </h3>

            {/* PDF Viewer - Desktop */}
            <div className="hidden md:block relative w-full h-[600px] lg:h-[700px]">
              <iframe
                src="/pdfs/bakery_newsletter_1.pdf#view=FitH"
                className="w-full h-full rounded-lg border-2 border-gray-200"
                title="Bakery Beginnings Newsletter"
              />
            </div>

            {/* Mobile Preview - Shows download prompt */}
            <div className="md:hidden space-y-4">
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8 text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-[var(--foreground-pink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p className="rubik-light text-[var(--foreground-pink)] mb-2">
                  PDF viewing works best on larger screens
                </p>
                <p className="rubik-light text-sm text-gray-600">
                  Download the newsletter to view on your device
                </p>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-center pt-4">
              <Button
                buttonOutlineColor="var(--foreground-pink)"
                buttonText="DOWNLOAD PDF"
                href="/pdfs/bakery_newsletter_1.pdf"
              />
            </div>
          </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
