import React, { useState } from 'react';
import { ExternalLink, Info, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsList, projectCategories } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

export default function ProjectsView() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filteredProjects = selectedCategory === 'all'
    ? projectsList
    : projectsList.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Page Header */}
      <section className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
          Repositories
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Browse shipped applications, real-time collaboration platforms, tactical simulation tools, and full-stack software systems engineered across web and cloud architectures.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 font-mono text-xs font-semibold tracking-wider transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.3)]'
                  : 'bg-[#101217] text-slate-400 border-[rgba(255,255,255,0.08)] hover:text-white hover:border-slate-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="w-full h-px bg-[rgba(255,255,255,0.08)] mt-6" />
      </section>

      {/* Projects Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="group bg-[#101217] border border-[rgba(255,255,255,0.08)] hover:border-blue-500/50 transition-all duration-200 p-6 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 font-mono text-xs">
                <span className="text-blue-400 font-bold">
                  {project.num}.
                </span>
                <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-[10px] uppercase">
                  {project.badge}
                </span>
              </div>

              {/* Title & Type */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                  {project.title}
                </h2>
                <p className="text-slate-500 text-xs font-mono mt-0.5">
                  {project.type}
                </p>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-[#151722] border border-[rgba(255,255,255,0.06)] text-slate-300 font-mono text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.06)] font-mono text-xs">
              <button
                onClick={() => setActiveModalProject(project)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Info className="w-3.5 h-3.5" />
                <span>SPEC_DETAILS</span>
              </button>

              <div className="flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                    title="View GitHub Source"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>CODE</span>
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold transition-colors"
                    title="Open Live Deployment"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>LIVE</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Project Spec Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </div>
  );
}
