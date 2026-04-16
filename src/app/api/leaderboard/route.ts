import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const { data: leaderboard, error } = await supabase
      .from('profiles')
      .select('id, username, avatar_url, total_points, rank, gcsb_profile_url, last_synced_at')
      .order('total_points', { ascending: false })
      .limit(100);

    if (error) {
      throw error;
    }

    // Generate dynamic ranks if needed or use stored rank
    const rankedData = leaderboard.map((user, index) => ({
      ...user,
      current_rank: index + 1,
    }));

    return NextResponse.json({
      leaderboard: rankedData,
      updated_at: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error('API Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
