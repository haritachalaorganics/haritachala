'use client';

import Image from 'next/image';
import { FaInstagram, FaYoutube, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import SlideUp from './animations/SlideUp';
import FadeIn from './animations/FadeIn';
import Stagger from './animations/Stagger';
import StaggerItem from './animations/StaggerItem';

interface ContactUsProps {
  bottomImage?: string;
}

interface SocialLink {
  icon: React.ComponentType<{ size: number; className?: string }>;
  href: string;
  label: string;
}

export default function ContactUs({ bottomImage }: ContactUsProps) {
  const socialLinks: SocialLink[] = [
    {
      icon: FaInstagram,
      href: 'https://www.instagram.com/haritachalabakery/',
      label: 'Instagram'
    },
    {
      icon: MdEmail,
      href: 'mailto:contact@haritachalaorganics.com',
      label: 'Email'
    },
    {
      icon: FaYoutube,
      href: 'https://www.youtube.com/@724Giggling.Geckos',
      label: 'YouTube'
    },
    {
      icon: FaPhone,
      href: 'tel:+918522936657',
      label: 'Phone'
    }
  ];

  return (
    <section className="w-full bg-[#D5E7F2] py-10 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <SlideUp>
          <h2 className="afacad-regular text-2xl md:text-3xl text-[#0D4F78] text-center mb-5 md:mb-6">
            CONTACT US AND STAY IN TOUCH
          </h2>
        </SlideUp>

        {/* Social Media Icons */}
        <FadeIn delay={0.2}>
          <div className="flex justify-center items-center gap-5 md:gap-6 mb-6 md:mb-8">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-[#0D4F78] hover:opacity-70 hover:scale-110 transition-all"
                  aria-label={link.label}
                >
                  <Icon size={24} className="md:w-7 md:h-7" />
                </a>
              );
            })}
          </div>
        </FadeIn>

        {/* Contact Cards Container */}
        <Stagger className="flex flex-col md:flex-row gap-5 md:gap-6 justify-center items-stretch mb-6 md:mb-8" staggerDelay={0.15}>
          
          {/* India Card - Hidden for now */}
          {/* <StaggerItem>
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 lg:p-10 flex-1 max-w-md mx-auto md:mx-0 h-full flex flex-col">
            <h3 className="rubik-regular text-xl md:text-2xl text-[#0D4F78] text-center mb-6">
              India
            </h3>
            
            <div className="flex justify-center mb-4">
              <Image
                src="/images/icons/contactUsLocation.png"
                alt="Location"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            
            <p className="rubik-light text-sm md:text-base text-[#0D4F78] text-center mb-6 leading-relaxed">
              Sri Sainathuni Dhyana<br />
              Mandiram, Haritachala,<br />
              Tiruvanamalai, India
            </p>
            
            <div className="flex justify-center mb-4">
              <Image
                src="/images/icons/contactUsPhone.png"
                alt="Phone"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            
            <p className="rubik-light text-sm md:text-base text-[#0D4F78] text-center mb-2">
              +91 85229 36657
            </p>
            <p className="rubik-light text-xs md:text-sm text-[#0D4F78] text-center">
              Call or Message us on WhatsApp
            </p>
            </div>
          </StaggerItem> */}

          {/* United States Card */}
          <StaggerItem>
            <div className="bg-white rounded-lg shadow-md p-5 md:p-6 flex-1 max-w-sm mx-auto md:mx-0 h-full flex flex-col">
            <h3 className="rubik-regular text-lg md:text-xl text-[#0D4F78] text-center mb-4">
              United States
            </h3>
            
            {/* Location Icon */}
            <div className="flex justify-center mb-3">
              <Image
                src="/images/icons/contactUsLocation.png"
                alt="Location"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            
            {/* Address */}
            <p className="rubik-light text-sm text-[#0D4F78] text-center mb-4 leading-relaxed">
              Dallas, Texas, United<br />
              States
            </p>
            
            {/* Phone Icon */}
            <div className="flex justify-center mb-3">
              <Image
                src="/images/icons/contactUsPhone.png"
                alt="Phone"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            
            {/* Phone Number */}
            <p className="rubik-light text-sm text-[#0D4F78] text-center mb-1">
              +1 945 289 0980
            </p>
            <p className="rubik-light text-xs text-[#0D4F78] text-center">
              Call or Message us on WhatsApp
            </p>
            </div>
          </StaggerItem>
        </Stagger>

        {/* Bottom Image */}
        {bottomImage && (
          <FadeIn delay={0.6}>
            <div className="flex justify-center">
            <div className="relative w-20 h-20 md:w-24 md:h-24">
              <Image
                src={bottomImage}
                alt="Decorative element"
                fill
                className="object-contain"
              />
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}