'use client';

import { useProfileStore } from '@/store/profile-store';
import { getInitials, getAvatarColor } from '@/lib/utils';
import { HelpCircle, User } from 'lucide-react';

export default function ProfileCard() {
  const profile = useProfileStore((s) => s.activeProfile);

  if (!profile) {
    return (
      <div className="card p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-(--border-color) flex items-center justify-center mx-auto mb-4">
          <User size={32} className="text-(--text-muted)" />
        </div>
        <p className="text-sm text-(--text-secondary)">
          No profile loaded. Enter your SkillBoost URL on the homepage.
        </p>
      </div>
    );
  }

  return (
    <div className="card p-6 text-center">
      {/* Avatar */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white shadow-lg"
        style={{ backgroundColor: getAvatarColor(profile.name) }}
      >
        {getInitials(profile.name)}
      </div>

      {/* Name */}
      <h2 className="text-lg font-bold mb-1">{profile.name}</h2>
      <p className="text-xs text-(--text-muted) mb-3">
        Member since {profile.memberSince}
      </p>

      {/* League Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-(--accent)/10 border border-(--accent)/20">
        <HelpCircle size={14} className="text-(--accent)" />
        <span className="text-xs font-medium text-(--accent)">
          {profile.league}
        </span>
      </div>
    </div>
  );
}
