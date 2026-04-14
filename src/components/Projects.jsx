import { motion } from 'framer-motion';
import { projects } from '../data';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Projects = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto" id="projects">
      <div className="mb-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Architecture</span>
        </h2>
        <div className="h-1 w-24 bg-cyan-500 rounded-full" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14"
      >
        {projects.map((project) => (
          <motion.div 
            key={project.id}
            variants={cardVariants}
            className="glass-panel p-8 md:p-12 rounded-3xl flex flex-col h-full group hover:border-cyan-500/50 transition-all duration-500 relative overflow-hidden"
          >
            {/* Background glow hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent transition-all duration-700 pointer-events-none" />
            
            {/* Top Content (Pushes bottom content down) */}
            <div className="flex flex-col flex-grow relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4 tracking-wide">{project.title}</h3>
              <p className="text-gray-400 leading-loose text-lg mb-8 flex-grow">
                {project.description}
              </p>
              
              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-3 mb-10">
                {project.tech.map((tech, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-1.5 text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/20 rounded-full tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Links (Anchored to the bottom) */}
            <div className="flex flex-wrap gap-6 relative z-10 mt-auto pt-6 border-t border-white/10">
              <a 
                href={project.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                View Live Deployment ↗
              </a>
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-semibold text-gray-500 hover:text-white transition-colors"
              >
                Source Code
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;