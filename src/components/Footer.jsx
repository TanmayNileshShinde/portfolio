import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data';

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    // Client-side simulated submission with mailto fallback
    setFormSubmitted(true);
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name || 'Visitor'}`);
    const body = encodeURIComponent(`${formState.message}\n\nFrom: ${formState.name} (${formState.email})`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="w-full pt-28 pb-14 mt-16 border-t border-white/10 relative overflow-hidden text-left">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-96 bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-400/30 text-xs font-mono text-cyan-300 mb-3 uppercase tracking-wider">
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Let's <span className="text-gradient">Connect</span> & Build
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Whether you have an engineering opportunity, want to collaborate on real-time systems, or just want to chat tech—feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Left Column: Direct Contact Info & Quick Copy (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-7 sm:p-8 rounded-3xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Direct Contact</h3>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                Prefer direct communication? Click below to copy my primary email address or connect across professional platforms.
              </p>

              {/* Copy Email Button */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3 mb-6">
                <div className="overflow-hidden text-ellipsis">
                  <p className="text-xs font-mono text-gray-400">Primary Email</p>
                  <p className="text-sm font-mono text-cyan-300 truncate font-semibold">
                    {personalInfo.email}
                  </p>
                </div>
                <button
                  onClick={copyEmail}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium transition-all shrink-0 active:scale-95"
                >
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              </div>

              {/* Social Channels */}
              <div className="flex flex-col gap-3">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-3.5 rounded-xl glass-panel text-gray-200 hover:text-cyan-300 hover:border-cyan-500/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="text-sm font-semibold">LinkedIn Profile</span>
                  </div>
                  <span className="text-xs font-mono text-gray-500 group-hover:text-cyan-400 transition-colors">↗</span>
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-3.5 rounded-xl glass-panel text-gray-200 hover:text-white hover:border-white/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-300 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span className="text-sm font-semibold">GitHub Repository</span>
                  </div>
                  <span className="text-xs font-mono text-gray-500 group-hover:text-white transition-colors">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-7 sm:p-9 rounded-3xl border border-white/10 relative">
              <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>
              <p className="text-sm text-gray-300 mb-6">
                Fill out the quick form below to dispatch an email inquiry directly to my inbox.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-white">Opening Email Client...</h4>
                  <p className="text-sm text-gray-300">
                    Your message has been pre-formatted for delivery. Thank you for connecting!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">
                        Your Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">
                      Message / Project Details
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hi Tanmay, I saw your portfolio and would like to discuss..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-semibold text-sm shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] active:scale-[0.99] transition-all"
                  >
                    Send Message Directly
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Footer Sub-Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold tracking-tight text-lg">
              {personalInfo.shortName}<span className="text-cyan-400">.</span>
            </span>
            <span className="text-gray-500 text-xs font-mono">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs font-mono text-gray-500">
              Crafted with React 19 & Tailwind CSS
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl glass-panel text-gray-400 hover:text-white border border-white/10 hover:border-cyan-400/40 transition-all text-xs font-mono flex items-center gap-1.5"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <span>↑</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;