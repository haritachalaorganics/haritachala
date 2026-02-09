'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import SlideUp from '@/components/animations/SlideUp';
import FadeIn from '@/components/animations/FadeIn';

export default function NewProductsAlert() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showUnmute, setShowUnmute] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const tryPlay = async () => {
            try {
              videoEl.muted = false;
              setIsMuted(false);
              await videoEl.play();
              setShowUnmute(false);
            } catch (error) {
              videoEl.muted = true;
              setIsMuted(true);
              await videoEl.play().catch(() => undefined);
              setShowUnmute(true);
            }
          };

          tryPlay();
          observer.disconnect();
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(videoEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleUnmute = async () => {
    const videoEl = videoRef.current;
    if (!videoEl) {
      return;
    }

    videoEl.muted = false;
    setIsMuted(false);
    setShowUnmute(false);

    await videoEl.play().catch(() => undefined);
  };

  return (
    <section className="w-full py-10 md:py-12" style={{ backgroundColor: '#FFDCDC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="w-full bg-white rounded-2xl shadow-lg px-4 py-5 md:px-6 md:py-6">
            <SlideUp>
              <div className="text-center">
                <h2 className="afacad-regular text-2xl md:text-3xl lg:text-3xl text-[#C4735A] mb-3 text-center sm:text-center md:text-center">
                  NEW PRODUCTS ALERT!
                </h2>
              </div>
            </SlideUp>
            <div className="w-full h-[1px] bg-[#C4735A] mb-5"></div>
            <div className="grid gap-6 md:gap-8 md:grid-cols-[1.05fr_1fr] items-center">
              <div className="text-[#C4735A] space-y-3 text-center md:text-left">
                <p className="rubik-light text-base md:text-lg leading-relaxed">
                  Our new artisanal nut butters are here - creamy, small-batch, and made with simple ingredients. Try the cacao cashew, coconut cardamom, or pistachio cashew flavors and order a trio or your favorite jar.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-1">
                  <Button
                    buttonOutlineColor="#C4735A"
                    buttonText="View Our Products"
                    href="/product"
                    className="w-auto min-w-[140px] px-4 py-2 text-xs leading-none"
                  />
                  <Button
                    buttonOutlineColor="#C4735A"
                    buttonText="Order Now"
                    href="/order"
                    className="w-auto min-w-[140px] px-4 py-2 text-xs leading-none"
                  />
                </div>
              </div>

              <FadeIn delay={0.2} duration={0.8}>
                <div className="relative w-full max-w-lg md:max-w-none overflow-hidden rounded-xl bg-white justify-self-center md:justify-self-end">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    muted={isMuted}
                  >
                    <source src="/featured/nutbuttertasting.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {showUnmute && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <button
                        type="button"
                        onClick={handleUnmute}
                        className="rubik-regular px-4 py-2 rounded-full bg-white text-[#C4735A] text-xs md:text-sm uppercase tracking-wide shadow"
                        aria-label="Unmute video"
                      >
                        Tap to unmute
                      </button>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
