import Image from 'next/image';

export default function FAQHeroSection() {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden">
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

      {/* Curved Bottom Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L1440 120L1440 0C1440 0 1080 120 720 120C360 120 0 0 0 0L0 120Z" fill="#FFDCDC"/>
        </svg>
      </div>

      {/* Hero Text Content */}
      
    </section>
  );
}
