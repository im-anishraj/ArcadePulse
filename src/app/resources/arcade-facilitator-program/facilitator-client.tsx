'use client';

import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Copy, Check, Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { MILESTONES } from '@/lib/constants';
import AdSlot from '@/components/ad-slot';

export default function FacilitatorClient() {
  const [copied, setCopied] = useState(false);
  const regCode = 'GCAF25C2-IN-LPZ-GRF';

  const handleCopy = () => {
    navigator.clipboard.writeText(regCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 hero-gradient bg-grid-pattern rounded-2xl p-12"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
          Google Cloud Arcade{' '}
          <span className="gradient-text">Facilitator Program</span>{' '}
          (Cohort 2)
        </h1>
        <p className="text-lg text-(--text-secondary) mb-4">
          Master Cloud Skills. Earn Badges & Bonus Points. Unlock Exclusive Google Cloud Rewards.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-(--text-muted)">
          <Calendar size={16} />
          August 4, 2025 at 5:00 PM – October 13, 2025 at 11:59 PM
        </div>
      </motion.div>

      {/* ── Registration Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card p-8 mb-8"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Join the Program Now</h2>
        <p className="text-center text-(--text-secondary) mb-8">
          Registrations closing soon. Enroll now to start your Google Cloud journey
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Registration Form */}
          <div className="p-6 rounded-xl bg-(--bg-primary)/50 border border-(--border-color)">
            <div className="flex items-center gap-2 mb-3">
              <ExternalLink size={18} className="text-yellow-500" />
              <h3 className="text-lg font-bold">Registration Form</h3>
            </div>
            <p className="text-sm text-(--text-secondary) mb-4">
              Fill out the form to register for the program and get started with your learning journey.
            </p>
            <a
              href="https://forms.gle/FGVyCSoaGJTffD5a9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient inline-flex items-center gap-2 text-sm"
            >
              Open Registration Form <ExternalLink size={14} />
            </a>
          </div>

          {/* Registration Code */}
          <div className="p-6 rounded-xl bg-(--bg-primary)/50 border border-(--border-color)">
            <div className="flex items-center gap-2 mb-3">
              <Copy size={18} className="text-yellow-500" />
              <h3 className="text-lg font-bold">Registration Code</h3>
            </div>
            <p className="text-sm text-(--text-secondary) mb-4">
              Use this code when registering to join our cohort:
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-4 py-3 rounded-xl bg-(--bg-card) border border-(--border-color) text-sm font-mono text-(--accent)">
                {regCode}
              </code>
              <button
                onClick={handleCopy}
                className="p-3 rounded-xl bg-(--bg-card) border border-(--border-color) hover:border-(--accent) transition-colors"
              >
                {copied ? (
                  <Check size={18} className="text-green-400" />
                ) : (
                  <Copy size={18} className="text-(--text-secondary)" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Community Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card p-8 mb-8"
      >
        <h2 className="text-2xl font-bold text-center mb-2">🤝 Join Our Community</h2>
        <p className="text-center text-(--text-secondary) mb-6">
          Connect with others, ask questions, and stay updated in our Telegram and WhatsApp communities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <a
            href="https://t.me/arcadecalc01"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl bg-[#0088cc] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            <Send size={18} />
            Telegram Community
          </a>
          <a
            href="https://chat.whatsapp.com/Br4pRBxixgD3BL5f8jb2aI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={18} />
            WhatsApp Community
          </a>
        </div>
      </motion.div>

      {/* ── Ad Zone ── */}
      <AdSlot
        slot="zone-b-facilitator"
        format="horizontal"
        minHeight={60}
        className="my-8"
      />

      {/* ── Milestones Detail ── */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Track your progress and unlock achievements
        </h2>

        {MILESTONES.map((milestone, index) => (
          <motion.div
            key={milestone.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-(--accent)/15 flex items-center justify-center text-sm font-bold text-(--accent)">
                {milestone.level}
              </span>
              <h3 className="text-lg font-bold">{milestone.name}</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <MilestoneReq label="Arcade Games" value={milestone.requirements.games} />
              <MilestoneReq label="Trivia Games" value={milestone.requirements.trivia} />
              <MilestoneReq label="Skill Badges" value={milestone.requirements.skillBadges} />
              <MilestoneReq label="Lab-free Courses" value={milestone.requirements.labFree} />
            </div>

            <div className="px-4 py-3 rounded-lg bg-blue-500/5 border border-blue-500/15">
              <p className="text-xs text-(--text-secondary)">
                <span className="font-semibold text-(--text-primary)">Note: </span>
                {milestone.specialGameNote}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Ad Zone E: Above Footer ── */}
      <AdSlot
        slot="zone-e-facilitator"
        format="horizontal"
        minHeight={90}
        hideOnMobile={true}
        className="mt-12"
      />
    </div>
  );
}

function MilestoneReq({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center p-3 rounded-xl bg-(--bg-primary)/50 border border-(--border-color)">
      <div className="text-2xl font-bold text-(--accent)">{value}</div>
      <div className="text-xs text-(--text-muted)">{label}</div>
    </div>
  );
}
