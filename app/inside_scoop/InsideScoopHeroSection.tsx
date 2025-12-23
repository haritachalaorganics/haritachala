import Image from 'next/image';

export default function InsideScoopHeroSection() {
  return (
    <section className="relative w-full h-[70vh] lg:h-screen overflow-hidden">
      {/* Hero Video - All screens */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/images/pages/inside_scoop/insideScoop.heroSectionVideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* White Gradient Overlay for Navbar */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/85 via-white/50 to-transparent pointer-events-none z-10" />

      {/* Curved Bottom Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L1440 120L1440 0C1440 0 1080 120 720 120C360 120 0 0 0 0L0 120Z" fill="#FFDCDC"/>
        </svg>
      </div>

      {/* Hero Text Content - Bottom of hero section */}
      <div className="relative z-20 h-full flex items-end justify-center px-4 pb-8 md:pb-12 lg:pb-16">
        <div className="text-center max-w-4xl mb-8 md:mb-12">
          <h1 className="alegreya-regular text-3xl md:text-4xl lg:text-5xl text-white text-center sm:text-center md:text-center">
          </h1>
        </div>
      </div>
    </section>
  );
}
