import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer'; // <-- Import added

function App() {
  return (
    <div className="min-h-screen selection:bg-cyan-500/30 selection:text-white overflow-hidden relative bg-[#050505]">
      
      {/* --- ADD THESE TWO DIVS FOR THE ANIMATED BACKGROUND --- */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-900/20 blur-[120px] mix-blend-screen pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-900/20 blur-[120px] mix-blend-screen pointer-events-none animate-[pulse_10s_ease-in-out_infinite_reverse]" />
      {/* ------------------------------------------------------ */}

      {/* The rest of your app components */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
        </main>
        <Footer /> 
      </div>
    </div>
  );
}

export default App;