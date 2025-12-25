'use client';

import Image from 'next/image';
import Button from './Button';
import ScaleIn from './animations/ScaleIn';

interface ProductCardProps {
  name: string;
  tagline: string;
  image: string;
  slug: string;
  buttonColor?: string;
  textColor?: string;
}

export default function ProductCard({ 
  name, 
  tagline, 
  image, 
  slug,
  buttonColor = '#C4735A',
  textColor = '#C4735A'
}: ProductCardProps) {
  return (
    <div className="flex-shrink-0 w-72 md:w-80 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="p-6 flex flex-col h-full">
        {/* Product Title */}
        <h3 
          className="afacad-regular text-xl md:text-2xl text-center mb-4"
          style={{ color: textColor }}
        >
          {name}
        </h3>

        {/* Product Image */}
        <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden bg-gray-200">
          <Image
            src={image || "https://placehold.co/400x400/png"}
            alt={name}
            fill
            className="object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/400x400/png";
            }}
          />
        </div>

        {/* Product Tagline/Description */}
        <p 
          className="rubik-light text-sm md:text-base text-center mb-6 flex-grow"
          style={{ color: textColor }}
        >
          {tagline}
        </p>

        {/* Button */}
        <div className="flex justify-center">
          <Button
            buttonOutlineColor={buttonColor}
            buttonText="View Product"
            href={`/product/${slug}`}
            variant="product-view"
          />
        </div>
      </div>
    </div>
  );
}
