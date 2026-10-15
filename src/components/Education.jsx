import { motion } from 'framer-motion';
import { education } from '../data';

const achievements = [
  {
    title: 'Computer Engineering Degree',
    organization: 'Undergraduate Program',
    period: 'Curriculum & Core Systems',
    desc: 'In-depth study of computer systems, networks, algorithms, operating systems, and object-oriented software engineering.',
    badge: 'Formal Foundation'
  },
  {
    title: 'Advanced Client-Side Scripting',
    organization: 'Web Architecture Specialization',
    period: 'Modern Frameworks',
    desc: 'Engineered complex real-time distributed applications using React, WebRTC, Vite, and reactive state stores.',
    badge: 'Specialization'
  },
  {
    title: 'Full-Stack Project Leadership',
    organization: 'Personal & Collaborative Builds',
    period: 'Production Deployments',
    desc: 'Shipped multiple live public web apps handling user sessions, multi-client sockets, and cloud authentication.',
    badge: 'Shipped Work'
  }
];

const Education = () => {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto relative" id="education">
      {/* Background glow */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-blue-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="mb-16 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-blue-400/30 text-xs font-mono text-blue-300 mb-3 uppercase tracking-wider">
          <span>Academics & Milestones</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Education & <span className="text-gradient">Foundation</span>
        </h2>
        <p className="text-gray-400 mt-3 text-base sm:text-lg max-w-2xl">
          Theoretical foundation and engineering discipline backing modern software development.
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Main Degree Card (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 glass-panel p-7 sm:p-9 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-colors flex flex-col justify-between text-left relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                Degree Program
              </span>
              <span className="text-xs font-mono text-gray-400">{education.period}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {education.degree}
            </h3>

            <p className="text-cyan-400 font-mono text-sm mb-6">
              Core Focus: {education.focus}
            </p>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Key Academic Competencies:</p>
              {education.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                  <span className="text-cyan-400 mt-1">✔</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-400">
            <span>Discipline: Computer Engineering</span>
            <span className="text-emerald-400">● Accredited</span>
          </div>
        </motion.div>

        {/* Milestones List (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4 text-left">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-cyan-400/30 transition-all group"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  {item.badge}
                </span>
                <span className="text-xs text-gray-400 font-mono">{item.period}</span>
              </div>
              <h4 className="text-white font-bold text-base mt-2 group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs font-medium text-gray-400 mb-2">{item.organization}</p>
              <p className="text-xs text-gray-300 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;
