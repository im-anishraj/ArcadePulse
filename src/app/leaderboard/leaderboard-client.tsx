'use client';

import { motion } from 'framer-motion';
import Podium from '@/components/leaderboard/podium';
import RankingList from '@/components/leaderboard/ranking-list';
import AdSlot from '@/components/ad-slot';
import { MOCK_LEADERBOARD } from '@/lib/mock-data';

export default function LeaderboardClient() {
  const top3 = MOCK_LEADERBOARD.slice(0, 3);
  const rest = MOCK_LEADERBOARD.slice(3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
          🏆 Arcade Leaderboard 🏆
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
          Climb the ranks, earn exclusive rewards, and secure your spot among the top achievers!
        </p>
        <p className="text-sm text-[var(--accent)] mt-2">
          ✨ Top achievers can earn exclusive vouchers from the Arcade Team. ✨
        </p>
      </motion.div>

      {/* Podium (Ad-Free Zone) */}
      <Podium top3={top3} />

      {/* Ranking List */}
      <RankingList entries={rest} />

      {/* Reward CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card p-8 mt-8 text-center"
      >
        <h3 className="text-lg font-bold mb-2">Want to win exclusive rewards?</h3>
        <p className="text-sm text-[var(--text-secondary)]">
          Keep earning points and climb the leaderboard to receive Arcade-exclusive rewards!
        </p>
      </motion.div>

      {/* ── Ad Zone E: Above Footer ── */}
      <AdSlot
        slot="zone-e-leaderboard"
        format="horizontal"
        minHeight={90}
        hideOnMobile={true}
        className="mt-8"
      />
    </div>
  );
}
