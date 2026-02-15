export default function IndiaHeroSection() {
  return (
    <section
      className="relative w-full h-[70vh] md:h-[80vh] lg:h-[85vh] overflow-hidden"
      style={{ backgroundColor: 'var(--background-pink)' }}
    >
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          playsInline
          className="block w-full h-full object-cover object-center"
        >
          <source src="/images/pages/india/india_heroSection.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/85 via-white/50 to-transparent pointer-events-none z-10" />
    </section>
  );
}