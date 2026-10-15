import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Copy, 
  Check, 
  Terminal, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { personalInfo, networkStatus } from '../data/portfolioData';

export default function ContactView() {
  const [formData, setFormData] = useState({
    identity: '',
    frequency: '',
    packet: ''
  });
  const [status, setStatus] = useState('idle'); // idle | transmitting | delivered
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.identity || !formData.frequency || !formData.packet) return;

    setStatus('transmitting');

    // Simulate cyber transmission protocol
    setTimeout(() => {
      setStatus('delivered');
      // Format a direct mailto link as fallback/convenience
      const mailto = `mailto:${personalInfo.email}?subject=Contact from ${encodeURIComponent(
        formData.identity
      )}&body=${encodeURIComponent(
        `From: ${formData.identity} (${formData.frequency})\n\nMessage:\n${formData.packet}`
      )}`;
      window.location.href = mailto;
    }, 1200);
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Page Header */}
      <section className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
          Initiate Connection
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Reach out for software engineering roles, full-stack systems development, real-time collaboration platforms, or thoughtful technical dialogue.
        </p>
        <div className="w-full h-px bg-[rgba(255,255,255,0.08)] mt-6" />
      </section>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Terminal Shell */}
        <section className="lg:col-span-7 space-y-4">
          <div className="bg-[#101217] border border-[rgba(255,255,255,0.08)] overflow-hidden">
            {/* Terminal Top Window Bar */}
            <div className="px-4 py-3 bg-[#0d0e14] border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-mono text-xs text-slate-400">
                contact_protocol.sh
              </span>
              <span className="text-[10px] font-mono text-slate-600">bash</span>
            </div>

            {/* Terminal Body */}
            <div className="p-5 sm:p-6 space-y-5 font-mono">
              <div className="text-xs text-slate-400 space-y-1">
                <p className="text-blue-400 font-bold">user@sys:~$ ./init_contact.sh</p>
                <p className="text-slate-500"># Please enter your transmission details below.</p>
              </div>

              {status === 'delivered' ? (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>TRANSMISSION_DELIVERED [STATUS: 200 OK]</span>
                  </div>
                  <p className="text-slate-300">
                    Your packet has been routed. Opening your default mail client to finalize dispatch to {personalInfo.email}.
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setFormData({ identity: '', frequency: '', packet: '' });
                    }}
                    className="mt-2 text-blue-400 hover:underline block"
                  >
                    &gt; Send another packet
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {/* Identity Input */}
                  <div className="space-y-1.5">
                    <label className="text-slate-400 flex items-center gap-1.5 font-bold">
                      <span className="text-blue-400">&gt;</span> INPUT_IDENTITY
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name or organization..."
                      value={formData.identity}
                      onChange={(e) => setFormData({ ...formData, identity: e.target.value })}
                      className="w-full bg-[#151722] border border-[rgba(255,255,255,0.08)] focus:border-blue-500 px-3.5 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Frequency (Email) Input */}
                  <div className="space-y-1.5">
                    <label className="text-slate-400 flex items-center gap-1.5 font-bold">
                      <span className="text-blue-400">&gt;</span> COMMS_FREQUENCY
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@domain.com"
                      value={formData.frequency}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                      className="w-full bg-[#151722] border border-[rgba(255,255,255,0.08)] focus:border-blue-500 px-3.5 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Data Packet (Message) Input */}
                  <div className="space-y-1.5">
                    <label className="text-slate-400 flex items-center gap-1.5 font-bold">
                      <span className="text-blue-400">&gt;</span> DATA_PACKET
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Outline project parameters, role specifications, or discussion topic..."
                      value={formData.packet}
                      onChange={(e) => setFormData({ ...formData, packet: e.target.value })}
                      className="w-full bg-[#151722] border border-[rgba(255,255,255,0.08)] focus:border-blue-500 px-3.5 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'transmitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {status === 'transmitting' ? 'TRANSMITTING...' : 'EXECUTE_TRANSMISSION'}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Right Column: Channels & Network Status */}
        <section className="lg:col-span-5 space-y-6">
          {/* Direct Channels */}
          <div className="bg-[#101217] border border-[rgba(255,255,255,0.08)] p-5 sm:p-6 space-y-4 font-mono text-xs">
            <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
              <span className="text-blue-400">##</span> Direct Channels
            </h2>

            <div className="space-y-3">
              {/* Email */}
              <div className="p-3 bg-[#151722] border border-[rgba(255,255,255,0.06)] space-y-1.5">
                <span className="text-[10px] text-slate-500 block uppercase">
                  Secure Email
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a 
                    href={`mailto:${personalInfo.email}`} 
                    className="text-slate-200 hover:text-blue-400 font-bold truncate"
                  >
                    {personalInfo.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 text-slate-400 hover:text-white"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* GitHub */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#151722] border border-[rgba(255,255,255,0.06)] hover:border-slate-500 flex items-center justify-between transition-colors block group"
              >
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">
                    GitHub Registry
                  </span>
                  <span className="text-slate-200 group-hover:text-blue-400 font-bold">
                    github.com/{personalInfo.githubUsername}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
              </a>

              {/* LinkedIn */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#151722] border border-[rgba(255,255,255,0.06)] hover:border-slate-500 flex items-center justify-between transition-colors block group"
              >
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">
                    LinkedIn Network
                  </span>
                  <span className="text-slate-200 group-hover:text-blue-400 font-bold">
                    linkedin.com/in/{personalInfo.linkedinUsername}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
              </a>

              {/* LeetCode */}
              <a
                href={personalInfo.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#151722] border border-[rgba(255,255,255,0.06)] hover:border-slate-500 flex items-center justify-between transition-colors block group"
              >
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">
                    LeetCode Profile
                  </span>
                  <span className="text-slate-200 group-hover:text-blue-400 font-bold">
                    leetcode.com/u/{personalInfo.leetcodeUsername}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
              </a>
            </div>
          </div>

          {/* Network Status */}
          <div className="bg-[#101217] border border-[rgba(255,255,255,0.08)] p-5 sm:p-6 space-y-4 font-mono text-xs">
            <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
              <span className="text-blue-400">##</span> Network Status
            </h2>

            <dl className="space-y-2.5">
              <div className="flex items-center justify-between py-1 border-b border-[rgba(255,255,255,0.06)]">
                <dt className="text-slate-500">OPERATIONAL_STATE</dt>
                <dd className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {networkStatus.operationalState}
                </dd>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[rgba(255,255,255,0.06)]">
                <dt className="text-slate-500">RESPONSE_LATENCY</dt>
                <dd className="text-slate-200 font-bold">
                  {networkStatus.responseLatency}
                </dd>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[rgba(255,255,255,0.06)]">
                <dt className="text-slate-500">PREFERRED_COMMS</dt>
                <dd className="text-blue-400 font-bold">
                  {networkStatus.preferredComms}
                </dd>
              </div>

              <div className="flex items-center justify-between py-1">
                <dt className="text-slate-500">AVAILABILITY</dt>
                <dd className="text-slate-300 font-bold">
                  {networkStatus.availability}
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </div>
  );
}
