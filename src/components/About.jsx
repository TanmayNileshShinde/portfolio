import { motion } from 'framer-motion';
import aboutImg from '../assets/workspace.jpg';
import { personalInfo } from '../data';

const principles = [
  {
    title: 'Scalable Architecture',
    desc: 'Writing modular, decoupled components with predictable data flow and atomic design patterns.',
    icon: (
      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: 'Low Latency Real-Time',
    desc: 'Leveraging WebSockets and WebRTC for instantaneous data transmission and synchronized workspaces.',
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: 'Glassmorphic UX Design',
    desc: 'Crafting premium dark interfaces with tailored glassmorphic depth, smooth physics, and fluid responsiveness.',
    icon: (
      <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    title: 'Robust Cloud Integration',
    desc: 'Securing cloud databases (Firebase, Supabase, MongoDB) with strict authentication rules and transactions.',
    icon: (
      <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    )
  }
];

const About = () => {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto relative" id="about">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-blue-600/10 blur-[140px] rounded-full -z-10" />

      {/* Section Header */}
      <div className="mb-14 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-blue-400/30 text-xs font-mono text-blue-300 mb-3 uppercase tracking-wider">
          <span>Background & Philosophy</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          The <span className="text-gradient">Engineer</span> Behind the Code
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Side: The Narrative (7 columns) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 glass-panel p-7 sm:p-9 rounded-3xl border-t-4 border-cyan-500 relative overflow-hidden"
        >
          <div className="space-y-5 text-gray-300 leading-relaxed text-base sm:text-lg text-left">
            <p>
              I'm <strong className="text-white font-semibold">{personalInfo.name}</strong>, a software developer driven by the challenge of transforming complex systems into intuitive, high-performance web applications.
            </p>
            <p>
              Holding a formal foundation in Computer Engineering, I approach software with rigorous attention to both data architecture and the human experience. I believe exceptional software lives at the intersection of robust backend mechanics and delightful, fluid frontends.
            </p>
            <p>
              Whether engineering <strong className="text-cyan-300">CollabClass</strong>—handling peer-to-peer WebRTC video streams alongside synchronized canvas state—or building <strong className="text-blue-300">React Nexus</strong> with 8 interactive games under zero lag, I obsess over performance budgets, frame rates, and maintainable architecture.
            </p>
            <p className="text-sm text-gray-400 font-mono pt-2 border-t border-white/10">
              📍 Based in {personalInfo.location} • Actively building & open for collaborative software engineering roles.
            </p>
          </div>
        </motion.div>

        {/* Right Side: Workspace Showcase & Core Pillars (5 columns) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Workspace Image with Glass Frame */}
          <div className="w-full aspect-[4/3] rounded-2xl glass-panel relative overflow-hidden group border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent mix-blend-overlay z-10 pointer-events-none" />
            
            <img 
              src={aboutImg} 
              alt="Engineering Workspace" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
            />

            <div className="absolute bottom-3 left-3 right-3 glass-panel px-3.5 py-2 rounded-xl border border-white/10 flex items-center justify-between z-20">
              <span className="text-xs font-mono text-cyan-300">Engineering Workstation</span>
              <span className="text-xs text-gray-400">VS Code & Linux</span>
            </div>
          </div>

          {/* Quick Metrics & Highlights Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            {principles.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-4 rounded-xl border border-white/5 hover:border-cyan-400/30 transition-all duration-300 text-left group"
              >
                <div className="mb-2 p-2 rounded-lg bg-white/5 w-fit group-hover:bg-cyan-500/10 transition-colors">
                  {item.icon}
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-400 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default About;