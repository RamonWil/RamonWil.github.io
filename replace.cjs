const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const replacement = `
        {/* Featured Project */}
        <section className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6 mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-medium text-white">Selected Works</h2>
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
               className="group relative rounded-[2rem] overflow-hidden bg-[#080a0f]/40 backdrop-blur-3xl border border-white/10 p-4 block h-full cursor-hover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 h-full pointer-events-none">
                
                {projects[0].image ? (
                  <div className="relative h-[350px] lg:h-full rounded-3xl overflow-hidden bg-[#030406] border border-white/5">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-all duration-700" style={{ backgroundImage: \`url("\${projects[0].image}")\` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="relative h-[350px] lg:h-full rounded-3xl overflow-hidden bg-white/5 border border-white/5 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500">
                       {projects[0].icon}
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col justify-center py-6 pr-6 pointer-events-auto h-full">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects[0].tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className={\`px-3 py-1 rounded-full border text-xs font-bold tracking-wider uppercase backdrop-blur-md font-sans \${tagIdx === 0 ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' : 'border-white/10 text-gray-300 bg-white/5'}\`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-display font-medium mb-4 text-white group-hover:text-blue-200 transition-colors">
                    {projects[0].title}
                  </h3>
                  
                  <p className="text-gray-400 text-lg leading-relaxed mb-8 font-sans font-light flex-grow">
                    {projects[0].description}
                  </p>
                  
                  <div className="flex gap-4 items-center mt-auto">
                    <PhysicsButton
                      {...(projects[0].link.startsWith('http') ? { href: projects[0].link, target: "_blank" } : { to: projects[0].link })}
                      hoverGlowColor="rgba(59, 130, 246, 0.4)"
                      className="h-12 px-6 rounded-full bg-white text-black hover:bg-gray-200 shadow-lg transition-colors font-semibold tracking-wide flex items-center gap-2"
                    >
                      Visit Site <ArrowUpRight size={18} />
                    </PhysicsButton>
                    <PhysicsButton
                      to="/projects"
                      hoverGlowColor="rgba(255, 255, 255, 0.2)"
                      className="h-12 px-6 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white shadow-lg transition-colors font-semibold tracking-wide flex items-center gap-2"
                    >
                      View All Projects
                    </PhysicsButton>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </section>
`;

// regex to replace everything between {/* Featured Project */} and {/* Core Competencies */}
code = code.replace(/\{\/\* Featured Project \*\/\}[\s\S]*?(?=\{\/\* Core Competencies \*\/})/g, replacement);

fs.writeFileSync('src/pages/Home.tsx', code);
