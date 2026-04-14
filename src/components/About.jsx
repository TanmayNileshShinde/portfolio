import { motion } from 'framer-motion';
// 1. ADD YOUR IMPORT HERE
import aboutImg from '../assets/workspace.jpg'; // Change 'workspace.jpg' to your exact file name!

const About = () => {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto relative" id="about">
      {/* Subtle background glow to keep the neon theme cohesive */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full -z-10" />

      <div className="mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-white mb-4">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Engineer</span>
        </h2>
        <div className="h-1 w-16 bg-blue-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: The Narrative (Spans 7 columns) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7 glass-panel p-8 md:p-10 rounded-2xl border-t-4 border-blue-500/50"
        >
          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
            <p>
              I'm Tanmay, a software developer specializing in full-stack web and mobile architecture. I build clean, high-performance applications that solve real problems.
            </p>
            <p>
              With a formal foundation in Computer Engineering, I bridge the gap between complex backend logic and intuitive, modern user interfaces. My core stack centers around React for dynamic frontends, powered by real-time databases like Firebase and Supabase. 
            </p>
            <p>
              Whether I'm managing complex state in an arcade hub, configuring full-stack integration, or handling synchronous data in a live collaboration tool, I prioritize scalable, efficient code. Beyond the backend, I have a sharp eye for modern UI/UX, prioritizing original, glassmorphic designs and functional aesthetics over templated layouts.
            </p>
          </div>
        </motion.div>

        {/* Right Side: The Visual / Quick Stats (Spans 5 columns) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* 2. UPDATED IMAGE CONTAINER */}
          <div className="w-full aspect-[4/3] rounded-2xl glass-panel flex items-center justify-center relative overflow-hidden group border border-white/10">
            {/* The glass overlay that gives it a slight tint */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-cyan-500/20 mix-blend-overlay z-10 pointer-events-none" />
            
            <img 
              src={aboutImg} 
              alt="Engineering Workspace" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Core Competencies Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-colors">
              <h4 className="text-white font-semibold mb-1">Frontend</h4>
              <p className="text-sm text-cyan-400 font-mono">React, Vite, Tailwind</p>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors">
              <h4 className="text-white font-semibold mb-1">Backend</h4>
              <p className="text-sm text-blue-400 font-mono">Firebase, Supabase</p>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-colors">
              <h4 className="text-white font-semibold mb-1">Mobile</h4>
              <p className="text-sm text-cyan-400 font-mono">Android (Java/XML)</p>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors">
              <h4 className="text-white font-semibold mb-1">Languages</h4>
              <p className="text-sm text-blue-400 font-mono">JavaScript, Python</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;