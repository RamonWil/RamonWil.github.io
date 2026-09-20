import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ArrowUp, FileText } from 'lucide-react';
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
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-28 sm:pt-32 max-w-5xl pb-20 min-h-screen">
        
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <PhysicsButton
            to="/projects"
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white font-sans text-xs sm:text-sm font-medium tracking-wide border border-white/10 hover:border-white/20 transition-all backdrop-blur-md shadow-md flex items-center gap-2 group cursor-hover"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </PhysicsButton>
        </motion.div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-16"
        >
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
            {project.tags.map((tag, tagIdx) => (
              <span key={tagIdx} className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border text-[11px] sm:text-xs font-bold tracking-wider uppercase backdrop-blur-md font-sans ${tagIdx === 0 ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' : 'border-white/10 text-gray-300 bg-white/5'}`}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-6 sm:mb-8 text-white tracking-tighter">
            {project.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            {isExternalLink && (
              <PhysicsButton
                href={project.link}
                target="_blank"
                hoverGlowColor="rgba(59, 130, 246, 0.4)"
                className="h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-white text-black hover:bg-gray-200 shadow-lg transition-colors font-semibold tracking-wide flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Visit Live Site <ArrowUpRight size={18} />
              </PhysicsButton>
            )}

            {project.reportUrl && (
              <PhysicsButton
                href={project.reportUrl}
                target="_blank"
                hoverGlowColor="rgba(59, 130, 246, 0.4)"
                className="h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 shadow-lg transition-colors font-semibold tracking-wide flex items-center justify-center gap-2 text-sm sm:text-base"
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
            className="w-full aspect-[16/10] sm:aspect-[21/9] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-[#030406] border border-white/10 mb-12 sm:mb-20 relative"
          >
            <div className="absolute inset-0 bg-cover bg-center transition-all duration-700" style={{ backgroundImage: `url("${project.image}")` }} />
          </motion.div>
        )}

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-12 sm:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8"
          >
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-white mb-4 sm:mb-6">Overview</h2>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed font-sans font-light">
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
             <div className="bg-[#080a0f]/40 backdrop-blur-3xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
               <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 sm:mb-6">
                 {project.icon}
               </div>
               <h3 className="text-lg sm:text-xl font-display font-medium text-white mb-1.5 sm:mb-2">Role</h3>
               <p className="text-gray-400 font-sans mb-5 sm:mb-6 text-sm sm:text-base">Lead Developer / Engineer</p>
               
               <h3 className="text-lg sm:text-xl font-display font-medium text-white mb-2">Technologies</h3>
               <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-gray-400 text-xs sm:text-sm font-sans bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">{tag}</span>
                  ))}
               </div>
             </div>
          </motion.div>
        </div>

        {/* Interactive Showcase */}
        {project.images && project.images.length > 0 && (
          <div className="space-y-16 sm:space-y-24 mt-16 sm:mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-4xl font-display font-medium text-white mb-4">Feature Showcase</h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto" />
            </motion.div>
            
            {project.images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
              >
                <div className="w-full lg:w-3/5">
                  <div className="w-full aspect-[16/10] sm:aspect-[4/3] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-[#030406] border border-white/10 relative shadow-2xl group">
                    <div className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${img.url}")` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                </div>
                
                <div className="w-full lg:w-2/5 flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="h-px w-12 bg-blue-400 mb-6" />
                    <p className="text-gray-300 text-lg sm:text-xl leading-relaxed font-sans font-light">
                      {img.text}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom Navigation: Back to Top & Back to Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 sm:mt-28 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <PhysicsButton
            to="/projects"
            className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase border border-white/10 hover:border-white/20 transition-all backdrop-blur-md shadow-lg flex items-center gap-2 group cursor-hover"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </PhysicsButton>

          <PhysicsButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            hoverGlowColor="rgba(59, 130, 246, 0.4)"
            className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase border border-blue-500/30 hover:border-blue-500/50 transition-all backdrop-blur-md shadow-lg flex items-center gap-2 group cursor-hover"
          >
            <span>Back to the Top</span>
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </PhysicsButton>
        </motion.div>

      </div>
    </PageTransition>
  );
}
