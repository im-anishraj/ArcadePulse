import type { Metadata } from 'next';
import ResourceCard from '@/components/resources/resource-card';
import { RESOURCE_CARDS } from '@/lib/mock-data';
import AdSlot from '@/components/ad-slot';

export const metadata: Metadata = {
  title: 'Resources - Google Cloud Arcade Guides & Solutions | ArcadeCalc',
  description:
    'Comprehensive guides and solutions for Google Cloud Arcade. Learn how to track progress, manage badges, and maximize your rewards with expert tips and tutorials.',
};

export default function ResourcesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Resources & Guides
        </h1>
        <p className="text-(--text-secondary) max-w-2xl mx-auto">
          Explore our comprehensive collection of guides, tutorials, and community resources to enhance your Google Cloud Arcade journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESOURCE_CARDS.slice(0, 3).map((card, index) => (
          <ResourceCard key={card.title} card={card} index={index} />
        ))}
      </div>

      {/* ── Ad Zone F: Between resource cards ── */}
      <AdSlot
        slot="zone-f-resources"
        format="horizontal"
        minHeight={60}
        className="my-8"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESOURCE_CARDS.slice(3).map((card, index) => (
          <ResourceCard key={card.title} card={card} index={index} />
        ))}
      </div>

      {/* ── Ad Zone E: Above Footer ── */}
      <AdSlot
        slot="zone-e-resources"
        format="horizontal"
        minHeight={90}
        hideOnMobile={true}
        className="mt-12"
      />
    </div>
  );
}
