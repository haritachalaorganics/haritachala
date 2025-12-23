'use client';

import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import SlideUp from '@/components/animations/SlideUp';
import Stagger from '@/components/animations/Stagger';
import StaggerItem from '@/components/animations/StaggerItem';
import FadeIn from '@/components/animations/FadeIn';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[var(--background-pink)] py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <SlideUp>
          <h2 className="afacad-regular text-2xl md:text-3xl lg:text-4xl text-[var(--foreground-pink)] text-center mb-8 md:mb-12">
            Have Questions? We Have Answers.
          </h2>
        </SlideUp>

        {/* FAQ Items */}
        <Stagger className="space-y-4" staggerDelay={0.1}>
          {faqs.map((faq, index) => (
            <StaggerItem key={index}>
              <div
                className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
              >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 md:px-8 md:py-5 flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-[var(--foreground-pink)] focus:ring-opacity-50"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="afacad-regular text-base md:text-lg lg:text-xl text-[var(--foreground-pink)] pr-4 text-left sm:text-center md:text-center lg:text-left">
                  {faq.question}
                </span>
                <IoChevronDown
                  className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 text-[var(--foreground-pink)] transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* Answer */}
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <div className="px-6 pb-4 md:px-8 md:pb-5 pt-2">
                  <p className="rubik-light text-sm md:text-base text-[var(--foreground-pink)] leading-relaxed text-center sm:text-center md:text-center lg:text-left">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>
          ))}
        </Stagger>

        {/* Still Have Questions Section */}
        <FadeIn delay={0.5}>
          <div className="mt-12 md:mt-16 text-center">
          <p className="rubik-regular text-base md:text-lg text-[var(--foreground-pink)] mb-4">
            Still have questions?
          </p>
          <p className="rubik-light text-sm md:text-base text-[var(--foreground-pink)]">
            Feel free to reach out to us at{' '}
            <a
              href="tel:+19452890980"
              className="underline hover:opacity-70 transition-opacity"
            >
              +1 (945) 289-0980
            </a>
          </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
