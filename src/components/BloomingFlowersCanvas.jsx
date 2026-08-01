import React, { useState, useEffect, useMemo } from 'react';

/* =========================================================================
   CLEAN PAPER FLOWER SCULPTURE COMPONENTS
   Modern, editorial origami and layered cut-paper botanical relief geometries.
   Zero radial neon gradients. Zero clipart glow effects. Pure craftsmanship.
   ========================================================================= */

const OrigamiCamellia = ({ size = 160, variant = 'cream' }) => {
  const palette = {
    cream: { outer: '#F9F6F0', mid: '#EFEAE1', inner: '#E4DCD0', core: '#D4AF37' },
    blush: { outer: '#F2DFDD', mid: '#E8D0CE', inner: '#DCBDBA', core: '#C59A45' },
    taupe: { outer: '#EBE8E3', mid: '#DFDAD3', inner: '#D0C9C0', core: '#B89742' }
  }[variant] || { outer: '#F9F6F0', mid: '#EFEAE1', inner: '#E4DCD0', core: '#D4AF37' };

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ overflow: 'visible' }}>
      <defs>
        <filter id="paper-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.32" />
        </filter>
        <filter id="layer-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.22" />
        </filter>
      </defs>
      <g filter="url(#paper-shadow)">
        {/* Tier 3: Outer 8 Folded Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g key={`t3-${i}`} transform={`rotate(${angle} 60 60)`}>
            <polygon
              points="60,60 74,35 60,8 46,35"
              fill={palette.outer}
              stroke="#000000"
              strokeOpacity="0.06"
              strokeWidth="0.5"
            />
            {/* Center score crease line */}
            <line x1="60" y1="60" x2="60" y2="10" stroke="#000000" strokeOpacity="0.08" strokeWidth="0.8" />
            {/* Light facet highlight */}
            <polygon points="60,60 74,35 60,8" fill="#FFFFFF" fillOpacity="0.25" />
          </g>
        ))}
      </g>
      <g filter="url(#layer-shadow)">
        {/* Tier 2: Middle 8 Rotated Petals */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
          <g key={`t2-${i}`} transform={`rotate(${angle} 60 60)`}>
            <polygon
              points="60,60 71,40 60,18 49,40"
              fill={palette.mid}
              stroke="#000000"
              strokeOpacity="0.08"
              strokeWidth="0.5"
            />
            <line x1="60" y1="60" x2="60" y2="20" stroke="#000000" strokeOpacity="0.1" strokeWidth="0.8" />
            <polygon points="60,60 71,40 60,18" fill="#FFFFFF" fillOpacity="0.2" />
          </g>
        ))}
      </g>
      <g filter="url(#layer-shadow)">
        {/* Tier 1: Inner 6 Petals */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <g key={`t1-${i}`} transform={`rotate(${angle} 60 60)`}>
            <polygon
              points="60,60 68,46 60,28 52,46"
              fill={palette.inner}
              stroke="#000000"
              strokeOpacity="0.1"
              strokeWidth="0.5"
            />
            <polygon points="60,60 68,46 60,28" fill="#FFFFFF" fillOpacity="0.2" />
          </g>
        ))}
        {/* Origami geometric stamen center */}
        <polygon points="60,52 67,56 67,64 60,68 53,64 53,56" fill={palette.core} stroke="#000000" strokeOpacity="0.15" strokeWidth="0.5" />
        <polygon points="60,55 64,57.5 64,62.5 60,65 56,62.5 56,57.5" fill="#E5C35E" />
      </g>
    </svg>
  );
};

const PaperRose = ({ size = 150 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
    <g filter="drop-shadow(0px 6px 10px rgba(0,0,0,0.35))">
      {/* Outer spiral paper folds */}
      {[0, 72, 144, 216, 288].map((ang, i) => (
        <g key={`r1-${i}`} transform={`rotate(${ang} 50 50)`}>
          <path d="M 50 50 L 72 40 L 65 15 L 45 25 Z" fill="#F4EDE2" stroke="#000" strokeOpacity="0.06" strokeWidth="0.4" />
          <path d="M 50 50 L 72 40 L 65 15 Z" fill="#FFF" fillOpacity="0.3" />
        </g>
      ))}
    </g>
    <g filter="drop-shadow(0px 3px 5px rgba(0,0,0,0.25))">
      {/* Middle geometric folds */}
      {[36, 108, 180, 252, 324].map((ang, i) => (
        <g key={`r2-${i}`} transform={`rotate(${ang} 50 50)`}>
          <path d="M 50 50 L 66 42 L 58 22 L 42 32 Z" fill="#E8DDD0" stroke="#000" strokeOpacity="0.08" strokeWidth="0.4" />
          <path d="M 50 50 L 66 42 L 58 22 Z" fill="#FFF" fillOpacity="0.2" />
        </g>
      ))}
    </g>
    <g filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.2))">
      {/* Inner tight folds */}
      {[18, 90, 162, 234, 306].map((ang, i) => (
        <polygon key={`r3-${i}`} points="50,50 60,45 54,34 44,40" fill="#DCBDB6" stroke="#000" strokeOpacity="0.1" strokeWidth="0.4" transform={`rotate(${ang} 50 50)`} />
      ))}
      <polygon points="50,46 54,50 50,54 46,50" fill="#B28C84" />
    </g>
  </svg>
);

