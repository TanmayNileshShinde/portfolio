import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Flame, Trophy, CodeXml, Terminal } from 'lucide-react';
import { telemetryData } from '../data/portfolioData';

function generateContributions() {
  const weeks = 52;
  const daysPerWeek = 7;
  const grid = [];
  const today = new Date();

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

      const isWeekend = d === 0 || d === 6;
      const seed = Math.sin(w * 13 + d * 7) * 10000;
      const rand = seed - Math.floor(seed);

      let count = 0;
      let level = 0;

      if (w > 46) {
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

      week.push({ date: dateStr, count, level });
    }
    grid.push(week);
  }
  return grid;
}

export default function Activity() {
  const [activeSubTab, setActiveSubTab] = useState('github');
  const [hoveredDay, setHoveredDay] = useState(null);

  const contributionGrid = useMemo(() => generateContributions(), []);

  return (
    <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto relative" id="activity">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="mb-14 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-400/30 text-xs font-mono text-cyan-300 mb-3 uppercase tracking-wider">
          <span>04 // Engineering Cadence</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Activity & <span className="text-gradient">Telemetry</span>
        </h2>
        <p className="text-gray-400 mt-3 text-base sm:text-lg max-w-2xl">
          Continuous delivery metrics, code review frequency, and algorithmic problem-solving telemetry.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2.5 mt-6 font-mono text-xs">
          <button
            onClick={() => setActiveSubTab('github')}
            className={`px-4 py-2 rounded-full font-bold tracking-wider transition-all flex items-center gap-2 border ${
              activeSubTab === 'github'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                : 'glass-panel text-gray-400 border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            <GitCommit className="w-4 h-4 text-cyan-400" />
            01 // GITHUB.LOG
          </button>

          <button
            onClick={() => setActiveSubTab('leetcode')}
            className={`px-4 py-2 rounded-full font-bold tracking-wider transition-all flex items-center gap-2 border ${
              activeSubTab === 'leetcode'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                : 'glass-panel text-gray-400 border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            <CodeXml className="w-4 h-4 text-blue-400" />
            02 // LEETCODE.LOG
          </button>
        </div>

        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-6" />
      </div>

      {/* GitHub Log View */}
      {activeSubTab === 'github' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-left">
            <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all">
              <span className="text-gray-400 text-xs uppercase tracking-wider block">Year_Commits</span>
              <p className="text-3xl font-extrabold text-white mt-1">{telemetryData.github.yearCommits}</p>
              <span className="text-gray-500 text-[11px] block mt-0.5">Past 365 Days</span>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all">
              <span className="text-gray-400 text-xs uppercase tracking-wider block">Active_Days</span>
              <p className="text-3xl font-extrabold text-cyan-400 mt-1">{telemetryData.github.activeDays}</p>
              <span className="text-gray-500 text-[11px] block mt-0.5">Days with commits</span>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all">
              <span className="text-gray-400 text-xs uppercase tracking-wider block">Current_Streak</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-1 flex items-baseline gap-1">
                {telemetryData.github.currentStreak}
                <span className="text-xs font-normal text-gray-400">d</span>
              </p>
              <span className="text-gray-500 text-[11px] block mt-0.5">Continuous streak</span>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all">
              <span className="text-gray-400 text-xs uppercase tracking-wider block">Max_Streak</span>
              <p className="text-3xl font-extrabold text-amber-400 mt-1 flex items-baseline gap-1">
                {telemetryData.github.maxStreak}
                <span className="text-xs font-normal text-gray-400">d</span>
              </p>
              <span className="text-gray-500 text-[11px] block mt-0.5">Personal record</span>
            </div>
          </div>

          {/* Interactive Heatmap Matrix */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-4 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs text-gray-300">
                <span className="text-cyan-400">$</span>
                <span className="font-bold">git log --contributions --timeline</span>
                <span className="text-gray-500 ml-2 hidden sm:inline">@{telemetryData.github.username}</span>
              </div>

              <div className="font-mono text-xs text-cyan-400 h-4">
                {hoveredDay ? (
                  <span>
                    <strong className="text-white">{hoveredDay.count}</strong> contributions on {hoveredDay.date}
                  </span>
                ) : (
                  <span className="text-gray-500 text-[11px]">Hover over matrix cells to inspect date</span>
                )}
              </div>
            </div>

            {/* Matrix Viewport */}
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[720px] space-y-2">
                <div className="flex font-mono text-[10px] text-gray-500 pl-8 justify-between pr-2">
                  {telemetryData.github.months.map((m, idx) => (
                    <span key={idx} className="tracking-widest">{m}</span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <div className="flex flex-col justify-between py-1 text-[9px] font-mono text-gray-500 shrink-0 select-none">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>

                  <div className="flex gap-1 flex-1">
                    {contributionGrid.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-1 flex-1">
                        {week.map((day, dIdx) => (
                          <div
                            key={dIdx}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`w-full aspect-square rounded-sm border transition-all cursor-pointer ${
                              day.level === 0 ? 'bg-white/[0.03] border-white/5 hover:border-gray-500' :
                              day.level === 1 ? 'bg-cyan-950/70 border-cyan-900 hover:border-cyan-400' :
                              day.level === 2 ? 'bg-cyan-800 border-cyan-700 hover:border-cyan-300' :
                              day.level === 3 ? 'bg-cyan-500 border-cyan-400 hover:border-cyan-200' :
                              'bg-cyan-300 border-white shadow-[0_0_8px_rgba(34,211,238,0.7)]'
                            }`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-2 pt-3 font-mono text-[10px] text-gray-400">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 rounded-sm bg-white/[0.03] border border-white/5" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-cyan-950/70 border border-cyan-900" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-cyan-800 border border-cyan-700" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-cyan-500 border border-cyan-400" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-cyan-300 border border-white" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* LeetCode Log View */}
      {activeSubTab === 'leetcode' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 text-left"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
            <div className="glass-panel p-7 rounded-3xl border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-gray-400 text-xs uppercase tracking-wider block">PROBLEMS_SOLVED</span>
                <div className="text-4xl font-extrabold text-white mt-2">
                  {telemetryData.leetcode.totalSolved}
                  <span className="text-sm font-normal text-gray-500 ml-1.5">
                    / {telemetryData.leetcode.totalQuestions}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10 mt-6">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Acceptance Rate</span>
                  <span className="text-emerald-400 font-bold">{telemetryData.leetcode.acceptanceRate}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Ranking</span>
                  <span className="text-cyan-400 font-bold">{telemetryData.leetcode.ranking}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Active Streak</span>
                  <span className="text-amber-400 font-bold">{telemetryData.leetcode.streak}</span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-7 rounded-3xl border border-white/10 md:col-span-2 flex flex-col justify-center space-y-5">
              <span className="text-gray-400 text-xs uppercase tracking-wider block">DIFFICULTY_DISTRIBUTION</span>

              {/* Easy */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-emerald-400 font-bold">Easy</span>
                  <span className="text-gray-300">
                    {telemetryData.leetcode.easy} <span className="text-gray-500">/ {telemetryData.leetcode.easyTotal}</span>
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                    style={{ width: `${(telemetryData.leetcode.easy / telemetryData.leetcode.easyTotal) * 100}%` }}
                  />
                </div>
              </div>

              {/* Medium */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-amber-400 font-bold">Medium</span>
                  <span className="text-gray-300">
                    {telemetryData.leetcode.medium} <span className="text-gray-500">/ {telemetryData.leetcode.mediumTotal}</span>
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-amber-500 transition-all duration-700"
                    style={{ width: `${(telemetryData.leetcode.medium / telemetryData.leetcode.mediumTotal) * 100}%` }}
                  />
                </div>
              </div>

              {/* Hard */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-rose-400 font-bold">Hard</span>
                  <span className="text-gray-300">
                    {telemetryData.leetcode.hard} <span className="text-gray-500">/ {telemetryData.leetcode.hardTotal}</span>
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-rose-500 transition-all duration-700"
                    style={{ width: `${(telemetryData.leetcode.hard / telemetryData.leetcode.hardTotal) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3 font-mono">
            <span className="text-gray-400 text-xs uppercase tracking-wider block">VERIFIED_LEETCODE_BADGES</span>
            <div className="flex flex-wrap gap-2.5">
              {telemetryData.leetcode.badges.map((b, idx) => (
                <div key={idx} className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
