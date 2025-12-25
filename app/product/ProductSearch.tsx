'use client';

import { IoSearch } from 'react-icons/io5';
import FadeIn from '@/components/animations/FadeIn';

interface ProductSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function ProductSearch({ searchTerm, onSearchChange }: ProductSearchProps) {
  return (
    <div className="w-full bg-[var(--background-pink)] py-8 md:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <IoSearch className="h-5 w-5 md:h-6 md:w-6 text-[var(--foreground-pink)]" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for products..."
            className="w-full pl-12 pr-4 py-3 md:py-4 rounded-lg border-2 border-[var(--foreground-pink)] 
                     bg-white text-[var(--foreground-pink)] placeholder-[var(--foreground-pink)]/50
                     focus:outline-none focus:ring-2 focus:ring-[var(--foreground-pink)] focus:border-transparent
                     rubik-regular text-base md:text-lg"
            aria-label="Search products"
          />
          </div>
          {searchTerm && (
            <p className="mt-3 text-base md:text-lg rubik-light text-[var(--foreground-pink)] text-center">
              Searching for: "{searchTerm}"
            </p>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
