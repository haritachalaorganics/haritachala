'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { RiInstagramFill, RiFacebookFill, RiTiktokFill, RiWhatsappFill } from 'react-icons/ri';
import FadeIn from './animations/FadeIn';
import Stagger from './animations/Stagger';
import StaggerItem from './animations/StaggerItem';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Our Products', href: '/product' },
    { name: 'Inside Scoop', href: '/inside_scoop' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Order Now!', href: '/order' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="w-full sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="afacad-italic text-lg md:text-2xl lg:text-2xl xl:text-3xl text-[#645DAB]">
              Haritachala Organics
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                if (link.name === 'Order Now!') {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="afacad-bold text-lg xl:text-xl text-[#645DAB] border-2 border-[#645DAB] px-4 py-1.5 rounded hover:bg-[#645DAB] hover:text-white transition-all"
                    >
                      {link.name}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="afacad-bold text-lg xl:text-xl text-[#645DAB] hover:opacity-70 transition-opacity"
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              {/* Social Media Icons */}
              <div className="flex items-center gap-4 ml-2">
                <a
                  href="https://wa.me/19452890980"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#645DAB] hover:opacity-70 transition-opacity"
                  aria-label="WhatsApp"
                >
                  <RiWhatsappFill size={24} />
                </a>
                <a
                  href="https://www.instagram.com/haritachalaorganics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#645DAB] hover:opacity-70 transition-opacity"
                  aria-label="Instagram"
                >
                  <RiInstagramFill size={24} />
                </a>
                <a
                  href="https://m.facebook.com/profile.php?id=61585366692415"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#645DAB] hover:opacity-70 transition-opacity"
                  aria-label="Facebook"
                >
                  <RiFacebookFill size={24} />
                </a>
                <a
                  href="http://www.tiktok.com/@haritachalaorganics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#645DAB] hover:opacity-70 transition-opacity"
                  aria-label="TikTok"
                >
                  <RiTiktokFill size={24} />
                </a>
                
              </div>
            </div>

            {/* Mobile/Tablet Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-[#645DAB] p-2 hover:opacity-70 transition-opacity"
              aria-label="Toggle menu"
            >
              <HiMenuAlt3 size={32} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-[#B3B0D1]"
            onClick={toggleMenu}
          />

          {/* Menu Content */}
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Close Button */}
            <FadeIn delay={0.1}>
              <button
                onClick={toggleMenu}
                className="absolute top-8 right-8 text-white hover:opacity-70 transition-opacity"
                aria-label="Close menu"
              >
                <IoClose size={40} />
              </button>
            </FadeIn>

            {/* Arunachala Line Art */}
            <FadeIn delay={0.2}>
              <div className="mb-12 md:mb-16">
                <Image
                  src="/images/pages/menu/arunachala_lineart.png"
                  alt="Arunachala"
                  width={300}
                  height={100}
                  className="w-64 md:w-80 h-auto"
                />
              </div>
            </FadeIn>

            {/* Menu Links */}
            <Stagger>
              <nav className="flex flex-col items-center gap-6 md:gap-8">
                {navLinks.map((link) => {
                  if (link.name === 'Order Now!') {
                    return (
                      <StaggerItem key={link.name}>
                        <Link
                          href={link.href}
                          onClick={toggleMenu}
                          className="afacad-bold text-xl md:text-2xl text-white border-2 border-white px-6 py-2 rounded hover:bg-white hover:text-[#B3B0D1] transition-all"
                        >
                          {link.name}
                        </Link>
                      </StaggerItem>
                    );
                  }
                  return (
                    <StaggerItem key={link.name}>
                      <Link
                        href={link.href}
                        onClick={toggleMenu}
                        className="afacad-bold text-xl md:text-2xl text-white hover:opacity-70 transition-opacity"
                      >
                        {link.name}
                      </Link>
                    </StaggerItem>
                  );
                })}
              </nav>
            </Stagger>
          </div>
        </div>
      )}
    </>
  );
}