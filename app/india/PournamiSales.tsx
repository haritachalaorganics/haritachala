'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

const photos = [
  { src: '/images/pages/india/pournami_1.jpeg',         alt: 'Pournami night at Haritachala' },
  { src: '/images/pages/india/pournami_volunteers.JPG', alt: 'Haritachala volunteers at Pournami' },
  { src: '/images/pages/india/pournami_2.jpeg',         alt: 'Full moon stall at Haritachala' },
];

export default function PournamiSales() {
  const [visible, setVisible] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const vid = modalVideoRef.current;
    if (!vid) return;
    if (videoOpen) { vid.currentTime = 0; vid.play().catch(() => {}); }
    else vid.pause();
  }, [videoOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setVideoOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!videoOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [videoOpen]);

  return (
    <section style={{ backgroundColor: 'var(--background-pink)' }}>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 lg:py-24">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <p
            className="rubik-regular font-bold text-[10px] tracking-[0.3em] uppercase mb-3"
            style={{
              color: 'var(--foreground-pink)',
              opacity: visible ? 0.7 : 0,
              transition: 'opacity 0.6s ease-out',
            }}
          >
            MONTHLY FULL MOON EVENT
          </p>
          <h2
            className="afacad-regular text-4xl md:text-5xl lg:text-6xl uppercase mb-4"
            style={{
              color: 'var(--foreground-pink)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(22px)',
              transition: 'opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s',
            }}
          >
            Pournami Sales
          </h2>
          <p
            className="alegreya-italic text-xl md:text-2xl"
            style={{
              color: 'var(--foreground-pink)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(22px)',
              transition: 'opacity 0.7s ease-out 0.2s, transform 0.7s ease-out 0.2s',
            }}
          >
            Open All Night, Under the Full Moon
          </p>
        </div>

        {/* Text card — full width, matching the photo strip below */}
        <div
          className="mb-4 md:mb-5"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out 0.3s, transform 0.7s ease-out 0.3s',
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
            style={{ borderTop: '4px solid var(--foreground-pink)' }}
          >
            <p
              className="rubik-light text-base md:text-lg leading-relaxed mb-4"
              style={{ color: 'var(--foreground-pink)' }}
            >
              Each month on the night of Pournami, Full Moon Night, the mandir remains open all
              night as devotees walk the Giripradhakshina. Our Haritachala Organics stall and
              plant nursery remain open through the night as well, supported by our staff and
              volunteers, offering freshly brewed herbal teas, refreshing drinks, wholesome
              snacks, and herbal botanicals and powders to nourish you along the way.
              Some of our full moon volunteers are pictured below, along with our mandir.
            </p>
            <p
              className="rubik-light text-base md:text-lg leading-relaxed mb-6"
              style={{ color: 'var(--foreground-pink)' }}
            >
              100% of proceeds from our Full Moon Sales directly support Haritachala, our Sai
              Baba temple, spiritual retreats, our biodiverse organic farm, and the livelihoods
              of rural women.
            </p>
            <p
              className="rubik-light text-base md:text-lg leading-relaxed mb-6 text-center"
              style={{ color: 'var(--foreground-pink)' }}
            >
              Watch clips from our Full Moon nights by clicking the button below.
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center gap-3 px-7 py-3 rounded-full rubik-regular uppercase tracking-widest text-sm transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 shadow-md"
                style={{ backgroundColor: 'var(--foreground-pink)', color: 'white' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Here
              </button>
            </div>
          </div>
        </div>

        {/* Photo strip */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out 0.45s, transform 0.7s ease-out 0.45s',
          }}
        >
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              style={{
                aspectRatio: '3 / 2',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
                transition: `opacity 0.75s ease-out ${0.45 + i * 0.12}s, transform 0.75s ease-out ${0.45 + i * 0.12}s`,
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>

      </div>

      {/* Video modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Pournami video"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/75"
            aria-label="Close video"
            onClick={() => setVideoOpen(false)}
          />
          <div className="relative z-10 w-full max-w-sm">
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              className="absolute -top-10 right-0 inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors rubik-regular text-sm uppercase tracking-widest"
              aria-label="Close video"
            >
              <FaTimes size={12} /> Close
            </button>
            <video
              ref={modalVideoRef}
              controls
              muted
              playsInline
              className="block w-full h-auto rounded-2xl shadow-2xl"
            >
              <source src="/images/pages/india/pournami_video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
