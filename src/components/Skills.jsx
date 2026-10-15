import React from 'react';
import { motion } from 'framer-motion';
import { techStackCategories } from '../data/portfolioData';
import { Code, Server, Database, Wrench, Cloud } from 'lucide-react';

const categoryIcons = [Code, Server, Database, Wrench, Cloud];

export default function Skills() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto relative" id="skills">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="mb-16 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-400/30 text-xs font-mono text-cyan-300 mb-3 uppercase tracking-wider">
          <span>02 // Technical Arsenal</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Skills & <span className="text-gradient">Tech Stack</span>
        </h2>
        <p className="text-gray-400 mt-3 text-base sm:text-lg max-w-2xl">
          The languages, frameworks, real-time protocols, databases, and infrastructure tooling I use to design, build, ship, and scale modern software systems.
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-4" />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techStackCategories.map((category, idx) => {
          const Icon = categoryIcons[idx] || Code;
          return (
            <motion.div
              key={category.num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between text-left group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400/40 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-cyan-400/70 block">
                      {category.num}. SYSTEM_PILLAR
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {category.title}
                    </h3>
                  </div>
                </div>

                {/* Subgroups */}
                <div className="space-y-4">
                  {category.groups.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-2">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase block">
                        {group.label}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-3 py-1 text-xs font-mono text-gray-200 bg-white/[0.04] border border-white/10 rounded-xl hover:border-cyan-400/50 hover:bg-cyan-950/30 hover:text-cyan-300 transition-all duration-200 cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom footer tag */}
              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
                <span>Production Verified</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
