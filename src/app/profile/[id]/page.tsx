'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PublicProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Extract ID from URL
  const profileId = params.id as string;
  const fullUrl = `https://www.cloudskillsboost.google/public_profiles/${profileId}`;

  useEffect(() => {
    if (!profileId) return;

    fetch('/api/sync-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileUrl: fullUrl })
    })
    .then(async res => {
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setData(json.data);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, [profileId, fullUrl]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="animate-pulse">Analyzing Google Cloud Profile...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
        <div className="bg-red-900/50 border border-red-500 p-8 rounded-xl max-w-lg text-center">
          <h1 className="text-xl font-bold mb-4">Profile Unavailable</h1>
          <p className="opacity-80 mb-6">{error || 'Unknown error occurred.'}</p>
          <button onClick={() => router.push('/')} className="bg-white text-black px-4 py-2 rounded font-bold hover:bg-zinc-200">Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 pt-12 font-sans selection:bg-cyan-500 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER CARD */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]"></div>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {data.avatarUrl ? (
              <img src={data.avatarUrl as string} alt="Avatar" className="w-24 h-24 rounded-full border-2 border-zinc-700" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center text-3xl font-bold border-2 border-zinc-700">
                {(data.username as string).charAt(0)}
              </div>
            )}
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{data.username as string}</h1>
              <a href={fullUrl} target="_blank" rel="noreferrer" className="text-sm opacity-60 hover:text-cyan-400 no-underline hover:underline transition">
                View Official GCSB Profile &rarr;
              </a>
            </div>

            <div className="flex flex-col items-center bg-black border border-zinc-800 rounded-xl p-4 min-w-[150px]">
              <span className="text-sm font-bold opacity-50 uppercase tracking-wider mb-1">Arcade Points</span>
              <span className="text-4xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                {data.totalPoints as number}
              </span>
            </div>
          </div>
        </div>

        {/* METRICS & OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black border border-zinc-800 rounded-xl p-6 text-center">
            <h3 className="text-zinc-500 text-sm font-bold uppercase tracking-wider mb-2">Confidence Score</h3>
            <div className="flex flex-col items-center">
              <p className={`text-3xl font-black ${data.confidenceScore === 100 ? 'text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]' : (data.confidenceScore as number) > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {data.confidenceScore as number}%
              </p>
              {data.confidenceScore === 100 && <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 rounded-full mt-1 border border-amber-500/50">VERIFIED</span>}
            </div>
            <p className="text-xs opacity-50 mt-2">Based on {data.totalBadges as number} items extracted</p>
          </div>
          
          <div className="bg-black border border-zinc-800 rounded-xl p-6 text-center">
            <h3 className="text-zinc-500 text-sm font-bold uppercase tracking-wider mb-2">Active Mapping Era</h3>
            <p className="text-lg font-bold text-white mt-1 pt-2">{data.seasonUsed as string}</p>
            <p className="text-[10px] text-amber-500/80 mt-2 font-medium">Powered by verified official rules</p>
          </div>
          
          {/* Share Button (placeholder for OG feature) */}
          <div className="bg-black border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center">
            <button className="bg-[#1DA1F2]/10 text-[#1DA1F2] border border-[#1DA1F2]/50 hover:bg-[#1DA1F2] hover:text-white transition px-6 py-3 rounded-full font-bold flex items-center gap-2">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              Share Rank Card
            </button>
          </div>
        </div>

        {/* EXACT SCORED BADGES */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
           <div className="bg-zinc-800/50 p-4 border-b border-zinc-800 flex justify-between items-center">
             <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-emerald-400">●</span> Valid Mapped Badges ({(data.scoredBadges as any[]).length})
             </h2>
           </div>
           
           <div className="p-0">
             {(data.scoredBadges as any[]).length === 0 ? (
               <div className="p-8 text-center opacity-50 italic">No recognized badges mapped to current season yet.</div>
             ) : (
               <ul className="divide-y divide-zinc-800/50">
                 {(data.scoredBadges as any[]).map((badge: Record<string, unknown>, i: number) => (
                   <li key={i} className="p-4 flex flex-col md:flex-row justify-between md:items-center hover:bg-white/5 transition">
                     <span className="font-medium text-zinc-200 flex items-center gap-2">
                       {badge.isOfficial && <span title="Official Verified Mapping" className="text-amber-500 text-sm">🛡️</span>}
                       {badge.title as string}
                     </span>
                     <div className="flex items-center gap-4 mt-2 md:mt-0">
                        <span className="text-xs font-mono bg-zinc-800 text-zinc-400 px-2 py-1 rounded">{badge.category as string}</span>
                        <span className="text-sm font-bold text-cyan-400 min-w-[50px] text-right">+{(badge.points as number).toString()}</span>
                     </div>
                   </li>
                 ))}
               </ul>
             )}
           </div>
        </div>

        {/* SKIPPED/UNKNOWN BADGES */}
        {(data.skippedBadges as string[]).length > 0 && (
          <div className="opacity-80">
            <div className="bg-black border border-red-900/50 rounded-2xl overflow-hidden">
               <div className="p-4 border-b border-red-900/30 flex justify-between items-center">
                 <h2 className="text-lg font-bold flex items-center gap-2 text-red-200">
                    <span className="text-red-500">⚠</span> Ignored (Unmapped) Badges
                 </h2>
               </div>
               
               <div className="p-0 max-h-[300px] overflow-y-auto">
                 <ul className="divide-y divide-red-900/20">
                   {(data.skippedBadges as string[]).map((title: string, i: number) => (
                     <li key={i} className="p-4 text-sm text-red-100 hover:bg-red-900/10 flex justify-between">
                       <span>{title}</span>
                       <span className="text-red-500 opacity-50">+0</span>
                     </li>
                   ))}
                 </ul>
               </div>
            </div>
            <p className="text-xs opacity-50 mt-2 text-center">Unmapped badges are logged to the Admin Queue for review. Total points will update once mapped.</p>
          </div>
        )}

      </div>
    </div>
  );
}
