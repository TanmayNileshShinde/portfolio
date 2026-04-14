const Footer = () => {
  return (
    <footer id="contact" className="w-full py-12 mt-20 border-t border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">
          Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Connect</span>
        </h3>

        {/* Social Links Grid */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          
          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/tanmay-shinde-9b07753bb"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-xl glass-panel text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
            </svg>
            <span className="font-medium text-sm tracking-wide">LinkedIn</span>
          </a>

          {/* GitHub */}
          <a 
            href="https://github.com/TanmayNileshShinde"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-xl glass-panel text-gray-300 hover:text-white hover:border-white/50 transition-all duration-300 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
            <span className="font-medium text-sm tracking-wide">GitHub</span>
          </a>

          {/* Email */}
          <a 
            href="mailto:tanmaynileshshinde@gmail.com" 
            className="flex items-center gap-3 px-6 py-3 rounded-xl glass-panel text-gray-300 hover:text-blue-400 hover:border-blue-500/50 transition-all duration-300 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
              <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <span className="font-medium text-sm tracking-wide">Email</span>
          </a>

        </div>

        <p className="text-gray-600 text-sm font-mono mt-4">
          © {new Date().getFullYear()} Tanmay. Engineered from scratch.
        </p>
      </div>
    </footer>
  );
};

export default Footer;