import React from 'react';
import { motion } from 'framer-motion';

interface OrbitingCirclesProps {
  className?: string;
  radius?: number;
  duration?: number;
  delay?: number;
  reverse?: boolean;
  children?: React.ReactNode;
}

export default function OrbitingCircles({
  className = "",
  radius = 100,
  duration = 20,
  delay = 0,
  reverse = false,
  children
}: OrbitingCirclesProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        rotate: reverse ? -360 : 360,
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        width: radius * 2,
        height: radius * 2,
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -radius,
        marginTop: -radius,
      }}
      className={className}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}