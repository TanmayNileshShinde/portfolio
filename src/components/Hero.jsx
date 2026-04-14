import { motion } from 'framer-motion';
import profileImg from '../assets/tanmay-profile.png'; 

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: The Pitch */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-6"
        >
          <br /><br />
          {/* Subtle neon accent tag */}
          <span className="text-cyan-400 font-mono text-sm tracking-wider uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
            Software Developer
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tanmay.</span>
          </h1>
          
          <div className="glass-panel p-6 rounded-2xl border-l-4 border-cyan-400 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none" />
            <p className="text-gray-300 leading-relaxed text-lg relative z-10">
              I specialize in full-stack web and mobile architecture. With a formal foundation in Computer Engineering, I bridge the gap between complex backend logic and intuitive, modern user interfaces. 
              <br /><br />
              My core stack centers around React and real-time databases. Whether I'm managing complex state in an arcade hub or handling synchronous data in a live collaboration tool, I prioritize scalable, efficient code and original, glassmorphic design.
            </p>
          </div>

          {/* Functional Links */}
          <div className="flex gap-4 pt-4">
            <a 
              href="mailto:tanmaynileshshinde@gmail.com" 
              className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 transition-all duration-300 font-medium text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              Get in Touch
            </a>
            <a 
              href="https://github.com/TanmayNileshShinde" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-transparent hover:bg-white/5 transition-all duration-300 font-medium text-gray-300 hover:text-white"
            >
              View GitHub
            </a>
          </div>
        </motion.div>

        {/* Right Column: Visual/Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -15, 0] // <-- Moves up 15px and back down
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.2 },
            scale: { duration: 0.8, delay: 0.2 },
            y: { 
              duration: 6, // Takes 6 seconds for one full float cycle
              repeat: Infinity, // Never stops
              ease: "easeInOut" 
            }
          }}
          className="relative hidden md:block"
        >
          {/* Image Container with overflow-hidden to keep the perfect circle */}
          <div className="aspect-square rounded-full glass-panel flex items-center justify-center relative z-10 border border-white/10 shadow-[0_0_40px_rgba(34,211,238,0.15)] overflow-hidden">
             
             <img 
               src={profileImg} 
               alt="Tanmay" 
               className="w-full h-full object-cover" 
             />

          </div>
          
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/20 blur-[100px] rounded-full -z-10" />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;