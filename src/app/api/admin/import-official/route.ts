import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST() {
  try {
    const activeSeason = "April 2026 Arcade";
    const newRules = [
      { season_name: activeSeason, badge_name: 'Skills Spawn APR 2026', category: 'GAME', exact_points: 7, is_official: true, active_status: true },
      { season_name: activeSeason, badge_name: 'Dialogue Design APR 2026', category: 'GAME', exact_points: 1, is_official: true, active_status: true },
      { season_name: activeSeason, badge_name: 'Arcade Adventure APR 2026', category: 'GAME', exact_points: 1, is_official: true, active_status: true },
      { season_name: activeSeason, badge_name: 'Arcade Trail APR 2026', category: 'GAME', exact_points: 1, is_official: true, active_status: true },
      { season_name: activeSeason, badge_name: 'Arcade Voyage APR 2026', category: 'GAME', exact_points: 1, is_official: true, active_status: true },
      { season_name: activeSeason, badge_name: 'Arcade Base Camp APR 2026', category: 'GAME', exact_points: 1, is_official: true, active_status: true },
      { season_name: activeSeason, badge_name: 'SKILL_BADGE', category: 'SKILL_BADGE', exact_points: 0.5, is_official: true, active_status: true, notes: "Special wildcard trigger" }
    ];

    // Deactivate previous official rules for this season just in case to avoid duplicates
    // But upsert handles it.
    await supabase.from('arcade_rules').upsert(newRules, { onConflict: 'season_name, badge_name' });

    return NextResponse.json({ success: true, count: newRules.length });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown exact error' }, { status: 500 });
  }
}
