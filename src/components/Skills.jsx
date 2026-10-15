import { motion } from 'framer-motion';
import { skillsCategories } from '../data';

const getCategoryIcon = (iconName) => {
  switch (iconName) {
    case 'code':
      return (
        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case 'server':
      return (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      );
    case 'database':
      return (
        <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
  }
};

const Skills = () => {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto relative" id="skills">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="mb-16 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-400/30 text-xs font-mono text-cyan-300 mb-3 uppercase tracking-wider">
          <span>Technical Arsenal</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Skills & <span className="text-gradient">Technologies</span>
        </h2>
        <p className="text-gray-400 mt-3 text-base sm:text-lg max-w-2xl">
          A battle-tested set of languages, frameworks, and cloud architectures used to build high-concurrency and reactive web apps.
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-4" />
      </div>

      {/* Grid of 4 Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillsCategories.map((cat, idx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel p-7 sm:p-8 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between text-left group"
          >
            <div>
              {/* Card Header with Icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:scale-110 group-hover:border-cyan-500/30 transition-all duration-300">
                  {getCategoryIcon(cat.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cat.category}
                  </h3>
                  <span className="text-xs font-mono text-gray-400">
                    {cat.skills.length} core competencies
                  </span>
                </div>
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3.5 py-1.5 text-xs sm:text-sm font-mono text-gray-200 bg-white/[0.04] border border-white/10 rounded-xl hover:border-cyan-400/50 hover:bg-cyan-950/30 hover:text-cyan-300 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Subtle bottom indicator */}
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-500">
              <span>Production Verified</span>
              <span className="text-cyan-400/70">● Active</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
