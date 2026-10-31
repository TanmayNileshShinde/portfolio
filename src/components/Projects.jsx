import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Info, Layers, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsList, projectCategories } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

// 3d card
const ProjectCard = ({ project, index, onOpenModal }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 250,
    damping: 25
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
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
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between group border border-white/10 hover:border-cyan-500/50 transition-colors duration-500 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-left"
    >
      {/* Dynamic Hover Glow */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent transition-opacity duration-700 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      {/* Decorative Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top Header: Number, Category & Status Badge */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-cyan-400">
            {project.num}.
          </span>
          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 uppercase tracking-wider">
            {project.badge || project.type}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Deployed</span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="relative z-10 flex-grow">
        <h3 className="text-2xl font-extrabold text-white mb-2 group-hover:text-cyan-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-5 font-normal">
          {project.description}
        </p>

        {/* Feature Highlights */}
        {project.features && (
          <div className="mb-6 space-y-1.5 pt-3 border-t border-white/5">
            <p className="text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-2">Core Features:</p>
            {project.features.slice(0, 3).map((feature, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-300">
                <span className="text-cyan-400 mt-0.5">▹</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t, tIdx) => (
            <span
              key={tIdx}
              className="text-xs font-mono px-3 py-1 rounded-xl bg-white/[0.04] text-gray-300 border border-white/10 group-hover:border-cyan-500/30 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
        <button
          onClick={() => onOpenModal(project)}
          className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>SPEC_DETAILS</span>
        </button>

        <div className="flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl glass-panel text-gray-300 hover:text-white border border-white/10 hover:border-white/30 text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Code</span>
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filteredProjects = selectedCategory === 'all'
    ? projectsList
    : projectsList.filter(p => p.category === selectedCategory);

  return (
    <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto relative" id="projects">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="mb-14 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-400/30 text-xs font-mono text-cyan-300 mb-3 uppercase tracking-wider">
          <span>03 // Shipped Systems</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Featured <span className="text-gradient">Repositories</span>
        </h2>
        <p className="text-gray-400 mt-3 text-base sm:text-lg max-w-2xl">
          Architectural deep dives into production systems, real-time collaboration engines, and interactive web platforms.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 mt-6">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wider transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                  : 'glass-panel text-gray-400 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-6" />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, idx) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={idx} 
            onOpenModal={setActiveModalProject}
          />
        ))}
      </div>

      {/* Project Spec Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}