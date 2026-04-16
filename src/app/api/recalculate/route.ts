import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { scrapeProfileWithRules, ArcadeRule } from '@/lib/scraper';

export async function POST() {
  try {
    // 1. Fetch Active Rules
    const { data: activeRules, error: rulesError } = await supabase
      .from('arcade_rules')
      .select('*')
      .eq('active_status', true);

    if (rulesError || !activeRules) {
      return NextResponse.json({ error: 'Failed to retrieve rules.' }, { status: 500 });
    }

    // 2. Fetch all profiles from Supabase
    // Note: In production with 10k users, this requires edge function chunking or Vercel trigger.
    const { data: profiles, error: getErr } = await supabase.from('profiles').select('gcsb_profile_url');
    if (getErr || !profiles) {
      return NextResponse.json({ error: 'Unable to fetch profiles.' }, { status: 500 });
    }

    let processedCount = 0;

    // Process recalculation for all profiles (we could use cached HTML if large scale, but here we just re-sync)
    // To prevent Vercel 10s timeout, limit to first 100 for MVP
    const subset = profiles.slice(0, 100);

    // Using a simple loop. For production, send to a queue.
    for (const p of subset) {
      try {
        const url = p.gcsb_profile_url;
        // Check cache first to avoid re-fetching HTML if we have it recently
        // But we actually need to apply NEW RULES to the cache. Unfortuantely, `scrapedProfileWithRules` 
        // accesses raw URL. So we'll just execute scrape again.
        
        const scrapedResult = await scrapeProfileWithRules(url, activeRules as ArcadeRule[]);
        if (scrapedResult) {
          await supabase.from('profiles').upsert({
            gcsb_profile_url: url,
            username: scrapedResult.username,
            avatar_url: scrapedResult.avatarUrl,
            total_points: scrapedResult.totalPoints,
            confidence_score: scrapedResult.confidenceScore,
            last_synced_at: new Date().toISOString(),
          }, { onConflict: 'gcsb_profile_url' });
          processedCount++;
        }
      } catch (e) {
        console.error('Failed processing profile:', p.gcsb_profile_url, e);
      }
    }

    return NextResponse.json({ success: true, updated: processedCount });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
