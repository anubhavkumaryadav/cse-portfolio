'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Lock, FolderGit2, Briefcase, Award, Cpu, User, GraduationCap } from 'lucide-react';

export default function AdminPage() {
  const [data, setData] = useState(null);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((json) => {
        // Ensure at least 3 project objects exist for easy editing
        const existingProjects = json.projects || [];
        const initialProjects = [...existingProjects];
        while (initialProjects.length < 3) {
          initialProjects.push({
            title: '',
            badge: 'Project',
            description: '',
            tech: ['Next.js', 'Tailwind CSS'],
            github: 'https://github.com',
            live: 'https://github.com'
          });
        }
        setData({ ...json, projects: initialProjects });
      });
  }, []);

  // Update a specific project field
  const updateProject = (index, field, value) => {
    const updated = [...data.projects];
    if (field === 'tech') {
      updated[index][field] = value.split(',').map((t) => t.trim());
    } else {
      updated[index][field] = value;
    }
    setData({ ...data, projects: updated });
  };

  // Update a metric (CGPA, Boards, etc.)
  const updateMetric = (index, field, value) => {
    const updated = [...data.metrics];
    updated[index][field] = value;
    setData({ ...data, metrics: updated });
  };

  // Update an experience field
  const updateExperience = (index, field, value) => {
    const updated = [...data.experience];
    updated[index][field] = value;
    setData({ ...data, experience: updated });
  };

  // Update a certification field
  const updateCert = (index, field, value) => {
    const updated = [...data.certifications];
    updated[index][field] = value;
    setData({ ...data, certifications: updated });
  };

  // Save changes to GitHub/Vercel
  const handleSave = async () => {
    if (!password) {
      setStatus('❌ Please enter your admin passcode.');
      return;
    }

    setStatus('Saving changes...');

    // Filter out blank project slots before saving
    const cleanedData = {
      ...data,
      projects: data.projects.filter((p) => p.title && p.title.trim() !== '')
    };

    const res = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, data: cleanedData }),
    });

    const result = await res.json();
    if (res.ok) {
      setStatus('✅ Changes successfully saved! Your site is rebuilding on Vercel.');
    } else {
      setStatus(`❌ ${result.error || 'Failed to save changes.'}`);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-mono">
        Loading Admin Panel...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-12 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition">
            <ArrowLeft size={16} /> Back to Live Portfolio
          </Link>
          <span className="text-xs px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono">
            Admin Workspace
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Portfolio Content Manager</h1>

        {/* 1. Profile Basics */}
        <div className="space-y-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <User size={18} className="text-cyan-400" /> Profile Basics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                value={data.name || ''}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Tagline</label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                value={data.tagline || ''}
                onChange={(e) => setData({ ...data, tagline: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Bio Summary</label>
            <textarea
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
              value={data.bio || ''}
              onChange={(e) => setData({ ...data, bio: e.target.value })}
            />
          </div>
        </div>

        {/* 2. CGPA & Key Metrics */}
        <div className="space-y-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <GraduationCap size={18} className="text-cyan-400" /> Academic Scores & Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.metrics?.map((metric, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400">Label</label>
                  <input
                    type="text"
                    className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-xs text-white"
                    value={metric.label || ''}
                    onChange={(e) => updateMetric(idx, 'label', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400">Value (e.g. 8.0 / 10)</label>
                  <input
                    type="text"
                    className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-xs text-cyan-300 font-bold"
                    value={metric.value || ''}
                    onChange={(e) => updateMetric(idx, 'value', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Dedicated 3 Projects (Fully Editable) */}
        <div className="space-y-6 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <FolderGit2 size={18} className="text-cyan-400" /> Featured Projects (3 Slots)
          </h2>

          {[0, 1, 2].map((idx) => {
            const proj = data.projects?.[idx] || {
              title: '',
              badge: '',
              description: '',
              tech: [],
              github: '',
              live: ''
            };

            return (
              <div key={idx} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Project #{idx + 1} {proj.title ? `— ${proj.title}` : '(Empty Slot)'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Title</label>
                    <input
                      type="text"
                      placeholder="e.g. My Third Big Project"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm text-white"
                      value={proj.title || ''}
                      onChange={(e) => updateProject(idx, 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Category Badge</label>
                    <input
                      type="text"
                      placeholder="e.g. Machine Learning, Full Stack"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm text-white"
                      value={proj.badge || ''}
                      onChange={(e) => updateProject(idx, 'badge', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Short 2-3 sentence overview..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm text-white"
                    value={proj.description || ''}
                    onChange={(e) => updateProject(idx, 'description', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Tech Stack (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="React.js, Node.js, MongoDB"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm text-white"
                    value={Array.isArray(proj.tech) ? proj.tech.join(', ') : proj.tech || ''}
                    onChange={(e) => updateProject(idx, 'tech', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">GitHub URL</label>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-300"
                      value={proj.github || ''}
                      onChange={(e) => updateProject(idx, 'github', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Live Demo / Website URL</label>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-300"
                      value={proj.live || ''}
                      onChange={(e) => updateProject(idx, 'live', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Experience Section */}
        <div className="space-y-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Briefcase size={18} className="text-cyan-400" /> Work Experience
          </h2>
          {data.experience?.map((exp, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Role</label>
                  <input
                    type="text"
                    className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white"
                    value={exp.role || ''}
                    onChange={(e) => updateExperience(idx, 'role', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Company</label>
                  <input
                    type="text"
                    className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white"
                    value={exp.company || ''}
                    onChange={(e) => updateExperience(idx, 'company', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Period</label>
                  <input
                    type="text"
                    className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white"
                    value={exp.period || ''}
                    onChange={(e) => updateExperience(idx, 'period', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Certificate / Experience Link</label>
                <input
                  type="text"
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-300"
                  value={exp.link || ''}
                  onChange={(e) => updateExperience(idx, 'link', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 5. Certifications */}
        <div className="space-y-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Award size={18} className="text-cyan-400" /> Trainings & Certifications
          </h2>
          <div className="space-y-3">
            {data.certifications?.map((cert, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Title</label>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white"
                      value={cert.title || ''}
                      onChange={(e) => updateCert(idx, 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Issuer</label>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white"
                      value={cert.issuer || ''}
                      onChange={(e) => updateCert(idx, 'issuer', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Date</label>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white"
                      value={cert.date || ''}
                      onChange={(e) => updateCert(idx, 'date', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Certificate Link</label>
                  <input
                    type="text"
                    className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-300"
                    value={cert.link || ''}
                    onChange={(e) => updateCert(idx, 'link', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Save Button */}
        <div className="space-y-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <Lock size={15} className="text-cyan-400" /> Enter Secret Admin Passcode
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <Save size={18} /> Save & Apply Changes
          </button>

          {status && <p className="text-center text-sm font-medium pt-2">{status}</p>}
        </div>
      </div>
    </div>
  );
}