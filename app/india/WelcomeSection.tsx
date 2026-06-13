"use client";

export default function WelcomeSection() {
  return (
    <section
      id="we-are-haritachala"
      className="w-full py-10 md:py-20 lg:py-24 -mt-1 relative z-10"
      style={{ backgroundColor: 'var(--background-pink)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <h2
              className="afacad-regular text-3xl md:text-4xl lg:text-5xl uppercase text-center lg:text-left mb-6"
              style={{ color: 'var(--foreground-pink)' }}
            >
              We are Haritachala Organics
            </h2>

            <p
              className="rubik-light text-base md:text-lg text-center lg:text-left"
              style={{ color: 'var(--foreground-pink)' }}
            >
              100% of proceeds directly support Haritachala, our Sai Baba temple, spiritual retreats,
              our biodiverse organic farm, and the livelihoods of rural women.
            </p>

            <p
              className="rubik-light text-base md:text-lg text-center lg:text-left mt-4"
              style={{ color: 'var(--foreground-pink)' }}
            >
              This page lists Haritachala Organics products currently available in Tiruvannamalai for
              pickup at Haritachala and for national shipping in India. 
            </p>

            <p
              className="alegreya-italic text-base md:text-lg text-center lg:text-left mt-4"
              style={{ color: 'var(--foreground-pink)' }}
            >
              For purchase inquiries, please contact us on WhatsApp at{' '}
              <a
                href="https://wa.me/916369728545"
                className="underline hover:opacity-75 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                +91 63697 28545
              </a>
              . We also welcome you to visit us at Sri Sainathuni Dhyana Mandiram, Tamil Nadu, India.
            </p>
          </div>

          <div className="relative w-full rounded-2xl overflow-hidden shadow-lg max-h-[300px] md:max-h-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster="/images/pages/india/general_images/products_1.JPG"
              className="block w-full h-auto"
            >
              <source src="/images/pages/india/welcomeToHaritachala.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
