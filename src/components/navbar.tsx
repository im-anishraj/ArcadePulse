'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  Home,
  LayoutDashboard,
  BarChart3,
  Gamepad2,
  Sparkles,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  User,
} from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { useProfileStore } from '@/store/profile-store';
import { cn, getInitials, getAvatarColor } from '@/lib/utils';
import MobileNav from './mobile-nav';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Home,
  LayoutDashboard,
  BarChart3,
  Gamepad2,
  Sparkles,
};

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeProfile = useProfileStore((s) => s.activeProfile);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <>
      <nav className="glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* ── Desktop Nav Links ── */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const Icon = ICON_MAP[link.icon];
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-purple-primary/15 text-purple-primary'
                        : 'hover:bg-white/5 text-(--text-secondary) hover:text-(--text-primary)'
                    )}
                  >
                    {Icon && <Icon size={18} />}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-3">
              <button
                className="p-2.5 rounded-full bg-(--bg-card) border border-(--border-color) text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                title="Notifications"
              >
                <Bell size={18} />
              </button>

              {/* Profile Avatar */}
              <Link
                href="/dashboard"
                className="flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-sm transition-transform hover:scale-105"
                style={{
                  backgroundColor: activeProfile
                    ? getAvatarColor(activeProfile.name)
                    : 'var(--color-purple-primary)',
                }}
                title={activeProfile?.name || 'Profile'}
              >
                {activeProfile ? getInitials(activeProfile.name) : <User size={18} />}
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-(--bg-card) border border-(--border-color) text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                title="Toggle theme"
              >
                {mounted ? (
                  theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />
                ) : (
                  <Sun size={18} className="opacity-0" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2.5 rounded-full bg-(--bg-card) border border-(--border-color) text-(--text-secondary)"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Navigation ── */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* ── Spacer for fixed navbar ── */}
      <div className="h-16" />
    </>
  );
}
