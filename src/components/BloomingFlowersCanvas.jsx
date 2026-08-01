import React, { useState, useEffect, useMemo } from 'react';

/* =========================================================================
   INTENSIVE BOTANICAL SVG FLOWER COMPONENTS
   Each flower is a crafted digital artwork featuring organic gradients,
   layered petal depths, and luminous golden stamens.
========================================================================= */

const RosePeony = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
    <defs>
      <radialGradient id="roseGrad Outer" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF4D6D" />
        <stop offset="70%" stopColor="#C9184A" />
        <stop offset="100%" stopColor="#800F2F" />
      </radialGradient>
      <radialGradient id="roseGradInner" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF8FA3" />
        <stop offset="100%" stopColor="#FF4D6D" />
      </radialGradient>
      <radialGradient id="goldCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF066" />
        <stop offset="60%" stopColor="#F48C06" />
        <stop offset="100%" stopColor="#6A040F" />
      </radialGradient>
      <filter id="bloomGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <g filter="url(#bloomGlow)">
      {/* Outer Petals Layer */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <path
          key={`outer-${i}`}
          d="M 50 50 C 35 25, 30 10, 50 5 C 70 10, 65 25, 50 50 Z"
          fill="url(#roseGrad Outer)"
          stroke="#800F2F"
          strokeWidth="0.5"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {/* Mid Petals Layer */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
        <path
          key={`mid-${i}`}
          d="M 50 50 C 38 30, 35 18, 50 12 C 65 18, 62 30, 50 50 Z"
          fill="url(#roseGradInner)"
          stroke="#C9184A"
          strokeWidth="0.5"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {/* Inner Petal Crown */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <path
          key={`inner-${i}`}
          d="M 50 50 C 42 38, 40 28, 50 24 C 60 28, 58 38, 50 50 Z"
          fill="#FFB3C6"
          transform={`rotate(${angle + 15} 50 50)`}
        />
      ))}
      {/* Glowing Golden Center */}
      <circle cx="50" cy="50" r="10" fill="url(#goldCore)" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, idx) => (
        <circle
          key={idx}
          cx={50 + Math.cos(ang * Math.PI / 180) * 6}
          cy={50 + Math.sin(ang * Math.PI / 180) * 6}
          r="1.5"
          fill="#FFF9E6"
        />
      ))}
    </g>
  </svg>
);

