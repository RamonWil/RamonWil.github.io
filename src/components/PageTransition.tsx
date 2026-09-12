import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -35 }}
      transition={{ 
        duration: 0.35,
        ease: [0.21, 0.47, 0.32, 0.98] // Custom cubic-bezier for a premium snap
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
