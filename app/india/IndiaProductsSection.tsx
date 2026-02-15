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
  variants?: ProductVariant[];
  ingredients?: string;
  image?: string;
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
        product.ingredients?.toLowerCase().includes(query) ||
        variantText.includes(query)
      );
    });
  }, [products, searchTerm]);

  return (
    <>
      <WelcomeSection />
      <ProductSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        backgroundColor="var(--background-purple)"
        accentColor="var(--foreground-purple)"
      />
      <ProductGrid products={filteredProducts} />
    </>
  );
}