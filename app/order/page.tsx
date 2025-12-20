import NavBar from '@/components/NavBar';
import OrderHeroSection from './OrderHeroSection';
import OrderFormSection from './OrderFormSection';
import OrderProductsSection from './OrderProductsSection';
import ContactUs from '@/components/ContactUs';

export default function OrderPage() {
  return (
    <div className="relative">
      {/* NavBar positioned absolutely over hero section */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <NavBar />
      </div>
      
      {/* Hero Section */}
      <OrderHeroSection />
      
      {/* Order Form Section */}
      <OrderFormSection />
      
      {/* Products Carousel Section */}
      <OrderProductsSection />
      
      {/* Contact Us Section */}
      <ContactUs bottomImage="/images/pages/our_products/ourProducts.contactUs.png" />
    </div>
  );
}
