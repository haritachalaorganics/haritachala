'use client';

import { IoSearch } from 'react-icons/io5';
import FadeIn from '@/components/animations/FadeIn';

interface ProductSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  backgroundColor?: string;
  accentColor?: string;
  containerPaddingClass?: string;
}

export default function ProductSearch({
  searchTerm,
  onSearchChange,
  backgroundColor = 'var(--background-pink)',
  accentColor = 'var(--foreground-pink)',
  containerPaddingClass = 'py-8 md:py-12'
}: ProductSearchProps) {
  return (
    <div className={`w-full ${containerPaddingClass}`} style={{ backgroundColor }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <IoSearch className="h-5 w-5 md:h-6 md:w-6" style={{ color: accentColor }} />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for products..."
            className="w-full pl-12 pr-4 py-3 md:py-4 rounded-lg border-2 bg-white focus:outline-none focus:border-transparent rubik-regular text-base md:text-lg"
            style={{
              borderColor: accentColor,
              color: accentColor,
              boxShadow: 'none',
            }}
            aria-label="Search products"
          />
          </div>
          <style jsx>{`
            input::placeholder {
              color: ${accentColor};
              opacity: 0.5;
            }
            input:focus {
              box-shadow: 0 0 0 2px ${accentColor};
            }
          `}</style>
          {searchTerm && (
            <p className="mt-3 text-base md:text-lg rubik-light text-center" style={{ color: accentColor }}>
              Searching for: "{searchTerm}"
            </p>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
