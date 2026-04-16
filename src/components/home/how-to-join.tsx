'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { HOW_TO_JOIN_STEPS } from '@/lib/constants';
import Link from 'next/link';

export default function HowToJoinSection() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How to Join Google Cloud Arcade
          </h2>
          <p className="text-[var(--text-secondary)]">
            Start earning arcade points and unlock rewards with ArcadeCalc
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HOW_TO_JOIN_STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="card p-6 relative"
            >
              {/* Step number */}
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-deep)] flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {step.step}
              </div>

              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {step.description}
                </p>
                {step.link.startsWith('/') ? (
                  <Link
                    href={step.link}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
                  >
                    Get Started <ExternalLink size={14} />
                  </Link>
                ) : (
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
                  >
                    Get Started <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
