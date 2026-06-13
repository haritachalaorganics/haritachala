'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import ScrollButton from '@/components/ScrollButton';
import SlideUp from '@/components/animations/SlideUp';
import FadeIn from '@/components/animations/FadeIn';

export default function LearnMoreSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const articles = [
    {
      title: 'Self Sustainability at Haritachala',
      url: 'https://www.livinginlaughter.org/self-sustainability',
      image: '/images/pages/learn_more_articles/Sustainability.jpg',
    },
    {
      title: 'How Sustainable Cooking is Practiced at Haritachala',
      url: 'https://www.livinginlaughter.org/sustainable-cooking',
      image: '/images/pages/learn_more_articles/sustainableCooking.jpg',
    },
    {
      title: 'The Beginnings of the Haritachala Bakery',
      url: 'https://www.livinginlaughter.org/hasi-bakery',
      image: '/images/pages/learn_more_articles/begginingsofhcbakery.jpg',
    },
    {
      title: "Meeting the Staff of Haritachala",
      url: 'https://www.livinginlaughter.org/staff-meeting',
      image: '/images/pages/learn_more_articles/staffmeeting.jpg',
    },
    {
      title: 'Summer Camp Daily Blogposts',
      url: 'https://www.livinginlaughter.org/summer-camp#camp',
      image: '/images/pages/learn_more_articles/summercamp.png',
    },
    {
      title: 'Unique Layered Mulching at Haritachala',
      url: 'https://www.livinginlaughter.org/layered-mulching',
      image: '/images/pages/learn_more_articles/layeredMulching.jpg',
    },
  ];

  // Check scroll position to show/hide buttons
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Card width + gap
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="bg-[var(--background-purple)] py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <SlideUp>
          <h2 className="afacad-regular text-3xl md:text-4xl text-white mb-6 uppercase text-center">
            Learn More about Haritachala
          </h2>
        </SlideUp>
        <div className="w-full h-[1px] bg-white mb-8 md:mb-10"></div>

        {/* Carousel Container */}
        <FadeIn delay={0.2}>
          <div className="relative">
            {/* Left Scroll Button */}
            {showLeftButton && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20">
                <ScrollButton 
                  direction="left" 
                  onClick={() => scroll('left')}
                  buttonColor="#FFFFFF"
                  arrowColor="var(--foreground-purple)"
                />
              </div>
            )}

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onScroll={checkScroll}
              className={`flex gap-6 overflow-x-auto scrollbar-hide px-4 py-8 ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {articles.map((article, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[280px] md:w-[300px]"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col justify-between transition-all duration-300 hover:shadow-xl">
                    <div className="relative w-full h-[180px] mb-4">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 280px, 300px"
                      />
                    </div>
                    <div className="px-6 pb-6 flex flex-col justify-between flex-grow">
                      <h3 className="afacad-regular text-xl md:text-2xl text-[var(--foreground-purple)] text-center mb-6">
                        {article.title}
                      </h3>
                      <div className="flex justify-center">
                        <Button
                          buttonOutlineColor="var(--foreground-purple)"
                          buttonText="READ ARTICLE"
                          href={article.url}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Scroll Button */}
            {showRightButton && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20">
                <ScrollButton 
                  direction="right" 
                  onClick={() => scroll('right')}
                  buttonColor="#FFFFFF"
                  arrowColor="var(--foreground-purple)"
                />
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
