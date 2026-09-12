import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, FileText } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import PhysicsButton from '../components/PhysicsButton';
import { projects } from '../data/projects';

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <PageTransition key="not-found">
        <div className="min-h-screen flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl font-display mb-4">Project Not Found</h1>
            <Link to="/projects" className="text-blue-400 hover:underline">Return to Projects</Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const isExternalLink = project.link.startsWith('http');

  return (
    <PageTransition key={`project-${project.id}`}>
      <div className="relative z-10 container mx-auto px-6 pt-32 max-w-5xl pb-20 min-h-screen">
        
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link to="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-hover font-sans">
            <ArrowLeft size={20} /> Back to Projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex flex-wrap gap-3 mb-8">
            {project.tags.map((tag, tagIdx) => (
              <span key={tagIdx} className={`px-4 py-1.5 rounded-full border text-xs font-bold tracking-wider uppercase backdrop-blur-md font-sans ${tagIdx === 0 ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' : 'border-white/10 text-gray-300 bg-white/5'}`}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 text-white tracking-tighter">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap gap-4 items-center">
            {isExternalLink && (
              <PhysicsButton
                href={project.link}
                target="_blank"
                hoverGlowColor="rgba(59, 130, 246, 0.4)"
                className="h-14 px-8 rounded-full bg-white text-black hover:bg-gray-200 shadow-lg transition-colors font-semibold tracking-wide flex items-center gap-2"
              >
                Visit Live Site <ArrowUpRight size={18} />
              </PhysicsButton>
            )}

            {project.reportUrl && (
              <PhysicsButton
                href={project.reportUrl}
                target="_blank"
                hoverGlowColor="rgba(59, 130, 246, 0.4)"
                className="h-14 px-8 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 shadow-lg transition-colors font-semibold tracking-wide flex items-center gap-2"
              >
                <FileText size={18} /> {project.reportLabel || "View Report"}
              </PhysicsButton>
            )}
          </div>
        </motion.div>

        {/* Hero Image / Thumbnail */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full aspect-[21/9] rounded-[2rem] overflow-hidden bg-[#030406] border border-white/10 mb-20 relative"
          >
            <div className="absolute inset-0 bg-cover bg-center transition-all duration-700" style={{ backgroundImage: `url("${project.image}")` }} />
          </motion.div>
        )}

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8"
          >
            <h2 className="text-3xl font-display font-medium text-white mb-6">Overview</h2>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-sans font-light">
              {project.fullDescription || project.description}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-4"
          >
             <div className="bg-[#080a0f]/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-8">
               <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                 {project.icon}
               </div>
               <h3 className="text-xl font-display font-medium text-white mb-2">Role</h3>
               <p className="text-gray-400 font-sans mb-6">Lead Developer / Engineer</p>
               
               <h3 className="text-xl font-display font-medium text-white mb-2">Technologies</h3>
               <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-gray-400 text-sm font-sans">{tag}</span>
                  ))}
               </div>
             </div>
          </motion.div>
        </div>

        {/* Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="space-y-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-display font-medium text-white"
            >
              Gallery
            </motion.h2>
            
            {project.images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full aspect-[16/9] rounded-[2rem] overflow-hidden bg-[#030406] border border-white/10 relative"
              >
                <div className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url("${img}")` }} />
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </PageTransition>
  );
}
