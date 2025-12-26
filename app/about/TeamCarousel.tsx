'use client';

import { useRef, useState, useEffect } from 'react';
import TeamMemberCard from './TeamMemberCard';
import ScrollButton from '@/components/ScrollButton';
import SlideUp from '@/components/animations/SlideUp';
import FadeIn from '@/components/animations/FadeIn';

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image?: string | object;
}

interface TeamCarouselProps {
  teamMembers: TeamMember[];
}

export default function TeamCarousel({ teamMembers }: TeamCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

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
      const scrollAmount = 420; // Card width + gap
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
    <section className="bg-[var(--background-pink)] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp>
          <div className="text-center">
            <h2 className="afacad-regular text-3xl md:text-4xl lg:text-4xl text-[var(--foreground-pink)] uppercase mb-6 text-center sm:text-center md:text-center">
              Meet Our Team
            </h2>
            <div className="w-full h-[1px] bg-[var(--foreground-pink)] mb-8 md:mb-10"></div>
          </div>
        </SlideUp>

        <FadeIn delay={0.3}>
          <div className="relative">
          {/* Left Scroll Button */}
          {showLeftButton && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20">
              <ScrollButton 
                direction="left" 
                onClick={() => scroll('left')}
                buttonColor="#C4735A"
                arrowColor="#FFFFFF"
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
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                position={member.position}
                bio={member.bio}
                image={typeof member.image === 'string' ? member.image : undefined}
              />
            ))}
          </div>

          {/* Right Scroll Button */}
          {showRightButton && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20">
              <ScrollButton 
                direction="right" 
                onClick={() => scroll('right')}
                buttonColor="#C4735A"
                arrowColor="#FFFFFF"
              />
            </div>
          )}

          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
