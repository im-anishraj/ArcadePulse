'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { MILESTONES } from '@/lib/constants';

export default function MilestoneTracker() {
  return (
    <div className="space-y-6">
      {MILESTONES.map((milestone, index) => (
        <motion.div
          key={milestone.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="card p-6 relative overflow-hidden"
        >
          {/* Milestone Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-(--text-muted)">
                {milestone.level}.
              </span>
              <h3 className="font-bold">{milestone.name}</h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
              Todo
            </span>
          </div>

          {/* Requirements Grid */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            <RequirementBox label="Game Badges" current={0} required={milestone.requirements.games} />
            <RequirementBox label="Trivia Badges" current={0} required={milestone.requirements.trivia} />
            <RequirementBox label="Skill Badges" current={0} required={milestone.requirements.skillBadges} />
            <RequirementBox label="Lab Free Badges" current={0} required={milestone.requirements.labFree} />
          </div>

          {/* Event Not Live Overlay */}
          <div className="flex flex-col items-center justify-center py-4 opacity-80">
            <AlertCircle size={32} className="text-yellow-500 mb-2" />
            <p className="font-semibold text-sm">This Event Not Live Yet</p>
            <p className="text-xs text-(--text-secondary) text-center mt-1">
              This event is coming soon! Complete milestones to earn free bonus points when it goes live.
            </p>
          </div>

          {/* Warning */}
          <div className="mt-3 px-4 py-2 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
            <p className="text-xs text-yellow-400 text-center">
              Avoid completing skill badges at this moment as they won&apos;t contribute to the facilitator milestones when the event goes live!
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function RequirementBox({
  label,
  current,
  required,
}: {
  label: string;
  current: number;
  required: number;
}) {
  return (
    <div className="text-center p-2 rounded-lg bg-(--bg-primary)/50 border border-(--border-color)">
      <div className="text-xs text-(--text-muted) mb-1 truncate">{label}</div>
      <div className="text-sm font-bold">
        <span className={current >= required ? 'text-green-400' : ''}>{current}</span>
        <span className="text-(--text-muted)">/{required}</span>
      </div>
    </div>
  );
}
