'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Code2, 
  ExternalLink, 
  Terminal, 
  GraduationCap, 
  Briefcase, 
  Award, 
  FolderGit2, 
  ArrowUpRight,
  Flame,
  Binary,
  MapPin,
  Mail,
  Layers,
  CheckCircle2
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

function CodeforcesIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 7.5a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-3 0v-9a1.5 1.5 0 0 1 1.5-1.5zm7.5-4.5a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-3 0V4.5A1.5 1.5 0 0 1 12 3zm7.5 7.5a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-3 0v-6a1.5 1.5 0 0 1 1.5-1.5z" />
    </svg>
  );
}

export default function PortfolioPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 250);
          return 100;
        }
        return prev + 25;
      });
    }, 100);

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

  if (loading || !data) {
    return (
      <div className="fixed inset-0 z-50 bg-[#03060a] flex flex-col items-center justify-center font-mono text-cyan-400 p-6 select-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#06b6d418_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center max-w-sm w-full space-y-6 text-center">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full border border-dashed border-cyan-500/60 animate-spin" style={{ animationDuration: '6s' }} />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-teal-400 blur-md opacity-80 animate-pulse" />
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-cyan-400 bg-slate-950 shadow-[0_0_40px_rgba(6,182,212,0.8)]">
              <Image
                src="/avatar.jpg"
                alt="Avatar"
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
              <span>INITIALIZING SYSTEM CORE</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono tracking-wider">SYNCING SYSTEM RUNTIME // {bootProgress}%</p>
          </div>
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
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-60 hidden md:block"
        style={{
          background: `radial-gradient(750px circle at ${mousePos.x}px${mousePos.y}px, rgba(6, 182, 212, 0.09), transparent 80%)`,
        }}
      />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0e1a2f15_1px,transparent_1px),linear-gradient(to_bottom,#0e1a2f15_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      {/* HUD NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#03060a]/80 border-b border-cyan-500/20 px-6 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
            </div>
            <span className="font-mono text-xs tracking-widest text-cyan-400 font-extrabold uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
              SYSTEM: {data.name?.split(' ')[0]?.toUpperCase() || "ENGINEER"}
            </span>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2 text-xs font-mono">
            <a href="#about" className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition">About</a>
            <a href="#skills" className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition">Skills</a>
            <a href="#projects" className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition">Projects</a>
            <a href="#experience" className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition hidden sm:inline-block">Experience</a>
            <a href="#education" className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition hidden sm:inline-block">Education</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16 relative z-10">
        
        {/* HERO */}
        <section id="about" className="relative rounded-3xl p-8 sm:p-12 border border-cyan-500/30 bg-gradient-to-br from-[#070e1c]/90 via-[#050912]/95 to-[#02050b] backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.1)] overflow-hidden">
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">
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

            <div className="space-y-4 text-center md:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs tracking-wider">
                  <Flame size={14} className="text-amber-400 animate-pulse" />
                  <span>CSE UNDERGRAD // DEV & DSA</span>
                </div>
                {data.location && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-mono text-xs">
                    <MapPin size={12} className="text-rose-400" />
                    <span>{data.location}</span>
                  </div>
                )}
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                {data.name}
              </h1>

              <p className="text-base sm:text-lg text-cyan-300 font-semibold tracking-wide">
                {data.tagline}
              </p>

              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                {data.bio}
              </p>

              {/* SOCIAL & PROFILES */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-2">
                {data.github && (
                  <a href={data.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-cyan-900/80 text-xs font-mono text-slate-300 transition-all hover:border-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    <GithubIcon className="w-4 h-4 text-cyan-400" /> GitHub
                  </a>
                )}
                {data.linkedin && (
                  <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-cyan-900/80 text-xs font-mono text-slate-300 transition-all hover:border-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    <LinkedinIcon className="w-4 h-4 text-cyan-400" /> LinkedIn
                  </a>
                )}
                {data.leetcode && (
                  <a href={data.leetcode} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-cyan-900/80 text-xs font-mono text-slate-300 transition-all hover:border-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    <Code2 size={16} className="text-amber-400" /> LeetCode
                  </a>
                )}
                {data.codeforces && (
                  <a href={data.codeforces} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-cyan-900/80 text-xs font-mono text-slate-300 transition-all hover:border-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    <CodeforcesIcon className="w-4 h-4 text-rose-400" /> Codeforces
                  </a>
                )}
                {data.email && (
                  <a href={`mailto:${data.email}`} className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-cyan-900/80 text-xs font-mono text-slate-300 transition-all hover:border-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    <Mail size={14} className="text-teal-400" /> Contact
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* METRICS */}
        {data.metrics && (
          <section className="space-y-4">
            <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase flex items-center gap-2">
              <Terminal size={14} /> METRIC HUD
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.metrics.map((metric, i) => (
                <div key={i} className="p-5 rounded-2xl bg-gradient-to-b from-[#08101e]/80 to-[#040810] border border-cyan-950 transition hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]">
                  <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center justify-between">
                    <span>{metric.label}</span>
                    <GraduationCap size={15} className="text-cyan-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-2 font-mono drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS ARSENAL */}
        {data.skills && (
          <section id="skills" className="space-y-6">
            <div className="flex items-center gap-2.5 border-b border-cyan-950/80 pb-3">
              <Layers className="text-cyan-400" size={22} />
              <h2 className="text-xl sm:text-2xl font-black text-white">Technical Arsenal</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(data.skills).map(([category, skillList], idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-gradient-to-b from-[#070e1b] to-[#03060d] border border-cyan-950 space-y-3 hover:border-cyan-500/40 transition">
                  <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">{category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skillList.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[11px] font-mono px-2 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between border-b border-cyan-950/80 pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
              <FolderGit2 className="text-cyan-400" size={22} />
              Engineering Deployments
            </h2>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
              {data.projects?.length || 0}_ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects?.map((proj, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-gradient-to-b from-[#070e1b] to-[#03060d] border border-cyan-950 flex flex-col justify-between hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] transition">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/60">
                      {proj.badge}
                    </span>
                    <span className="font-mono text-xs text-slate-500">#0{idx + 1}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{proj.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.tech?.map((t, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-cyan-950 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 mt-4 border-t border-cyan-950">
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition">
                      <GithubIcon className="w-3.5 h-3.5 text-cyan-400" /> Source
                    </a>
                  )}
                  {proj.live && (
                    <a href={proj.live} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold">
                      Live Demo <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section id="experience" className="space-y-6">
          <div className="flex items-center gap-2.5 border-b border-cyan-950/80 pb-3">
            <Briefcase className="text-cyan-400" size={22} />
            <h2 className="text-xl sm:text-2xl font-black text-white">Experience & Internships</h2>
          </div>

          <div className="space-y-4">
            {data.experience?.map((exp, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-gradient-to-b from-[#070e1b] to-[#03060d] border border-cyan-950 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <p className="text-xs text-cyan-400 font-mono">{exp.company}</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{exp.period}</span>
                </div>
                {exp.points && (
                  <ul className="space-y-1.5 pt-2">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {exp.link && (
                  <a href={exp.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-300 pt-1">
                    Credential Verification <ExternalLink size={11} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS */}
        <section id="education" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-cyan-950/80 pb-3">
              <GraduationCap className="text-cyan-400" size={20} />
              <h2 className="text-lg font-bold text-white">Academic Qualifications</h2>
            </div>
            <div className="space-y-3">
              {data.education?.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-cyan-950 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{edu.degree}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{edu.period}</span>
                  </div>
                  <div className="text-xs text-slate-400">{edu.institution}</div>
                  <div className="text-[11px] font-mono text-cyan-300 font-bold">{edu.score}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-cyan-950/80 pb-3">
              <Award className="text-cyan-400" size={20} />
              <h2 className="text-lg font-bold text-white">Credentials & Honors</h2>
            </div>
            <div className="space-y-3">
              {data.certifications?.map((cert, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-cyan-950 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{cert.title}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{cert.date}</span>
                  </div>
                  <div className="text-xs text-slate-400">{cert.issuer}</div>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-300 pt-1">
                      View Credential <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-cyan-950/80 mt-24 py-8 text-center text-xs font-mono text-slate-600">
        Designed & Built by Anubhav Kumar Yadav • Next.js & Tailwind CSS
      </footer>
    </div>
  );
}