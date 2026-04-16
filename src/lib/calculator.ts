// ============================================
// ArcadeCalc — Point Calculation Engine
// Core business logic for computing points,
// determining tiers, and checking milestones.
// ============================================

import { Badge, BadgeCategoryType, BadgeCategory, Tier } from './types';
import { POINTS_PER_BADGE, SWAG_TIERS, MILESTONES, BADGE_CATEGORIES } from './constants';

/**
 * Calculate total arcade points from a list of badges.
 */
export function calculateTotalPoints(badges: Badge[]): number {
  return badges.reduce((total, badge) => {
    if (!badge.completed) return total;
    return total + (POINTS_PER_BADGE[badge.category] || 0);
  }, 0);
}

/**
 * Count badges by category.
 */
export function countBadgesByCategory(badges: Badge[]): BadgeCategory[] {
  const counts: Record<BadgeCategoryType, { count: number; points: number }> = {
    skill: { count: 0, points: 0 },
    base_camp: { count: 0, points: 0 },
    level: { count: 0, points: 0 },
    certification: { count: 0, points: 0 },
    special: { count: 0, points: 0 },
    trivia: { count: 0, points: 0 },
    lab_free: { count: 0, points: 0 },
    work_meets_play: { count: 0, points: 0 },
    unknown: { count: 0, points: 0 },
    game: { count: 0, points: 0 },
  };

  badges.forEach((badge) => {
    if (badge.completed) {
      const cat = badge.category || 'unknown';
      counts[cat].count++;
      counts[cat].points += POINTS_PER_BADGE[cat] || 0;
    }
  });

  return BADGE_CATEGORIES.map((def) => ({
    ...def,
    count: counts[def.key].count,
    points: counts[def.key].points,
  }));
}

/**
 * Determine current swag tier based on points.
 */
export function getCurrentTier(points: number): Tier | null {
  const sortedTiers = [...SWAG_TIERS].sort((a, b) => b.pointsRequired - a.pointsRequired);
  return sortedTiers.find((tier) => points >= tier.pointsRequired) || null;
}

/**
 * Get the next tier the user needs to reach.
 */
export function getNextTier(points: number): Tier | null {
  return SWAG_TIERS.find((tier) => points < tier.pointsRequired) || null;
}

/**
 * Calculate progress percentage toward each tier, returning 0-100.
 */
export function getTierProgress(points: number, tierPointsRequired: number): number {
  if (points >= tierPointsRequired) return 100;
  return Math.min(100, Math.round((points / tierPointsRequired) * 100));
}

/**
 * Check milestone completion against badge counts.
 */
export function checkMilestoneCompletion(
  gameBadges: number,
  triviaBadges: number,
  skillBadges: number,
  labFreeBadges: number
) {
  return MILESTONES.map((milestone) => {
    const { requirements } = milestone;
    const gamesComplete = gameBadges >= requirements.games;
    const triviaComplete = triviaBadges >= requirements.trivia;
    const skillComplete = skillBadges >= requirements.skillBadges;
    const labFreeComplete = labFreeBadges >= requirements.labFree;
    const allComplete = gamesComplete && triviaComplete && skillComplete && labFreeComplete;

    return {
      ...milestone,
      progress: {
        games: { current: Math.min(gameBadges, requirements.games), required: requirements.games, complete: gamesComplete },
        trivia: { current: Math.min(triviaBadges, requirements.trivia), required: requirements.trivia, complete: triviaComplete },
        skill: { current: Math.min(skillBadges, requirements.skillBadges), required: requirements.skillBadges, complete: skillComplete },
        labFree: { current: Math.min(labFreeBadges, requirements.labFree), required: requirements.labFree, complete: labFreeComplete },
      },
      complete: allComplete,
    };
  });
}

/**
 * Determine the league title based on points.
 */
export function getLeague(points: number): string {
  if (points >= 95) return 'Legend League';
  if (points >= 75) return 'Champion League';
  if (points >= 65) return 'Ranger League';
  if (points >= 45) return 'Trooper League';
  if (points >= 25) return 'Novice League';
  return 'Unknown League';
}

/**
 * Calculate "badges this season" (earned within the current quarter).
 */
export function getBadgesThisSeason(badges: Badge[]): number {
  const now = new Date();
  const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
  return badges.filter((b) => {
    if (!b.completed || !b.earnedDate) return false;
    return new Date(b.earnedDate) >= quarterStart;
  }).length;
}
