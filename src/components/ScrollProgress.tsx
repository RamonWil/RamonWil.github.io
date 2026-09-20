import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      id="scroll-progress-container"
      className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-white/[0.04]"
    >
      <motion.div
        id="scroll-progress-bar"
        className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 origin-left shadow-[0_0_8px_rgba(59,130,246,0.4)]"
        style={{ scaleX }}
      />
    </div>
  );
}

export { ScrollProgress };

