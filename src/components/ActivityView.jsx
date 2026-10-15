import React, { useState, useMemo } from 'react';
import { 
  GitCommit, 
  Flame, 
  Calendar, 
  Trophy, 
  CodeXml, 
  CheckCircle2, 
  Terminal,
  Activity
} from 'lucide-react';
import { telemetryData } from '../data/portfolioData';

// Generate 52 weeks x 7 days realistic contribution grid
function generateContributions() {
  const weeks = 52;
  const daysPerWeek = 7;
  const grid = [];
  const today = new Date();

  // Pattern seeds to make realistic activity bursts
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < daysPerWeek; d++) {
      const daysAgo = (weeks - 1 - w) * 7 + (6 - d);
      const date = new Date(today);
      date.setDate(today.getDate() - daysAgo);

      const dateStr = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      // Realistic pseudo-random commit count based on week index and day
      const isWeekend = d === 0 || d === 6;
      const seed = Math.sin(w * 13 + d * 7) * 10000;
      const rand = seed - Math.floor(seed);

      let count = 0;
      let level = 0;

      if (w > 46) {
        // Recent high streak
        count = Math.floor(rand * 5) + 1;
      } else if (!isWeekend && rand > 0.42) {
        count = Math.floor(rand * 6) + 1;
      } else if (isWeekend && rand > 0.75) {
        count = Math.floor(rand * 4) + 1;
      }

      if (count === 0) level = 0;
      else if (count <= 2) level = 1;
      else if (count <= 4) level = 2;
      else if (count <= 6) level = 3;
      else level = 4;

      week.push({
        date: dateStr,
        count,
        level
      });
    }
    grid.push(week);
  }
  return grid;
}

