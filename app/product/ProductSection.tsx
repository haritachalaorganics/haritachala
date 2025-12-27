'use client';

import ProductCarousel from '@/components/ProductCarousel';
import SlideUp from '@/components/animations/SlideUp';
import FadeIn from '@/components/animations/FadeIn';

interface Product {
  name: string;
  available: string[];
  tagline?: string;
  description?: string;
  images: string[];
  variants?: any[];
  ingredients?: string[];
}

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  backgroundColor: string;
  buttonColor: string;
  textColor: string;
  emptyMessage?: string;
}

export default function ProductSection({
  title,
  subtitle,
  products,
  backgroundColor,
  buttonColor,
  textColor,
  emptyMessage = 'No products found matching your search.'
}: ProductSectionProps) {
  return (
    <section className={`w-full py-12 md:py-16 lg:py-20`} style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <SlideUp>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="afacad-regular text-3xl md:text-4xl lg:text-5xl uppercase mb-6 text-center sm:text-center md:text-center" style={{ color: textColor }}>
              {title}
            </h2>
            {subtitle && (
              <p className="rubik-light text-base md:text-lg text-center sm:text-center md:text-center" style={{ color: textColor }}>
                {subtitle}
              </p>
            )}
          </div>
        </SlideUp>

        {/* Products or Empty State */}
        {products.length > 0 ? (
          <FadeIn delay={0.2}>
            <ProductCarousel
              products={products}
              buttonColor={buttonColor}
              arrowColor="#FFFFFF"
              cardButtonColor={buttonColor}
              cardTextColor={textColor}
            />
          </FadeIn>
        ) : (
          <div className="text-center py-12">
            <p className="rubik-regular text-lg md:text-xl text-center sm:text-center md:text-center" style={{ color: textColor }}>
              {emptyMessage}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
