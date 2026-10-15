import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomeView from './components/HomeView';
import SkillsView from './components/SkillsView';
import ProjectsView from './components/ProjectsView';
import ArchiveView from './components/ArchiveView';
import ActivityView from './components/ActivityView';
import ContactView from './components/ContactView';
import Cursor from './components/Cursor';

function getInitialTab() {
  const hash = window.location.hash.replace('#/', '').replace('#', '');
  const validTabs = ['home', 'skills', 'projects', 'archive', 'activity', 'contact'];
  return validTabs.includes(hash) ? hash : 'home';
}

export default function App() {
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const tab = getInitialTab();
      setActiveTab(tab);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Dynamic Browser Tab Title based on active section
  useEffect(() => {
    const titles = {
      home: 'Tanmay Shinde – Full Stack Developer',
      skills: 'Tech Stack | Tanmay Shinde',
      projects: 'Repositories | Tanmay Shinde',
      archive: 'Archive | Tanmay Shinde',
      activity: 'Activity Telemetry | Tanmay Shinde',
      contact: 'Initiate Contact | Tanmay Shinde'
    };
    document.title = titles[activeTab] || 'Tanmay Shinde – Full Stack Developer';
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#e2e8f0] relative flex selection:bg-blue-600 selection:text-white">
      {/* Subtle Fluid Cursor */}
      <Cursor />

      {/* Engineering Grid Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-grid-pattern -z-10" />

      {/* Ambient Cyber Light Spotlights (very subtle) */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-64 w-[400px] h-[400px] rounded-full bg-indigo-600/5 blur-[140px] pointer-events-none -z-10" />

      {/* Left Sidebar (Desktop Fixed / Mobile Drawer) */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area (Offset by 16rem on md+) */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64 transition-all duration-300">
        {/* Top Header */}
        <Header 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setMobileOpen={setMobileOpen}
        />

        {/* Viewport Container */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 md:px-12 py-8 sm:py-10">
          {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
          {activeTab === 'skills' && <SkillsView />}
          {activeTab === 'projects' && <ProjectsView />}
          {activeTab === 'archive' && <ArchiveView />}
          {activeTab === 'activity' && <ActivityView />}
          {activeTab === 'contact' && <ContactView />}
        </main>

        {/* Minimal Footer */}
        <footer className="border-t border-[rgba(255,255,255,0.06)] px-4 sm:px-8 md:px-12 py-6 text-center sm:text-left text-xs font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span>sys.version: v2.5.0</span>
            <span className="mx-2 text-slate-700">•</span>
            <span>tanmay.dev &copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-slate-400">ALL_SYSTEMS_NOMINAL</span>
          </div>
        </footer>
      </div>
    </div>
  );
}