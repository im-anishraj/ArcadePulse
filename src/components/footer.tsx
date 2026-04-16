import Link from 'next/link';
import { QUICK_LINKS, COMMUNITY_LINKS, LEGAL_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ── Brand ── */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold gradient-text mb-3">ArcadeCalc</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Your ultimate companion for Google Cloud Arcade. Track progress, manage badges, and compete globally with our intuitive platform.
            </p>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Community ── */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Community
            </h4>
            <ul className="space-y-2">
              {COMMUNITY_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Legal ── */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-[var(--border-color)] mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} ArcadeCalc. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Made with 💜 by{' '}
            <a
              href="https://www.linkedin.com/in/deepanshu-prajapati01/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              Deepanshu Prajapati
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
