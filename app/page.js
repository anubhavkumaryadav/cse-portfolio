'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Github, 
  Linkedin, 
  Code2, 
  ExternalLink, 
  Sparkles, 
  Terminal, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Cpu, 
  FolderGit2, 
  ArrowUpRight
} from 'lucide-react';

export default function PortfolioPage() {
  const [data, setData] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Error loading portfolio data:', err));

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#06080e] flex flex-col items-center justify-center font-mono text-cyan-400 gap-3">
        <div className="w-10 h-10 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
        <span className="text-xs tracking-widest uppercase animate-pulse">Initializing System Core...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden font-sans">
      {/* Dynamic Cursor Ambient Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-60 hidden md:block"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.08), transparent 80%)`,
        }}
      />

      {/* Cyber Grid Pattern Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#06080e]/80 border-b border-cyan-950/40 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-xs tracking-widest text-cyan-400 font-bold uppercase">
              SYS.STATUS: ONLINE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="group relative px-4 py-1.5 rounded-lg font-mono text-xs font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-800/60 overflow-hidden transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Terminal size={13} className="transition-transform group-hover:rotate-12 text-cyan-400" />
                Admin Panel
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-teal-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-8 relative z-10">
        
        {/* HERO SECTION: Avatar + Dynamic Identity */}
        <section className="relative rounded-3xl p-8 sm:p-10 border border-cyan-900/40 bg-gradient-to-br from-slate-900/80 via-[#0a101d]/90 to-slate-950 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="absolute -right-24 -top-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-10">
            {/* Interactive Glow Avatar Frame */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-cyan-500 via-teal-400 to-indigo-600 opacity-70 blur group-hover:opacity-100 transition duration-500 group-hover:scale-105 animate-pulse" />
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-slate-950 bg-slate-900 shadow-2xl">
                <Image
                  src="/avatar.jpg"
                  alt={data.name || "Portfolio Avatar"}
                  fill
                  sizes="(max-width: 768px) 128px, 144px"
                  priority
                  className="object-cover object-top transition duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                  }}
                />
              </div>
              <div className="absolute bottom-1 right-1 p-1.5 rounded-full bg-slate-950 border border-cyan-500/50 text-cyan-400 shadow-lg">
                <Sparkles size={14} className="animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>

            {/* Profile Intro */}
            <div className="space-y-4 text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-mono text-xs">
                <Cpu size={13} className="text-cyan-400" />
                <span>Computer Science & Engineering</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                {data.name || "Engineering Portfolio"}
              </h1>

              <p className="text-base sm:text-lg text-cyan-200/80 font-medium">
                {data.tagline || "Building High-Impact Scalable Software & AI Systems"}
              </p>

              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                {data.bio || "Crafting reliable web architecture, analytical models, and robust computational systems."}
              </p>

              {/* Social Profile Anchors */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                {data.github && (
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 transition-all duration-300 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-0.5"
                  >
                    <Github size={15} /> GitHub
                  </a>
                )}
                {data.linkedin && (
                  <a
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 transition-all duration-300 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-0.5"
                  >
                    <Linkedin size={15} /> LinkedIn
                  </a>
                )}
                {data.leetcode && (
                  <a
                    href={data.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 transition-all duration-300 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-0.5"
                  >
                    <Code2 size={15} /> LeetCode
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ACADEMIC METRICS */}
        {data.metrics && data.metrics.length > 0 && (
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.metrics.map((metric, i) => (
              <div
                key={i}
                className="group relative p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900/70 hover:-translate-y-1"
              >
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>{metric.label}</span>
                  <GraduationCap size={14} className="text-cyan-400 transition-transform group-hover:scale-110" />
                </div>
                <div className="text-2xl font-bold text-white mt-2 font-mono group-hover:text-cyan-300 transition-colors">
                  {metric.value}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* FEATURED PROJECTS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FolderGit2 className="text-cyan-400" size={20} />
              Featured Engineering Deployments
            </h2>
            <span className="font-mono text-xs text-slate-500">03_SLOTS_ACTIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.projects?.slice(0, 3).map((proj, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl bg-slate-900/50 border border-slate-800/80 p-6 flex flex-col justify-between backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800/80">
                      {proj.badge || "System"}
                    </span>
                    <span className="font-mono text-xs text-slate-600">#0{idx + 1}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-4">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {Array.isArray(proj.tech) ? (
                      proj.tech.map((t, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                        {proj.tech}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 mt-4 border-t border-slate-800/60">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 transition"
                    >
                      <Github size={13} /> Source
                    </a>
                  )}
                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group/link"
                    >
                      Live Demo 
                      <ArrowUpRight size={13} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE & CERTIFICATIONS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-6 backdrop-blur-md space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="text-cyan-400" size={18} /> Experience & Internships
            </h2>
            <div className="space-y-3">
              {data.experience?.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-1.5 transition hover:border-slate-700">
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

          <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-6 backdrop-blur-md space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="text-cyan-400" size={18} /> Credentials & Certifications
            </h2>
            <div className="space-y-3">
              {data.certifications?.map((cert, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-1.5 transition hover:border-slate-700">
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

      <footer className="border-t border-slate-900 mt-20 py-8 text-center text-xs font-mono text-slate-600">
        Engineered with Next.js & Tailwind CSS • Serverless GitHub Persistence
      </footer>
    </div>
  );
}