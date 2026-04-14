import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { projects } from '../data';

// Custom component for the 3D hover effect
const TiltCard = ({ project, style }) => {
  const ref = useRef(null);
  
  // Motion values to track mouse inside the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for butter-smooth snap back
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse position to 3D rotation degrees (-10deg to 10deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel p-8 md:p-12 rounded-3xl flex flex-col h-full group border border-white/5 hover:border-cyan-500/50 transition-colors duration-500 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 group-hover:from-cyan-500/5 to-transparent transition-all duration-700 pointer-events-none" />
      
      <div className="flex flex-col flex-grow relative z-10" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-3xl font-bold text-white mb-4 tracking-wide drop-shadow-md">{project.title}</h3>
        <p className="text-gray-400 leading-loose text-lg mb-8 flex-grow">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-3 mb-10">
          {project.tech.map((tech, index) => (
            <span key={index} className="px-4 py-1.5 text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/20 rounded-full tracking-wider shadow-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-6 relative z-10 mt-auto pt-6 border-t border-white/10" style={{ transform: "translateZ(20px)" }}>
        <motion.a href={project.live} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors">
          View Live Deployment ↗
        </motion.a>
        <motion.a href={project.github} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} className="text-sm font-semibold text-gray-500 hover:text-white transition-colors">
          Source Code
        </motion.a>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yEven = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yOdd = useTransform(scrollYProgress, [0, 1], [100, -200]);

  return (
    <section ref={containerRef} className="py-32 px-6 max-w-7xl mx-auto perspective-1000" id="projects">
      <div className="mb-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Architecture</span>
        </h2>
        <div className="h-1 w-24 bg-cyan-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {projects.map((project, index) => (
          <TiltCard 
            key={project.id} 
            project={project} 
            style={{ y: index % 2 === 0 ? yEven : yOdd }} 
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;