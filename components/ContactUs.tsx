'use client';

import Image from 'next/image';
import { FaInstagram, FaYoutube, FaPhone, FaTiktok, FaFacebookF } from 'react-icons/fa';
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
      href: 'https://www.instagram.com/haritachalaorganics/',
      label: 'Instagram'
    },
    {
      icon: MdEmail,
      href: 'mailto:haritachalaorganics@saimail.com',
      label: 'Email'
    },
    {
      icon: FaYoutube,
      href: 'https://www.youtube.com/@HaritachalaOrganics',
      label: 'YouTube'
    },
    {
      icon: FaTiktok,
      href: 'http://www.tiktok.com/@haritachalaorganics',
      label: 'TikTok'
    },
    {
      icon: FaFacebookF,
      href: 'https://www.facebook.com/haritachalabakery',
      label: 'Facebook'
    },
    {
      icon: FaPhone,
      href: 'tel:+19452890980',
      label: 'Phone'
    }
  ];

  return (
    <section className="w-full bg-[#D5E7F2] py-10 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <SlideUp>
          <h2 className="afacad-regular text-2xl md:text-3xl text-[#0D4F78] text-center mb-6">
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

        {/* Contact Card Container */}
        <FadeIn delay={0.4}>
          <div className="flex justify-center mb-6 md:mb-8">
            {/* United States Card */}
            <div className="bg-white rounded-lg shadow-md p-6 md:p-10 lg:p-12 w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto flex flex-col">
              <h3 className="rubik-regular text-lg md:text-xl lg:text-2xl text-[#0D4F78] text-center mb-4">
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
              <p className="rubik-light text-base md:text-lg text-[#0D4F78] text-center mb-4 leading-relaxed">
                Dallas, Texas, United States
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
              <p className="rubik-light text-base md:text-lg text-[#0D4F78] text-center mb-1">
                +1 945 289 0980
              </p>
              <p className="rubik-light text-sm md:text-base text-[#0D4F78] text-center">
                Call or Message us on WhatsApp
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Bottom Image */}
        {bottomImage && (
          <FadeIn delay={0.6}>
            <div className="flex justify-center">
            <div className="relative w-48 h-48 md:w-56 md:h-56">
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