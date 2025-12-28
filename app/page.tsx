import Image from "next/image";
import ContactUs from "../components/ContactUs";
import React from "react";
import Button from "../components/Button";
import NavBar from "../components/NavBar";
import HeroSection from "./home/HeroSection";
import OurPurpose from "./home/OurPurpose";
import OurProducts from "./home/OurProducts";
import HaveQuestions from "./home/HaveQuestions";
import AboutSection from "./about/AboutSection";
import JoinBroadcastList from "./home/JoinBroadcastList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Handcrafted Organic Foods & Artisanal Bakery",
  description: "Welcome to Haritachala Organics - your source for handcrafted organic foods, artisanal baked goods, and preserves. Discover our passion for sustainable, delicious food made with care.",
  keywords: ["organic bakery", "handcrafted food", "artisanal products", "organic preserves", "sustainable food", "California organic bakery", "homemade jams", "organic bread"],
  openGraph: {
    title: "Haritachala Organics - Handcrafted Organic Foods",
    description: "Welcome to Haritachala Organics - your source for handcrafted organic foods, artisanal baked goods, and preserves.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/images/pages/home/homepage.herosection.img.png",
        width: 1200,
        height: 630,
        alt: "Haritachala Organics Home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haritachala Organics - Handcrafted Organic Foods",
    description: "Welcome to Haritachala Organics - your source for handcrafted organic foods, artisanal baked goods, and preserves.",
    images: ["/images/pages/home/homepage.herosection.img.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="relative">
      {/* NavBar positioned absolutely over hero section */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <NavBar />
      </div>
      
      {/* Hero Section with images and gradient */}
      <HeroSection />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Our Purpose Section */}
      
      {/* Our Products Carousel Section */}
      <OurProducts />
      
      {/* Have Questions Section */}
      <HaveQuestions />
      
      {/* Join Broadcast List Section */}
      <JoinBroadcastList />
      
      {/* Contact Us and Stay In Touch Section */}
      <ContactUs bottomImage="/images/pages/home/homepage.contactus.img.png" />
    </div>
  );
}
