'use client';

import FadeIn from '@/components/animations/FadeIn';

export default function OrderFormSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: 'var(--background-purple)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.1}>
          <div className="text-center mb-8">
            <h2 className="afacad-regular text-3xl md:text-4xl mb-8 uppercase text-white text-center sm:text-center md:text-center">
              Monthly Order Form
            </h2>
            <p className="rubik-light text-base md:text-lg text-white text-center sm:text-center md:text-center">
              Form Open From December 29th - January 13th
              <br />
              Pick Up in Dallas, TX on January 18th
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="rounded-lg shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--background-purple)' }}>
            <iframe
              src="https://forms.fillout.com/t/beLwsAC4NEus"
              style={{
                width: '100%',
                height: '800px',
                border: 'none',
              }}
              title="Order Form"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
