import React from 'react';
import { 
  Download, 
  Mail, 
  GraduationCap, 
  Layers, 
  Cpu, 
  ArrowUpRight 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { personalInfo, education } from '../data/portfolioData';

export default function HomeView({ setActiveTab }) {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero Section */}
      <section className="space-y-6">
        <header className="space-y-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase">
            {personalInfo.name}
            <span className="sr-only"> – {personalInfo.roleDisplay}</span>
          </h1>

          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
            <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold tracking-wider uppercase">
              ROLE: {personalInfo.role}
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="text-slate-500">LOC:</span>
              <span className="text-slate-200 font-medium">{personalInfo.location}</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="text-slate-500">STATUS:</span>
              <span className="text-emerald-400 font-medium">AVAILABLE_FOR_HIRE</span>
            </span>
          </div>
        </header>

        {/* Short Bio */}
        <div className="max-w-3xl">
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            {personalInfo.bio}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={personalInfo.resumeUrl}
            download
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-mono font-bold tracking-wider transition-all shadow-[0_0_20px_rgba(37,99,235,0.35)] hover:shadow-[0_0_28px_rgba(37,99,235,0.5)] active:translate-y-0.5"
          >
            <Download className="w-4 h-4" />
            DOWNLOAD_RESUME
          </a>

          <button
            onClick={() => {
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#13141a] hover:bg-[#1a1b24] border border-[rgba(255,255,255,0.12)] hover:border-slate-500 text-slate-200 text-xs sm:text-sm font-mono font-bold tracking-wider transition-all"
          >
            <Mail className="w-4 h-4 text-blue-400" />
            CONTACT_ME
          </button>
        </div>

        <div className="w-full h-px bg-[rgba(255,255,255,0.08)] mt-8" />
      </section>

      {/* 01. Personal_Identity_Node */}
      <section className="space-y-4">
        <header className="flex items-center gap-3">
          <span className="text-blue-400 font-mono text-sm font-bold">01.</span>
          <h2 className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white uppercase">
            Personal_Identity_Node
          </h2>
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)] ml-2" />
        </header>

        <article className="bg-[#101217] border-l-2 border-blue-500 border-t border-r border-b border-[rgba(255,255,255,0.06)] p-5 sm:p-7 space-y-4">
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {personalInfo.identityText1}
          </p>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {personalInfo.identityText2}
          </p>
        </article>
      </section>

      {/* 02. Academic_Node */}
      <section className="space-y-4">
        <header className="flex items-center gap-3">
          <span className="text-blue-400 font-mono text-sm font-bold">02.</span>
          <h2 className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white uppercase">
            Academic_Node
          </h2>
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)] ml-2" />
        </header>

        <div className="bg-[#101217] border border-[rgba(255,255,255,0.08)] p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(255,255,255,0.06)] pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-400" />
                {education.degree}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-mono mt-1">
                {education.institution}
              </p>
            </div>
            <div className="font-mono text-xs text-right sm:text-right">
              <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 font-semibold">
                {education.period}
              </span>
              <p className="text-slate-500 text-[11px] mt-1">{education.status}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono text-slate-400 font-semibold tracking-wider uppercase">
              KEY_COURSEWORK_&_SPECIALIZATIONS
            </h4>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 bg-[#151722] border border-[rgba(255,255,255,0.06)] text-slate-300 font-mono text-xs"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Links Bar */}
      <section className="pt-2">
        <div className="w-full h-px bg-[rgba(255,255,255,0.08)] mb-6" />
        <nav aria-label="Social links" className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-slate-400">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-400 transition-colors group"
          >
            <GithubIcon className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
            <span className="tracking-wide">GITHUB</span>
            <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100" />
          </a>

          <span className="text-slate-700">|</span>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-400 transition-colors group"
          >
            <LinkedinIcon className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
            <span className="tracking-wide">LINKEDIN</span>
            <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100" />
          </a>

          <span className="text-slate-700">|</span>

          <a
            href={personalInfo.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-400 transition-colors group"
          >
            <LeetcodeIcon className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
            <span className="tracking-wide">LEETCODE</span>
            <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100" />
          </a>

          <span className="text-slate-700">|</span>

          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-2 hover:text-blue-400 transition-colors group"
          >
            <Mail className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
            <span className="tracking-wide">EMAIL</span>
            <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100" />
          </a>
        </nav>
      </section>
    </div>
  );
}
