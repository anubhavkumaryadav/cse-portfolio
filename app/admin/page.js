'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Lock, Plus, Trash2, FolderGit2 } from 'lucide-react';

export default function AdminPage() {
  const [data, setData] = useState(null);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  // Form states for adding a new project easily
  const [newProject, setNewProject] = useState({
    title: '',
    badge: 'Full Stack',
    description: '',
    tech: '',
    github: '',
    live: ''
  });

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  // Add project to array without manual JSON editing
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) {
      alert('Please fill out at least Title and Description.');
      return;
    }

    const techArray = newProject.tech
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const projectToAdd = {
      title: newProject.title,
      badge: newProject.badge || 'Project',
      description: newProject.description,
      tech: techArray.length > 0 ? techArray : ['Next.js', 'Tailwind CSS'],
      github: newProject.github || 'https://github.com',
      live: newProject.live || 'https://github.com'
    };

    setData({
      ...data,
      projects: [...(data.projects || []), projectToAdd]
    });

    // Reset input fields
    setNewProject({
      title: '',
      badge: 'Full Stack',
      description: '',
      tech: '',
      github: '',
      live: ''
    });

    setStatus('✨ New project added to list! Remember to click "Save & Apply Changes" below.');
  };

  // Delete a project
  const handleDeleteProject = (indexToDelete) => {
    setData({
      ...data,
      projects: data.projects.filter((_, idx) => idx !== indexToDelete)
    });
  };

  // Save changes to GitHub/Vercel
  const handleSave = async () => {
    if (!password) {
      setStatus('❌ Please enter your admin passcode.');
      return;
    }

    setStatus('Saving changes...');
    const res = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, data }),
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

        {/* Basic Info Editor */}
        <div className="space-y-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-lg font-semibold text-white">Profile Basics</h2>
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

        {/* Current Projects List */}
        <div className="space-y-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2">
            <FolderGit2 className="text-cyan-400" size={20} />
            <h2 className="text-lg font-semibold text-white">Current Projects ({data.projects?.length || 0})</h2>
          </div>

          <div className="space-y-3">
            {data.projects?.map((proj, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{proj.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">{proj.badge}</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{proj.description}</p>
                  <p className="text-[11px] font-mono text-slate-500">{Array.isArray(proj.tech) ? proj.tech.join(', ') : proj.tech}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteProject(idx)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition"
                  title="Delete Project"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Project Form (No JSON Syntax Needed) */}
        <div className="space-y-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Plus size={18} className="text-cyan-400" /> Add a New Project
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Project Title</label>
              <input
                type="text"
                placeholder="e.g., E-Commerce Platform"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Category Badge</label>
              <input
                type="text"
                placeholder="e.g., MERN Stack, AI / ML, Web3"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                value={newProject.badge}
                onChange={(e) => setNewProject({ ...newProject, badge: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Brief explanation of what the project does and key engineering highlights..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Tech Stack (comma-separated)</label>
            <input
              type="text"
              placeholder="React.js, Node.js, Express, MongoDB, Tailwind CSS"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
              value={newProject.tech}
              onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">GitHub Repo Link</label>
              <input
                type="text"
                placeholder="https://github.com/..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                value={newProject.github}
                onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Live Demo Link</label>
              <input
                type="text"
                placeholder="https://..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                value={newProject.live}
                onChange={(e) => setNewProject({ ...newProject, live: e.target.value })}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddProject}
            className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold transition flex items-center justify-center gap-1.5"
          >
            <Plus size={14} /> Add Project To List
          </button>
        </div>

        {/* Global Save Section */}
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