'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SITE_STATS } from '@/lib/constants';
import { formatNumber, animateValue } from '@/lib/utils';

export default function StatsSection() {
  return (
    <section className="py-20 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How Far We&apos;ve Come: Stats That Speak for Growth
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_STATS.map((stat, index) => (
            <StatCounter key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCounter({
  stat,
  index,
}: {
  stat: (typeof SITE_STATS)[number];
  index: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateValue(0, stat.value, 2000, (v) => setValue(v));
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card p-6 text-center"
    >
      <div className="text-3xl sm:text-4xl font-extrabold gradient-text mb-2">
        {formatNumber(value)}+
      </div>
      <div className="text-sm font-semibold text-[var(--text-primary)] mb-1">
        {stat.label}
      </div>
      <div className="text-xs text-[var(--text-muted)]">{stat.sublabel}</div>
    </motion.div>
  );
}
