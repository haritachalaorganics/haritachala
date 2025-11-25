'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SlideUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

export default function SlideUp({ 
  children, 
  delay = 0, 
  duration = 0.7, 
  distance = 60,
  className = '',
  once = true 
}: SlideUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
