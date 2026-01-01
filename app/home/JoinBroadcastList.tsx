'use client';

import { useState } from 'react';
import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';
import Button from '@/components/Button';

export default function JoinBroadcastList() {
  const [name, setName] = useState('');

  const whatsappMessage = name 
    ? `JOIN my name is ${name}` 
    : 'JOIN my name is ';

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
              Enter your name below and join our WhatsApp Broadcast List for updates, order forms, and more!
            </p>
            
            <div className="mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full max-w-md mx-auto px-4 py-3 border-2 border-[#C4735A] rounded-lg rubik-light text-base md:text-lg text-[#C4735A] focus:outline-none focus:ring-2 focus:ring-[#C4735A] focus:border-transparent"
              />
            </div>

            <Button 
              buttonOutlineColor="#C4735A"
              buttonText="Join on WhatsApp"
              href={`https://wa.me/19452890980?text=${encodeURIComponent(whatsappMessage)}`}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
