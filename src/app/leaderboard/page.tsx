import type { Metadata } from 'next';
import LeaderboardClient from './leaderboard-client';

export const metadata: Metadata = {
  title: 'Leaderboard - Top Google Cloud Arcade Performers | ArcadeCalc',
  description:
    'Real-time rankings of top Google Cloud Arcade participants. Track your position, compare achievements, and compete with others in the cloud certification journey.',
};

export default function LeaderboardPage() {
  return <LeaderboardClient />;
}
