'use client';

import { motion } from 'framer-motion';
import { getAvatarColor, getInitials } from '@/lib/utils';
import { LeaderboardEntry } from '@/lib/types';

interface RankingListProps {
  entries: LeaderboardEntry[];
}

export default function RankingList({ entries }: RankingListProps) {
  return (
    <div className="card overflow-hidden">
      <div className="p-4 border-b border-(--border-color)">
        <h3 className="font-bold">Leaderboard Rankings</h3>
      </div>

      <div className="divide-y divide-(--border-color)">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-4 px-6 py-4 hover:bg-(--bg-primary)/30 transition-colors"
          >
            {/* Rank */}
            <span className="text-sm font-bold text-(--text-muted) w-8 text-center">
              #{entry.rank}
            </span>

            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{
                backgroundColor: entry.avatarColor || getAvatarColor(entry.name),
              }}
            >
              {entry.initial || getInitials(entry.name)}
            </div>

            {/* Name & Points */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold truncate">{entry.name}</h4>
              <p className="text-xs text-(--text-muted)">
                {entry.points} points
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
