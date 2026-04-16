'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ResourceCard as ResourceCardType } from '@/lib/types';
import Link from 'next/link';

interface ResourceCardProps {
  card: ResourceCardType;
  index: number;
}

export default function ResourceCard({ card, index }: ResourceCardProps) {
  const isExternal = card.link.startsWith('http');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card p-6 flex flex-col justify-between hover:scale-[1.02]"
    >
      <div>
        <h3 className="text-lg font-bold mb-3">{card.title}</h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
          {card.description}
        </p>
      </div>

      {isExternal ? (
        <a
          href={card.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          {card.linkText} <ExternalLink size={14} />
        </a>
      ) : (
        <Link
          href={card.link}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          {card.linkText}
        </Link>
      )}
    </motion.div>
  );
}
