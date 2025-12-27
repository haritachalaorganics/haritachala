'use client';

import Image from 'next/image';
import SlideUp from '@/components/animations/SlideUp';
import { useEffect, useRef } from 'react';

export default function MenuHeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 8) {
        video.currentTime = 0;
        video.play();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] lg:h-[85vh] overflow-hidden bg-white" style={{ backgroundColor: 'var(--background-pink)' }}>
      {/* Hero Video - All Screen Sizes */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src="/images/pages/our_products/ourProducts.heroSectionVideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* White Gradient Overlay for Navbar */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/85 via-white/50 to-transparent pointer-events-none z-10" />

      {/* Hero Text Content - Visible on all screens, positioned at bottom */}
      <div className="relative z-20 h-full flex items-end justify-center px-4 pb-6 md:pb-8 lg:pb-10">
        <SlideUp delay={0.3}>
          <div className="text-center max-w-4xl">
            
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
