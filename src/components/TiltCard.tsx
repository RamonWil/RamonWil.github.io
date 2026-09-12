import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { useDevice } from '../hooks/useDevice';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  showGlare?: boolean;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 10,
  perspective = 1000,
  showGlare = false
}: TiltCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile, isTouch } = useDevice();
  
  // Disable 3D tilt on touch devices
  const disableTilt = isTouch || isMobile;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });
  const scaleSpring = useSpring(scale, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${maxTilt}deg`, `-${maxTilt}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${maxTilt}deg`, `${maxTilt}deg`]);
  
  // Dynamic Glare based on mouse position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareBackground = useMotionTemplate`radial-gradient(600px circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.12), transparent 80%)`;

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.02);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (!width || !height) return;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = Math.max(-0.5, Math.min(0.5, (mouseX / width) - 0.5));
    const yPct = Math.max(-0.5, Math.min(0.5, (mouseY / height) - 0.5));
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={disableTilt ? undefined : handleMouseEnter}
      onMouseMove={disableTilt ? undefined : handleMouseMove}
      onMouseLeave={disableTilt ? undefined : handleMouseLeave}
      style={disableTilt ? undefined : { perspective: `${perspective}px` }} 
      className={`w-full h-full relative cursor-hover`}
    >
      <motion.div
        style={disableTilt ? undefined : {
          rotateX,
          rotateY,
          scale: scaleSpring,
          transformStyle: "preserve-3d",
          willChange: "transform"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`relative ${className}`}
      >
        {!disableTilt && showGlare && (
          <motion.div 
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 transition-opacity duration-300"
            style={{
              background: glareBackground,
              opacity: isHovered ? 1 : 0
            }}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}
