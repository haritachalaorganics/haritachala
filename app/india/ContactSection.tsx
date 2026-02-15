import { FaPhoneAlt } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

export default function ContactSection() {
  return (
    <section className="w-full py-12 md:py-16" style={{ backgroundColor: 'var(--background-blue)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="afacad-regular text-3xl md:text-4xl lg:text-5xl text-center mb-8" style={{ color: 'var(--foreground-blue)' }}>
          Contact Us in India
        </h2>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 lg:p-10 max-w-3xl mx-auto">
          <div className="flex items-start gap-3 mb-6">
            <MdLocationOn className="w-6 h-6 mt-1 shrink-0" style={{ color: 'var(--foreground-blue)' }} />
            <div>
              <p className="rubik-regular text-base md:text-lg mb-1" style={{ color: 'var(--foreground-blue)' }}>
                Address
              </p>
              <p className="rubik-light text-base md:text-lg leading-relaxed" style={{ color: 'var(--foreground-blue)' }}>
                Sri Sainathuni Dhyana Mandiram, Girivalam Rd, Tiruvannamalai, Tamil Nadu
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaPhoneAlt className="w-5 h-5 mt-1 shrink-0" style={{ color: 'var(--foreground-blue)' }} />
            <div>
              <p className="rubik-regular text-base md:text-lg mb-1" style={{ color: 'var(--foreground-blue)' }}>
                Phone
              </p>
              <a
                href="tel:+919320097980"
                className="rubik-light text-base md:text-lg hover:opacity-75 transition-opacity"
                style={{ color: 'var(--foreground-blue)' }}
              >
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}