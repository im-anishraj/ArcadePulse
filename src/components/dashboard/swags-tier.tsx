'use client';

import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { SWAG_TIERS } from '@/lib/constants';
import { useProfileStore } from '@/store/profile-store';
import { getTierProgress } from '@/lib/calculator';

export default function SwagsTier() {
  const profile = useProfileStore((s) => s.activeProfile);
  const points = profile?.totalPoints ?? 0;

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="font-semibold">Swags Tier Progress</h3>
        <Info size={16} className="text-[var(--text-muted)]" />
      </div>

      <div className="space-y-4">
        {SWAG_TIERS.map((tier, index) => {
          const progress = getTierProgress(points, tier.pointsRequired);
          const isComplete = points >= tier.pointsRequired;

          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              {/* Status dot */}
              <div
                className={`w-3 h-3 rounded-full flex-shrink-0 ${
                  isComplete ? 'bg-green-400' : 'bg-[var(--border-color)]'
                }`}
              />

              {/* Tier info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium truncate">
                    {tier.name}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] flex-shrink-0">
                    {points}/{tier.pointsRequired} pts.
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
