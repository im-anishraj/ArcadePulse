// ============================================
// ArcadeCalc — Constants, Formulas & Thresholds
// ALL point values, tier thresholds, milestone
// requirements live here for easy modification.
// ============================================

import { Tier, Milestone, BadgeCategory, BadgeCategoryType } from './types';

// ── Point Values per Badge Category ──────────
export const POINTS_PER_BADGE: Record<BadgeCategoryType, number> = {
  skill: 1,
  base_camp: 0,
  level: 0,
  certification: 0,
  special: 2,
  trivia: 1,
  lab_free: 0,
  work_meets_play: 0,
  unknown: 0,
  game: 1,
};

// ── Swag Tier Thresholds ─────────────────────
export const SWAG_TIERS: Tier[] = [
  {
    name: 'Arcade Novice',
    pointsRequired: 25,
    description: 'Begin your Arcade journey',
    imageKey: 'novice',
  },
  {
    name: 'Arcade Trooper',
    pointsRequired: 45,
    description: 'Rising through the ranks',
    imageKey: 'trooper',
  },
  {
    name: 'Arcade Ranger',
    pointsRequired: 65,
    description: 'Veteran cloud explorer',
    imageKey: 'ranger',
  },
  {
    name: 'Arcade Champion',
    pointsRequired: 75,
    description: 'Elite achiever',
    imageKey: 'champion',
  },
  {
    name: 'Arcade Legend',
    pointsRequired: 95,
    description: 'The pinnacle of mastery',
    imageKey: 'legend',
  },
];

// ── Facilitator Program Milestones ───────────
export const MILESTONES: Milestone[] = [
  {
    name: 'Milestone 1',
    level: 1,
    requirements: { games: 6, trivia: 5, skillBadges: 14, labFree: 6 },
    bonusPoints: 2,
    specialGameNote:
      'If out of the 6 games, you complete 1 special game, you earn 19 Arcade points + 2 bonus points.',
  },
  {
    name: 'Milestone 2',
    level: 2,
    requirements: { games: 8, trivia: 6, skillBadges: 28, labFree: 12 },
    bonusPoints: 8,
    specialGameNote:
      'If out of the 6 games, you complete 1 special game, you earn 29 Arcade points + 8 bonus points.',
  },
  {
    name: 'Milestone 3',
    level: 3,
    requirements: { games: 10, trivia: 7, skillBadges: 38, labFree: 18 },
    bonusPoints: 15,
    specialGameNote:
      'If out of the 8 games, you complete 1 special game, you earn 37 Arcade points + 15 bonus points.',
  },
  {
    name: 'Ultimate Milestone',
    level: 4,
    requirements: { games: 12, trivia: 8, skillBadges: 52, labFree: 24 },
    bonusPoints: 25,
    specialGameNote:
      'If out of the 10 games, you complete 1 special game, you earn 47 Arcade points + 25 bonus points.',
  },
];

// ── Badge Category Definitions ───────────────
export const BADGE_CATEGORIES: Omit<BadgeCategory, 'count' | 'points'>[] = [
  { key: 'skill', label: 'Skill Badges', icon: '🏆' },
  { key: 'base_camp', label: 'Base Camp Badges', icon: '🏆' },
  { key: 'level', label: 'Level Badges', icon: '🏆' },
  { key: 'certification', label: 'Certification Badges', icon: '🏆' },
  { key: 'special', label: 'Special Badges', icon: '🏆' },
  { key: 'trivia', label: 'Trivia Badges', icon: '🏆' },
  { key: 'lab_free', label: 'Lab Free Badges', icon: '🏆' },
  { key: 'work_meets_play', label: 'Work Meets Play', icon: 'ℹ️' },
  { key: 'unknown', label: 'Unknown Badges', icon: 'ℹ️' },
];

// ── Navigation Links ─────────────────────────
export const NAV_LINKS = [
  { label: 'Home', href: '/', icon: 'Home' },
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Leaderboard', href: '/leaderboard', icon: 'BarChart3' },
  { label: 'Arcade Facilitator', href: '/resources/arcade-facilitator-program', icon: 'Gamepad2' },
  { label: 'Resources', href: '/resources', icon: 'Sparkles' },
];

// ── Footer Links ─────────────────────────────
export const QUICK_LINKS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'Resources', href: '/resources' },
];

export const COMMUNITY_LINKS = [
  { label: 'Telegram Community', href: 'https://t.me/arcadecalc01' },
  { label: 'Google Cloud Community', href: 'https://www.googlecloudcommunity.com/gc/Learning-Forums/bd-p/cloud-learning-certification' },
  { label: 'Official Arcade', href: 'https://go.cloudskillsboost.google/arcade' },
];

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// ── Stats for Homepage ───────────────────────
export const SITE_STATS = [
  { label: 'Total Visitors', sublabel: 'Engaged with the program', value: 50000 },
  { label: 'Profiles Analyzed', sublabel: 'All analysis attempts', value: 35000 },
  { label: 'Unique Profiles', sublabel: 'Distinct user profiles', value: 20000 },
  { label: 'Repeat Analysis', sublabel: 'Users refining progress', value: 15000 },
];

// ── Feature Cards ────────────────────────────
export const FEATURES = [
  {
    title: 'Instant Arcade Points Calculation',
    description: 'Effortlessly calculate your Google Cloud Arcade points from your SkillBoost profile. Stay updated and maximize your rewards with real-time computation.',
    icon: 'Calculator',
  },
  {
    title: 'Progress & Achievements Timeline',
    description: 'Visualize your journey with a beautiful timeline of completed challenges, badges, and milestones. Never lose track of your arcade progress!',
    icon: 'TrendingUp',
  },
  {
    title: 'Multi-Account Dashboard',
    description: 'Manage and compare multiple Google Cloud Arcade accounts in one place. Seamlessly switch profiles and monitor all your stats at a glance.',
    icon: 'Users',
  },
  {
    title: 'Live Leaderboards & Events',
    description: 'Stay ahead with real-time leaderboard rankings and event updates. Compete, climb, and celebrate your wins instantly.',
    icon: 'Trophy',
  },
  {
    title: 'Elegant, Intuitive Interface',
    description: 'Enjoy a modern, distraction-free dashboard designed for clarity and ease of use. Navigate your arcade journey with style.',
    icon: 'Layout',
  },
  {
    title: 'Unlock Exclusive Rewards',
    description: 'Compete for top spots and unlock special rewards from the Arcade team. Your achievements deserve to be celebrated!',
    icon: 'Gift',
  },
];

// ── How to Join Steps ────────────────────────
export const HOW_TO_JOIN_STEPS = [
  {
    step: 1,
    title: 'Create Your Google Cloud Arcade Account',
    description: 'Sign up on Cloud Skills Boost with your Gmail account.',
    link: 'https://www.cloudskillsboost.google/users/sign_up',
  },
  {
    step: 2,
    title: 'Subscribe to Google Cloud Arcade Program',
    description: 'Subscribe to the official Arcade program to unlock challenges.',
    link: 'https://forms.gle/2h6xCvY3sW29pw4p7',
  },
  {
    step: 3,
    title: 'Start Learning & Earning Arcade Points',
    description: 'Complete labs and quests to earn arcade points.',
    link: 'https://go.cloudskillsboost.google/arcade',
  },
  {
    step: 4,
    title: 'Track Your Arcade Points Progress',
    description: 'Monitor your points and achievements with ArcadeCalc.',
    link: '/dashboard',
  },
];
