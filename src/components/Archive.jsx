import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Search, CheckCircle, X } from 'lucide-react';
import { archiveRecords } from '../data/portfolioData';

export default function Archive() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [activeModalRecord, setActiveModalRecord] = useState(null);

  const categories = ['ALL', 'CERTIFICATE', 'HACKATHON', 'PUBLICATION'];

  const filteredRecords = archiveRecords.filter((rec) => {
    const matchesCategory = categoryFilter === 'ALL' || rec.category === categoryFilter;
    const matchesSearch = 
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto relative" id="archive">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="mb-14 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-400/30 text-xs font-mono text-cyan-300 mb-3 uppercase tracking-wider">
          <span>05 // Verified Credentials</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Archive & <span className="text-gradient">Milestones</span>
        </h2>
        <p className="text-gray-400 mt-3 text-base sm:text-lg max-w-2xl">
          Curated record of hackathon awards, academic research publications, and verified technical certifications.
        </p>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-1.5 rounded-full font-mono text-xs font-semibold tracking-wider transition-all border ${
                  categoryFilter === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                    : 'glass-panel text-gray-400 border-white/10 hover:text-white hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-panel border border-white/10 focus:border-cyan-400/60 pl-10 pr-4 py-2 rounded-xl text-xs font-mono text-gray-200 placeholder-gray-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-6" />
      </div>

      {/* Records Grid */}
      <div className="space-y-3.5 text-left">
        {filteredRecords.length === 0 ? (
          <div className="p-10 text-center glass-panel rounded-2xl border border-white/10 font-mono text-xs text-gray-500">
            NO_MATCHING_RECORDS_FOUND
          </div>
        ) : (
          filteredRecords.map((rec) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="glass-panel hover:bg-white/[0.04] p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <span className="text-cyan-400 font-mono text-xs font-bold shrink-0 pt-1">
                  {rec.num}.
                </span>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {rec.title}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold uppercase">
                      {rec.category}
                    </span>
                  </div>

                  <p className="text-gray-400 text-xs font-mono">
                    {rec.issuer} <span className="text-gray-600">•</span> {rec.date}
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-2xl pt-1">
                    {rec.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex sm:justify-end">
                <button
                  onClick={() => setActiveModalRecord(rec)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-panel text-gray-200 hover:text-white hover:border-cyan-400/50 font-mono text-xs font-medium transition-all"
                >
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>View Credential</span>
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Credential Inspection Modal */}
      {activeModalRecord && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalRecord(null)}
        >
          <div 
            className="relative w-full max-w-lg glass-panel p-7 rounded-3xl border border-white/20 shadow-2xl space-y-5 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-mono text-[10px] font-bold uppercase">
                  {activeModalRecord.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1.5">
                  {activeModalRecord.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalRecord(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white glass-panel border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-gray-400">ISSUING_BODY</span>
                <span className="text-gray-200 font-medium">{activeModalRecord.issuer}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-gray-400">YEAR</span>
                <span className="text-cyan-400 font-bold">{activeModalRecord.date}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-gray-400">AUTHENTICITY_STATE</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  VERIFIED_ON_RECORD
                </span>
              </div>
              <p className="text-gray-300 font-sans text-xs sm:text-sm leading-relaxed pt-2">
                {activeModalRecord.description}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <a
                href={activeModalRecord.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Verified Link
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
