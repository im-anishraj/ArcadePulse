'use client';

import { useState } from 'react';

export default function ComparePage() {
  const [profileUrl, setProfileUrl] = useState('https://www.cloudskillsboost.google/public_profiles/11b2ae1b-c527-4251-b441-29021768b510');
  const [loading, setLoading] = useState(false);
  const [debugData, setDebugData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleTest = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/sync-profile?debug=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ profileUrl })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to fetch');
      setDebugData(json.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <h1 className="text-2xl font-bold mb-4 text-cyan-400">Data Accuracy & Debug Compare Mode</h1>
      <p className="mb-6 opacity-70 mb-4">
        Enter a public profile URL to bypass the cache and fetch raw extracted badges.
      </p>

      <div className="flex gap-4 mb-8">
        <input 
          type="url" 
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 p-2 w-full max-w-2xl rounded text-white" 
        />
        <button 
          onClick={handleTest}
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-2 rounded font-bold disabled:opacity-50"
        >
          {loading ? 'Scraping...' : 'Test Accuracy'}
        </button>
      </div>

      {error && <div className="p-4 bg-red-900 border border-red-500 text-red-100 rounded mb-8">{error}</div>}

      {debugData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4 text-purple-400">Calculated Results</h2>
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded mb-4">
              <p><strong>Username:</strong> {debugData.username}</p>
              <p><strong>Total Badges Extracted:</strong> {debugData.totalBadges}</p>
              <p className="text-xl mt-2"><strong>Total Arcades Points (Calculated):</strong> {debugData.totalPoints}</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">Raw Extracted Badges ({debugData.badges?.length})</h2>
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded h-[500px] overflow-y-auto">
              <ul className="space-y-2">
                {debugData.badges?.map((b: any, i: number) => (
                  <li key={i} className="bg-black p-2 border border-zinc-800 rounded flex justify-between">
                    <span className="text-sm">{b.title}</span>
                    <span className="text-xs bg-zinc-800 px-2 py-1 rounded">
                      {b.type} (+{b.points})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
