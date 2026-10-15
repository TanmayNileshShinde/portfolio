import { motion } from 'framer-motion';
import profileImg from '../assets/tanmay-profile.png';
import { personalInfo, stats } from '../data';

const techBadges = [
  'React 19',
  'Node.js',
  'WebRTC',
  'Firebase',
  'Supabase',
  'Socket.io',
  'Tailwind CSS',
  'TypeScript',
  'Python'
];

const customEase = [0.16, 1, 0.3, 1];

const Hero = () => {
  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6 flex flex-col justify-center relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Bio & Call to Actions (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span className="text-xs font-mono tracking-wider uppercase text-cyan-300 font-semibold">
              Software Developer & Architect
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-2">
              Hi, I'm <span className="text-gradient">Tanmay.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 font-light mt-3 leading-snug">
              Engineering scalable full-stack applications & real-time architectures.
            </p>
          </motion.div>

          {/* Description Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: customEase }}
            className="glass-panel p-6 sm:p-7 rounded-2xl border-l-4 border-cyan-400 relative overflow-hidden group shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-transparent pointer-events-none" />
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed relative z-10">
              With a background in Computer Engineering, I specialize in building mission-critical client experiences and high-throughput real-time backends. My core stack leverages <span className="text-cyan-300 font-medium">React</span>, <span className="text-blue-300 font-medium">WebRTC</span>, and serverless datastores like <span className="text-cyan-300 font-medium">Firebase & Supabase</span> to deliver silky-smooth 60FPS user interfaces with synchronous state management.
            </p>
          </motion.div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: customEase }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={scrollToProjects}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-semibold text-sm shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <button
              onClick={scrollToContact}
              className="px-6 py-3.5 rounded-xl glass-panel text-white font-medium text-sm border border-white/20 hover:border-cyan-400/50 hover:bg-white/10 active:scale-[0.98] transition-all duration-300"
            >
              Get in Touch
            </button>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl glass-panel text-gray-300 hover:text-white font-medium text-sm border border-white/10 hover:border-white/30 transition-all flex items-center gap-2 group"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub ↗</span>
            </a>
          </motion.div>

          {/* Tech Badges Horizontal Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-4 flex flex-wrap items-center gap-2"
          >
            <span className="text-xs font-mono text-gray-500 uppercase tracking-wider mr-1">Stack:</span>
            {techBadges.map((badge, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-3 py-1 rounded-lg bg-white/[0.04] text-gray-300 border border-white/10 hover:border-cyan-400/30 hover:text-cyan-300 transition-colors"
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Avatar with Holographic Glow (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: customEase }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          {/* Animated Glow Rings */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
            {/* Ambient Background Blur */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/25 via-blue-500/20 to-purple-500/25 rounded-full blur-[80px] -z-10 animate-pulse" />
            
            {/* Rotating Conic Ring */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 opacity-60 blur-sm animate-[spin_12s_linear_infinite]" />

            {/* Inner Frame */}
            <div className="relative w-full h-full rounded-full p-2 bg-[#0a0f1d] border border-white/20 shadow-[0_0_50px_rgba(34,211,238,0.25)] overflow-hidden">
              <img
                src={profileImg}
                alt="Tanmay Nilesh Shinde"
                loading="eager"
                className="w-full h-full object-cover rounded-full filter contrast-[1.05] brightness-95"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Experience Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-0 glass-panel px-4 py-2 rounded-2xl border border-cyan-400/40 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex items-center gap-3"
            >
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
              <div className="text-left">
                <p className="text-xs font-mono text-cyan-300 font-bold uppercase">Engineering</p>
                <p className="text-xs text-gray-300">Computer Science</p>
              </div>
            </motion.div>

            {/* Floating Stack Badge */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-2 -right-2 sm:top-4 sm:right-0 glass-panel px-4 py-2 rounded-2xl border border-blue-400/40 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex items-center gap-2.5"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
              <div className="text-left">
                <p className="text-xs font-mono text-blue-300 font-bold">Full-Stack</p>
                <p className="text-xs text-gray-400">React + Cloud</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Stats Counter Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: customEase }}
        className="max-w-6xl w-full mx-auto mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6"
      >
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-panel p-4 rounded-xl text-center border border-white/5 hover:border-cyan-500/30 transition-all duration-300">
            <p className="text-2xl sm:text-3xl font-extrabold text-gradient">{stat.value}</p>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;