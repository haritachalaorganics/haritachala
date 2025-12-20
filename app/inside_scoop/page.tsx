import NavBar from '@/components/NavBar';
import InsideScoopHeroSection from './InsideScoopHeroSection';
import BehindTheScenes1 from './BehindTheScenes1';
import BehindTheScenes2 from './BehindTheScenes2';
import NewsletterSection from './NewsletterSection';
import ContactUs from '@/components/ContactUs';

export default function InsideScoopPage() {
  return (
    <div className="relative">
      {/* NavBar positioned absolutely over hero section */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <NavBar />
      </div>
      
      {/* Hero Section */}
      <InsideScoopHeroSection />
      
      {/* Behind the Scenes Section 1 - Pink background, Image LEFT */}
      <BehindTheScenes1 />
      
      {/* Newsletter Section - Blue background, Image LEFT */}
      <NewsletterSection />
      
      {/* Behind the Scenes Section 2 - Purple background, The Design Team */}
      <BehindTheScenes2 />
      
      {/* Contact Us Section */}
      <ContactUs bottomImage="/images/pages/inside_scoop/inside_scoop.contactUs.png" />
    </div>
  );
}
