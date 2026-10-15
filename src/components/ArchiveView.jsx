import React, { useState } from 'react';
import { Award, ExternalLink, Search, CheckCircle, FileText, X } from 'lucide-react';
import { archiveRecords } from '../data/portfolioData';

export default function ArchiveView() {
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
    <div className="space-y-10 animate-fade-in">
      {/* Page Header */}
      <section className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
          Archive
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          A curated record of certifications, hackathon awards, research publications, and verified credentials connected to my learning and engineering practice.
        </p>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 font-mono text-xs font-semibold tracking-wider transition-all border ${
                  categoryFilter === cat
                    ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.3)]'
                    : 'bg-[#101217] text-slate-400 border-[rgba(255,255,255,0.08)] hover:text-white hover:border-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Filter records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#101217] border border-[rgba(255,255,255,0.08)] focus:border-blue-500 pl-9 pr-3 py-1.5 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="w-full h-px bg-[rgba(255,255,255,0.08)] mt-6" />
      </section>

      {/* Archive Grid / List */}
      <section className="space-y-3">
        {filteredRecords.length === 0 ? (
          <div className="p-8 text-center bg-[#101217] border border-[rgba(255,255,255,0.08)] font-mono text-xs text-slate-500">
            NO_MATCHING_RECORDS_FOUND
          </div>
        ) : (
          filteredRecords.map((rec) => (
            <article
              key={rec.id}
              className="group bg-[#101217] hover:bg-[#13151f] border border-[rgba(255,255,255,0.08)] hover:border-slate-600 transition-all p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <span className="text-blue-400 font-mono text-xs font-bold shrink-0 pt-0.5">
                  {rec.num}.
                </span>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                      {rec.title}
                    </h2>
                    <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] font-bold uppercase">
                      {rec.category}
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs font-mono">
                    {rec.issuer} <span className="text-slate-600">•</span> {rec.date}
                  </p>
                  <p className="text-slate-300 text-xs leading-relaxed max-w-2xl pt-1">
                    {rec.description}
                  </p>
                </div>
              </div>

              {/* View Action */}
              <div className="shrink-0 flex sm:justify-end">
                <button
                  onClick={() => setActiveModalRecord(rec)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#171924] hover:bg-blue-600 text-slate-300 hover:text-white border border-[rgba(255,255,255,0.08)] hover:border-blue-500 font-mono text-xs font-semibold tracking-wider transition-all"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>VIEW_CREDENTIAL</span>
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      {/* Record Credential Modal */}
      {activeModalRecord && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalRecord(null)}
        >
          <div 
            className="relative w-full max-w-lg bg-[#0d0e14] border border-[rgba(255,255,255,0.12)] p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] pb-3">
              <div>
                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono text-[10px] font-bold uppercase">
                  {activeModalRecord.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {activeModalRecord.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalRecord(null)}
                className="p-1 text-slate-400 hover:text-white bg-[#14161f] border border-[rgba(255,255,255,0.08)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-[rgba(255,255,255,0.06)]">
                <span className="text-slate-500">ISSUING_BODY</span>
                <span className="text-slate-200 font-medium">{activeModalRecord.issuer}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[rgba(255,255,255,0.06)]">
                <span className="text-slate-500">YEAR</span>
                <span className="text-blue-400 font-bold">{activeModalRecord.date}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[rgba(255,255,255,0.06)]">
                <span className="text-slate-500">AUTHENTICITY_STATE</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  VERIFIED_ON_RECORD
                </span>
              </div>
              <p className="text-slate-300 font-sans text-xs leading-relaxed pt-2">
                {activeModalRecord.description}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[rgba(255,255,255,0.08)]">
              <a
                href={activeModalRecord.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-all shadow-[0_0_12px_rgba(37,99,235,0.3)]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                OFFICIAL_RECORD_LINK
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
