'use client';

import { useState, useEffect } from 'react';
import { 
  Mail, ExternalLink, Code2, Cpu, Sparkles, MapPin, 
  GraduationCap, Briefcase, Award, Terminal, ArrowUpRight, 
  X, Send, CheckCircle2, Loader2
} from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function Home() {
  const [portfolio, setPortfolio] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitorMessage, setVisitorMessage] = useState('');
  const [sendingState, setSendingState] = useState('idle'); // idle | loading | success | error

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => setPortfolio(data));
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!visitorEmail || !visitorMessage) return;

    setSendingState('loading');

    try {
      // Forward message via free Web3Forms API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '9b52042b-23d3-4a92-a20e-146592d3269d', // Free key from web3forms.com (or leave as fallback)
          to_email: portfolio.email,
          from_name: 'Portfolio Visitor',
          email: visitorEmail,
          message: visitorMessage,
          subject: `New Message from Portfolio Visitor (${visitorEmail})`,
        }),
      });

      const resData = await response.json();
      if (resData.success || response.ok) {
        setSendingState('success');
        setTimeout(() => {
          setIsModalOpen(false);
          setSendingState('idle');
          setVisitorEmail('');
          setVisitorMessage('');
        }, 2000);
      } else {
        // Direct mailto fallback if access key is not yet configured
        window.location.href = `mailto:${portfolio.email}?subject=Message from ${encodeURIComponent(visitorEmail)}&body=${encodeURIComponent(visitorMessage)}`;
        setSendingState('success');
      }
    } catch {
      window.location.href = `mailto:${portfolio.email}?subject=Message from ${encodeURIComponent(visitorEmail)}&body=${encodeURIComponent(visitorMessage)}`;
      setSendingState('success');
    }
  };

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-[#07090e] text-slate-400 flex items-center justify-center font-mono">
        Loading portfolio...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 selection:bg-cyan-500 selection:text-black font-sans relative overflow-x-hidden">
      {/* Glow Effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-1/4 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#07090e]/75 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-sm tracking-wide">
            <Terminal size={16} className="text-cyan-400" />
            <span className="text-white font-bold">{portfolio.name.split(' ')[0].toLowerCase()}</span>
            <span className="text-cyan-400 font-bold">.dev</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-slate-400 font-semibold">
            <a href="#about" className="hover:text-cyan-400 transition">About</a>
            <a href="#skills" className="hover:text-cyan-400 transition">Skills</a>
            <a href="#projects" className="hover:text-cyan-400 transition">Projects</a>
            <a href="#experience" className="hover:text-cyan-400 transition">Experience</a>
            <a href="#education" className="hover:text-cyan-400 transition">Education</a>
          </nav>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-black transition shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            Get In Touch
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12 pb-24 space-y-28">
        {/* Hero Section */}
        <section id="about" className="pt-8 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 text-xs font-medium">
            <Sparkles size={14} className="animate-pulse" /> CSE Undergraduate • Open for Roles
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-tight">
              Hi, I'm <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
                {portfolio.name}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-cyan-200/80 font-medium">
              {portfolio.tagline}
            </p>
            <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
              {portfolio.bio}
            </p>
          </div>

          {/* Social Links & Location */}
          <div className="flex flex-wrap items-center gap-4 text-sm pt-2">
            <span className="flex items-center gap-1.5 text-slate-400 bg-slate-900/80 px-3.5 py-2 rounded-lg border border-slate-800">
              <MapPin size={15} className="text-cyan-400" /> {portfolio.location}
            </span>
            <a href={portfolio.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 transition">
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
            <a href={portfolio.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 transition">
              <LinkedinIcon className="w-4 h-4" /> LinkedIn
            </a>
            <a href={portfolio.leetcode} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-yellow-400 hover:border-yellow-400/40 transition">
              <Code2 size={16} /> LeetCode
            </a>
            <a href={portfolio.codeforces} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-red-400 hover:border-red-400/40 transition">
              <Terminal size={16} /> Codeforces
            </a>
          </div>

          {/* Metric Bento Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {portfolio.metrics.map((metric, i) => (
              <div key={i} className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/30 transition backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">{metric.value}</div>
                <div className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">{metric.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Arsenal / Skills */}
        <section id="skills" className="space-y-8">
          <div className="flex items-center gap-3">
            <Cpu className="text-cyan-400" size={24} />
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Technical Arsenal</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(portfolio.skills).map(([category, list], idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition">
                <h3 className="text-sm font-semibold text-cyan-400 font-mono tracking-wider uppercase mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {list.map((skill, sIdx) => (
                    <span key={sIdx} className="px-3.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs font-medium hover:text-white hover:border-cyan-500/40 transition">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects" className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code2 className="text-cyan-400" size={24} />
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Featured Projects</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.projects.map((proj, idx) => (
              <div key={idx} className="p-7 rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-950/90 border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between transition group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-md text-[11px] font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/40 font-mono">
                      {proj.badge}
                    </span>
                    <div className="flex gap-3 text-slate-400">
                      <a href={proj.github} target="_blank" rel="noreferrer" className="hover:text-white transition" title="View Source">
                        <GithubIcon className="w-4 h-4" />
                      </a>
                      <a href={proj.live} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition" title="Live Preview">
                        <ArrowUpRight size={18} />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
                  {proj.tech.map((t, tIdx) => (
                    <span key={tIdx} className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Certifications */}
        <section id="experience" className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Work Experience */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Briefcase className="text-cyan-400" size={22} />
              <h2 className="text-2xl font-bold text-white">Experience</h2>
            </div>
            {portfolio.experience.map((exp, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-base">{exp.role}</h3>
                    <p className="text-xs font-medium text-cyan-400 font-mono">{exp.company}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800">{exp.period}</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-400 leading-relaxed list-disc list-inside">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
                {exp.link && (
                  <div className="pt-2 border-t border-slate-800/60">
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition"
                    >
                      <ExternalLink size={13} /> View Experience Letter / Certificate
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Certifications & Trainings */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Award className="text-cyan-400" size={22} />
              <h2 className="text-2xl font-bold text-white">Trainings & Honors</h2>
            </div>
            <div className="space-y-3">
              {portfolio.certifications.map((cert, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-between group hover:border-slate-700 transition">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm text-slate-200">{cert.title}</h4>
                    <p className="text-xs text-slate-400">{cert.issuer}</p>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:underline pt-0.5"
                      >
                        <ExternalLink size={11} /> View Certificate
                      </a>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-cyan-300 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 shrink-0">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="space-y-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="text-cyan-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Academic Background</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.education.map((edu, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-white text-base">{edu.institution}</h3>
                  <span className="text-[11px] font-mono text-slate-400">{edu.period}</span>
                </div>
                <p className="text-xs text-cyan-400 font-medium">{edu.degree}</p>
                <div className="flex justify-between text-xs text-slate-400 pt-2 font-mono">
                  <span>{edu.score}</span>
                  <span>{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Interactive Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl shadow-cyan-500/10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition"
            >
              <X size={20} />
            </button>

            <div className="space-y-2 mb-6">
              <h3 className="text-2xl font-bold text-white tracking-tight">Send a Direct Message</h3>
              <p className="text-xs text-slate-400">
                Messages will be forwarded straight to <span className="text-cyan-400 font-mono">{portfolio.email}</span>.
              </p>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="recruiter@company.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                  value={visitorEmail}
                  onChange={(e) => setVisitorEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Hey Anubhav, I came across your portfolio and wanted to discuss a software engineering opportunity..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                  value={visitorMessage}
                  onChange={(e) => setVisitorMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={sendingState === 'loading'}
                className="w-full py-3.5 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
              >
                {sendingState === 'loading' && <Loader2 size={16} className="animate-spin" />}
                {sendingState === 'success' && <CheckCircle2 size={16} />}
                {sendingState === 'idle' && <Send size={16} />}
                {sendingState === 'loading' ? 'Sending...' : sendingState === 'success' ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 text-center space-y-2">
        <p className="text-xs text-slate-400 font-mono">
          Designed & Built by {portfolio.name} • Computer Science & Engineering
        </p>
        <p className="text-[11px] text-slate-600">
          Powered by Next.js & Tailwind CSS
        </p>
      </footer>
    </div>
  );
}