import NavBar from '@/components/NavBar';
import AboutHeroSection from './AboutHeroSection';
import AboutSection from './AboutSection';
import OurInspiration from './OurInspiration';
import TeamCarousel from './TeamCarousel';
import HowWeWork from './HowWeWork';
import GigglingGeckos from './GigglingGeckos';
import BehindTheScenes2 from '../inside_scoop/BehindTheScenes2';
import ContactUs from '@/components/ContactUs';
import teamMembers from '@/data/team_members.json';

export default function AboutPage() {
  return (
    <div className="relative">
      {/* NavBar positioned absolutely over hero section */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <NavBar />
      </div>
      
      {/* Hero Section with image and gradient */}
      <AboutHeroSection />
      
      <AboutSection />
      <OurInspiration />
      <TeamCarousel teamMembers={teamMembers} />
      <BehindTheScenes2 />
      <HowWeWork />
      <GigglingGeckos />
      <ContactUs bottomImage="/images/pages/about/aboutUs.contactUs.png" />
    </div>
  );
}
