'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Code2, 
  ExternalLink, 
  Sparkles, 
  Terminal, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Cpu, 
  FolderGit2, 
  ArrowUpRight,
  ShieldAlert,
  Flame,
  Binary
} from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63a1.63 1.63 0 0 0 1.63 1.63c.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63z" />
    </svg>
  );
}

export default function PortfolioPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Dynamic Gamer Bootloader sequence
    const interval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 20;
      });
    }, 120);

    fetch('/api/data')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Data error:', err));

    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // FAST GAMER BOOT SEQUENCE
  if (loading || !data) {
    return (
      <div className="fixed inset-0 z-50 bg-[#04060a] flex flex-col items-center justify-center font-mono text-cyan-400 p-6 select-none overflow-hidden">
        {/* Hologram Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#06b6d418_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-sm w-full space-y-6 text-center">
          {/* Neon Target Lock Avatar */}
          <div className="relative group">
            <div className="absolute -inset-3 rounded-full border border-dashed border-cyan-500/60 animate-spin" style={{ animationDuration: '6s' }} />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-teal-400 blur-md opacity-80 animate-pulse" />
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-cyan-400 bg-slate-950 shadow-[0_0_40px_rgba(6,182,212,0.8)]">
              <Image
                src="/avatar.jpg"
                alt="Player Avatar"
                fill
                priority
                className="object-cover object-top filter brightness-110 contrast-125"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-bold text-cyan-300">
              <Binary size={14} className="animate-pulse" />
              <span>INITIALIZING ENGINE CORE</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono tracking-wider">SYNCING SYSTEM RUNTIME // {bootProgress}%</p>
          </div>

          {/* Cyber Meter */}
          <div className="w-full bg-slate-900/90 h-2.5 rounded-full overflow-hidden border border-cyan-500/40 p-0.5 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-fuchsia-500 rounded-full transition-all duration-150 ease-out" 
              style={{ width: `${bootProgress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#03060a] text-slate-200 selection:bg-cyan-500 selection:text-black relative overflow-x-hidden font-sans scroll-smooth">
      {/* Dynamic Cursor Flash Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-60 hidden md:block"
        style={{
          background: `radial-gradient(750px circle at ${mousePos.x}px${mousePos.y}px, rgba(6, 182, 212, 0.09), transparent 80%)`,
        }}
      />

      {/* Cyber Grid Matrix */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0e1a2f15_1px,transparent_1px),linear-gradient(to_bottom,#0e1a2f15_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      {/* PRO-GAMER / PRO-CODER HUD NAVIGATION BAR */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#03060a]/80 border-b border-cyan-500/20 px-6 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
            </div>
            <span className="font-mono text-xs tracking-widest text-cyan-400 font-extrabold uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
              PLAYER: {data.name?.split(' ')[0]?.toUpperCase() || "CSE_DEV"}
            </span>
          </div>

          {/* Quick Smooth-Scroll Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2 text-xs font-mono">
            <a href="#about" className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition">
              About
            </a>
            <a href="#metrics" className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition">
              Stats
            </a>
            <a href="#projects" className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition">
              Projects
            </a>
            <a href="#experience" className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition hidden sm:inline-block">
              Experience
            </a>
            <a href="#credentials" className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition hidden sm:inline-block">
              Certifications
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16 relative z-10">
        
        {/* HERO HUD: Avatar + Pro Gamer / Coder Card */}
        <section id="about" className="relative rounded-3xl p-8 sm:p-12 border border-cyan-500/30 bg-gradient-to-br from-[#070e1c]/90 via-[#050912]/95 to-[#02050b] backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.1)] overflow-hidden">
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">
            
            {/* Interactive Reactive Avatar */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-fuchsia-600 opacity-80 blur-lg group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-cyan-400/80 bg-slate-950 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                <Image
                  src="/avatar.jpg"
                  alt={data.name || "Portfolio Avatar"}
                  fill
                  sizes="(max-width: 768px) 144px, 176px"
                  priority
                  className="object-cover object-top transition duration-700 group-hover:scale-110 filter brightness-105 contrast-115"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                  }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-md bg-[#04060a] border border-cyan-500 text-cyan-300 text-[10px] font-mono tracking-wider font-bold shadow-lg">
                RANK: PRO
              </div>
            </div>

            {/* Gamer/Coder Tagline & Bio */}
            <div className="space-y-4 text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs tracking-wider">
                <Flame size={14} className="text-amber-400 animate-pulse" />
                <span>CSE // FULL-STACK & AI ARCHITECT</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                {data.name || "Engineering Portfolio"}
              </h1>

              <p className="text-lg sm:text-xl text-cyan-300 font-semibold tracking-wide">
                {data.tagline || "Building High-Impact Scalable Software & AI Systems"}
              </p>

              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                {data.bio || "Crafting reliable web architecture, analytical models, and robust computational systems."}
              </p>

              {/* Social Connect Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                {data.github && (
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 border border-cyan-900/80 text-xs font-mono text-slate-300 transition-all duration-300 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:-translate-y-1 cursor-pointer"
                  >
                    <GithubIcon className="w-4 h-4 text-cyan-400" /> GitHub
                  </a>
                )}
                {data.linkedin && (
                  <a
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 border border-cyan-900/80 text-xs font-mono text-slate-300 transition-all duration-300 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:-translate-y-1 cursor-pointer"
                  >
                    <LinkedinIcon className="w-4 h-4 text-cyan-400" /> LinkedIn
                  </a>
                )}
                {data.leetcode && (
                  <a
                    href={data.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 border border-cyan-900/80 text-xs font-mono text-slate-300 transition-all duration-300 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:-translate-y-1 cursor-pointer"
                  >
                    <Code2 size={16} className="text-cyan-400" /> LeetCode
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ACADEMIC & RANK METRICS */}
        {data.metrics && data.metrics.length > 0 && (
          <section id="metrics" className="space-y-4">
            <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase flex items-center gap-2">
              <Terminal size={14} /> LIVE PERFORMANCE METRICS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="group relative p-6 rounded-2xl bg-gradient-to-b from-[#08101e]/80 to-[#040810] border border-cyan-950 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] hover:-translate-y-1"
                >
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>{metric.label}</span>
                    <GraduationCap size={15} className="text-cyan-400 transition-transform group-hover:scale-125" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-3 font-mono group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FEATURED PROJECTS (3 BENTO SLOTS) */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between border-b border-cyan-950/80 pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
              <FolderGit2 className="text-cyan-400" size={24} />
              Featured Engineering Deployments
            </h2>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
              03_SLOTS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.projects?.slice(0, 3).map((proj, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl bg-gradient-to-b from-[#070e1b] to-[#03060d] border border-cyan-950 p-6 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                      {proj.badge || "System"}
                    </span>
                    <span className="font-mono text-xs text-slate-500 font-bold">#0{idx + 1}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-4">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {Array.isArray(proj.tech) ? (
                      proj.tech.map((t, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-cyan-950 text-slate-300 group-hover:border-cyan-900 transition-colors">
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-cyan-950 text-slate-300">
                        {proj.tech}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 mt-4 border-t border-cyan-950">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition hover:scale-105"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-cyan-400" /> Source
                    </a>
                  )}
                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold group/link"
                    >
                      Live Demo 
                      <ArrowUpRight size={14} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE & CREDENTIALS TWO-COLUMN */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Work Experience */}
          <div id="experience" className="rounded-2xl bg-gradient-to-b from-[#070e1b] to-[#03060d] border border-cyan-950 p-6 backdrop-blur-xl space-y-4">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Briefcase className="text-cyan-400" size={18} /> Experience & Internships
            </h2>
            <div className="space-y-3">
              {data.experience?.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-cyan-950 space-y-1.5 transition duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{exp.role}</span>
                    <span className="text-[11px] font-mono text-cyan-400">{exp.period}</span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium">{exp.company}</div>
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-300 pt-1"
                    >
                      Verify Credential <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Trainings */}
          <div id="credentials" className="rounded-2xl bg-gradient-to-b from-[#070e1b] to-[#03060d] border border-cyan-950 p-6 backdrop-blur-xl space-y-4">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Award className="text-cyan-400" size={18} /> Credentials & Certifications
            </h2>
            <div className="space-y-3">
              {data.certifications?.map((cert, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-cyan-950 space-y-1.5 transition duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{cert.title}</span>
                    <span className="text-[11px] font-mono text-cyan-400">{cert.date}</span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium">{cert.issuer}</div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-300 pt-1"
                    >
                      View Certificate <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-cyan-950/80 mt-24 py-8 text-center text-xs font-mono text-slate-600">
        Engineered with Next.js & Tailwind CSS • Low-Latency Cyber Grid Architecture
      </footer>
    </div>
  );
}