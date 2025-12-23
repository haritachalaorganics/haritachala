import NavBar from '@/components/NavBar';
import InsideScoopHeroSection from './InsideScoopHeroSection';
import BehindTheScenes1 from './BehindTheScenes1';
import BehindTheScenes2 from './BehindTheScenes2';
import NewsletterSection from './NewsletterSection';
import LearnMoreSection from './LearnMoreSection';
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
      
      {/* Learn More about Haritachala Section - Purple background with horizontal scroll */}
      <LearnMoreSection />
      
      {/* Newsletter Section - Blue background, Image LEFT */}
      
      {/* Behind the Scenes Section 2 - Purple background, The Design Team */}
      
      {/* Contact Us Section */}
      <ContactUs bottomImage="/images/pages/inside_scoop/inside_scoop.contactUs.png" />
    </div>
  );
}
