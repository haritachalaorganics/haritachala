import Image from 'next/image';

export default function MenuHeroSection() {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden" style={{ backgroundColor: 'var(--background-pink)' }}>
      {/* Desktop/Large Screen Hero Video */}
      <div className="hidden lg:block absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/images/pages/our_products/ourProducts.heroSectionVideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Mobile/Tablet Hero Image */}
      <div className="block lg:hidden absolute inset-0">
        <Image
          src="/images/pages/our_products/ourProducts.contactUs.png"
          alt="Our Products"
          fill
          className="object-cover object-center"
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
      <div className="relative z-20 h-full flex items-center justify-center px-4">
        <div className="text-center max-w-4xl">
          <h1 className="alegreya-regular text-4xl md:text-5xl lg:text-6xl text-white">
            Our <span className="alegreya-italic">Products</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