export default function ActivityView() {
  const [activeSubTab, setActiveSubTab] = useState('github');
  const [hoveredDay, setHoveredDay] = useState(null);

  const contributionGrid = useMemo(() => generateContributions(), []);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Page Header */}
      <section className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
          Activity Telemetry Log
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Real-time telemetry stream aggregating version-control commit frequencies, code review cadence, and algorithmic problem-solving metrics.
        </p>

        {/* Sub-Tabs: 01 // GITHUB.LOG | 02 // LEETCODE.LOG */}
        <div className="flex flex-wrap items-center gap-2 pt-4 font-mono text-xs">
          <button
            onClick={() => setActiveSubTab('github')}
            className={`px-4 py-2 border font-bold tracking-wider transition-all flex items-center gap-2 ${
              activeSubTab === 'github'
                ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.3)]'
                : 'bg-[#101217] text-slate-400 border-[rgba(255,255,255,0.08)] hover:text-white hover:border-slate-600'
            }`}
          >
            <GitCommit className="w-4 h-4" />
            01 // GITHUB.LOG
          </button>

          <button
            onClick={() => setActiveSubTab('leetcode')}
            className={`px-4 py-2 border font-bold tracking-wider transition-all flex items-center gap-2 ${
              activeSubTab === 'leetcode'
                ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.3)]'
                : 'bg-[#101217] text-slate-400 border-[rgba(255,255,255,0.08)] hover:text-white hover:border-slate-600'
            }`}
          >
            <CodeXml className="w-4 h-4" />
            02 // LEETCODE.LOG
          </button>
        </div>

        <div className="w-full h-px bg-[rgba(255,255,255,0.08)] mt-6" />
      </section>

      {/* 01 // GITHUB.LOG VIEW */}
      {activeSubTab === 'github' && (
        <section className="space-y-6">
          {/* Status Header */}
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-200 font-bold">ONLINE</span>
              <span className="text-slate-600">|</span>
              <span className="text-blue-400">@{telemetryData.github.username}</span>
            </div>
            <span className="text-slate-500 text-[11px] hidden sm:inline">
              {telemetryData.github.cacheNotice}
            </span>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono">
            <div className="bg-[#101217] border border-[rgba(255,255,255,0.08)] p-4 sm:p-5 space-y-1">
              <span className="text-slate-500 text-[11px] uppercase tracking-wider block">
                Year_Commits
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white">
                {telemetryData.github.yearCommits}
              </span>
              <span className="text-slate-400 text-[10px] block">
                Past 365 Days
              </span>
            </div>

            <div className="bg-[#101217] border border-[rgba(255,255,255,0.08)] p-4 sm:p-5 space-y-1">
              <span className="text-slate-500 text-[11px] uppercase tracking-wider block">
                Active_Days
              </span>
              <span className="text-2xl sm:text-3xl font-black text-blue-400">
                {telemetryData.github.activeDays}
              </span>
              <span className="text-slate-400 text-[10px] block">
                Days with commits
              </span>
            </div>

            <div className="bg-[#101217] border border-[rgba(255,255,255,0.08)] p-4 sm:p-5 space-y-1">
              <span className="text-slate-500 text-[11px] uppercase tracking-wider block">
                Current_Streak
              </span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 flex items-baseline gap-1">
                {telemetryData.github.currentStreak}
                <span className="text-xs font-normal text-slate-400">d</span>
              </span>
              <span className="text-slate-400 text-[10px] block">
                Continuous streak
              </span>
            </div>

            <div className="bg-[#101217] border border-[rgba(255,255,255,0.08)] p-4 sm:p-5 space-y-1">
              <span className="text-slate-500 text-[11px] uppercase tracking-wider block">
                Max_Streak
              </span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 flex items-baseline gap-1">
                {telemetryData.github.maxStreak}
                <span className="text-xs font-normal text-slate-400">d</span>
              </span>
              <span className="text-slate-400 text-[10px] block">
                Personal record
              </span>
            </div>
          </div>

          {/* Interactive Heatmap Matrix */}
          <div className="bg-[#101217] border border-[rgba(255,255,255,0.08)] p-5 space-y-4">
            {/* Terminal Shell Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(255,255,255,0.06)] pb-3">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                <span className="text-emerald-400">$</span>
                <span className="font-bold">git log --contributions --timeline</span>
              </div>

              {/* Hover Tooltip Display */}
              <div className="font-mono text-xs text-blue-400 h-4">
                {hoveredDay ? (
                  <span>
                    <strong className="text-white">{hoveredDay.count}</strong> contributions on {hoveredDay.date}
                  </span>
                ) : (
                  <span className="text-slate-500 text-[11px]">Hover over matrix cells to inspect date</span>
                )}
              </div>
            </div>

            {/* Matrix Viewport (horizontally scrollable on small screens) */}
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[720px] space-y-2">
                {/* Month Markers */}
                <div className="flex font-mono text-[10px] text-slate-500 pl-8 justify-between pr-2">
                  {telemetryData.github.months.map((m, idx) => (
                    <span key={idx} className="tracking-widest">{m}</span>
                  ))}
                </div>

                {/* Day Rows with Week Columns */}
                <div className="flex gap-2">
                  {/* Day of Week Labels */}
                  <div className="flex flex-col justify-between py-1 text-[9px] font-mono text-slate-500 shrink-0 select-none">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>

                  {/* 52 Columns */}
                  <div className="flex gap-1 flex-1">
                    {contributionGrid.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-1 flex-1">
                        {week.map((day, dIdx) => (
                          <div
                            key={dIdx}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`w-full aspect-square border transition-all cursor-pointer ${
                              day.level === 0 ? 'bg-[#151722] border-[#1d202e] hover:border-slate-500' :
                              day.level === 1 ? 'bg-blue-950 border-blue-900 hover:border-blue-400' :
                              day.level === 2 ? 'bg-blue-700 border-blue-600 hover:border-blue-300' :
                              day.level === 3 ? 'bg-blue-500 border-blue-400 hover:border-blue-200' :
                              'bg-cyan-400 border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                            }`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-2 pt-3 font-mono text-[10px] text-slate-500">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 bg-[#151722] border border-[#1d202e]" />
                  <div className="w-2.5 h-2.5 bg-blue-950 border border-blue-900" />
                  <div className="w-2.5 h-2.5 bg-blue-700 border border-blue-600" />
                  <div className="w-2.5 h-2.5 bg-blue-500 border border-blue-400" />
                  <div className="w-2.5 h-2.5 bg-cyan-400 border border-cyan-300" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 02 // LEETCODE.LOG VIEW */}
      {activeSubTab === 'leetcode' && (
        <section className="space-y-6">
          {/* Status Header */}
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-200 font-bold">ONLINE</span>
              <span className="text-slate-600">|</span>
              <span className="text-amber-400">@{telemetryData.leetcode.username}</span>
            </div>
            <span className="text-slate-500 text-[11px]">
              Ranking: {telemetryData.leetcode.ranking}
            </span>
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
            {/* Total Solved Circle Card */}
            <div className="bg-[#101217] border border-[rgba(255,255,255,0.08)] p-6 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-slate-500 text-[11px] uppercase tracking-wider block">
                  PROBLEMS_SOLVED
                </span>
                <div className="text-4xl font-black text-white mt-1">
                  {telemetryData.leetcode.totalSolved}
                  <span className="text-sm font-normal text-slate-500 ml-1">
                    / {telemetryData.leetcode.totalQuestions}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Acceptance Rate</span>
                  <span className="text-emerald-400 font-bold">
                    {telemetryData.leetcode.acceptanceRate}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Active Streak</span>
                  <span className="text-amber-400 font-bold">
                    {telemetryData.leetcode.streak}
                  </span>
                </div>
              </div>
            </div>

            {/* Breakdown Progress Bars */}
            <div className="bg-[#101217] border border-[rgba(255,255,255,0.08)] p-6 space-y-4 md:col-span-2 flex flex-col justify-center">
              <span className="text-slate-500 text-[11px] uppercase tracking-wider block">
                DIFFICULTY_BREAKDOWN
              </span>

              {/* Easy */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-emerald-400 font-bold">Easy</span>
                  <span className="text-slate-300">
                    {telemetryData.leetcode.easy} <span className="text-slate-500">/ {telemetryData.leetcode.easyTotal}</span>
                  </span>
                </div>
                <div className="w-full h-2 bg-[#171924] overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${(telemetryData.leetcode.easy / telemetryData.leetcode.easyTotal) * 100}%` }}
                  />
                </div>
              </div>

              {/* Medium */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-amber-400 font-bold">Medium</span>
                  <span className="text-slate-300">
                    {telemetryData.leetcode.medium} <span className="text-slate-500">/ {telemetryData.leetcode.mediumTotal}</span>
                  </span>
                </div>
                <div className="w-full h-2 bg-[#171924] overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${(telemetryData.leetcode.medium / telemetryData.leetcode.mediumTotal) * 100}%` }}
                  />
                </div>
              </div>

              {/* Hard */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-rose-400 font-bold">Hard</span>
                  <span className="text-slate-300">
                    {telemetryData.leetcode.hard} <span className="text-slate-500">/ {telemetryData.leetcode.hardTotal}</span>
                  </span>
                </div>
                <div className="w-full h-2 bg-[#171924] overflow-hidden">
                  <div 
                    className="h-full bg-rose-500 transition-all duration-500"
                    style={{ width: `${(telemetryData.leetcode.hard / telemetryData.leetcode.hardTotal) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Badges Earned */}
          <div className="bg-[#101217] border border-[rgba(255,255,255,0.08)] p-6 space-y-3 font-mono">
            <span className="text-slate-500 text-[11px] uppercase tracking-wider block">
              // VERIFIED_BADGES_&_AWARDS
            </span>
            <div className="flex flex-wrap gap-2.5">
              {telemetryData.leetcode.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 bg-[#151722] border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2"
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
