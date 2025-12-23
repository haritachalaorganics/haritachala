import { FaInstagram, FaYoutube, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

interface SocialLink {
  icon: React.ComponentType<{ size: number; className?: string }>;
  href: string;
  label: string;
}

export default function StayConnected() {
  const socialLinks: SocialLink[] = [
    {
      icon: FaInstagram,
      href: 'https://instagram.com/haritachalaorganics',
      label: 'Instagram'
    },
    {
      icon: MdEmail,
      href: 'mailto:contact@haritachalaorganics.com',
      label: 'Email'
    },
    {
      icon: FaYoutube,
      href: 'https://youtube.com/@haritachalaorganics',
      label: 'YouTube'
    },
    {
      icon: FaPhone,
      href: 'tel:+918522936657',
      label: 'Phone'
    }
  ];

  return (
    <section className="w-full bg-[#FFDCDC] py-12 md:py-14 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="afacad-regular text-3xl md:text-4xl lg:text-4xl text-[#C4735A] text-center mb-6">
          STAY CONNECTED
        </h2>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-8 md:gap-10 lg:gap-12">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-[#C4735A] hover:opacity-70 transition-opacity"
                aria-label={link.label}
              >
                <Icon size={48} className="md:w-14 md:h-14 lg:w-16 lg:h-16" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
