'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, LayoutDashboard, BarChart3, Gamepad2, Sparkles, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Home,
  LayoutDashboard,
  BarChart3,
  Gamepad2,
  Sparkles,
};

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />

          {/* Slide-in Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-72 glass z-50 md:hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold gradient-text">ArcadeCalc</span>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => {
                  const Icon = ICON_MAP[link.icon];
                  const isActive =
                    pathname === link.href ||
                    (link.href !== '/' && pathname.startsWith(link.href));

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                        isActive
                          ? 'bg-purple-primary/15 text-purple-primary'
                          : 'hover:bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      )}
                    >
                      {Icon && <Icon size={20} />}
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
