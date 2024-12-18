import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'right' | 'right';
  pauseOnHover?: boolean;
  className?: string;
  reverse?: boolean;
}

export default function Marquee({
  children,
  direction = 'right',
  pauseOnHover = false,
  className = '',
  reverse = false,
}: MarqueeProps) {
  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      <motion.div
        className="inline-block"
        initial={{ x: reverse ? '-100%' : '0%' }}
        animate={{ x: reverse ? '0%' : '-100%' }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : undefined}
      >
        {children}
      </motion.div>
      <motion.div
        className="inline-block"
        initial={{ x: reverse ? '0%' : '-100%' }}
        animate={{ x: reverse ? '-100%' : '0%' }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : undefined}
      >
        {children}
      </motion.div>
    </div>
  );
}
