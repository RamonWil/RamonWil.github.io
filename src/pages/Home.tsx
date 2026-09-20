import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Shield, Code, Brain, ChevronRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import TiltCard from '../components/TiltCard';
import PhysicsButton from '../components/PhysicsButton';
import { projects } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  })
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: custom * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  })
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <PageTransition key="home">
      <div ref={containerRef} className="relative z-10 container mx-auto px-4 sm:px-6 pt-28 sm:pt-32 max-w-6xl pb-20">
        
        {/* Hero Section */}
        <motion.section 
          style={{ y: heroY, opacity: heroOpacity }}
          className="min-h-[70vh] flex flex-col justify-center mb-24 sm:mb-32 relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050505]/0 to-[#050505]/0 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 z-10">
              <motion.div custom={1} initial="hidden" animate="visible" variants={fadeScale} className="mb-6 sm:mb-8 inline-block">
                <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-medium tracking-widest text-gray-300 uppercase">Available for work</span>
                </div>
              </motion.div>
              
              <motion.div custom={2} initial="hidden" animate="visible" variants={fadeInUp} className="mb-6 sm:mb-8">
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.08] tracking-tighter">
                  <span className="text-white">Engineering</span><br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">secure systems.</span>
                </h1>
              </motion.div>
              
              <motion.p 
                custom={3} initial="hidden" animate="visible" variants={fadeInUp}
                className="text-gray-400 text-base sm:text-lg md:text-xl max-w-xl mb-8 sm:mb-10 leading-relaxed font-sans font-light"
              >
                Computer Engineering &amp; Cybersecurity Student at the University of Kentucky. Specializing in AI, cloud infrastructure, and robust software architecture.
              </motion.p>
              
              <motion.div custom={4} initial="hidden" animate="visible" variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                <PhysicsButton
                  to="/projects"
                  hoverGlowColor="rgba(59, 130, 246, 0.5)"
                  className="w-full sm:w-auto h-12 sm:h-14 px-8 rounded-full bg-white text-black hover:bg-gray-200 shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-colors font-bold tracking-wide"
                >
                  View My Work
                  <ChevronRight size={18} />
                </PhysicsButton>
                
                <div className="flex items-center gap-3 sm:gap-4 px-1">
                  <PhysicsButton
                    href="https://linkedin.com/in/itsramon-williams"
                    target="_blank"
                    hoverGlowColor="rgba(59, 130, 246, 0.5)"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white backdrop-blur-xl transition-colors"
                  >
                    <LinkedinIcon />
                  </PhysicsButton>
                  
                  <PhysicsButton
                    href="mailto:ramonwilliams09@gmail.com"
                    hoverGlowColor="rgba(255, 255, 255, 0.2)"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white backdrop-blur-xl transition-colors"
                  >
                    <Mail size={20} />
                  </PhysicsButton>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-4 z-10 mt-4 lg:mt-0 flex justify-center lg:block">
              <motion.div custom={5} initial="hidden" animate="visible" variants={fadeScale} className="w-full max-w-xs sm:max-w-sm lg:max-w-none">
                <TiltCard maxTilt={10} perspective={1000} showGlare={true} className="w-full aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-[#080a0f]/50 p-2">
                   <div className="w-full h-full rounded-2xl overflow-hidden relative">
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                     <img src="./assets/images/updatedpfp.jpg" alt="Ramon J. Williams" loading="eager" fetchPriority="high" className="w-full h-full object-cover transition-all duration-700" />
                     <div className="absolute bottom-6 left-6 z-20">
                       <div className="text-white font-display font-bold text-xl">Ramon J. Williams</div>
                       <div className="text-blue-400 font-sans text-sm">Louisville, KY</div>
                     </div>
                   </div>
                </TiltCard>
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        {/* Featured Project */}
        <section className="mb-24 sm:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white">Selected Works</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <TiltCard 
               showGlare={true} 
               maxTilt={5} 
               perspective={1200} 
               className="group relative rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden bg-[#080a0f]/40 backdrop-blur-3xl border border-white/10 p-3 sm:p-5 block h-full cursor-hover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 h-full pointer-events-none">
                
                {projects[0].image ? (
                  <div className="relative h-[220px] sm:h-[320px] lg:h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#030406] border border-white/5">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-all duration-700" style={{ backgroundImage: `url("${projects[0].image}")` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="relative h-[220px] sm:h-[320px] lg:h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white/5 border border-white/5 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500">
                       {projects[0].icon}
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col justify-center py-3 sm:py-6 px-1 sm:px-2 lg:pr-6 pointer-events-auto h-full">
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {projects[0].tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className={`px-3 py-1 rounded-full border text-xs font-bold tracking-wider uppercase backdrop-blur-md font-sans ${tagIdx === 0 ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' : 'border-white/10 text-gray-300 bg-white/5'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium mb-3 sm:mb-4 text-white group-hover:text-blue-200 transition-colors">
                    {projects[0].title}
                  </h3>
                  
                  <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 font-sans font-light flex-grow">
                    {projects[0].description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mt-auto">
                    <PhysicsButton
                      {...(projects[0].link.startsWith('http') ? { href: projects[0].link, target: "_blank" } : { to: projects[0].link })}
                      hoverGlowColor="rgba(59, 130, 246, 0.4)"
                      className="h-12 px-6 rounded-full bg-white text-black hover:bg-gray-200 shadow-lg transition-colors font-semibold tracking-wide flex items-center justify-center gap-2"
                    >
                      Visit Site <ArrowUpRight size={18} />
                    </PhysicsButton>
                    <PhysicsButton
                      to="/projects"
                      hoverGlowColor="rgba(255, 255, 255, 0.2)"
                      className="h-12 px-6 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white shadow-lg transition-colors font-semibold tracking-wide flex items-center justify-center gap-2"
                    >
                      View All Projects
                    </PhysicsButton>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </section>
        {/* Core Competencies */}
        <section className="mb-24 sm:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-16"
          >
            <div className="h-[1px] flex-1 bg-gradient-to-l from-white/10 to-transparent" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white">Core Focus</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="w-8 h-8 text-blue-400" />,
                title: "Cybersecurity",
                desc: "Host-based intrusion detection, phishing simulations, and secure systems fundamentals.",
                bg: "from-blue-500/10 to-transparent"
              },
              {
                icon: <Code className="w-8 h-8 text-indigo-400" />,
                title: "Software Engineering",
                desc: "Python, Java, C++, JavaScript · REST APIs · Git & version control · testing and debugging workflows.",
                bg: "from-indigo-500/10 to-transparent"
              },
              {
                icon: <Brain className="w-8 h-8 text-purple-400" />,
                title: "AI & Cloud",
                desc: "LLM integration, data analysis, Azure + Docker deployment, and practical ML foundations.",
                bg: "from-purple-500/10 to-transparent"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="h-full"
              >
                <TiltCard showGlare={true} maxTilt={14} perspective={800} className="p-6 sm:p-8 rounded-[1.75rem] sm:rounded-[2rem] bg-[#080a0f]/60 backdrop-blur-3xl border border-white/10 group-hover:border-white/20 transition-colors duration-300 group h-full block cursor-hover w-full relative overflow-hidden shadow-2xl">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  
                  <div className="pointer-events-none relative z-10">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 ease-out shadow-lg">
                      {item.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-medium mb-3 sm:mb-4 text-white group-hover:text-blue-200 transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-sans font-light group-hover:text-gray-300 transition-colors">{item.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
