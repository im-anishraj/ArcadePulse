// ============================================
// ArcadeCalc — Mock Data
// Sample leaderboard entries and badge data
// for demo/development purposes.
// ============================================

import { LeaderboardEntry, Badge, ResourceCard } from './types';

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Sushan Shetty', points: 88, avatarColor: '#ec4899', initial: 'S' },
  { rank: 2, name: 'Siva Tummala', points: 83, avatarColor: '#06b6d4', initial: 'S' },
  { rank: 3, name: 'ranjit shrestha', points: 82, avatarColor: '#a855f7', initial: 'R' },
  { rank: 4, name: 'Aakash GOOGLEUSER', points: 81.5, avatarColor: '#22c55e', initial: 'A' },
  { rank: 5, name: 'Abhishek Chauhan', points: 79, avatarColor: '#f59e0b', initial: 'A' },
  { rank: 6, name: 'ABHISHEK SHARMA', points: 77.5, avatarColor: '#ef4444', initial: 'A' },
  { rank: 7, name: 'Sumit Kumar', points: 76.5, avatarColor: '#3b82f6', initial: 'S' },
  { rank: 8, name: 'NADUPURU NARASIMHANAIDU', points: 76, avatarColor: '#8b5cf6', initial: 'N' },
  { rank: 9, name: 'Priya Sharma', points: 74, avatarColor: '#10b981', initial: 'P' },
  { rank: 10, name: 'Rahul Verma', points: 72.5, avatarColor: '#f97316', initial: 'R' },
  { rank: 11, name: 'Deepika Patel', points: 71, avatarColor: '#06b6d4', initial: 'D' },
  { rank: 12, name: 'Vikram Singh', points: 69.5, avatarColor: '#ec4899', initial: 'V' },
  { rank: 13, name: 'Ananya Gupta', points: 68, avatarColor: '#a855f7', initial: 'A' },
  { rank: 14, name: 'Mohit Agarwal', points: 66.5, avatarColor: '#22c55e', initial: 'M' },
  { rank: 15, name: 'Sneha Reddy', points: 65, avatarColor: '#f59e0b', initial: 'S' },
];

export const MOCK_INCOMPLETE_BADGES: Badge[] = [
  {
    id: 'inc-1',
    title: 'The Arcade Speedrun',
    description: 'Complete the Arcade Speedrun challenge',
    category: 'game',
    completed: false,
    imageUrl: '/badges/game-1.png',
  },
  {
    id: 'inc-2',
    title: 'The Arcade Certification Zone',
    description: 'Earn your certification through the Arcade',
    category: 'game',
    completed: false,
    imageUrl: '/badges/game-2.png',
  },
  {
    id: 'inc-3',
    title: 'Level 1: Cloud Infrastructure',
    description: 'Master cloud infrastructure basics',
    category: 'game',
    completed: false,
    imageUrl: '/badges/game-3.png',
  },
  {
    id: 'inc-4',
    title: 'Level 2: Data Analytics',
    description: 'Excel in data analytics',
    category: 'game',
    completed: false,
    imageUrl: '/badges/game-4.png',
  },
  {
    id: 'inc-5',
    title: 'Level 3: GenAI',
    description: 'Master Generative AI concepts',
    category: 'game',
    completed: false,
    imageUrl: '/badges/game-5.png',
  },
  {
    id: 'inc-6',
    title: 'Level 4: Security',
    description: 'Become a security expert',
    category: 'game',
    completed: false,
    imageUrl: '/badges/game-6.png',
  },
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `inc-skill-${i}`,
    title: `Skill Badge ${i + 1}: Cloud Fundamentals`,
    description: `Master cloud fundamentals module ${i + 1}`,
    category: 'skill' as const,
    completed: false,
  })),
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `inc-trivia-${i}`,
    title: `Trivia Challenge ${i + 1}`,
    description: `Test your knowledge in module ${i + 1}`,
    category: 'trivia' as const,
    completed: false,
  })),
];

export const MOCK_WEEKLY_DATA = [
  { day: 'Sunday', badges: 0 },
  { day: 'Monday', badges: 0 },
  { day: 'Tuesday', badges: 0 },
  { day: 'Wednesday', badges: 0 },
  { day: 'Thursday', badges: 0 },
  { day: 'Friday', badges: 0 },
  { day: 'Saturday', badges: 0 },
];

export const RESOURCE_CARDS: ResourceCard[] = [
  {
    title: 'Google Cloud Study Jams 2025',
    description: 'Get an overview of your Study Jam journey: track badge completion, see your progress against the campaign goals, and watch your climb on the exclusive leaderboard.',
    link: '/resources/study-jams-program',
    linkText: 'Explore Now →',
  },
  {
    title: 'Arcade Facilitator Program',
    description: 'Join the Arcade Facilitator Program under my guidance to earn bonus points, enhance your Google Cloud skills, and get exclusive learning opportunities.',
    link: '/resources/arcade-facilitator-program',
    linkText: 'Join Now →',
  },
  {
    title: 'Join Our Arcade Telegram Community!',
    description: 'Connect with fellow Arcade enthusiasts, discuss strategies, and stay updated on the latest news. Join us now!',
    link: 'https://t.me/arcadecalc01',
    linkText: 'Join Now →',
  },
  {
    title: "Why Some Badges Don't Count Towards Your Score",
    description: "Understand why certain badges, like those limited to the first 50 users, don't appear in your Arcade points.",
    link: '/resources/non-trackable-badges',
    linkText: 'Read More →',
  },
  {
    title: 'How to find your public profile URL',
    description: 'Learn how to locate and share your public profile URL in Google Cloud Skills Boost to track progress.',
    link: '/resources/find-your-public-url',
    linkText: 'Read More →',
  },
  {
    title: 'How to enable Check my progress',
    description: 'To access the progress tracking feature, similar to Skill Badges, in Google Arcade and Trivia, please refer to the guides provided.',
    link: '/resources/enable-check-my-progress',
    linkText: 'Read More →',
  },
];
