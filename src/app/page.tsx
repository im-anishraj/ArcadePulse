import HeroSection from '@/components/home/hero-section';
import FeaturesSection from '@/components/home/features-section';
import HowToJoinSection from '@/components/home/how-to-join';
import StatsSection from '@/components/home/stats-section';
import AdSlot from '@/components/ad-slot';

export default function HomePage() {
  return (
    <>
      {/* ── Hero (Ad-Free Zone — critical conversion area) ── */}
      <HeroSection />

      {/* ── Features Section ── */}
      <FeaturesSection />

      {/* ── Ad Zone B: Between Features & How-to-Join ── */}
      <div className="max-w-3xl mx-auto px-4">
        <AdSlot
          slot="zone-b-home"
          format="horizontal"
          minHeight={60}
          className="my-2"
        />
      </div>

      {/* ── How to Join Section ── */}
      <HowToJoinSection />

      {/* ── Stats Section ── */}
      <StatsSection />

      {/* ── Ad Zone E: Above Footer ── */}
      <div className="max-w-3xl mx-auto px-4">
        <AdSlot
          slot="zone-e-home"
          format="horizontal"
          minHeight={90}
          hideOnMobile={true}
          className="my-8"
        />
      </div>
    </>
  );
}
