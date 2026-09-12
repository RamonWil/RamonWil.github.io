import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import TiltCard from '../components/TiltCard';
import PhysicsButton from '../components/PhysicsButton';
import { projects } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';

export default function Projects() {
  return (
    <PageTransition key="projects">
      <div className="relative z-10 container mx-auto px-6 pt-32 max-w-6xl pb-20 min-h-screen">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Selected</span>
            <br className="md:hidden" />
            <span className="text-white"> Works.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-sans font-light leading-relaxed">
            A showcase of my recent engineering projects, ranging from security tools to scalable cloud infrastructure and AI integration.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (idx % 2) * 0.2 }}
              className={`h-full ${project.featured ? 'md:col-span-2' : ''}`}
            >
              <TiltCard 
                showGlare={true} 
                maxTilt={project.featured ? 5 : 10} 
                perspective={1200} 
                className="group relative rounded-[2rem] overflow-hidden bg-[#080a0f]/40 backdrop-blur-3xl border border-white/10 p-4 block h-full cursor-hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className={`relative grid ${project.featured ? 'grid-cols-1 lg:grid-cols-2 gap-8' : 'grid-cols-1 gap-6'} h-full pointer-events-none`}>
                  
                  {project.image ? (
                    <div className={`relative ${project.featured ? 'h-[350px] lg:h-full' : 'h-[250px]'} rounded-3xl overflow-hidden bg-[#030406] border border-white/5`}>
                      <div className={`absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-all duration-700`} style={{ backgroundImage: `url("${project.image}")` }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className={`relative ${project.featured ? 'h-[350px] lg:h-full' : 'h-[250px]'} rounded-3xl overflow-hidden bg-white/5 border border-white/5 flex items-center justify-center`}>
                      <div className="w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500">
                         {project.icon}
                      </div>
                    </div>
                  )}
                  
                  <div className={`flex flex-col ${project.featured ? 'justify-center py-6 pr-6' : 'p-4'} pointer-events-auto h-full`}>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIdx) => (
                        <span key={tagIdx} className={`px-3 py-1 rounded-full border text-xs font-bold tracking-wider uppercase backdrop-blur-md font-sans ${tagIdx === 0 ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' : 'border-white/10 text-gray-300 bg-white/5'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className={`${project.featured ? 'text-3xl md:text-4xl' : 'text-2xl'} font-display font-medium mb-4 text-white group-hover:text-blue-200 transition-colors`}>
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 text-lg leading-relaxed mb-8 font-sans font-light flex-grow">
                      {project.description}
                    </p>
                    
                    <PhysicsButton
                      {...(project.link.startsWith('http') ? { href: project.link, target: "_blank" } : { to: project.link })}
                      hoverGlowColor="rgba(59, 130, 246, 0.4)"
                      className="self-start h-12 px-6 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white shadow-lg transition-colors font-semibold tracking-wide flex items-center gap-2 mt-auto"
                    >
                      {project.id === 'sersuite' ? 'Visit Site' : 'View Details'} <ArrowUpRight size={18} />
                    </PhysicsButton>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
