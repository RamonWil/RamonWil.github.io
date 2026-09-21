import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="py-12 border-t border-white/10 flex flex-col items-center justify-center gap-5 mt-20 relative z-10 bg-[#050505]"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
      
      <div className="text-3xl font-display font-bold text-white tracking-tight">RJW</div>

      <div className="flex items-center gap-3 text-gray-400 z-10">
        <a
          href="https://github.com/RamonWil"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-hover"
          aria-label="GitHub Profile"
        >
          <GithubIcon size={18} />
        </a>
        <a
          href="https://linkedin.com/in/itsramon-williams"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-hover"
          aria-label="LinkedIn Profile"
        >
          <LinkedinIcon size={18} />
        </a>
        <a
          href="mailto:ramonwilliams09@gmail.com"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-hover"
          aria-label="Send Email"
        >
          <Mail size={18} />
        </a>
      </div>

      <div className="text-gray-400 text-xs sm:text-sm font-sans flex items-center gap-2 text-center px-4">
        &copy; {new Date().getFullYear()} Ramon J. Williams. <span className="w-1 h-1 bg-gray-600 rounded-full mx-1.5" /> Always building. Always learning.
      </div>
    </motion.footer>
  );
}
