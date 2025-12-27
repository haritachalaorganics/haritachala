import NavBar from '@/components/NavBar';
import ContactUs from '@/components/ContactUs';
import FAQHeroSection from './FAQHeroSection';
import FAQAccordion from './FAQAccordion';
import faqData from '@/data/faq.json';

export default function FAQPage() {
  return (
    <div className="relative">
      {/* NavBar positioned absolutely over hero section */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <NavBar />
      </div>
      
      {/* Hero Section */}
      <FAQHeroSection />
      
      {/* FAQ Accordion Section */}
      <FAQAccordion faqs={faqData} />
      
      {/* Contact Us Section */}
      <ContactUs bottomImage="/images/pages/faq/faq.contactUs.namaste.png" />
    </div>
  );
}
