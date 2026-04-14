import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Elite spring physics for the outer ring
  const springX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    // Detect if hovering over clickable elements
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button')) setIsHovering(true);
      else setIsHovering(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [springX, springY]);

  return (
    <>
      {/* 1. The massive ambient glow (Smooth lag) */}
      <motion.div
        className="fixed top-0 left-0 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[150px] pointer-events-none mix-blend-screen hidden md:block"
        animate={{ x: mousePosition.x - 300, y: mousePosition.y - 300 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
        style={{ zIndex: 0 }}
      />

      {/* 2. The Spring-Physics Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-cyan-400 rounded-full pointer-events-none mix-blend-screen hidden md:block"
        style={{ 
          x: springX, y: springY, 
          translateX: "-50%", translateY: "-50%", zIndex: 9999 
        }}
        animate={{ scale: isHovering ? 1.5 : 1, opacity: isHovering ? 0 : 1 }}
      />

      {/* 3. The Instant Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none mix-blend-difference hidden md:block"
        animate={{ x: mousePosition.x, y: mousePosition.y, translateX: "-50%", translateY: "-50%" }}
        transition={{ type: "tween", duration: 0 }}
        style={{ zIndex: 10000 }}
      />
    </>
  );
};

export default Cursor;