import { motion } from 'framer-motion';
import profileImg from '../assets/tanmay-profile.png'; 

// Elite custom easing curve
const customEase = [0.16, 1, 0.3, 1];

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div className="flex flex-col space-y-6">
          <br /><br />
          
          {/* Masked Slide-Up Text */}
          <div className="overflow-hidden">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              className="inline-block text-cyan-400 font-mono text-sm tracking-wider uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
            >
              Software Developer
            </motion.span>
          </div>
          
          <div className="overflow-hidden py-2">
            <motion.h1 
              initial={{ y: "100%", rotate: 2 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: customEase }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-white origin-bottom-left"
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tanmay.</span>
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: customEase }}
            className="glass-panel p-6 rounded-2xl border-l-4 border-cyan-400 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none" />
            <p className="text-gray-300 leading-relaxed text-lg relative z-10">
              I specialize in full-stack web and mobile architecture. With a formal foundation in Computer Engineering, I bridge the gap between complex backend logic and intuitive, modern user interfaces. 
              <br /><br />
              My core stack centers around React and real-time databases. Whether I'm managing complex state in an arcade hub or handling synchronous data in a live collaboration tool, I prioritize scalable, efficient code and original, glassmorphic design.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: customEase }}
            className="flex gap-4 pt-4"
          >
            <motion.a 
              href="mailto:tanmaynileshshinde@gmail.com" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 transition-all duration-300 font-medium text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              Get in Touch
            </motion.a>
            <motion.a 
              href="https://github.com/TanmayNileshShinde" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg bg-transparent font-medium text-gray-300 hover:text-white"
            >
              View GitHub ↗
            </motion.a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            filter: "blur(0px)",
            y: [0, -20, 0] 
          }}
          transition={{ 
            opacity: { duration: 1, ease: customEase },
            scale: { duration: 1, ease: customEase },
            filter: { duration: 1, ease: customEase },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
          className="relative hidden md:block"
        >
          <div className="aspect-square rounded-full glass-panel flex items-center justify-center relative z-10 border border-white/10 shadow-[0_0_60px_rgba(34,211,238,0.2)] overflow-hidden">
             <img src={profileImg} alt="Tanmay" className="w-full h-full object-cover scale-105" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/20 blur-[100px] rounded-full -z-10" />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;