'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trophy, Info } from 'lucide-react';
import { useProfileStore } from '@/store/profile-store';
import { countBadgesByCategory, getBadgesThisSeason } from '@/lib/calculator';
import { BADGE_CATEGORIES } from '@/lib/constants';

export default function BadgeCategories() {
  const profile = useProfileStore((s) => s.activeProfile);
  const badges = profile?.badges ?? [];
  const categories = countBadgesByCategory(badges);
  const seasonBadges = getBadgesThisSeason(badges);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">Badge Categories</h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Track your progress across different badge types
          </p>
        </div>
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
          ● {seasonBadges} badges this season
        </span>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[1fr_80px_80px_40px] gap-4 px-4 py-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
        <span>Category</span>
        <span className="text-center">Badges</span>
        <span className="text-center text-[var(--accent)]">Points</span>
        <span />
      </div>

      {/* Category Rows */}
      <div className="divide-y divide-[var(--border-color)]">
        {categories.map((cat) => (
          <div key={cat.key}>
            <button
              onClick={() => setExpanded(expanded === cat.key ? null : cat.key)}
              className="w-full grid grid-cols-[1fr_80px_80px_40px] gap-4 items-center px-4 py-3.5 hover:bg-[var(--bg-primary)]/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Trophy size={16} className="text-[var(--accent)] flex-shrink-0" />
                <span className="text-sm font-medium">{cat.label}</span>
              </div>
              <span className="text-sm text-center font-semibold">{cat.count}</span>
              <span className="text-sm text-center font-semibold text-[var(--accent)]">{cat.points}</span>
              <motion.div
                animate={{ rotate: expanded === cat.key ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} className="text-[var(--text-muted)]" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expanded === cat.key && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-[var(--bg-primary)]/20">
                    {badges.filter((b) => b.category === cat.key && b.completed).length > 0 ? (
                      <ul className="space-y-2">
                        {badges
                          .filter((b) => b.category === cat.key && b.completed)
                          .map((badge) => (
                            <li
                              key={badge.id}
                              className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                              {badge.title}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-[var(--text-muted)]">
                        No badges earned in this category yet.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Info Note */}
      <div className="mt-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/15">
        <div className="flex gap-2">
          <Info size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-[var(--text-secondary)]">
            <p>
              Some badges can&apos;t be tracked as only the first 50 users to complete them earn points.
            </p>
            <a href="/resources/non-trackable-badges" className="text-[var(--accent)] hover:underline">
              View the list of those badges here →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
