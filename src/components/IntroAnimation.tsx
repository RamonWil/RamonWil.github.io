import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030406]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -25, filter: 'blur(12px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-center"
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-6 border-t-2 border-r-2 border-[#00aaff] rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Ramon J. Williams
            </h1>
            <p className="mt-4 text-[#b9bdc9] font-body tracking-widest uppercase text-sm">
              Initializing Experience
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
