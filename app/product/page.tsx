'use client';

import { useState, useMemo } from 'react';
import NavBar from '@/components/NavBar';
import ContactUs from '@/components/ContactUs';
import MenuHeroSection from './MenuHeroSection';
import ProductSearch from './ProductSearch';
import ProductSection from './ProductSection';
import productsData from '@/data/products.json';

interface Product {
  name: string;
  available: string[];
  tagline?: string;
  description?: string;
  images: string[];
  variants?: any[];
  ingredients?: string[];
}

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on search term
  const filterProducts = (products: Product[], searchQuery: string): Product[] => {
    if (!searchQuery.trim()) return products;
    
    const query = searchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.tagline?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    );
  };

  // Separate products by availability and apply search filter
  const { usProducts, indiaProducts, fullMoonProducts } = useMemo(() => {
    const allProducts = productsData.products as Product[];
    
    const us = allProducts.filter(p => 
      p.available.includes('US') || p.available.includes('Both')
    );
    
    const india = allProducts.filter(p => 
      p.available.includes('India') || p.available.includes('Both')
    );

    const fullMoon = allProducts.filter(p => 
      p.available.includes('Full Moon')
    );

    return {
      usProducts: filterProducts(us, searchTerm),
      indiaProducts: filterProducts(india, searchTerm),
      fullMoonProducts: filterProducts(fullMoon, searchTerm)
    };
  }, [searchTerm]);

  return (
    <div className="relative">
      {/* NavBar positioned absolutely over hero section */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <NavBar />
      </div>
      
      {/* Hero Section */}
      <MenuHeroSection />
      
      {/* Search Section */}
      <ProductSearch 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* U.S. Products Section */}
      <ProductSection
        title="Products Available in the U.S."
        subtitle="Wholesome, nourishing, and crafted with love—each bite is a celebration of flavor and purpose. Our goods feed the body and warm the heart, with every offering helping to grow and sustain Haritachala's mission."
        products={usProducts}
        backgroundColor="var(--background-pink)"
        buttonColor="#C4735A"
        textColor="var(--foreground-pink)"
        emptyMessage="No U.S. products match your search."
      />

      

      {/* Contact Us Section */}
      <ContactUs bottomImage="/images/pages/our_products/ourProducts.contactUs.png" imageSize="large" />
    </div>
  );
}
