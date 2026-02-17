'use client';

import { useMemo, useState } from 'react';
import ProductSearch from '@/app/product/ProductSearch';
import WelcomeSection from './WelcomeSection';
import ProductGrid from './ProductGrid';

interface ProductVariant {
  weight: string;
  price: number;
}

interface OrganicProduct {
  name: string;
  tamil?: string;
  telugu?: string;
  category?: string;
  variants?: ProductVariant[];
  ingredients?: string;
  image?: string;
}

interface CategoryProducts {
  category: string;
  products: OrganicProduct[];
}

interface IndiaProductsSectionProps {
  products: OrganicProduct[];
}

export default function IndiaProductsSection({ products }: IndiaProductsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return products;

    return products.filter((product) => {
      const variantText = (product.variants || [])
        .map((variant) => `${variant.weight} ${variant.price}`)
        .join(' ')
        .toLowerCase();

      return (
        product.name.toLowerCase().includes(query) ||
        product.tamil?.toLowerCase().includes(query) ||
        product.telugu?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.ingredients?.toLowerCase().includes(query) ||
        variantText.includes(query)
      );
    });
  }, [products, searchTerm]);

  const groupedProducts = useMemo(() => {
    const groups = new Map<string, OrganicProduct[]>();

    filteredProducts.forEach((product) => {
      const category = product.category?.trim() || 'UNCATEGORIZED';
      const existing = groups.get(category) || [];
      existing.push(product);
      groups.set(category, existing);
    });

    return Array.from(groups.entries()).map<CategoryProducts>(([category, categoryProducts]) => ({
      category,
      products: categoryProducts,
    }));
  }, [filteredProducts]);

  return (
    <>
      <WelcomeSection />
      <section className="w-full pt-8 md:pt-10 lg:pt-12 pb-2" style={{ backgroundColor: 'var(--background-purple)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-2 md:mb-3">
            <h2
              className="afacad-regular text-3xl md:text-4xl lg:text-5xl uppercase mb-4 text-center"
              style={{ color: 'var(--foreground-white)' }}
            >
              Products Available in India
            </h2>
            <p
              className="alegreya-italic text-lg md:text-xl lg:text-2xl text-center"
              style={{ color: 'var(--foreground-white)' }}
            >
              Organically Grown, Sun-dried, and, Handpicked with Love
            </p>
          </div>
        </div>
      </section>
      <ProductSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        backgroundColor="var(--background-purple)"
        accentColor="var(--foreground-purple)"
        containerPaddingClass="pt-1 pb-8 md:pt-2 md:pb-10"
      />
      <ProductGrid groupedProducts={groupedProducts} />
    </>
  );
}