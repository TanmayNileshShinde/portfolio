import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen hidden md:block"
      animate={{
        x: mousePosition.x - 250, // Centers the 500px circle on the cursor
        y: mousePosition.y - 250,
      }}
      transition={{ 
        type: "tween", 
        ease: "easeOut", 
        duration: 0.4 // Creates a slight, buttery delay behind the actual cursor
      }}
      style={{ zIndex: 0 }}
    />
  );
};

export default Cursor;