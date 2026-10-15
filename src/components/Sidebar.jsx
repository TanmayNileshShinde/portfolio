import React, { useState, useEffect } from 'react';
import { 
  House, 
  Terminal, 
  FolderOpen, 
  Award, 
  Activity, 
  Mail, 
  X,
  ExternalLink
} from 'lucide-react';
import { personalInfo, navItems } from '../data/portfolioData';

const iconMap = {
  House,
  Terminal,
  FolderOpen,
  Award,
  Activity,
  Mail
};

export default function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) {
  const [localTime, setLocalTime] = useState('');

  // Live ticking clock in IST (Asia/Kolkata)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setLocalTime(timeStr);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setMobileOpen) setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = id === 'home' ? '' : id;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0c0d12] border-r border-[rgba(255,255,255,0.08)] flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div>
          <div className="h-16 px-5 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 text-left group focus:outline-none"
            >
              <span className="text-xl font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">
                {personalInfo.domain}
              </span>
              <span className="text-xs font-mono px-1.5 py-0.5 rounded-none bg-blue-500/10 border border-blue-500/30 text-blue-400 font-semibold">
                SYS
              </span>
            </button>

            {/* Mobile Close Button */}
            <button 
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-slate-400 hover:text-white p-1"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 font-mono">
            {navItems.map((item) => {
              const Icon = iconMap[item.icon] || Terminal;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium tracking-wider transition-all duration-150 border text-left ${
                    isActive 
                      ? 'bg-[#161821] border-blue-500/40 text-blue-400 font-semibold shadow-[inset_2px_0_0_#3b82f6]' 
                      : 'border-transparent text-slate-400 hover:text-slate-100 hover:bg-[#12131a] hover:border-[rgba(255,255,255,0.06)]'
                  }`}
                >
                  <span className={`shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-500'}`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-bold opacity-60 shrink-0">
                    {item.num}.
                  </span>
                  <span className="truncate">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: System Status */}
        <div className="p-4 border-t border-[rgba(255,255,255,0.08)] bg-[#0a0b0e]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
              SYSTEM_STATUS
            </h3>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {personalInfo.status}
            </span>
          </div>

          <dl className="space-y-2 font-mono text-[11px]">
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">LOCAL_TIME</dt>
              <dd className="text-blue-400 font-bold tracking-wider">
                {localTime || '00:00:00'}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">LOCATION</dt>
              <dd className="text-slate-300 font-medium">
                {personalInfo.location}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">BUILD</dt>
              <dd className="text-slate-400 text-[10px]">
                {personalInfo.buildVersion}
              </dd>
            </div>
          </dl>
        </div>
      </aside>
    </>
  );
}
