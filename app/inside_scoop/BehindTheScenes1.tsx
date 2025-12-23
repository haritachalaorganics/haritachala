import Image from 'next/image';
import Button from '@/components/Button';

export default function BehindTheScenes1() {
  return (
    <section className="bg-[var(--background-pink)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* Title */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="afacad-regular text-3xl md:text-4xl text-[var(--foreground-pink)] mb-6 uppercase text-center sm:text-center md:text-center">
            The Inside Scoop
          </h2>
          <div className="w-full h-[1px] bg-[var(--foreground-pink)]"></div>
        </div>

        {/* First Card - Bakery Beginnings Documentary */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6 md:mb-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content - LEFT side */}
            <div className="space-y-6 order-2 md:order-1">
              <h3 className="afacad-regular text-2xl md:text-3xl text-[var(--foreground-pink)] text-center sm:text-center md:text-center lg:text-left">
                Bakery Beginnings Documentary
              </h3>
              <div className="space-y-4 afacad-regular text-base md:text-lg text-[var(--foreground-pink)] leading-relaxed text-center sm:text-center md:text-center lg:text-left">
                <p>
                  Step into the heart of Haritachala Organics, where flour flies, laughter echoes, and every loaf is made with devotion. Our behind-the-scenes moments share the process that brings our offerings to life.
                </p>
              </div>

              {/* Button */}
              <div className="pt-4 flex justify-center lg:justify-start">
                <Button
                  buttonOutlineColor="var(--foreground-pink)"
                  buttonText="WATCH ON YOUTUBE"
                  href="https://www.youtube.com/watch?v=8EkpI1lRhaw&t=383s"
                />
              </div>
            </div>

            {/* YouTube Video - RIGHT side */}
            <div className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] order-1 md:order-2">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/8EkpI1lRhaw?start=383"
                title="Haritachala Baking Process"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Second Card - Designs Album */}
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
              <div className="space-y-4 afacad-regular text-base md:text-lg text-[var(--foreground-pink)] leading-relaxed">
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

        {/* Third Card - Bakery Beginnings Newsletter */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mt-6 md:mt-8">
          <div className="space-y-6">
            {/* Title */}
            <h3 className="afacad-regular text-2xl md:text-3xl text-[var(--foreground-pink)] text-center">
              Bakery Beginnings Newsletter
            </h3>

            {/* PDF Viewer */}
            <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
              <iframe
                src="/pdfs/bakery_newsletter_1.pdf"
                className="w-full h-full rounded-lg border-2 border-gray-200"
                title="Bakery Beginnings Newsletter"
              />
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
      </div>
    </section>
  );
}
