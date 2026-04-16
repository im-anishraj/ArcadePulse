// ============================================
// ArcadeCalc — Profile URL Parser
// Validates and extracts data from Google Skills
// public profile URLs.
// ============================================

import { UserProfile, Badge, BadgeCategoryType } from './types';

const VALID_DOMAINS = [
  'www.cloudskillsboost.google',
  'cloudskillsboost.google',
  'www.skills.google',
  'skills.google',
];

/**
 * Validate if a URL is a valid Google Skills public profile URL.
 */
export function isValidProfileUrl(url: string): boolean {
  try {
    const parsed = new URL(url.trim());
    const isValidDomain = VALID_DOMAINS.some((d) => parsed.hostname === d);
    const isPublicProfile = parsed.pathname.includes('/public_profiles/') || parsed.pathname.includes('/profile/');
    return isValidDomain && isPublicProfile;
  } catch {
    return false;
  }
}

/**
 * Extract profile ID from the URL.
 */
export function extractProfileId(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    const segments = parsed.pathname.split('/').filter(Boolean);
    const profileIndex = segments.findIndex((s) => s === 'public_profiles' || s === 'profile');
    if (profileIndex >= 0 && segments[profileIndex + 1]) {
      return segments[profileIndex + 1];
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Classify a badge description into a category.
 */
function classifyBadge(title: string, description: string): BadgeCategoryType {
  const text = (title + ' ' + description).toLowerCase();

  if (text.includes('trivia')) return 'trivia';
  if (text.includes('arcade game') || text.includes('game on') || text.includes('the arcade')) return 'game';
  if (text.includes('skill badge') || text.includes('hands-on')) return 'skill';
  if (text.includes('base camp')) return 'base_camp';
  if (text.includes('certification') || text.includes('certified')) return 'certification';
  if (text.includes('level')) return 'level';
  if (text.includes('lab-free') || text.includes('lab free') || text.includes('no cost')) return 'lab_free';
  if (text.includes('work meets play')) return 'work_meets_play';
  if (text.includes('special')) return 'special';

  return 'unknown';
}

/**
 * Simulate fetching profile data.
 * In production, this would call an API that scrapes the public profile.
 * For now, returns mock data based on the profile ID provided.
 */
export async function fetchProfileData(profileUrl: string): Promise<UserProfile | null> {
  const profileId = extractProfileId(profileUrl);
  if (!profileId) return null;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Return simulated data for the demo
  // The specific profile URL provided by the user
  const isAnishProfile = profileId === '11b2ae1b-c527-4251-b441-29021768b510';

  const badgeData = isAnishProfile
    ? generateAnishBadges()
    : generateRandomBadges();

  const profile: UserProfile = {
    id: profileId,
    name: isAnishProfile ? 'Anish Raj' : `User ${profileId.slice(0, 6)}`,
    memberSince: isAnishProfile ? 2024 : 2023,
    profileUrl,
    league: 'Unknown League',
    badges: badgeData,
    totalPoints: 0,
    leaderboardRank: 0,
  };

  return profile;
}

function generateAnishBadges(): Badge[] {
  const badges: Badge[] = [];

  // Trivia badges (based on actual profile data)
  const triviaMonths = ['January Week 2', 'January Week 1', 'June Week 3', 'June Week 2', 'June Week 1', 'April Week 1', 'March Week 3', 'March Week 1'];
  triviaMonths.forEach((month, i) => {
    badges.push({
      id: `trivia-${i}`,
      title: `Arcade Trivia ${month}`,
      description: `Arcade Trivia for ${month}`,
      category: 'trivia',
      completed: true,
      earnedDate: '2024-06-15',
    });
  });

  // Skill badges
  const skillBadges = [
    'Prompt Engineering Guide',
    'Introduction to Generative AI',
    'Introduction to Responsible AI',
    'Cloud Skills Boost Credential',
    'Gen AI Apps Development',
  ];
  skillBadges.forEach((title, i) => {
    badges.push({
      id: `skill-${i}`,
      title,
      description: `Hands-on skill badge for ${title}`,
      category: 'skill',
      completed: true,
      earnedDate: '2024-05-20',
    });
  });

  return badges;
}

function generateRandomBadges(): Badge[] {
  const badges: Badge[] = [];
  const categories: BadgeCategoryType[] = ['skill', 'trivia', 'game', 'lab_free'];

  for (let i = 0; i < 8; i++) {
    badges.push({
      id: `random-${i}`,
      title: `Badge ${i + 1}`,
      description: `A sample ${categories[i % categories.length]} badge`,
      category: categories[i % categories.length],
      completed: true,
      earnedDate: '2024-03-10',
    });
  }

  return badges;
}
