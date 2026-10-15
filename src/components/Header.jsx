import React from 'react';
import { Menu } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const breadcrumbMap = {
  home: { label: 'home', path: '/' },
  skills: { label: 'skills', path: '/skills' },
  projects: { label: 'repositories', path: '/projects' },
  archive: { label: 'archive', path: '/archive' },
  activity: { label: 'activity', path: '/activity' },
  contact: { label: 'contact', path: '/contact' }
};

export default function Header({ activeTab, setActiveTab, setMobileOpen }) {
  const currentBreadcrumb = breadcrumbMap[activeTab]?.label || 'home';

  return (
    <header className="sticky top-0 z-30 w-full bg-[#09090b]/90 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)] px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Mobile Brand & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 text-slate-400 hover:text-white bg-[#14151c] border border-[rgba(255,255,255,0.08)] focus:outline-none"
          aria-label="Open navigation menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Mobile Brand */}
        <span className="md:hidden font-mono text-xs font-bold text-slate-200">
          {personalInfo.domain}
        </span>
        <span className="md:hidden text-slate-600 font-mono text-xs">//</span>

        {/* Breadcrumb Display */}
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-slate-500 flex items-center gap-1.5 sm:gap-2">
          <button 
            onClick={() => setActiveTab('home')}
            className="hover:text-blue-400 transition-colors focus:outline-none"
          >
            root
          </button>
          <span>/</span>
          <span className="text-slate-400">sys</span>
          <span>/</span>
          <span className="text-blue-400 font-bold bg-blue-500/10 px-1.5 py-0.5 border border-blue-500/20">
            {currentBreadcrumb}
          </span>
        </nav>
      </div>

      {/* Right: Status Badges (Hidden on tiny screens, visible on sm+) */}
      <div className="flex items-center gap-2.5 font-mono text-xs">
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-[#121319] border border-[rgba(255,255,255,0.08)] text-[11px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300 font-medium">STATUS:</span>
          <span className="text-blue-400 font-bold">{personalInfo.status}</span>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-[#121319] border border-[rgba(255,255,255,0.08)] text-[11px] text-slate-400">
          <span className="text-slate-500">BUILD:</span>
          <span className="text-slate-300 font-medium">{personalInfo.buildVersion}</span>
        </div>
      </div>
    </header>
  );
}
