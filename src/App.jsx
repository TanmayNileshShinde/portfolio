import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

function App() {
  return (
    <div className="min-h-screen relative bg-[#050505] text-gray-100 overflow-x-hidden">
      {/* Custom Fluid Cursor (Fine pointer only) */}
      <Cursor />

      {/* Subtle Background Radial Grid Texture */}
      <div className="fixed inset-0 bg-radial-grid opacity-30 pointer-events-none -z-20" />

      {/* Ambient Animated Gradient Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none -z-10 animate-pulse" />
      <div className="fixed top-[45%] right-[-10%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[20%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none -z-10" />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Portfolio Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
      </main>

      {/* Footer & Contact Experience */}
      <Footer />
    </div>
  );
}

export default App;