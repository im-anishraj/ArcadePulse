'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function LeaderboardPreviewClient() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        if (data.leaderboard) {
          setLeaders(data.leaderboard.slice(0, 10)); // Take top 10 for preview
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-black/50 text-sm opacity-60">
              <th className="py-4 pl-6 font-medium">Rank</th>
              <th className="py-4 font-medium">Arcade Hunter</th>
              <th className="py-4 font-medium text-right pr-6">Total Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {leaders.map((leader, index) => (
              <tr 
                key={leader.id} 
                onClick={() => {
                  const parts = leader.gcsb_profile_url.split('/');
                  const id = parts[parts.length - 1];
                  router.push(`/profile/${id}`);
                }}
                className="hover:bg-zinc-800/50 transition cursor-pointer group"
              >
                <td className="py-4 pl-6 text-zinc-500 font-mono">
                  #{Array.from({ length: 3 - (index+1).toString().length }).fill('0').join('')}{index + 1}
                </td>
                <td className="py-4 font-bold text-white flex items-center gap-3">
                  {leader.avatar_url ? (
                    <img src={leader.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full bg-zinc-800" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs border border-zinc-700">
                      {leader.username?.charAt(0) || '?'}
                    </div>
                  )}
                  <span className="group-hover:text-cyan-400 transition">{leader.username || 'Anonymous Hunter'}</span>
                </td>
                <td className="py-4 font-mono text-cyan-400 font-bold text-right pr-6">
                  {leader.total_points}
                </td>
              </tr>
            ))}
            {leaders.length === 0 && (
              <tr>
                <td colSpan={3} className="py-8 text-center opacity-50">Leaderboard populating...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-black/50 border-t border-zinc-800 text-center">
        <button 
          onClick={() => alert("Full Leaderboard Page Coming Soon!")}
          className="text-sm font-bold text-cyan-500 hover:text-cyan-400 transition flex items-center justify-center w-full gap-2"
        >
          View Full Leaderboard &rarr;
        </button>
      </div>
    </div>
  );
}
