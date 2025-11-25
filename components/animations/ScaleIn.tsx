'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  scale?: number;
  className?: string;
  once?: boolean;
}

export default function ScaleIn({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  scale = 0.9,
  className = '',
  once = true 
}: ScaleInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale }}
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
