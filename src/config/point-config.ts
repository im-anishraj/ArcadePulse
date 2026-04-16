export interface PointRule {
  type: string;
  match: (badgeTitle: string) => boolean;
  points: number;
}

/**
 * Arcade Points Mapping Rules
 * 
 * Rules are evaluated in top-down order. The first rule to match returns its points.
 * Adjust these values based on the exact current Arcade season rules.
 */
export const pointRules: PointRule[] = [
  {
    type: 'Trivia',
    match: (title) => title.toLowerCase().includes('trivia'),
    points: 1, // Example: Trivia badges are worth 1 point
  },
  {
    type: 'Skill Badge',
    match: (title) => title.toLowerCase().includes('skill badge'),
    points: 0.5, // Example: Skill Badges are worth 0.5 points
  },
  {
    type: 'Level',
    match: (title) => title.toLowerCase().includes('level'),
    points: 0, // Assuming Level badges (GenAIus Heroes etc) don't give arcade points directly
  },
  {
    type: 'Prompt Engineering',
    match: (title) => title.toLowerCase().includes('prompt engineering'),
    points: 1, 
  },
  {
    type: 'Default',
    match: () => true, // Fallback rule applies to anything that didn't match above
    points: 0, // Unrecognized badges give 0 points by default to avoid inflating score
  }
];

export function calculateBadgePoints(badgeTitle: string): { type: string; points: number } {
  for (const rule of pointRules) {
    if (rule.match(badgeTitle)) {
      return { type: rule.type, points: rule.points };
    }
  }
  return { type: 'Unknown', points: 0 };
}
