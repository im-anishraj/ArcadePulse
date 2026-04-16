import type { Metadata } from 'next';
import AdSlot from '@/components/ad-slot';
import { HeroSearchClient } from '@/components/home/hero-search-client';
import { LeaderboardPreviewClient } from '@/components/home/leaderboard-preview-client';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
  title: 'ArcadePulse | Track & Rank Your Google Cloud Arcade Score',
  description: 'The #1 deterministic ranking engine for Google Cloud Skills Boost Arcade. Check your real-time score, compare profiles, and generate shareable rank cards.',
  keywords: 'Google Cloud, Arcade, Skills Boost, Leaderboard, Badges, Earn, Tracking',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* --- HERO SECTION --- */}
      <section className="relative px-4 pt-24 pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-600/20 blur-[100px] rounded-full point-events-none -z-10"></div>
        <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-purple-600/20 blur-[120px] rounded-full point-events-none -z-10"></div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800 text-cyan-400 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Deterministic Scoring Engine v2 is Live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-100 to-cyan-400 leading-tight">
          Trust Your <span className="text-cyan-400">Arcade</span> Score.
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
          Stop guessing your points. We extract your Google Cloud Skills Boost profile, apply the exact active monthly rules, and rank you globally in real-time.
        </p>

        {/* Client Component for Input */}
        <HeroSearchClient />
      </section>

      {/* --- ADSENSE ZONE: BELOW HERO --- */}
      <div className="w-full max-w-5xl mx-auto px-4 mb-24">
        <AdSlot slot="home-below-hero" format="horizontal" minHeight={90} className="rounded-xl overflow-hidden border border-zinc-800/50 bg-zinc-900/50" />
      </div>

      {/* --- TRUST STATS SECTION --- */}
      <section className="border-y border-zinc-800 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-zinc-800/50 text-center">
          <div className="px-4">
            <h4 className="text-4xl font-black text-white mb-2 tracking-tighter">100%</h4>
            <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider">Deterministic Accuracy</p>
          </div>
          <div className="px-4">
            <h4 className="text-4xl font-black text-cyan-400 mb-2 tracking-tighter">&lt; 1s</h4>
            <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider">Extraction Speed</p>
          </div>
          <div className="px-4">
            <h4 className="text-4xl font-black text-purple-400 mb-2 tracking-tighter">Live</h4>
            <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider">Rule Engine Updates</p>
          </div>
          <div className="px-4">
            <h4 className="text-4xl font-black text-emerald-400 mb-2 tracking-tighter">Global</h4>
            <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider">Leaderboard Ranking</p>
          </div>
        </div>
      </section>

      {/* --- LEADERBOARD PREVIEW --- */}
      <section className="py-24 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">🏆 Live Global Leaderboard</h2>
          <p className="text-zinc-400">See who is taking the lead in the current active season.</p>
        </div>
        
        <LeaderboardPreviewClient />
      </section>

      {/* --- ADSENSE ZONE: IN-FEED --- */}
      <div className="w-full max-w-4xl mx-auto px-4 mb-24">
        <AdSlot slot="home-infeed" format="horizontal" minHeight={90} className="rounded-xl overflow-hidden border border-zinc-800/50 bg-zinc-900/50" />
      </div>

      {/* --- WHY USE ARCADEPULSE --- */}
      <section className="py-24 px-4 bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto z-10 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unfair Advantage for Arcade Hunters</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Stop using spreadsheets. Join the elite tracker.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black border border-zinc-800 p-8 rounded-2xl hover:border-cyan-500/50 transition duration-300">
              <div className="w-12 h-12 bg-cyan-950 text-cyan-400 flex items-center justify-center rounded-lg text-2xl mb-6">🎯</div>
              <h3 className="text-xl font-bold mb-3">Exact Score Transparency</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">No guesses. We show you exactly which badges mapped, which didn't, and why your score is what it is based on active monthly rules.</p>
            </div>
            
            <div className="bg-black border border-zinc-800 p-8 rounded-2xl hover:border-purple-500/50 transition duration-300">
              <div className="w-12 h-12 bg-purple-950 text-purple-400 flex items-center justify-center rounded-lg text-2xl mb-6">⚔️</div>
              <h3 className="text-xl font-bold mb-3">Vs. Compare Tool</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Instantly benchmark your profile against friends or top Leaderboard users to see exactly which badges you are missing to overtake them.</p>
            </div>

            <div className="bg-black border border-zinc-800 p-8 rounded-2xl hover:border-emerald-500/50 transition duration-300">
              <div className="w-12 h-12 bg-emerald-950 text-emerald-400 flex items-center justify-center rounded-lg text-2xl mb-6">📸</div>
              <h3 className="text-xl font-bold mb-3">Brag with Rank Cards</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Generate auto-updating, premium OpenGraph ranking cards to share directly on X and LinkedIn to build your cloud reputation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ URL SECTION --- */}
      <section className="py-24 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="group bg-zinc-900 border border-zinc-800 rounded-lg p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-white">
              <span>Why is my score different from other trackers?</span>
              <span className="transition group-open:-rotate-180 text-cyan-500 shrink-0 ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              We do not use generic guessing. Our engine maps your badges directly to the exact point values released by Google Cloud for the active season. If a badge isn't mapped, it gets flagged instead of falsely inflating your score.
            </p>
          </details>

          <details className="group bg-zinc-900 border border-zinc-800 rounded-lg p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-white">
              <span>How often does the leaderboard update?</span>
              <span className="transition group-open:-rotate-180 text-cyan-500 shrink-0 ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </span>
            </summary>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              The leaderboard cache clears frequently. However, whenever you look up your specific profile, we bypass your stale data and perform a real-time extraction, instantly pushing your new score to the leaderboard.
            </p>
          </details>
        </div>
      </section>

      {/* --- ADSENSE ZONE: FOOTER PRE-BOTTOM --- */}
      <div className="w-full max-w-5xl mx-auto px-4 mt-12 mb-24">
        <AdSlot slot="home-footer" format="responsive" minHeight={200} className="rounded-xl overflow-hidden border border-zinc-800/50 bg-zinc-900/50" />
      </div>

    </div>
  );
}
