'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProfiles: 0,
    totalSyncs: 0,
    topUnknown: [] as { badge_name: string; times_seen: number }[],
    avgConfidence: 0
  });

  useEffect(() => {
    async function loadStats() {
      // Parallel fetches for speed
      const [
        { count: profilesCount },
        { count: syncsCount },
        { data: unknown },
        { data: avgConf }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('sync_logs').select('*', { count: 'exact', head: true }),
        supabase.from('unknown_badges').select('*').order('times_seen', { ascending: false }).limit(5),
        supabase.from('profiles').select('confidence_score')
      ]);

      let confSum = 0;
      if (avgConf && avgConf.length > 0) {
        confSum = avgConf.reduce((acc, p) => acc + (p.confidence_score || 0), 0) / avgConf.length;
      }

      setStats({
        totalProfiles: profilesCount || 0,
        totalSyncs: syncsCount || 0,
        topUnknown: unknown || [],
        avgConfidence: Math.round(confSum * 10) / 10
      });
      setLoading(false);
    }
    loadStats();
  }, []);

  if (loading) return <div className="p-8 text-white">Loading Analytics Engine...</div>;

  return (
    <div className="min-h-screen p-8 bg-black text-white font-sans max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8 border-b border-zinc-800 pb-4">📊 System Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-2">Tracked Profiles</h3>
          <p className="text-4xl font-black text-white">{stats.totalProfiles}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-2">Total System Syncs</h3>
          <p className="text-4xl font-black text-purple-400">{stats.totalSyncs}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981]"></div>
          <h3 className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-2">Global Avg Confidence</h3>
          <p className="text-4xl font-black text-emerald-400">{stats.avgConfidence}%</p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-red-400">Most Frequently Skipped Badges (Unmapped)</h2>
        {stats.topUnknown.length === 0 ? (
          <p className="opacity-50 italic">No unmapped badges detected.</p>
        ) : (
          <div className="space-y-4">
            {stats.topUnknown.map((badge, i) => (
              <div key={i} className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <span className="font-mono text-sm text-zinc-300">{badge.badge_name}</span>
                <span className="bg-red-900/50 text-red-400 px-3 py-1 rounded text-xs font-bold border border-red-900">{badge.times_seen} misses</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
