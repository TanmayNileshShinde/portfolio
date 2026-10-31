import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // spring physics
  const springConfig = { stiffness: 400, damping: 28, mass: 0.5 };
  const springX = useSpring(-100, springConfig);
  const springY = useSpring(-100, springConfig);

  useEffect(() => {
    // touch check
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a, button, input, textarea, [role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [springX, springY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none select-none">
      {/* 1. Ambient Lagging Glow */}
      <motion.div
        className="fixed top-0 left-0 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
        animate={{
          x: mousePosition.x - 225,
          y: mousePosition.y - 225,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.35 }}
        style={{ zIndex: 1 }}
      />

      {/* 2. Responsive Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 border border-cyan-400 rounded-full pointer-events-none mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9999,
          width: isHovering ? 48 : 28,
          height: isHovering ? 48 : 28,
          backgroundColor: isHovering ? 'rgba(34, 211, 238, 0.15)' : 'transparent',
        }}
        transition={{ duration: 0.2 }}
      />

      {/* 3. Instant Center Core Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none mix-blend-difference"
        style={{
          transform: `translate3d(${mousePosition.x - 4}px, ${mousePosition.y - 4}px, 0)`,
          zIndex: 10000,
        }}
      />
    </div>
  );
};

export default Cursor;