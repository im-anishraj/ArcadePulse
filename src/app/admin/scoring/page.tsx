'use client';

import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase/client';
export interface Rule {
  id: string;
  season_name: string;
  badge_name: string;
  category: string;
  exact_points: number;
  active_status: boolean;
  is_official: boolean;
  created_at: string;
}

export interface UnknownBadge {
  id: string;
  badge_name: string;
  times_seen: number;
  last_seen: string;
}

export default function AdminScoringPage() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [unknownQueue, setUnknownQueue] = useState<UnknownBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Bulk Add State
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [bulkText, setBulkText] = useState('');

  // New Rule Form
  const [newRule, setNewRule] = useState({
    season_name: 'Default Season',
    badge_name: '',
    category: 'TRIVIA',
    exact_points: 0,
    active_status: true
  });

  const fetchData = async () => {
    const { data: rData } = await supabase.from('arcade_rules').select('*').order('created_at', { ascending: false });
    if (rData) setRules(rData as Rule[]);

    const { data: qData } = await supabase.from('unknown_badges').select('*').order('times_seen', { ascending: false });
    if (qData) setUnknownQueue(qData as UnknownBadge[]);
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      if (!mounted) return;
      await fetchData();
    };
    init();
    return () => { mounted = false; };
  }, []);

  const handleAddRule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newRule.badge_name) return;

    // Check for duplicates
    if (rules.some(r => r.badge_name.toLowerCase() === newRule.badge_name.toLowerCase() && r.season_name === newRule.season_name)) {
      alert("Duplicate Rule! This badge already exists in this season.");
      return;
    }

    await supabase.from('arcade_rules').insert([newRule]);
    await supabase.from('unknown_badges').delete().eq('badge_name', newRule.badge_name);
    
    setNewRule({ ...newRule, badge_name: '', exact_points: 0 });
    fetchData();
  };

  const handleBulkAdd = async () => {
    const lines = bulkText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const inserts = lines.map(line => {
      const parts = line.split(',');
      return {
        season_name: newRule.season_name,
        badge_name: parts[0] ? parts[0].trim() : line,
        category: parts[1] ? parts[1].trim() : guessCategory(line),
        exact_points: parts[2] ? parseFloat(parts[2].trim()) : guessPoints(line),
        active_status: true
      };
    });
    
    if (inserts.length === 0) return;
    
    await supabase.from('arcade_rules').upsert(inserts, { onConflict: 'season_name, badge_name' });
    setBulkText('');
    setIsBulkMode(false);
    fetchData();
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    await supabase.from('arcade_rules').update({ active_status: !currentStatus }).eq('id', id);
    fetchData();
  };

  const handleInlineEditPoints = async (id: string, newPoints: number) => {
    await supabase.from('arcade_rules').update({ exact_points: newPoints }).eq('id', id);
    fetchData();
  };

  const guessCategory = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('trivia')) return 'TRIVIA';
    if (lower.includes('skill badge')) return 'SKILL_BADGE';
    if (lower.includes('level') || lower.includes('hero')) return 'MILESTONE';
    if (lower.includes('game') || lower.includes('quest')) return 'GAME';
    return 'TRIVIA';
  };

  const guessPoints = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('trivia')) return 1;
    if (lower.includes('skill badge')) return 0.5;
    if (lower.includes('level')) return 0;
    return 1;
  };

  const populateFromQueue = (badgeName: string) => {
    setNewRule({ 
      ...newRule, 
      badge_name: badgeName, 
      category: guessCategory(badgeName),
      exact_points: guessPoints(badgeName)
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const initiateRecalculation = async () => {
    if (!confirm('This will trigger a backend recalculation of all cached profiles with the current active rules. Proceed?')) return;
    try {
      const res = await fetch('/api/recalculate', { method: 'POST' });
      const data = await res.json();
      alert(`Recalculation complete. Processed ${data.updated} profiles.`);
    } catch(err: unknown) {
      if (err instanceof Error) {
        alert('Recalculation failed: ' + err.message);
      }
    }
  };

  const handleImportOfficial = async () => {
    if (!confirm('Import official verified April 2026 rules? This will overwrite existing duplicate mappings.')) return;
    setLoading(true);
    try {
      await fetch('/api/admin/import-official', { method: 'POST' });
      alert('Official Verified rules injected successfully.');
      fetchData();
    } catch(e: unknown) {
      if (e instanceof Error) {
        alert('Import failed: ' + e.message);
      }
      setLoading(false);
    }
  };

  const filteredRules = useMemo(() => {
    if (!search) return rules;
    return rules.filter(r => r.badge_name.toLowerCase().includes(search.toLowerCase()) || r.season_name.toLowerCase().includes(search.toLowerCase()));
  }, [rules, search]);

  if (loading) return <div className="p-8 text-white flex items-center justify-center min-h-screen">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen p-8 bg-zinc-950 text-white font-sans max-w-7xl mx-auto">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-8">
        <h1 className="text-3xl font-bold text-cyan-400">🛡️ Arcade Scoring Admin</h1>
        <div className="space-x-4">
          <button onClick={handleImportOfficial} className="bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded text-sm font-bold text-black transition shadow-[0_0_15px_rgba(217,119,6,0.3)]">
            Inject Official Season Fast
          </button>
          <button onClick={initiateRecalculation} className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded text-sm font-bold transition">
            Recalculate Leaderboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* ADD / BULK ADD RULE */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg h-fit">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-emerald-400">Map Rules</h2>
            <button onClick={() => setIsBulkMode(!isBulkMode)} className="text-xs bg-zinc-800 px-2 py-1 rounded">
              {isBulkMode ? 'Single Mode' : 'Bulk Mode'}
            </button>
          </div>

          {!isBulkMode ? (
            <form onSubmit={handleAddRule} className="space-y-4">
              <div>
                <label className="block text-sm opacity-70 mb-1">Season</label>
                <input type="text" value={newRule.season_name} onChange={(e) => setNewRule({...newRule, season_name: e.target.value})} className="w-full bg-black border border-zinc-700 rounded p-2 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm opacity-70 mb-1">Exact Badge Name</label>
                <input type="text" required value={newRule.badge_name} onChange={(e) => setNewRule({...newRule, badge_name: e.target.value})} className="w-full bg-black border border-zinc-700 rounded p-2 focus:border-cyan-500 outline-none" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm opacity-70 mb-1">Category</label>
                  <select value={newRule.category} onChange={(e) => setNewRule({...newRule, category: e.target.value})} className="w-full bg-black border border-zinc-700 rounded p-2 focus:border-cyan-500 outline-none">
                    <option value="TRIVIA">TRIVIA</option>
                    <option value="SKILL_BADGE">SKILL_BADGE</option>
                    <option value="GAME">GAME</option>
                    <option value="MILESTONE">MILESTONE</option>
                    <option value="QUEST">QUEST</option>
                    <option value="SPECIAL_EVENT">SPECIAL_EVENT</option>
                  </select>
                </div>
                <div className="w-24">
                  <label className="block text-sm opacity-70 mb-1">Points</label>
                  <input type="number" step="0.1" value={newRule.exact_points} onChange={(e) => setNewRule({...newRule, exact_points: parseFloat(e.target.value)})} className="w-full bg-black border border-zinc-700 rounded p-2 focus:border-cyan-500 outline-none" />
                </div>
              </div>
              <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-bold p-3 rounded mt-4 transition">
                Inject Rule
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm opacity-70">Paste bulk rules (One per line: <span className="font-mono text-cyan-400">Badge Name, Category, Points</span>) - Category and points will auto-guess if omitted.</label>
              <textarea 
                rows={8}
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder="The Arcade Trivia Jan Week 1, TRIVIA, 1&#10;Google Cloud Prompt Eng..." 
                className="w-full bg-black border border-zinc-700 rounded p-2 focus:border-cyan-500 outline-none text-sm font-mono"
              />
              <button onClick={handleBulkAdd} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold p-3 rounded transition">
                Process Bulk Rules
              </button>
            </div>
          )}
        </div>

        {/* UNKNOWN QUEUE */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg lg:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-purple-400 flex items-center justify-between">
            <span>Unknown Badges Queue</span>
            <span className="text-sm bg-purple-900/50 px-3 py-1 rounded-full text-purple-200 border border-purple-800">{unknownQueue.length} Unmapped Found</span>
          </h2>
          <div className="overflow-x-auto h-[350px] bg-black rounded p-2 border border-zinc-800">
            {unknownQueue.length === 0 ? (
              <p className="opacity-50 mt-8 text-center italic">No unknown badges detected in the wild. You&apos;re fully mapped.</p>
            ) : (
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-black">
                  <tr className="border-b border-zinc-800 text-sm opacity-60">
                    <th className="pb-2">Badge Title</th>
                    <th className="pb-2 text-center">Frequency</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {unknownQueue.map(q => (
                    <tr key={q.id} className="border-b border-zinc-800/50 hover:bg-zinc-900">
                      <td className="py-2 text-red-300 font-mono text-xs pr-4">{q.badge_name}</td>
                      <td className="py-2 text-center">{q.times_seen}</td>
                      <td className="py-2 text-right w-32">
                        <button onClick={() => populateFromQueue(q.badge_name)} className="bg-zinc-800 border border-zinc-700 text-zinc-300 px-3 py-1 rounded text-xs hover:border-cyan-500 hover:text-cyan-400 transition">
                          &darr; Auto-Suggest
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* ACTIVE MAPPINGS LIST */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold">Active Mappings ({rules.length})</h2>
          <input 
            type="text" 
            placeholder="Search mappings..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-black border border-zinc-700 rounded p-2 focus:border-cyan-500 outline-none min-w-[300px]"
          />
        </div>
        
        <div className="overflow-x-auto h-[600px] bg-black rounded p-2 border border-zinc-800">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-black z-10 shadow-md">
              <tr className="border-b border-zinc-800 text-sm opacity-60">
                <th className="pb-2 pl-2">Status</th>
                <th className="pb-2">Season</th>
                <th className="pb-2">Source</th>
                <th className="pb-2">Badge Name</th>
                <th className="pb-2">Category</th>
                <th className="pb-2">Points (Click to Edit)</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredRules.map(rule => (
                <tr key={rule.id} className={`border-b border-zinc-800/50 hover:bg-zinc-800 ${!rule.active_status ? 'opacity-40' : ''}`}>
                  <td className="py-2 pl-2">
                    <button onClick={() => handleToggleStatus(rule.id, rule.active_status)} className={`text-xs px-2 py-1 rounded font-bold ${rule.active_status ? 'bg-emerald-900/50 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                      {rule.active_status ? 'ON' : 'OFF'}
                    </button>
                  </td>
                  <td className="py-2 opacity-70">{rule.season_name}</td>
                  <td className="py-2">
                    {rule.is_official ? (
                      <span className="text-[10px] font-bold text-amber-500 tracking-wider">OFFICIAL 🛡️</span>
                    ) : (
                      <span className="text-[10px] font-bold text-zinc-500 tracking-wider">COMMUNITY</span>
                    )}
                  </td>
                  <td className="py-2 font-medium">{rule.badge_name}</td>
                  <td className="py-2"><span className="bg-zinc-800 px-2 py-1 rounded text-xs">{rule.category}</span></td>
                  <td className="py-2">
                    <input 
                      type="number" step="0.1"
                      defaultValue={rule.exact_points}
                      onBlur={(e) => handleInlineEditPoints(rule.id, parseFloat(e.target.value))}
                      className="bg-transparent border-b border-dashed border-zinc-600 focus:border-cyan-500 outline-none w-16 text-cyan-400 font-mono py-1"
                    />
                  </td>
                </tr>
              ))}
              {filteredRules.length === 0 && (
                <tr><td colSpan={5} className="py-8 text-center opacity-50">No mappings found matching &quot;{search}&quot;</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
