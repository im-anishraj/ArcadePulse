'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Trophy } from 'lucide-react';
import { MOCK_INCOMPLETE_BADGES } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

type FilterTab = 'all' | 'trivia' | 'game' | 'skill';

export default function IncompleteBadges() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [search, setSearch] = useState('');

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'trivia', label: 'Trivia' },
    { key: 'game', label: 'Game' },
    { key: 'skill', label: 'Skill' },
  ];

  const filtered = useMemo(() => {
    return MOCK_INCOMPLETE_BADGES.filter((badge) => {
      const matchesTab = activeTab === 'all' || badge.category === activeTab;
      const matchesSearch =
        !search || badge.title.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  const counts = useMemo(() => {
    return {
      all: MOCK_INCOMPLETE_BADGES.length,
      trivia: MOCK_INCOMPLETE_BADGES.filter((b) => b.category === 'trivia').length,
      game: MOCK_INCOMPLETE_BADGES.filter((b) => b.category === 'game').length,
      skill: MOCK_INCOMPLETE_BADGES.filter((b) => b.category === 'skill').length,
    };
  }, []);

  return (
    <div className="card p-6">
      <h3 className="text-xl font-bold mb-6">Incomplete Badges</h3>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all border',
                activeTab === tab.key
                  ? 'bg-(--accent)/15 text-(--accent) border-(--accent)/30'
                  : 'bg-transparent text-(--text-secondary) border-(--border-color) hover:border-(--accent)/30'
              )}
            >
              {tab.label}{' '}
              <span className="ml-1 px-1.5 py-0.5 rounded-md bg-(--bg-primary) text-xs">
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search badges..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-(--bg-primary) border border-(--border-color) text-sm text-(--text-primary) placeholder-(--text-muted) focus:outline-none focus:border-(--accent) transition-colors"
          />
        </div>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.slice(0, 12).map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card p-4 hover:scale-[1.02]"
          >
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-xl bg-(--bg-primary) border border-(--border-color) flex items-center justify-center shrink-0">
                <Trophy size={20} className="text-(--text-muted)" />
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className={cn(
                    'inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase mb-1',
                    badge.category === 'game'
                      ? 'bg-green-500/15 text-green-400'
                      : badge.category === 'trivia'
                      ? 'bg-blue-500/15 text-blue-400'
                      : 'bg-purple-500/15 text-purple-400'
                  )}
                >
                  {badge.category}
                </span>
                <h4 className="text-sm font-semibold truncate">{badge.title}</h4>
                <p className="text-xs text-(--text-muted) line-clamp-2 mt-0.5">
                  {badge.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length > 12 && (
        <div className="text-center mt-6">
          <p className="text-sm text-(--text-muted)">
            Showing 12 of {filtered.length} incomplete badges
          </p>
        </div>
      )}
    </div>
  );
}
