import * as cheerio from 'cheerio';

export interface ArcadeRule {
  season_name: string;
  badge_name: string;
  category: string;
  exact_points: number;
  is_official?: boolean;
}

export interface ScoredBadge {
  title: string;
  points: number;
  category: string;
  isOfficial: boolean;
}

export interface ScrapedProfileResult {
  username: string;
  avatarUrl: string;
  scoredBadges: ScoredBadge[];
  skippedBadges: string[];
  totalPoints: number;
  totalBadges: number;
  confidenceScore: number;
  seasonUsed: string;
}

export async function scrapeProfileWithRules(
  profileUrl: string, 
  activeRules: ArcadeRule[]
): Promise<ScrapedProfileResult | null> {
  try {
    const res = await fetch(profileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'cache-control': 'no-cache'
      },
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);

    const html = await res.text();
    const $ = cheerio.load(html);

    const username = $('h1.ql-headline-1').text().trim() || $('h1').first().text().trim();
    const avatarUrl = $('.avatar-image').attr('src') || '';

    const scoredBadges: ScoredBadge[] = [];
    const skippedBadges: string[] = [];
    const seenTitles = new Set<string>();

    const ruleMap = new Map<string, ArcadeRule>();
    activeRules.forEach(rule => {
      ruleMap.set(rule.badge_name.toLowerCase(), rule);
    });

    const activeSeasonName = activeRules.length > 0 ? activeRules[0].season_name : 'No Active Season';

    const elements = $('.ql-title-medium, .profile-badge-title, .badge-title');
    
    elements.each((_, el) => {
      const title = $(el).text().trim();
      if (title && !seenTitles.has(title)) {
        seenTitles.add(title);
        
        const lowerTitle = title.toLowerCase();
        
        // 1. Check Exact Match
        if (ruleMap.has(lowerTitle)) {
          const rule = ruleMap.get(lowerTitle)!;
          scoredBadges.push({
            title,
            points: Number(rule.exact_points),
            category: rule.category,
            isOfficial: !!rule.is_official
          });
        } 
        // 2. Wildcard Check for specific wildcard rules (like SKILL_BADGE)
        else if (lowerTitle.includes('skill badge') && ruleMap.has('skill_badge')) {
           const rule = ruleMap.get('skill_badge')!;
           scoredBadges.push({
             title,
             points: Number(rule.exact_points),
             category: 'SKILL_BADGE',
             isOfficial: !!rule.is_official
           });
        }
        else {
          skippedBadges.push(title);
        }
      }
    });

    const totalPoints = scoredBadges.reduce((sum, b) => sum + b.points, 0);
    const totalBadgesFound = scoredBadges.length + skippedBadges.length;
    
    // Confidence Weighting: Official Match = 100%, Community Match = 80%, Unknown = 0%
    let confidencePoints = 0;
    for (const b of scoredBadges) {
      confidencePoints += b.isOfficial ? 1.0 : 0.8;
    }

    const confidenceScore = totalBadgesFound === 0 ? 0 : 
      Math.round((confidencePoints / totalBadgesFound) * 1000) / 10;

    return {
      username: username || 'Unknown User',
      avatarUrl,
      scoredBadges,
      skippedBadges,
      totalPoints,
      totalBadges: totalBadgesFound,
      confidenceScore,
      seasonUsed: activeSeasonName
    };
  } catch (error) {
    console.error('Error in scrapeProfileWithRules:', error);
    return null;
  }
}
