import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Cpu } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d0e14] border border-[rgba(255,255,255,0.12)] shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-blue-400 font-bold">{project.num}.</span>
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold uppercase text-[10px]">
                {project.badge}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{project.type}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-[#14161f] border border-[rgba(255,255,255,0.08)] transition-colors focus:outline-none"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
            // SYSTEM_OVERVIEW
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Architecture Spec */}
        {project.architecture && (
          <div className="space-y-2 bg-[#12141c] border-l-2 border-blue-500 p-4 border-t border-r border-b border-[rgba(255,255,255,0.06)]">
            <h3 className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              ARCHITECTURE_&_PIPELINE
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed">
              {project.architecture}
            </p>
          </div>
        )}

        {/* Key Features */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
            // CORE_CAPABILITIES
          </h3>
          <ul className="space-y-2 font-mono text-xs sm:text-sm">
            {project.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Pills */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
            // STACK_SPECIFICATION
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-[#151722] border border-[rgba(255,255,255,0.08)] text-slate-200 text-xs font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[rgba(255,255,255,0.08)]">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
            >
              <ExternalLink className="w-4 h-4" />
              LIVE_DEPLOYMENT
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#14161f] hover:bg-[#1a1d29] border border-[rgba(255,255,255,0.1)] text-slate-200 font-mono text-xs font-bold tracking-wider transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              SOURCE_REPOSITORY
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
