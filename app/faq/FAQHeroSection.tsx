'use client';

import Image from 'next/image';

export default function FAQHeroSection() {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] lg:h-[85vh] overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/pages/faq/faq.heroSection.jpg"
          alt="FAQ Hero"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* White Gradient Overlay for Navbar */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/85 via-white/50 to-transparent pointer-events-none z-10" />

      {/* Hero Text Content */}
      
    </section>
  );
}
