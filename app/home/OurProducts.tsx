'use client';

import ProductCarousel from '../../components/ProductCarousel';
import Button from '../../components/Button';
import productsData from '../../data/products.json';
import SlideUp from '@/components/animations/SlideUp';
import FadeIn from '@/components/animations/FadeIn';

interface OurProductsProps {
  backgroundColor?: string;
  titleColor?: string;
  scrollButtonColor?: string;
  scrollArrowColor?: string;
  cardButtonColor?: string;
  cardTextColor?: string;
  allProductsButtonColor?: string;
}

export default function OurProducts({
  backgroundColor = '#FFDCDC',
  titleColor = '#C4735A',
  scrollButtonColor = '#B3B0D1',
  scrollArrowColor = '#FFFFFF',
  cardButtonColor = '#C4735A',
  cardTextColor = '#C4735A',
  allProductsButtonColor = '#C4735A'
}: OurProductsProps) {
  // Filter products that have images
  const productsWithImages = productsData.products.filter(
    product => product.images && product.images.length > 0
  );

  return (
    <section 
      className="w-full py-16 md:py-16 lg:py-16"
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <SlideUp>
          <div className="text-center">
            <h2 
              className="afacad-regular text-3xl md:text-4xl lg:text-4xl mb-6 text-center sm:text-center md:text-center"
              style={{ color: titleColor }}
            >
              OUR PRODUCTS
            </h2>
          </div>
        </SlideUp>
        <div
              className="w-full h-[1px] mb-8 md:mb-10"
              style={{ backgroundColor: titleColor }}
            ></div>

        {/* Carousel */}
        <FadeIn delay={0.2} duration={0.8}>
          <ProductCarousel 
            products={productsWithImages}
            buttonColor={scrollButtonColor}
            arrowColor={scrollArrowColor}
            cardButtonColor={cardButtonColor}
            cardTextColor={cardTextColor}
          />
        </FadeIn>

        {/* All Products Button */}
        <FadeIn delay={0.4}>
          <div className="flex justify-center mt-6 md:mt-8">
            <Button
              buttonOutlineColor={allProductsButtonColor}
              buttonText="All Products"
              href="/product"
              variant="all-products"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
