import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GlobeProps {
  className?: string;
}

export default function Globe({ className = "" }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    const draw = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.4;

      // Draw base globe grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;

      // Draw meridians
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + rotation;
        ctx.beginPath();
        ctx.ellipse(
          centerX,
          centerY,
          radius * Math.abs(Math.cos(angle)),
          radius,
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      // Draw parallels
      for (let i = 1; i < 10; i++) {
        const y = centerY - radius + ((i / 10) * radius * 2);
        const parallelRadius = Math.sqrt(radius * radius - Math.pow(y - centerY, 2));
        ctx.beginPath();
        ctx.moveTo(centerX - parallelRadius, y);
        ctx.lineTo(centerX + parallelRadius, y);
        ctx.stroke();
      }

      // Draw "ABDN" text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      
      ctx.font = 'bold 48px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Calculate text width for positioning
      const text = 'ABDN';
      const textMetrics = ctx.measureText(text);
      const textWidth = textMetrics.width;
      
      // Draw text slightly above center
      ctx.fillText(text, 0, -10);
      
      ctx.restore();

      rotation += 0.005;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className={`relative ${className}`}
    >
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full h-full"
      />
    </motion.div>
  );
}