import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract params
    const username = searchParams.get('user') || 'Cloud Skiller';
    const points = searchParams.get('points') || '0';
    const rank = searchParams.get('rank');
    const confidence = searchParams.get('conf') || '100';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
            backgroundImage: 'linear-gradient(to bottom right, #000000, #09090b)',
            fontFamily: 'sans-serif',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle grid background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.1,
              backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(24, 24, 27, 0.8)',
              border: '2px solid #27272a',
              borderRadius: '24px',
              padding: '60px 80px',
              boxShadow: '0 0 80px rgba(34, 211, 238, 0.1)',
            }}
          >
            <h2 style={{ fontSize: 32, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: 4, margin: 0, marginBottom: 20 }}>
              ArcadePulse Stats
            </h2>
            
            <h1 style={{ fontSize: 72, color: '#ffffff', fontWeight: 900, margin: 0, marginBottom: 40 }}>
              {username}
            </h1>

            <div style={{ display: 'flex', gap: '40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: 24, color: '#71717a', marginBottom: 10 }}>Total Points</span>
                <span style={{ fontSize: 96, color: '#22d3ee', fontWeight: 900, lineHeight: 1 }}>{points}</span>
              </div>
              
              {rank && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: 24, color: '#71717a', marginBottom: 10 }}>Global Rank</span>
                  <span style={{ fontSize: 96, color: '#a78bfa', fontWeight: 900, lineHeight: 1 }}>#{rank}</span>
                </div>
              )}
            </div>

            <p style={{ color: '#52525b', fontSize: 24, marginTop: 50, marginBottom: 0 }}>
              Accuracy Confidence: {confidence}% (Real-time verified)
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.log(e instanceof Error ? e.message : 'Unknown error');
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
