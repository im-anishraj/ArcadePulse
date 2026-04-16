import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import CommunityModal from '@/components/community-modal';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Arcade Points Calculator | Calculate Google Cloud Arcade Points & Track Progress',
  description:
    'Easily calculate your Google Cloud Arcade points with the Arcade Points Calculator. Track your progress, predict rewards, and optimize your journey using our trusted and accurate tool — used and trusted by over 50,000 users.',
  keywords: ['Google Cloud', 'Arcade', 'Points Calculator', 'SkillBoost', 'Badges', 'Cloud Skills'],
  openGraph: {
    title: 'Arcade Points Calculator | ArcadeCalc',
    description: 'Calculate Google Cloud Arcade Points & Track Progress',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ── AdSense Script (uncomment when approved) ──
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
        */}
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CommunityModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