const SakuraBlossom = ({ size = 85 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
    <defs>
      <radialGradient id="sakuraGrad" cx="50%" cy="10%">
        <stop offset="0%" stopColor="#FFF0F3" />
        <stop offset="60%" stopColor="#FFB3C6" />
        <stop offset="100%" stopColor="#FF4D6D" />
      </radialGradient>
      <radialGradient id="sakuraCore" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#FFE6A7" />
        <stop offset="100%" stopColor="#D4A373" />
      </radialGradient>
    </defs>
    <g>
      {/* 5 Classic Sakura Petals with signature center indentation */}
      {[0, 72, 144, 216, 288].map((ang, i) => (
        <g key={i} transform={`rotate(${ang} 50 50)`}>
          <path
            d="M 50 50 C 35 35, 25 15, 42 6 C 46 4, 50 10, 50 10 C 50 10, 54 4, 58 6 C 75 15, 65 35, 50 50 Z"
            fill="url(#sakuraGrad)"
            stroke="#FF8096"
            strokeWidth="0.5"
          />
          <path d="M 50 50 L 50 25" stroke="#FF4D6D" strokeWidth="0.8" opacity="0.4" />
        </g>
      ))}
      {/* Core Stamen Threads */}
      <circle cx="50" cy="50" r="7" fill="url(#sakuraCore)" />
      {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((ang, idx) => {
        const rad = (ang * Math.PI) / 180;
        return (
          <g key={idx}>
            <line x1="50" y1="50" x2={50 + Math.cos(rad) * 9} y2={50 + Math.sin(rad) * 9} stroke="#A3704C" strokeWidth="0.8" />
            <circle cx={50 + Math.cos(rad) * 9} cy={50 + Math.sin(rad) * 9} r="1.5" fill="#FFF275" />
          </g>
        );
      })}
    </g>
  </svg>
);

const CelestialLotus = ({ size = 95 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
    <defs>
      <radialGradient id="lotusOuter" cx="50%" cy="80%">
        <stop offset="0%" stopColor="#3C096C" />
        <stop offset="60%" stopColor="#9D4EDD" />
        <stop offset="100%" stopColor="#E0AAFF" />
      </radialGradient>
      <radialGradient id="lotusInner" cx="50%" cy="80%">
        <stop offset="0%" stopColor="#7B2CBF" />
        <stop offset="70%" stopColor="#C77DFF" />
        <stop offset="100%" stopColor="#F4EEFF" />
      </radialGradient>
      <radialGradient id="lotusGold" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#FFFFCC" />
        <stop offset="70%" stopColor="#FFC300" />
        <stop offset="100%" stopColor="#99582A" />
      </radialGradient>
    </defs>
    <g>
      {/* Base Crown */}
      {[15, 75, 135, 195, 255, 315].map((angle, i) => (
        <path
          key={`l-base-${i}`}
          d="M 50 50 C 35 30, 25 15, 50 2 C 75 15, 65 30, 50 50 Z"
          fill="url(#lotusOuter)"
          opacity="0.85"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {/* Mid Crown */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <path
          key={`l-mid-${i}`}
          d="M 50 50 C 38 32, 30 16, 50 6 C 70 16, 62 32, 50 50 Z"
          fill="url(#lotusInner)"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {/* Inner Diamonds */}
      {[30, 90, 150, 210, 270, 330].map((angle, i) => (
        <path
          key={`l-in-${i}`}
          d="M 50 50 C 43 38, 40 25, 50 15 C 60 25, 57 38, 50 50 Z"
          fill="#F8F7FF"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="9" fill="url(#lotusGold)" />
      <circle cx="50" cy="50" r="4" fill="#FFFFFF" opacity="0.8" />
    </g>
  </svg>
);

const GoldenDahlia = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
    <defs>
      <radialGradient id="dahliaGrad" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#D00000" />
        <stop offset="50%" stopColor="#DC2F02" />
        <stop offset="85%" stopColor="#F48C06" />
        <stop offset="100%" stopColor="#FFBA08" />
      </radialGradient>
      <radialGradient id="dahliaInner" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#FFBA08" />
        <stop offset="100%" stopColor="#E85D04" />
      </radialGradient>
    </defs>
    <g>
      {/* 16 Radial Sunburst Petals */}
      {Array.from({ length: 16 }).map((_, i) => (
        <path
          key={`d1-${i}`}
          d="M 50 50 C 44 32, 43 15, 50 4 C 57 15, 56 32, 50 50 Z"
          fill="url(#dahliaGrad)"
          stroke="#9D0208"
          strokeWidth="0.3"
          transform={`rotate(${i * 22.5} 50 50)`}
        />
      ))}
      {/* Inner 16 short petals */}
      {Array.from({ length: 16 }).map((_, i) => (
        <path
          key={`d2-${i}`}
          d="M 50 50 C 46 38, 45 25, 50 16 C 55 25, 54 38, 50 50 Z"
          fill="url(#dahliaInner)"
          transform={`rotate(${i * 22.5 + 11.25} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="8" fill="#6A040F" />
      <circle cx="50" cy="50" r="5" fill="#FFD000" />
      <circle cx="49" cy="48" r="2" fill="#FFFFFF" />
    </g>
  </svg>
);

const RoyalAnemone = ({ size = 85 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
    <defs>
      <radialGradient id="anemoneGrad" cx="50%" cy="100%">
        <stop offset="0%" stopColor="#10002B" />
        <stop offset="50%" stopColor="#3C096C" />
        <stop offset="85%" stopColor="#5A189A" />
        <stop offset="100%" stopColor="#7B2CBF" />
      </radialGradient>
      <radialGradient id="anemoneTip" cx="50%" cy="0%">
        <stop offset="0%" stopColor="#F72585" />
        <stop offset="100%" stopColor="#7B2CBF" />
      </radialGradient>
    </defs>
    <g>
      {[0, 51.4, 102.8, 154.2, 205.6, 257, 308.4].map((ang, i) => (
        <path
          key={i}
          d="M 50 50 C 32 30, 25 12, 45 6 C 50 5, 55 6, 55 6 C 55 6, 60 5, 65 6 C 85 12, 78 30, 50 50 Z"
          fill="url(#anemoneTip)"
          stroke="#10002B"
          strokeWidth="0.5"
          transform={`rotate(${ang} 50 50)`}
        />
      ))}
      {[25.7, 77.1, 128.5, 179.9, 231.3, 282.7, 334.1].map((ang, i) => (
        <path
          key={`in-${i}`}
          d="M 50 50 C 38 34, 34 20, 47 12 C 50 10, 50 10, 53 12 C 66 20, 62 34, 50 50 Z"
          fill="url(#anemoneGrad)"
          transform={`rotate(${ang} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="11" fill="#10002B" />
      <circle cx="50" cy="50" r="8" fill="#4895EF" />
      <circle cx="50" cy="50" r="5" fill="#4CC9F0" />
      <circle cx="48" cy="47" r="2.5" fill="#FFFFFF" />
    </g>
  </svg>
);

const FLOWER_TYPES = [
  { component: RosePeony, name: 'RosePeony' },
  { component: SakuraBlossom, name: 'SakuraBlossom' },
  { component: CelestialLotus, name: 'CelestialLotus' },
  { component: GoldenDahlia, name: 'GoldenDahlia' },
  { component: RoyalAnemone, name: 'RoyalAnemone' },
];

/* =========================================================================
   MAIN COMPONENT: BUTTERY-SMOOTH CENTER-OUTWARD FLOWER GARDEN
   Uses pure GPU hardware compositing (transform translate3d / rotate / scale)
   for unshakeable 60-120 FPS cinema smoothness without canvas lag.
========================================================================= */
export default function BloomingFlowersCanvas() {
  const [bloomed, setBloomed] = useState(false);

  // Generate a lush, dense edge-to-edge floral paradise using Golden Ratio areal packing!
  const flowers = useMemo(() => {
    const list = [];
    const totalFlowers = 220; // Massive, lush floral density filling every single inch of the screen!
    
    // Golden ratio spiral distribution guarantees uniform botanical density with no bald spots or harsh rings
    const goldenRatio = 1.618033988749895;
    
    for (let i = 0; i < totalFlowers; i++) {
      // Golden angle rotation (~137.5 degrees) ensures natural organic packing
      const angle = i * 2 * Math.PI * goldenRatio;
      
      // Using square root distribution maintains constant spatial density across expanding area
      const normalizedDist = Math.sqrt((i + 3) / (totalFlowers + 3));
      // Distance ranges smoothly from inner boundary (110px) all the way out to screen extremities (1450px)
      const dist = 110 + (normalizedDist * 1340) + (Math.random() * 40 - 20);
      
      const targetX = Math.cos(angle) * dist;
      const targetY = Math.sin(angle) * dist * 0.95;
      
      // Rich variety of flower sizes from delicate filler blossoms (65px) to breathtaking show-pieces (135px)
      const size = Math.floor(Math.random() * 70) + 65;
      const FlowerComponent = FLOWER_TYPES[i % FLOWER_TYPES.length].component;

      // Rolling outward bloom wave: inner flowers burst first, cascading across the screen to outer edges!
      const delay = Math.floor(normalizedDist * 1300) + (i % 7) * 50 + Math.random() * 90;
      const duration = 1.5 + Math.random() * 0.9;
      const floatDuration = 4.5 + Math.random() * 3.5;
      const floatDelay = Math.random() * 3;
      const rotation = Math.floor(Math.random() * 360) - 180;

      list.push({
        id: i,
        Component: FlowerComponent,
        size,
        targetX,
        targetY,
        rotation,
        delay,
        duration,
        floatDuration,
        floatDelay,
        zIndex: Math.floor(dist) // Outer flowers layer naturally behind or around inner ones
      });
    }
    return list;
  }, []);

  // Generate drifting bokeh stardust & falling silk rose petals
  const particles = useMemo(() => {
    return Array.from({ length: 75 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: -10 - Math.random() * 40,
      size: Math.random() * 14 + 6,
      duration: 7 + Math.random() * 6,
      delay: Math.random() * 6,
      type: i % 3 === 0 ? 'petal' : 'stardust',
      color: ['#FF758F', '#FFD166', '#E0AAFF', '#FFFFFF'][i % 4]
    }));
  }, []);

  useEffect(() => {
    // Trigger GPU-accelerated transition smoothly after mounting
    const timer = setTimeout(() => setBloomed(true), 60);
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
      background: 'radial-gradient(circle at center, #27072E 0%, #11031A 55%, #05010A 100%)',
      zIndex: 1
    }}>
      {/* Scoped GPU Keyframes for organic floating motion & atmospheric particles */}
      <style>{`
        @keyframes floatSway {
          0% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-9px) rotate(3.5deg) scale(1.03); }
          100% { transform: translateY(3px) rotate(-2deg) scale(0.98); }
        }
        @keyframes fallingParticle {
          0% { transform: translate3d(0, -50px, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.85; }
          90% { opacity: 0.85; }
          100% { transform: translate3d(60px, 105dvh, 0) rotate(360deg); opacity: 0; }
        }
        @keyframes pulseAurora {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.12); }
        }
        .flower-node {
          position: absolute;
          left: 50%;
          top: 50%;
          will-change: transform, opacity;
          pointer-events: none;
        }
        .flower-float-inner {
          will-change: transform;
        }
      `}</style>

      {/* Atmospheric breathing aurora glows in background */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '25%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(255, 77, 109, 0.3) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(40px)',
        animation: 'pulseAurora 6s ease-in-out infinite',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '70%',
        left: '75%',
        width: '550px',
        height: '550px',
        background: 'radial-gradient(circle, rgba(157, 78, 221, 0.3) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(45px)',
        animation: 'pulseAurora 8s ease-in-out infinite 2s',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }} />

      {/* Center-outward cascading flower garden */}
      {flowers.map((f) => {
        const FlowerComp = f.Component;
        return (
          <div
            key={f.id}
            className="flower-node"
            style={{
              width: f.size,
              height: f.size,
              marginLeft: -(f.size / 2),
              marginTop: -(f.size / 2),
              zIndex: f.zIndex,
              // Initial State: precisely at center (0,0), scale 0
              // Bloomed State: swooping out smoothly to radial coordinates
              transform: bloomed
                ? `translate3d(${f.targetX}px, ${f.targetY}px, 0px) scale(1) rotate(${f.rotation}deg)`
                : 'translate3d(0px, 0px, 0px) scale(0) rotate(-180deg)',
              opacity: bloomed ? 1 : 0,
              transition: `transform ${f.duration}s cubic-bezier(0.16, 1, 0.3, 1) ${f.delay}ms, opacity 0.8s ease-out ${f.delay}ms`
            }}
          >
            {/* Inner wrapper executes continuous, life-like floral breathing sway */}
            <div
              className="flower-float-inner"
              style={{
                width: '100%',
                height: '100%',
                animation: `floatSway ${f.floatDuration}s ease-in-out infinite alternate ${f.floatDelay}s`
              }}
            >
              <FlowerComp size={f.size} />
            </div>
          </div>
        );
      })}

      {/* Floating Bokeh Stardust & Silk Petals */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.type === 'petal' ? p.size * 1.5 : p.size,
            borderRadius: p.type === 'petal' ? '60% 0% 60% 0%' : '50%',
            background: p.type === 'petal'
              ? `linear-gradient(135deg, ${p.color} 0%, rgba(255,255,255,0.7) 100%)`
              : `radial-gradient(circle, #FFFFFF 0%, ${p.color} 70%, rgba(0,0,0,0) 100%)`,
            boxShadow: p.type === 'stardust' ? `0 0 10px ${p.color}` : '0 2px 6px rgba(0,0,0,0.3)',
            opacity: 0,
            animation: `fallingParticle ${p.duration}s linear infinite ${p.delay}s`,
            pointerEvents: 'none',
            zIndex: 1000
          }}
        />
      ))}

      {/* Gentle dark luxury vignette over the exact center to ensure crystalline text contrast */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(17, 3, 26, 0.65) 0%, rgba(11, 2, 18, 0.3) 40%, rgba(0, 0, 0, 0.1) 100%)',
        pointerEvents: 'none',
        zIndex: 500
      }} />
    </div>
  );
}
