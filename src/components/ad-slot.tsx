'use client';

import { AdSlotProps } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * Reusable AdSlot component — CLS-safe ad placement.
 * Currently renders a placeholder. When AdSense is approved,
 * replace the inner div with your <ins class="adsbygoogle"> tag.
 *
 * Props:
 *  - slot: unique identifier for this ad position
 *  - format: 'horizontal' | 'rectangle' | 'vertical' | 'responsive'
 *  - minHeight: reserved height in px for CLS safety
 *  - hideOnMobile: if true, hides on screens < 768px
 *  - className: additional classNames
 */
export default function AdSlot({
  slot,
  format,
  minHeight,
  hideOnMobile = false,
  className,
}: AdSlotProps) {
  return (
    <div
      data-ad-slot={slot}
      data-ad-format={format}
      className={cn(
        'ad-slot',
        hideOnMobile ? 'hide-mobile' : '',
        className
      )}
      style={{ minHeight: `${minHeight}px` }}
      aria-hidden="true"
    >
      {/* ── Replace this placeholder with real AdSense code ── */}
      {/* 
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format={format === 'responsive' ? 'auto' : undefined}
          data-full-width-responsive="true"
        />
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      */}
      <span className="ad-slot-label">Advertisement</span>
    </div>
  );
}
