import { motion } from 'framer-motion';

const Navbar = () => {
  // Smooth scroll utility
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-5xl mx-auto glass-panel rounded-full px-6 py-3 flex items-center justify-between border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        
        {/* The Brand/Logo */}
        <div 
          className="text-white font-bold text-xl tracking-tighter cursor-pointer hover:text-cyan-400 transition-colors" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          TANMAY<span className="text-cyan-400">.</span>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollTo('about')} 
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            The Engineer
          </button>
          <button 
            onClick={() => scrollTo('projects')} 
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Architecture
          </button>
        </div>
        
        {/* Functional Contact Link */}
        <button 
          onClick={() => scrollTo('contact')}
          className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]"
        >
          Contact
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;