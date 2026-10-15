import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projects } from '../data';

// 3D Interactive Card Component
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 250,
    damping: 25
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 250,
    damping: 25
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel p-6 sm:p-9 rounded-3xl flex flex-col justify-between group border border-white/10 hover:border-cyan-500/50 transition-colors duration-500 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-left"
    >
      {/* Dynamic Hover Glow */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent transition-opacity duration-700 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      {/* Decorative Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top Header: Category & Live Indicator */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-5">
        <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 uppercase tracking-wider">
          {project.tag || project.category}
        </span>
        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Deployed</span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="relative z-10 flex-grow">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 group-hover:text-cyan-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
          {project.description}
        </p>

        {/* Feature Highlights */}
        {project.features && (
          <div className="mb-6 space-y-2 pt-2 border-t border-white/5">
            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Key Highlights:</p>
            {project.features.map((feature, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                <span className="text-cyan-400 mt-1">▹</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t, tIdx) => (
            <span
              key={tIdx}
              className="px-3 py-1 text-xs font-mono text-cyan-200 bg-cyan-950/40 border border-cyan-500/20 rounded-lg hover:border-cyan-400/50 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer Links */}
      <div className="relative z-10 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 mt-auto">
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs sm:text-sm shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>Live Deployment</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-panel text-gray-300 hover:text-white border border-white/10 hover:border-white/30 text-xs sm:text-sm font-medium transition-all group/btn"
        >
          <svg className="w-4 h-4 text-gray-400 group-hover/btn:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>Source Code</span>
        </a>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto relative" id="projects">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/5 blur-[160px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="mb-16 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-400/30 text-xs font-mono text-cyan-300 mb-3 uppercase tracking-wider">
          <span>Featured Portfolio</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Featured <span className="text-gradient">Architecture</span> & Builds
        </h2>
        <p className="text-gray-400 mt-3 text-base sm:text-lg max-w-2xl">
          Real-world applications solving complex challenges in synchronization, state management, WebRTC media flow, and database isolation.
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-4" />
      </div>

      {/* Responsive Grid with NO overlap bugs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;