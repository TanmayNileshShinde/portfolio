import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Activity from './components/Activity';
import Archive from './components/Archive';
import Education from './components/Education';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

export default function App() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'contact', title: 'Connect | Tanmay Shinde' },
        { id: 'education', title: 'Education | Tanmay Shinde' },
        { id: 'archive', title: 'Archive | Tanmay Shinde' },
        { id: 'activity', title: 'Activity Telemetry | Tanmay Shinde' },
        { id: 'projects', title: 'Repositories | Tanmay Shinde' },
        { id: 'skills', title: 'Tech Stack | Tanmay Shinde' },
        { id: 'about', title: 'About | Tanmay Shinde' },
      ];

      const scrollPos = window.scrollY + 250;
      let matched = 'Tanmay Shinde – Full Stack Developer';

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && scrollPos >= el.offsetTop) {
          matched = section.title;
          break;
        }
      }

      document.title = matched;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative bg-[#050505] text-gray-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      {/* Custom Fluid Cursor (Fine pointer only) */}
      <Cursor />

      {/* Subtle Background Radial Grid Texture */}
      <div className="fixed inset-0 bg-radial-grid opacity-30 pointer-events-none -z-20" />

      {/* Ambient Animated Gradient Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none -z-10 animate-pulse" />
      <div className="fixed top-[45%] right-[-10%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[20%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none -z-10" />

      {/* Floating Glassmorphic Navigation Header */}
      <Navbar />

      {/* Main Single-Page Portfolio Experience */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Activity />
        <Archive />
        <Education />
      </main>

      {/* Footer & Contact Experience */}
      <Footer />
    </div>
  );
}