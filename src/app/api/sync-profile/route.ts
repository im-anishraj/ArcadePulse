import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { scrapeProfileWithRules, ArcadeRule } from '@/lib/scraper';

export async function POST(request: Request) {
  try {
    const { profileUrl } = await request.json();
    const urlParams = new URL(request.url);
    const isDebug = urlParams.searchParams.get('debug') === 'true';

    if (!profileUrl) {
      return NextResponse.json({ error: 'Profile URL is required' }, { status: 400 });
    }

    // 1. Fetch Active Rules from DB
    const { data: activeRules, error: rulesError } = await supabase
      .from('arcade_rules')
      .select('*')
      .eq('active_status', true);

    if (rulesError || !activeRules) {
      return NextResponse.json({ error: 'Failed to retrieve scoring engine rules.' }, { status: 500 });
    }

    // Skip cache if debug is true
    if (!isDebug) {
      const { data: cached } = await supabase
        .from('cached_profiles')
        .select('*')
        .eq('gcsb_profile_url', profileUrl)
        .single();

      if (cached && new Date(cached.expires_at) > new Date()) {
        return NextResponse.json({
          cached: true,
          data: cached.parsed_data,
          profile_url: profileUrl,
        });
      }
    }

    // 2. Scrape with Rules Engine
    const scrapedResult = await scrapeProfileWithRules(profileUrl, activeRules as ArcadeRule[]);

    if (!scrapedResult) {
      if (!isDebug) {
        await supabase.from('sync_logs').insert({
          profile_url: profileUrl,
          status: 'failed',
          error_message: 'Failed to scrape profile',
        });
      }
      return NextResponse.json({ error: 'Failed to scrape profile. The DOM might have changed.' }, { status: 500 });
    }

    // 3. Track unknown badges asynchronously for admin queue
    if (!isDebug && scrapedResult.skippedBadges.length > 0) {
      for (const skipped of scrapedResult.skippedBadges) {
        // Attempt to log unknown badge, disregard failure
        supabase.from('unknown_badges').select('id, times_seen').eq('badge_name', skipped).single()
          .then(({ data }) => {
            if (data) {
              supabase.from('unknown_badges').update({ 
                times_seen: data.times_seen + 1, 
                last_seen_at: new Date().toISOString() 
              }).eq('id', data.id).then();
            } else {
              supabase.from('unknown_badges').insert({ badge_name: skipped }).then();
            }
          });
      }
    }

    // 4. Return Output
    if (!isDebug) {
      // Cache results
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 12);
      
      await supabase.from('cached_profiles').upsert({
        gcsb_profile_url: profileUrl,
        parsed_data: scrapedResult as any,
        expires_at: expiresAt.toISOString(),
      }, { onConflict: 'gcsb_profile_url' });

      // Update Public Leaderboard Profile Stats
      const { data: profile, error: profileErr } = await supabase.from('profiles').upsert({
        gcsb_profile_url: profileUrl,
        username: scrapedResult.username,
        avatar_url: scrapedResult.avatarUrl,
        total_points: scrapedResult.totalPoints,
        confidence_score: scrapedResult.confidenceScore,
        last_synced_at: new Date().toISOString(),
      }, { onConflict: 'gcsb_profile_url' }).select().single();

      if (profileErr) {
        console.error('Error upserting profile:', profileErr);
      }

      await supabase.from('sync_logs').insert({
        profile_url: profileUrl,
        status: 'success',
      });

      return NextResponse.json({
        cached: false,
        data: scrapedResult, // returns exact format requested
        profile: profile,
      });
    }

    // DEBUG UI returns raw output
    return NextResponse.json({
      cached: false,
      debug: true,
      data: scrapedResult
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
