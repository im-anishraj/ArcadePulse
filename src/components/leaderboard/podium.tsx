'use client';

import { motion } from 'framer-motion';
import { getAvatarColor, getInitials } from '@/lib/utils';
import { LeaderboardEntry } from '@/lib/types';

interface PodiumProps {
  top3: LeaderboardEntry[];
}

export default function Podium({ top3 }: PodiumProps) {
  if (top3.length < 3) return null;

  // Reorder: 2nd, 1st, 3rd
  const ordered = [top3[1], top3[0], top3[2]];
  const heights = ['h-28', 'h-36', 'h-24'];
  const sizes = ['w-16 h-16 text-lg', 'w-20 h-20 text-xl', 'w-16 h-16 text-lg'];
  const medals = ['🥈', '🥇', '🥉'];

  return (
    <div className="flex items-end justify-center gap-6 mb-12">
      {ordered.map((entry, i) => (
        <motion.div
          key={entry.rank}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
          className="flex flex-col items-center"
        >
          {/* Avatar */}
          <div className="relative mb-3">
            <div
              className={`${sizes[i]} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}
              style={{
                backgroundColor: entry.avatarColor || getAvatarColor(entry.name),
              }}
            >
              {entry.initial || getInitials(entry.name)}
            </div>
            <div className="absolute -bottom-1 -right-1 text-lg">{medals[i]}</div>
          </div>

          {/* Name */}
          <h3 className="text-sm font-semibold text-center mb-1 max-w-[120px] truncate">
            {entry.name}
          </h3>

          {/* Points Badge */}
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-(--accent)/15 text-(--accent) border border-(--accent)/25 mb-3">
            {entry.points} points
          </span>

          {/* Podium Block */}
          <div
            className={`${heights[i]} w-32 rounded-t-xl bg-linear-to-b from-(--bg-card) to-(--bg-primary) border border-(--border-color) border-b-0`}
          />
        </motion.div>
      ))}
    </div>
  );
}
