'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function HeroSearchClient() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    
    // Extract ID if full URL is pasted
    try {
      if (url.includes('google.com') || url.includes('cloudskillsboost.google')) {
         const parts = url.split('/');
         const id = parts[parts.length - 1];
         router.push(`/profile/${id}`);
         return;
      }
      
      // Assume raw ID
      router.push(`/profile/${url}`);
    } catch(err) {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="relative flex items-center group">
        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your public GCSB profile URL..." 
          className="w-full bg-zinc-900 border border-zinc-700 rounded-full py-4 pl-6 pr-40 text-white placeholder-zinc-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition relative z-10 shadow-2xl"
          required
        />
        <button 
          type="submit" 
          disabled={loading}
          className="absolute right-2 top-2 bottom-2 bg-linear-to-r from-cyan-600 to-cyan-400 hover:from-cyan-500 hover:to-cyan-300 text-black font-bold px-6 rounded-full transition relative z-20 shadow-lg disabled:opacity-50"
        >
          {loading ? 'Scanning...' : 'Analyze Score'}
        </button>
      </form>
      <p className="text-xs text-zinc-600 mt-4 text-center">
        Ensure your Google Cloud Skills Boost profile is set to <span className="text-zinc-400">Public</span>.
      </p>
    </div>
  );
}
