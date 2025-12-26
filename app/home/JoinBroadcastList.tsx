'use client';

import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';
import Button from '@/components/Button';

export default function JoinBroadcastList() {
  return (
    <section className="w-full bg-[#FFDCDC] py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp>
          <h2 className="afacad-regular text-3xl md:text-4xl lg:text-4xl text-[#C4735A] text-center mb-6 uppercase">
            Join Our Broadcast List
          </h2>
        </SlideUp>

        <FadeIn delay={0.2}>
          <div className="bg-white rounded-lg shadow-md p-8 md:p-10 text-center">
            <p className="rubik-light text-base md:text-lg text-[#C4735A] leading-relaxed mb-6">
              Text <span className="rubik-medium">JOIN</span> to{' '}
              <span className="rubik-medium">+1 945 289 0980</span> on WhatsApp to join our WhatsApp Broadcast List for updates, order forms, and more!
            </p>
            <Button 
              buttonOutlineColor="#C4735A"
              buttonText="Join on WhatsApp"
              href="https://wa.me/19452890980?text=JOIN"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
