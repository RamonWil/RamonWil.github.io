import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { Link } from 'react-router-dom';
import { useDevice } from '../hooks/useDevice';

const MotionLink = motion.create(Link);

interface PhysicsButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e?: any) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  hoverGlowColor?: string; // Change this to your brand color e.g. "rgba(59, 130, 246, 0.5)"
  [key: string]: any;
}

export default function PhysicsButton(props: PhysicsButtonProps) {
  const { isTouch, isMobile } = useDevice();
  const { children, to, href, onClick, className = "", type = "button", hoverGlowColor = "rgba(255, 255, 255, 0.3)", ...rest } = props;
  
  const fullClassName = `inline-flex items-center justify-center cursor-pointer relative ${className}`;
  const simpleInnerContent = (
    <div className="relative flex items-center gap-2 justify-center w-full h-full z-10">
      {children}
    </div>
  );

  // Return standard un-animated button on phones
  if (isTouch || isMobile) {
    if (to) return <Link to={to} onClick={onClick} className={fullClassName} {...rest as any}>{simpleInnerContent}</Link>;
    if (href) return <a href={href} onClick={onClick} className={fullClassName} {...rest as any}>{simpleInnerContent}</a>;
    return <button type={type} onClick={onClick} className={fullClassName} {...rest as any}>{simpleInnerContent}</button>;
  }

  // Return 3D physics button on desktop
  return <PhysicsButtonInner {...props} />;
}

function PhysicsButtonInner({ children, to, href, onClick, className = "", type = "button", hoverGlowColor = "rgba(255, 255, 255, 0.3)", ...rest }: PhysicsButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);
  
  const glareBackground = useMotionTemplate`radial-gradient(100px circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.3), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const commonProps = {
    ...rest,
    ref,
    className: `inline-flex items-center justify-center cursor-pointer relative cursor-hover ${className}`,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick,
    style: {
      perspective: 1000,
      rotateX,
      rotateY,
      transformStyle: "preserve-3d" as const,
      willChange: "transform"
    },
    whileHover: { 
       scale: 1.05, 
       z: 35, 
       y: -6, 
       boxShadow: `0px 20px 40px -10px ${hoverGlowColor}, 0px 15px 25px -10px rgba(0, 0, 0, 0.5)`,
      transition: { type: 'spring' as const, stiffness: 400, damping: 15 } 
     },
    whileTap: { 
       scale: 0.95, 
       z: 0, 
       y: 2, 
       boxShadow: "0px 5px 10px -5px rgba(0, 0, 0, 0.3)",
      transition: { type: 'spring' as const, stiffness: 400, damping: 15 } 
     },
    transition: { type: 'spring' as const, stiffness: 400, damping: 20 }
  };

  const innerContent = (
    <>
      {/* Background Ambient Pulse Glow */}
      <div 
        className={`absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-700 -z-10 ${isHovered ? 'opacity-100 animate-pulse' : 'opacity-0'}`}
        style={{ boxShadow: `0 0 25px 8px ${hoverGlowColor}` }}
      />
      {/* Dynamic Surface Glare */}
      <motion.div 
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 transition-opacity duration-300 overflow-hidden mix-blend-overlay"
        style={{ background: glareBackground, opacity: isHovered ? 1 : 0 }}
      />
      {/* Content translated slightly forward on Z-axis for 3D depth */}
      <div style={{ transform: "translateZ(10px)" }} className="relative flex items-center gap-2 justify-center w-full h-full z-10">
        {children}
      </div>
    </>
  );

  if (to) return <MotionLink to={to} {...commonProps as any}>{innerContent}</MotionLink>;
  if (href) return <motion.a href={href} {...commonProps as any}>{innerContent}</motion.a>;
  return <motion.button type={type} {...commonProps as any}>{innerContent}</motion.button>;
}
