import NavBar from '@/components/NavBar';
import InsideScoopHeroSection from './InsideScoopHeroSection';
import BehindTheScenes1 from './BehindTheScenes1';
import BehindTheScenes2 from './BehindTheScenes2';
import NewsletterSection from './NewsletterSection';
import LearnMoreSection from './LearnMoreSection';
import ContactUs from '@/components/ContactUs';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inside Scoop - Behind the Scenes & Stories",
  description: "Go behind the scenes at Haritachala Organics. Discover our stories, newsletter updates, and learn more about our artisanal food-making process and the people who make it happen.",
  keywords: ["Haritachala stories", "behind the scenes", "organic food making", "artisan bakery process", "food newsletter", "bakery stories", "organic food blog"],
  openGraph: {
    title: "Inside Scoop - Haritachala Organics Behind the Scenes",
    description: "Go behind the scenes at Haritachala Organics. Discover our stories, newsletter updates, and learn more about our artisanal food-making process.",
    type: "website",
    url: "/inside_scoop",
    images: [
      {
        url: "/images/pages/inside_scoop/inside_scoop.contactUs.png",
        width: 1200,
        height: 630,
        alt: "Haritachala Organics Behind the Scenes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inside Scoop - Haritachala Organics",
    description: "Go behind the scenes at Haritachala Organics. Discover our stories, newsletter updates, and learn more about our artisanal food-making process.",
    images: ["/images/pages/inside_scoop/inside_scoop.contactUs.png"],
  },
  alternates: {
    canonical: "/inside_scoop",
  },
};

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
