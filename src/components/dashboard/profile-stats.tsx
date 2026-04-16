'use client';

import { useProfileStore } from '@/store/profile-store';
import { Trophy, Crown, Zap, Info } from 'lucide-react';

export default function ProfileStats() {
  const profile = useProfileStore((s) => s.activeProfile);

  const stats = [
    {
      label: 'Arcade Points',
      value: profile?.totalPoints ?? 0,
      icon: <Trophy size={20} className="text-(--accent)" />,
    },
    {
      label: 'Leaderboard',
      value: profile?.leaderboardRank ?? 0,
      icon: <Crown size={20} className="text-yellow-500" />,
    },
    {
      label: 'Total Badges',
      value: profile?.badges?.length ?? 0,
      icon: <Zap size={20} className="text-blue-500" />,
    },
  ];

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-semibold">Profile Stats</h3>
        <Info size={16} className="text-(--text-muted)" />
      </div>

      <div className="space-y-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between py-2 border-b border-(--border-color) last:border-0"
          >
            <div className="flex items-center gap-3">
              {stat.icon}
              <span className="text-sm text-(--text-secondary)">
                {stat.label}
              </span>
            </div>
            <span className="font-bold">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
