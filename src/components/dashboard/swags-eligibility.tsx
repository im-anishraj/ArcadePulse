'use client';

import { Trophy, XCircle } from 'lucide-react';
import { useProfileStore } from '@/store/profile-store';

export default function SwagsEligibility() {
  const profile = useProfileStore((s) => s.activeProfile);
  const points = profile?.totalPoints ?? 0;
  const isEligible = points >= 25;

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy size={18} className="text-(--accent)" />
        <h3 className="font-semibold">Swags Eligibility</h3>
      </div>

      <div className="flex flex-col items-center justify-center py-8">
        {isEligible ? (
          <>
            <div className="w-24 h-24 rounded-full bg-green-400/10 flex items-center justify-center mb-4">
              <Trophy size={40} className="text-green-400" />
            </div>
            <p className="text-sm font-semibold text-green-400">
              You are eligible for swags! 🎉
            </p>
          </>
        ) : (
          <>
            <div className="relative w-24 h-24 flex items-center justify-center mb-4">
              <div className="w-20 h-20 rounded-lg bg-(--border-color)/50 flex items-center justify-center">
                <Trophy size={32} className="text-(--text-muted)" />
              </div>
              <XCircle
                size={48}
                className="absolute text-red-500 opacity-80"
              />
            </div>
            <p className="text-sm font-semibold text-red-400">
              Not eligible yet
            </p>
            <p className="text-xs text-(--text-muted) mt-1">
              Earn at least 25 points to become eligible
            </p>
          </>
        )}
      </div>
    </div>
  );
}
