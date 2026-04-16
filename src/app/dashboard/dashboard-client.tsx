'use client';

import ProfileCard from '@/components/dashboard/profile-card';
import ProfileStats from '@/components/dashboard/profile-stats';
import WeeklyProgress from '@/components/dashboard/weekly-progress';
import MilestoneTracker from '@/components/dashboard/milestone-tracker';
import SwagsTier from '@/components/dashboard/swags-tier';
import SwagsEligibility from '@/components/dashboard/swags-eligibility';
import BadgeCategories from '@/components/dashboard/badge-categories';
import IncompleteBadges from '@/components/dashboard/incomplete-badges';
import AdSlot from '@/components/ad-slot';

export default function DashboardClient() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ── 3-Column Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-6">
        {/* ── Left Column ── */}
        <div className="space-y-6">
          <ProfileCard />
          <ProfileStats />
          <WeeklyProgress />

          {/* Swags Tier (left sidebar for desktop) */}
          <div className="hidden lg:block">
            <SwagsTier />
          </div>
        </div>

        {/* ── Center Column ── */}
        <div className="space-y-6">
          <MilestoneTracker />
          <BadgeCategories />

          {/* ── Ad Zone C: After result cards ── */}
          <AdSlot
            slot="zone-c-dashboard"
            format="rectangle"
            minHeight={280}
            className="my-4"
          />

          <IncompleteBadges />
        </div>

        {/* ── Right Column ── */}
        <div className="space-y-6">
          {/* Swags Tier (shown in right column on desktop, top on mobile) */}
          <div className="lg:hidden">
            <SwagsTier />
          </div>
          <div className="hidden lg:block">
            <SwagsTier />
          </div>
          <SwagsEligibility />

          {/* ── Ad Zone D: Desktop sidebar ── */}
          <AdSlot
            slot="zone-d-sidebar"
            format="vertical"
            minHeight={600}
            hideOnMobile={true}
            className="sticky top-24"
          />
        </div>
      </div>
    </div>
  );
}
