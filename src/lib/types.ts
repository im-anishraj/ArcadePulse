// ============================================
// ArcadeCalc — Core Type Definitions
// ============================================

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  memberSince: number; // year
  profileUrl: string;
  league: string;
  badges: Badge[];
  totalPoints: number;
  leaderboardRank: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  category: BadgeCategoryType;
  imageUrl?: string;
  earnedDate?: string;
  completed: boolean;
}

export type BadgeCategoryType =
  | 'skill'
  | 'base_camp'
  | 'level'
  | 'certification'
  | 'special'
  | 'trivia'
  | 'lab_free'
  | 'work_meets_play'
  | 'unknown'
  | 'game';

export interface BadgeCategory {
  key: BadgeCategoryType;
  label: string;
  icon: string;
  count: number;
  points: number;
}

export interface Tier {
  name: string;
  pointsRequired: number;
  description: string;
  imageKey: string;
}

export interface Milestone {
  name: string;
  level: number;
  requirements: {
    games: number;
    trivia: number;
    skillBadges: number;
    labFree: number;
  };
  bonusPoints: number;
  specialGameNote: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  avatarUrl?: string;
  avatarColor?: string;
  initial?: string;
}

export interface ProfileStats {
  arcadePoints: number;
  leaderboardRank: number;
  totalBadges: number;
}

export interface WeeklyData {
  day: string;
  badges: number;
}

export interface ResourceCard {
  title: string;
  description: string;
  link: string;
  linkText: string;
  icon?: string;
}

export type AdFormat = 'horizontal' | 'rectangle' | 'vertical' | 'responsive';

export interface AdSlotProps {
  slot: string;
  format: AdFormat;
  minHeight: number;
  hideOnMobile?: boolean;
  className?: string;
}
