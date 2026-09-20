import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import TiltCard from '../components/TiltCard';

export default function About() {
  return (
    <PageTransition key="about">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-28 sm:pt-32 max-w-4xl pb-20 min-h-screen">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-16"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold mb-4 sm:mb-6 tracking-tighter text-white">
            Beyond the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Terminal.</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 flex justify-center md:block"
          >
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-none">
              <TiltCard maxTilt={5} perspective={1000} showGlare={true} className="w-full aspect-[3/4] rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden border border-white/10 bg-[#080a0f]/50 p-2 block cursor-hover">
                 <div className="w-full h-full rounded-2xl overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                   <img src="./assets/images/updatedpfp.jpg" alt="Ramon J. Williams" loading="eager" fetchPriority="high" className="w-full h-full object-cover transition-all duration-700" />
                 </div>
              </TiltCard>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-medium text-white mb-3 sm:mb-4">Background</h2>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-sans font-light">
                I'm Ramon J. Williams, a dedicated Computer Engineering and Cybersecurity student at the University of Kentucky. My journey bridges the gap between hardware functionality and secure, intelligent software systems.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-medium text-white mb-3 sm:mb-4">My Philosophy</h2>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-sans font-light">
                I believe that true engineering excellence comes from robust architecture. Whether I am configuring a high-availability cloud pipeline, fine-tuning an intrusion detection algorithm, or crafting a seamless user interface, security and performance remain at the core of my design ethos.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-medium text-white mb-3 sm:mb-4">Education</h2>
              <TiltCard 
                showGlare={true} 
                maxTilt={10} 
                perspective={1000} 
                className="bg-[#080a0f]/60 border border-white/10 group-hover:border-white/20 rounded-2xl p-5 sm:p-6 backdrop-blur-md transition-colors duration-300 group shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-200 transition-colors">University of Kentucky</h3>
                  <span className="text-blue-400 text-xs sm:text-sm font-bold uppercase tracking-wider">In Progress</span>
                </div>
                <p className="text-gray-400 font-sans text-sm sm:text-base mb-3">B.S. Computer Engineering &amp; Cybersecurity</p>
                <span className="inline-block text-xs sm:text-sm font-medium text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20 font-sans">
                  GPA: 3.5
                </span>
              </TiltCard>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