const OrigamiDahlia = ({ size = 140 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
    <g filter="drop-shadow(0px 5px 8px rgba(0,0,0,0.3))">
      {Array.from({ length: 12 }).map((_, i) => (
        <g key={`d1-${i}`} transform={`rotate(${i * 30} 50 50)`}>
          <polygon points="50,50 57,32 50,8 43,32" fill="#EAE5DC" stroke="#000" strokeOpacity="0.06" strokeWidth="0.4" />
          <line x1="50" y1="50" x2="50" y2="8" stroke="#000" strokeOpacity="0.08" strokeWidth="0.5" />
          <polygon points="50,50 57,32 50,8" fill="#FFF" fillOpacity="0.25" />
        </g>
      ))}
    </g>
    <g filter="drop-shadow(0px 3px 5px rgba(0,0,0,0.22))">
      {Array.from({ length: 12 }).map((_, i) => (
        <g key={`d2-${i}`} transform={`rotate(${i * 30 + 15} 50 50)`}>
          <polygon points="50,50 55,36 50,18 45,36" fill="#D8CEBD" stroke="#000" strokeOpacity="0.08" strokeWidth="0.4" />
          <line x1="50" y1="50" x2="50" y2="18" stroke="#000" strokeOpacity="0.1" strokeWidth="0.5" />
        </g>
      ))}
      <circle cx="50" cy="50" r="7" fill="#C5A059" />
      <polygon points="50,45 54,48 53,53 47,53 46,48" fill="#E2C17D" />
    </g>
  </svg>
);

const PleatedPaperFrond = ({ size = 180 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{ overflow: 'visible' }}>
    <g filter="drop-shadow(0px 8px 14px rgba(0,0,0,0.35))">
      {/* Central architectural stem */}
      <path d="M 10 110 Q 50 70 100 20" fill="none" stroke="#2B362B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Angled pleated leaf blades */}
      {[
        { x: 30, y: 90, len: 35, ang: -25 },
        { x: 42, y: 78, len: 42, ang: -20 },
        { x: 55, y: 65, len: 46, ang: -15 },
        { x: 68, y: 52, len: 42, ang: -10 },
        { x: 80, y: 40, len: 35, ang: -5 },
        { x: 90, y: 30, len: 25, ang: 0 },
      ].map((leaf, idx) => (
        <g key={idx}>
          {/* Left blade */}
          <polygon
            points={`${leaf.x},${leaf.y} ${leaf.x - 18},${leaf.y - leaf.len} ${leaf.x - 4},${leaf.y - leaf.len + 12}`}
            fill="#455445"
            stroke="#1F261F"
            strokeWidth="0.4"
            strokeOpacity="0.3"
          />
          {/* Right blade */}
          <polygon
            points={`${leaf.x},${leaf.y} ${leaf.x + leaf.len - 10},${leaf.y + 12} ${leaf.x + leaf.len - 22},${leaf.y + 2}`}
            fill="#3B473B"
            stroke="#1F261F"
            strokeWidth="0.4"
            strokeOpacity="0.3"
          />
        </g>
      ))}
    </g>
  </svg>
);

const FoldedMonstera = ({ size = 160 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
    <g filter="drop-shadow(0px 6px 12px rgba(0,0,0,0.38))">
      <path
        d="M 50 95 C 45 75, 15 65, 15 35 C 15 15, 40 5, 50 5 C 60 5, 85 15, 85 35 C 85 65, 55 75, 50 95 Z"
        fill="#364236"
        stroke="#1C221C"
        strokeWidth="0.5"
      />
      {/* Geometric architectural leaf splits */}
      <polygon points="15,40 32,45 18,52" fill="#0D0D11" />
      <polygon points="18,25 35,28 22,35" fill="#0D0D11" />
      <polygon points="85,40 68,45 82,52" fill="#0D0D11" />
      <polygon points="82,25 65,28 78,35" fill="#0D0D11" />
      {/* Center structural leaf fold crease */}
      <line x1="50" y1="95" x2="50" y2="10" stroke="#526152" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 50 95 C 45 75, 15 65, 15 35 C 15 15, 40 5, 50 5 Z" fill="#FFF" fillOpacity="0.08" />
    </g>
  </svg>
);

const COMPONENTS = [
  { Comp: OrigamiCamellia, variant: 'cream', sizeRange: [130, 180], type: 'flower' },
  { Comp: OrigamiCamellia, variant: 'blush', sizeRange: [120, 170], type: 'flower' },
  { Comp: OrigamiCamellia, variant: 'taupe', sizeRange: [110, 150], type: 'flower' },
  { Comp: PaperRose, variant: 'default', sizeRange: [120, 160], type: 'flower' },
  { Comp: OrigamiDahlia, variant: 'default', sizeRange: [130, 175], type: 'flower' },
  { Comp: PleatedPaperFrond, variant: 'default', sizeRange: [180, 260], type: 'foliage' },
  { Comp: FoldedMonstera, variant: 'default', sizeRange: [150, 220], type: 'foliage' }
];

/* =========================================================================
   EDITORIAL PAPER GARDEN TRANSITION
   Choreographed installation sweeping across the display with tactile weight
   and natural deceleration. Zero artificial glow, zero clutter.
   ========================================================================= */
export default function BloomingFlowersCanvas() {
  const [mounted, setMounted] = useState(false);

  // Generate an architectural arrangement that sweeps over the viewport
  const elements = useMemo(() => {
    const items = [];
    const count = 56; // Tailored count for clean, high-impact sculptural presence

    // Distribute elements along viewport boundaries and inward framing zones
    for (let i = 0; i < count; i++) {
      const template = COMPONENTS[i % COMPONENTS.length];
      const size = Math.floor(Math.random() * (template.sizeRange[1] - template.sizeRange[0])) + template.sizeRange[0];
      
      // Determine zone placement: framing borders + natural overlapping depth
      const angle = (i / count) * Math.PI * 2 + (Math.random() * 0.25 - 0.125);
      // Ensure elements cover both close framing (140px) and full peripheral span out to corners (850px)
      const dist = 140 + Math.pow(i / count, 0.8) * 700 + (Math.random() * 40 - 20);
      
      const targetX = Math.cos(angle) * dist;
      const targetY = Math.sin(angle) * dist * 0.95;

      // Calculate initial origin off-screen along the matching direction for a sweeping entry
      const originDist = dist + 600;
      const originX = Math.cos(angle) * originDist;
      const originY = Math.sin(angle) * originDist;

      // Elegant rotation that glides into place
      const targetRotation = Math.floor(Math.random() * 360);
      const originRotation = targetRotation + (i % 2 === 0 ? 45 : -45);

      // Natural staging: foliage enters first as background structure, then prominent flowers
      const baseDelay = template.type === 'foliage' ? Math.random() * 300 : 250 + Math.random() * 500;
      const duration = 2.2 + Math.random() * 0.8; // Graceful gallery-speed glide

      items.push({
        id: i,
        Component: template.Comp,
        variant: template.variant,
        size,
        targetX,
        targetY,
        originX,
        originY,
        targetRotation,
        originRotation,
        delay: Math.floor(baseDelay),
        duration,
        zIndex: Math.floor(dist)
      });
    }
    return items;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
      backgroundColor: '#0D0D11', // Deep velvety obsidian gallery background
      zIndex: 1
    }}>
      <style>{`
        .paper-sculpture {
          position: absolute;
          left: 50%;
          top: 50%;
          will-change: transform, opacity;
          pointer-events: none;
        }
      `}</style>

      {/* Subtle warm archival vignette to ground the paper shadows */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(30, 30, 38, 0.4) 0%, rgba(13, 13, 17, 0.95) 100%)',
        pointerEvents: 'none'
      }} />

      {elements.map((el) => {
        const { Component, variant, size, targetX, targetY, originX, originY, targetRotation, originRotation, delay, duration, zIndex } = el;
        return (
          <div
            key={el.id}
            className="paper-sculpture"
            style={{
              width: size,
              height: size,
              marginLeft: -(size / 2),
              marginTop: -(size / 2),
              zIndex,
              transform: mounted
                ? `translate3d(${targetX}px, ${targetY}px, 0px) rotate(${targetRotation}deg) scale(1)`
                : `translate3d(${originX}px, ${originY}px, 0px) rotate(${originRotation}deg) scale(0.85)`,
              opacity: mounted ? 1 : 0,
              transition: `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity ${duration * 0.6}s ease-out ${delay}ms`
            }}
          >
            <Component size={size} variant={variant} />
          </div>
        );
      })}
    </div>
  );
}
