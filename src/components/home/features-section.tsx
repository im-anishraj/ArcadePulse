'use client';

import { motion } from 'framer-motion';
import {
  Calculator,
  TrendingUp,
  Users,
  Trophy,
  Layout,
  Gift,
} from 'lucide-react';
import { FEATURES } from '@/lib/constants';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Calculator,
  TrendingUp,
  Users,
  Trophy,
  Layout,
  Gift,
};

export default function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Features That Set ArcadeCalc Apart
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Everything you need to master Google Cloud Arcade, beautifully organized and always at your fingertips.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = ICON_MAP[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 hover:scale-[1.02] cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                  {Icon && <Icon size={24} className="text-[var(--accent)]" />}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
