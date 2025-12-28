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
import OurPurpose from '../home/OurPurpose';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Our Story, Team & Mission",
  description: "Learn about Haritachala Organics - our inspiration, our dedicated team, and how we create handcrafted organic foods with passion and care. Discover our journey and commitment to sustainable, artisanal food production.",
  keywords: ["about Haritachala", "organic food company", "artisanal bakery team", "sustainable food mission", "organic food story", "California organic bakery", "food artisans"],
  openGraph: {
    title: "About Haritachala Organics - Our Story & Team",
    description: "Learn about Haritachala Organics - our inspiration, our dedicated team, and how we create handcrafted organic foods with passion and care.",
    type: "website",
    url: "/about",
    images: [
      {
        url: "/images/pages/about/aboutUs.contactUs.png",
        width: 1200,
        height: 630,
        alt: "Haritachala Organics Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Haritachala Organics - Our Story & Team",
    description: "Learn about Haritachala Organics - our inspiration, our dedicated team, and how we create handcrafted organic foods with passion and care.",
    images: ["/images/pages/about/aboutUs.contactUs.png"],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="relative">
      {/* NavBar positioned absolutely over hero section */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <NavBar />
      </div>
      
      {/* Hero Section with image and gradient */}
      <AboutHeroSection />

      <OurPurpose />
      
      <OurInspiration />
      <TeamCarousel teamMembers={teamMembers} />
      <BehindTheScenes2 />
      <HowWeWork />
      <GigglingGeckos />
      <ContactUs bottomImage="/images/pages/about/aboutUs.contactUs.png" />
    </div>
  );
}
