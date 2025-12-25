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
      
      {/* Contact Us and Stay In Touch Section */}
      <ContactUs bottomImage="/images/pages/home/homepage.contactus.img.png" />
    </div>
  );
}
