'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Lock } from 'lucide-react';

export default function AdminPage() {
  const [data, setData] = useState(null);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const handleSave = async () => {
    setStatus('Saving...');
    const res = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, data }),
    });

    const result = await res.json();
    if (res.ok) {
      setStatus('✅ Changes saved successfully! Go back to preview.');
    } else {
      setStatus(`❌ ${result.error || 'Failed to update'}`);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-medium">
        Loading Admin Panel...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono">
            Admin Workspace
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Portfolio Content Manager</h1>

        <div className="space-y-6 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
              value={data.name || ''}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Tagline</label>
            <input
              type="text"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
              value={data.tagline || ''}
              onChange={(e) => setData({ ...data, tagline: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Bio Summary</label>
            <textarea
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
              value={data.bio || ''}
              onChange={(e) => setData({ ...data, bio: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Raw JSON Editor (Skills, Projects, Experience)</label>
            <textarea
              rows={10}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
              value={JSON.stringify(data, null, 2)}
              onChange={(e) => {
                try {
                  setData(JSON.parse(e.target.value));
                } catch {
                  // Keep typing while JSON parses
                }
              }}
            />
          </div>

          <div className="border-t border-slate-800 pt-5">
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <Lock size={15} className="text-cyan-400" /> Enter Admin Passcode
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
            onClick={handleSave}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/20"
          >
            <Save size={18} /> Save & Apply Changes
          </button>

          {status && <p className="text-center text-sm font-medium pt-2">{status}</p>}
        </div>
      </div>
    </div>
  );
}