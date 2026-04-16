import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | ArcadeCalc',
  description: 'Terms and Conditions for using ArcadeCalc — Arcade Points Calculator.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold mb-8 gradient-text">Terms & Conditions</h1>
      <p className="text-xs text-[var(--text-muted)] mb-8">Last updated: January 13, 2026</p>

      <div className="legal-content">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using ArcadeCalc (&quot;the Service&quot;), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          ArcadeCalc provides a free tool to calculate Google Cloud Arcade points from your public SkillBoost profile. The Service includes point calculation, leaderboard rankings, badge tracking, and educational resources.
        </p>

        <h2>3. User Responsibilities</h2>
        <ul>
          <li>You must provide accurate profile URLs for calculation</li>
          <li>You are responsible for maintaining the confidentiality of your profile data</li>
          <li>You agree not to misuse the Service or attempt to manipulate calculations</li>
          <li>You will not use the Service for any unlawful purpose</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          The content, features, and functionality of ArcadeCalc are owned by us and are protected by international copyright and other intellectual property laws. Google Cloud, Cloud Skills Boost, and related trademarks are property of Google LLC.
        </p>

        <h2>5. Disclaimer of Warranties</h2>
        <p>
          ArcadeCalc is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind. We do not guarantee the accuracy of point calculations, leaderboard rankings, or any other data displayed on the Service.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          In no event shall ArcadeCalc, its creators, or contributors be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.
        </p>

        <h2>7. Third-Party Links</h2>
        <p>
          Our Service may contain links to third-party websites including Google Cloud, Telegram, and WhatsApp. We are not responsible for the content or practices of these external sites.
        </p>

        <h2>8. Advertisements</h2>
        <p>
          The Service may display advertisements provided by third-party advertising networks, including Google AdSense. These advertisements may use cookies and similar technologies to serve relevant ads.
        </p>

        <h2>9. Modifications to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the Service constitutes acceptance of the modified Terms.
        </p>

        <h2>10. Termination</h2>
        <p>
          We may terminate or suspend access to our Service immediately, without prior notice, for any reason, including breach of these Terms.
        </p>

        <h2>11. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
        </p>

        <h2>12. Contact Information</h2>
        <p>
          If you have questions about these Terms, please visit our Contact page or reach out through our community channels.
        </p>
      </div>
    </div>
  );
}
