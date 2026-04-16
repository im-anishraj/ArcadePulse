import type { Metadata } from 'next';
import DashboardClient from './dashboard-client';

export const metadata: Metadata = {
  title: 'Dashboard - Track Your Google Cloud Progress | ArcadeCalc',
  description:
    'Your personalized Google Cloud Arcade Points Calculator. Track points, monitor badge progress, check swag eligibility, and get real-time insights to optimize your Arcade journey.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
