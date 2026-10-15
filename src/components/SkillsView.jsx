import React from 'react';
import { techStackCategories } from '../data/portfolioData';

export default function SkillsView() {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Page Header */}
      <section className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
          Tech Stack
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          The languages, frameworks, real-time protocols, databases, and infrastructure tooling I use to architect, build, and deploy high-performance software systems.
        </p>
        <div className="w-full h-px bg-[rgba(255,255,255,0.08)] mt-6" />
      </section>

      {/* Categories */}
      <div className="space-y-12">
        {techStackCategories.map((category) => (
          <section key={category.num} className="space-y-5">
            {/* Category Header */}
            <header className="flex items-center gap-3">
              <span className="text-blue-400 font-mono text-sm font-bold">
                {category.num}.
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white uppercase">
                {category.title}
              </h2>
              <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)] ml-2" />
            </header>

            {/* Subgroups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.groups.map((group, gIdx) => (
                <div
                  key={gIdx}
                  className="bg-[#101217] border border-[rgba(255,255,255,0.08)] hover:border-slate-600 transition-colors p-5 space-y-4"
                >
                  <h3 className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase flex items-center justify-between">
                    <span>{group.label}</span>
                    <span className="text-slate-600 font-normal">[{group.skills.length}]</span>
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1.5 bg-[#151722] hover:bg-[#1c1f2e] border border-[rgba(255,255,255,0.06)] hover:border-blue-500/40 text-slate-200 text-xs font-mono transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
