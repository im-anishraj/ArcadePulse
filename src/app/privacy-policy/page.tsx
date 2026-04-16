import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | ArcadeCalc',
  description: 'Privacy Policy for ArcadeCalc — Arcade Points Calculator. Learn how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold mb-8 gradient-text">Privacy Policy</h1>
      <p className="text-xs text-[var(--text-muted)] mb-8">Last updated: January 13, 2026</p>

      <div className="legal-content">
        <h2>1. Introduction</h2>
        <p>
          Welcome to ArcadeCalc (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully.
        </p>

        <h2>2. Information We Collect</h2>
        <h3>2.1 Information You Provide</h3>
        <ul>
          <li>Google Cloud SkillBoost profile URLs you enter for calculation</li>
          <li>Contact form submissions (name, email, message)</li>
          <li>Feedback submitted through external forms</li>
        </ul>

        <h3>2.2 Automatically Collected Information</h3>
        <ul>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Pages visited and time spent</li>
          <li>Referring website addresses</li>
          <li>Device identifiers</li>
        </ul>

        <h3>2.3 Local Storage</h3>
        <p>
          We use browser localStorage to save your profile data locally on your device. This data never leaves your browser and is not transmitted to our servers. You can clear this data at any time through your browser settings.
        </p>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To calculate and display your Arcade points</li>
          <li>To provide and maintain our service</li>
          <li>To improve user experience</li>
          <li>To respond to your inquiries</li>
          <li>To display relevant advertisements</li>
          <li>To analyze usage trends</li>
        </ul>

        <h2>4. Third-Party Services</h2>
        <h3>4.1 Google AdSense</h3>
        <p>
          We use Google AdSense to display advertisements. Google AdSense uses cookies and similar technologies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting Google&apos;s Ads Settings.
        </p>

        <h3>4.2 Google Analytics</h3>
        <p>
          We may use Google Analytics to understand how visitors interact with our website. This service collects anonymous data about page views, session durations, and user demographics.
        </p>

        <h2>5. Cookies</h2>
        <p>
          Our website uses cookies and similar tracking technologies. These include essential cookies for site functionality and third-party cookies for advertising and analytics. You can control cookie settings through your browser preferences.
        </p>

        <h2>6. Data Security</h2>
        <p>
          We implement appropriate technical and organizational security measures to protect your data. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2>7. Children&apos;s Privacy</h2>
        <p>
          Our service is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13.
        </p>

        <h2>8. Your Rights</h2>
        <ul>
          <li>Access your personal data stored locally</li>
          <li>Delete your data by clearing browser localStorage</li>
          <li>Opt out of personalized advertising</li>
          <li>Contact us with any privacy concerns</li>
        </ul>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us through our Contact page or via our Telegram community.
        </p>
      </div>
    </div>
  );
}
