import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="py-12 border-t border-white/10 flex flex-col items-center justify-center gap-6 mt-20 relative z-10 bg-[#050505]"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
      <div className="text-3xl font-display font-bold text-white mb-2">RJW</div>
      <div className="text-gray-400 text-sm font-sans flex items-center gap-2">
        &copy; {new Date().getFullYear()} Ramon J. Williams. <span className="w-1 h-1 bg-gray-600 rounded-full mx-2" /> Crafted with intent.
      </div>
    </motion.footer>
  );
}
