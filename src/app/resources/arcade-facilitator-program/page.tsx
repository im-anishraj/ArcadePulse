import type { Metadata } from 'next';
import FacilitatorClient from './facilitator-client';

export const metadata: Metadata = {
  title: 'Google Cloud Arcade Facilitator Program | ArcadeCalc',
  description:
    'Join the Google Cloud Arcade Facilitator Program to learn cloud skills through gaming and earn rewards.',
};

export default function FacilitatorPage() {
  return <FacilitatorClient />;
}
