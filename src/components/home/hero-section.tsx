'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { isValidProfileUrl, fetchProfileData } from '@/lib/profile-parser';
import { useProfileStore } from '@/store/profile-store';
import Link from 'next/link';

export default function HeroSection() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { setLoading, addProfile, setShowCommunityModal, isLoading } = useProfileStore();

  const handleSubmit = async () => {
    setError('');

    if (!url.trim()) {
      setError('Please enter your SkillBoost profile URL');
      return;
    }

    if (!isValidProfileUrl(url)) {
      setError('Please enter a valid Google Cloud SkillBoost profile URL');
      return;
    }

    setLoading(true);
    try {
      const profile = await fetchProfileData(url);
      if (profile) {
        addProfile(profile);
        setShowCommunityModal(true);
        router.push('/dashboard');
      } else {
        setError('Could not fetch profile data. Please check the URL and try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero-gradient bg-grid-pattern relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
        {/* ── Announcement Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="announcement-banner inline-block px-6 py-2 rounded-full mb-10 text-sm"
        >
          🚀 Join our{' '}
          <a
            href="https://t.me/arcadecalc01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] font-semibold hover:underline"
          >
            Telegram Community
          </a>{' '}
          for exclusive updates and support!
        </motion.div>

        {/* ── Headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
        >
          Your Ultimate{' '}
          <span className="gradient-text">Google Cloud Arcade</span>{' '}
          Companion
        </motion.h1>

        {/* ── Subtitle ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[var(--text-secondary)] mb-4 max-w-2xl mx-auto"
        >
          Track your progress, analyze your achievements, and stay ahead in the Arcade with ArcadeCalc.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-sm text-[var(--text-secondary)] mb-8"
        >
          Enter your Google Cloud SkillBoost profile URL to calculate your Arcade Points instantly!
        </motion.p>

        {/* ── URL Input + Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-4"
        >
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError('');
            }}
            placeholder="Enter your SkillBoost profile URL"
            className="flex-1 px-6 py-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors text-sm"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="btn-gradient px-8 py-4 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Calculating...
              </span>
            ) : (
              'Calculate Points'
            )}
          </button>
        </motion.div>

        {/* ── Error Message ── */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-[var(--color-red-error)] mb-4"
          >
            {error}
          </motion.p>
        )}

        {/* ── Help Link ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-1 text-sm text-[var(--text-muted)]"
        >
          <HelpCircle size={14} />
          Having trouble finding your public profile URL?{' '}
          <Link href="/resources/find-your-public-url" className="text-[var(--accent)] hover:underline font-medium">
            Click here for help
          </Link>
        </motion.div>

        {/* ── Saved Profiles Note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-sm">
            <span className="text-[var(--accent)]">✨ No need to enter your profile ever again!</span>
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            Your accounts are saved, and you can switch between multiple profiles effortlessly from the navbar.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
