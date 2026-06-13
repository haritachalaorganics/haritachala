'use client';
import Image from 'next/image';
import Button from '@/components/Button';

export default function NewsletterSection() {
  return (
    <section className="bg-[var(--background-blue)] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image - LEFT side */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <Image
              src="/images/pages/inside_scoop/inside_sccop.newsletter.png"
              alt="Stay Connected"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text Content - RIGHT side */}
          <div className="space-y-6">
            <div>
              <h2 className="afacad-regular text-3xl md:text-4xl text-[var(--foreground-blue)] mb-6 uppercase text-center sm:text-center md:text-center lg:text-left">
                {/* TODO: Extract exact heading from Figma */}
                Stay in the Loop
              </h2>
              <div className="w-full h-[1px] bg-[var(--foreground-blue)] mb-8 md:mb-10"></div>
            </div>
            
            <div className="space-y-4 rubik-light text-base md:text-lg text-[var(--foreground-blue)] leading-relaxed text-center sm:text-center md:text-center lg:text-left">
              <p>
                {/* TODO: Extract exact body text from Figma */}
                Subscribe to our newsletter and be the first to know about new products, 
                special offerings, and exclusive behind-the-scenes content from Haritachala.
              </p>
              
              <p>
                Get monthly updates about our farm activities, seasonal harvests, and the 
                stories of the people who make our products possible.
              </p>
              
              <p>
                Join our community and stay connected to the journey from farm to table.
              </p>
            </div>

            {/* View Here Button */}
            <div className="pt-4">
              <Button
                buttonOutlineColor="var(--foreground-blue)"
                buttonText="VIEW HERE"
                href="https://drive.google.com/file/d/1UB9bU2bWMimaJpqRZzaLYZGyvWamSZF-/view?usp=sharing"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
