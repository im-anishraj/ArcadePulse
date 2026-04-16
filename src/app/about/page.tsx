import type { Metadata } from 'next';
import { Users, Target, Zap, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | ArcadeCalc',
  description: 'Learn about ArcadeCalc — the ultimate Google Cloud Arcade companion trusted by over 50,000 users.',
};

export default function AboutPage() {
  const values = [
    {
      icon: <Target size={24} className="text-[var(--accent)]" />,
      title: 'Our Mission',
      description: 'To empower Google Cloud learners with the best tools to track, analyze, and optimize their Arcade journey.',
    },
    {
      icon: <Users size={24} className="text-blue-400" />,
      title: 'Community First',
      description: 'Built by the community, for the community. We listen, iterate, and deliver what our users truly need.',
    },
    {
      icon: <Zap size={24} className="text-yellow-400" />,
      title: 'Innovation',
      description: 'Constantly pushing boundaries with real-time calculations, beautiful analytics, and intelligent insights.',
    },
    {
      icon: <Globe size={24} className="text-green-400" />,
      title: 'Accessibility',
      description: 'Free, open, and accessible to every Google Cloud Arcade participant worldwide.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold mb-4 gradient-text">About ArcadeCalc</h1>
      <p className="text-lg text-[var(--text-secondary)] mb-12 max-w-2xl">
        ArcadeCalc is the ultimate companion for Google Cloud Arcade participants. We help you track your progress, calculate your points, and compete on leaderboards — all in one beautiful, intuitive platform.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { value: '50,000+', label: 'Users' },
          { value: '35,000+', label: 'Profiles Analyzed' },
          { value: '5,000+', label: 'Community Members' },
          { value: '2024', label: 'Founded' },
        ].map((stat) => (
          <div key={stat.label} className="card p-4 text-center">
            <div className="text-2xl font-extrabold gradient-text">{stat.value}</div>
            <div className="text-xs text-[var(--text-muted)]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Values */}
      <h2 className="text-2xl font-bold mb-8">What Drives Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {values.map((v) => (
          <div key={v.title} className="card p-6 flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0">
              {v.icon}
            </div>
            <div>
              <h3 className="font-semibold mb-1">{v.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{v.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Creator */}
      <div className="card p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Built with 💜</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          ArcadeCalc was created and is maintained by passionate Google Cloud community members dedicated to helping learners succeed in their cloud journey.
        </p>
        <a
          href="https://www.linkedin.com/in/deepanshu-prajapati01/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:underline"
        >
          Meet the Creator →
        </a>
      </div>
    </div>
  );
}
