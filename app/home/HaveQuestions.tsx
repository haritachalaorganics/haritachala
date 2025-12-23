'use client';

import Button from '../../components/Button';
import SlideUp from '@/components/animations/SlideUp';
import ScaleIn from '@/components/animations/ScaleIn';

export default function HaveQuestions() {
  return (
    <section className="w-full bg-[#B3B0D1] py-12 md:py-14 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <SlideUp>
          <div className="text-center">
            <h2 className="afacad-regular text-3xl md:text-4xl lg:text-4xl text-white mb-6 text-center sm:text-center md:text-center">
              HAVE QUESTIONS?
            </h2>
          </div>
        </SlideUp>
        <div className="w-full h-[1px] bg-white mb-8 md:mb-10"></div>

        {/* Content Card */}
        <ScaleIn delay={0.2}>
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-10">
            <p className="rubik-light text-base md:text-base lg:text-lg text-[#645DAB] text-center leading-relaxed mb-6 md:mb-8">
              We've got answers! Check out our FAQs to learn more about our ingredients, ordering process, and more.
            </p>

            {/* Button */}
            <div className="flex justify-center">
              <Button
                buttonOutlineColor="#645DAB"
                buttonText="FAQs"
                href="/faq"
              />
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
