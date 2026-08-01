import React, { useState } from 'react';
import SpriteRenderer from '../engine/SpriteRenderer';
import { gameStore } from '../state/gameStore';
import { chiptune } from '../audio/chiptune';

export default function HomePage({ gameState }) {
  const { unlockedChapters, settings } = gameState || { unlockedChapters: [1], settings: { sound: true } };
  const maxUnlocked = Math.max(...(unlockedChapters || [1]));
  const hasProgress = maxUnlocked > 1;
  const [hoveredSide, setHoveredSide] = useState(null);

  const handleStart = (targetStage) => {
    chiptune.playSelect(settings?.sound ?? true);
    gameStore.setChapter(targetStage);
  };

  return (
    <div className="home-screen-viewport screen-enter" style={{
      position: 'relative',
      width: '100%',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#0C0A10',
      color: '#FFFFFF',
      overflow: 'hidden',
      userSelect: 'none',
      fontFamily: "'Courier New', Courier, monospace"
    }}>
      {/* Top Header Title Box - Floating symmetrically over both worlds */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        textAlign: 'center',
        width: '90%',
        maxWidth: '640px',
        pointerEvents: 'none'
      }}>
        <div style={{
          backgroundColor: '#0A0B12',
          border: '3px solid #F4C95D',
          boxShadow: '0 8px 0 #000000, 0 0 0 6px #1F1F35',
          padding: '16px 20px',
          display: 'inline-block',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div className="font-display" style={{
            fontSize: 'clamp(24px, 5vw, 42px)',
            color: '#F4C95D',
            letterSpacing: '2px',
            lineHeight: '1.1',
            textTransform: 'uppercase',
            margin: 0
          }}>
            3,000 MILES
          </div>
          <div className="font-dialogue" style={{
            fontSize: 'clamp(12px, 2.5vw, 18px)',
            color: '#FFFFFF',
            marginTop: '8px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            opacity: 0.95
          }}>
            Saketh &amp; Sharon • A 16-Bit Retro Love Story
          </div>
        </div>
      </div>

      {/* Main Split Screen Container: India on Left, Bahrain on Right */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        width: '100%',
        paddingTop: '110px', // Make room for top floating title box
        paddingBottom: '130px', // Make room for bottom interactive controls & Safari bar
        boxSizing: 'border-box'
      }}>
        {/* ================= LEFT HALF: INDIA (SAKETH) ================= */}
        <div 
          onMouseEnter={() => setHoveredSide('india')}
          onMouseLeave={() => setHoveredSide(null)}
          style={{
            flex: '1 1 50%',
            backgroundColor: '#1F120A', // Warm cocoa/amber chai night
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 10px',
            borderRight: '2px dashed #F2A65A',
            transition: 'background-color 0.3s ease',
            overflow: 'hidden'
          }}
        >
          {/* Pixel Art Architectural Silhouette: Indian Heritage Architecture */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none', background: 'radial-gradient(circle at center, #F2A65A 0%, transparent 75%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', opacity: 0.25, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
            {/* Minimalist retro temple/monsoon arch silhouette boxes */}
            <div style={{ width: '40px', height: '45px', borderTop: '6px solid #F2A65A', borderLeft: '4px solid #F2A65A', borderRight: '4px solid #F2A65A' }} />
            <div style={{ width: '60px', height: '55px', borderRadius: '30px 30px 0 0', border: '4px solid #F2A65A' }} />
            <div style={{ width: '45px', height: '40px', borderTop: '6px solid #F2A65A', borderLeft: '4px solid #F2A65A', borderRight: '4px solid #F2A65A' }} />
          </div>

          {/* Location Tag */}
          <div className="font-display" style={{
            backgroundColor: '#2B1B12',
            border: '2px solid #F2A65A',
            color: '#FFE3B3',
            padding: '6px 12px',
            fontSize: 'clamp(10px, 2.2vw, 14px)',
            letterSpacing: '1px',
            marginBottom: '24px',
            zIndex: 5,
            boxShadow: '0 4px 0 #000'
          }}>
            [ IST +05:30 ] INDIA
          </div>

          {/* Saketh Sprite Centerpiece */}
          <div style={{
            position: 'relative',
            zIndex: 5,
            padding: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            border: '3px solid #6B3F2A',
            boxShadow: hoveredSide === 'india' ? '0 0 20px rgba(242, 166, 90, 0.4)' : '0 6px 12px rgba(0,0,0,0.5)',
            transition: 'box-shadow 0.3s ease',
            borderRadius: '2px',
            marginBottom: '20px'
          }}>
            <SpriteRenderer spriteName="saketh_idle" scale={5} animation="bounce" />
            <div className="font-display" style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', color: '#F2A65A' }}>
              SAKETH
            </div>
          </div>

          <div className="font-dialogue" style={{
            fontSize: 'clamp(11px, 2vw, 14px)',
            color: '#D99B75',
            textAlign: 'center',
            maxWidth: '220px',
            zIndex: 5,
            lineHeight: '1.4'
          }}>
            "Counting every hour across the Arabian Sea."
          </div>
        </div>

        {/* ================= RIGHT HALF: BAHRAIN (SHARON) ================= */}
        <div 
          onMouseEnter={() => setHoveredSide('bahrain')}
          onMouseLeave={() => setHoveredSide(null)}
          style={{
            flex: '1 1 50%',
            backgroundColor: '#0A1B20', // Deep Gulf turquoise/teal night sky
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 10px',
            borderLeft: '2px dashed #4FA9A0',
            transition: 'background-color 0.3s ease',
            overflow: 'hidden'
          }}
        >
          {/* Pixel Art Architectural Silhouette: Bahrain Skyline & Palms under Night Sky */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none', background: 'radial-gradient(circle at center, #4FA9A0 0%, transparent 75%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', opacity: 0.25, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
            {/* Minimalist modern tower & palm frond silhouette boxes */}
            <div style={{ width: '35px', height: '55px', border: '4px solid #4FA9A0', borderBottom: 'none' }} />
            <div style={{ width: '50px', height: '35px', borderTop: '6px solid #4FA9A0', borderRadius: '8px 8px 0 0' }} />
            <div style={{ width: '40px', height: '48px', border: '4px solid #4FA9A0', borderBottom: 'none' }} />
          </div>
          {/* Crescent moon in upper right of Bahrain side */}
          <div style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            boxShadow: '-5px 2px 0 0 #FFF6E0',
            opacity: 0.8
          }} />

          {/* Location Tag */}
          <div className="font-display" style={{
            backgroundColor: '#0E2A2E',
            border: '2px solid #4FA9A0',
            color: '#FFF6E0',
            padding: '6px 12px',
            fontSize: 'clamp(10px, 2.2vw, 14px)',
            letterSpacing: '1px',
            marginBottom: '24px',
            zIndex: 5,
            boxShadow: '0 4px 0 #000'
          }}>
            [ GMT +03:00 ] BAHRAIN
          </div>

          {/* Sharon Sprite Centerpiece (Flipped to face Saketh across the divide!) */}
          <div style={{
            position: 'relative',
            zIndex: 5,
            padding: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            border: '3px solid #1F5E5E',
            boxShadow: hoveredSide === 'bahrain' ? '0 0 20px rgba(79, 169, 160, 0.4)' : '0 6px 12px rgba(0,0,0,0.5)',
            transition: 'box-shadow 0.3s ease',
            borderRadius: '2px',
            marginBottom: '20px'
          }}>
            <div style={{ transform: 'scaleX(-1)' }}>
              <SpriteRenderer spriteName="sharon_idle" scale={5} animation="bounce" />
            </div>
            <div className="font-display" style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', color: '#4FA9A0' }}>
              SHARON (PAPI)
            </div>
          </div>

          <div className="font-dialogue" style={{
            fontSize: 'clamp(11px, 2vw, 14px)',
            color: '#B5E0DC',
            textAlign: 'center',
            maxWidth: '220px',
            zIndex: 5,
            lineHeight: '1.4'
          }}>
            "Building our bridge across time zones every single night."
          </div>
        </div>

        {/* Center Distance Badge Hovering right over the seam */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 15,
          pointerEvents: 'none',
          backgroundColor: '#110E18',
          border: '2px solid #FFF',
          padding: '8px 12px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.8)'
        }}>
          <div className="font-display" style={{ fontSize: '11px', color: '#F4C95D', whiteSpace: 'nowrap' }}>
            ✈️ 3,000 MILES APART ✈️
          </div>
        </div>
      </div>

      {/* Bottom Interactive Arcade Navigation Dock - Safe from Safari bottom URL bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        backgroundColor: '#0C0A10',
        borderTop: '4px solid #33336B',
        padding: '16px 20px calc(24px + env(safe-area-inset-bottom, 25px)) 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 -8px 25px rgba(0,0,0,0.7)'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', width: '100%', maxWidth: '500px' }}>
          {/* Main New Game / Open Map Button */}
          <button
            onClick={() => handleStart(0)}
            className="font-display"
            style={{
              flex: '1 1 220px',
              backgroundColor: '#262650',
              color: '#FFFFFF',
              border: '3px solid #F4C95D',
              padding: '14px 24px',
              fontSize: 'clamp(13px, 3vw, 16px)',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              boxShadow: '0 5px 0 #12122A, 0 8px 15px rgba(0,0,0,0.6)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#383870'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#262650'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            ▶ ENTER ARCADE MAP
          </button>

          {/* Continue button if progress exists */}
          {hasProgress && (
            <button
              onClick={() => handleStart(maxUnlocked)}
              className="font-display"
              style={{
                flex: '1 1 200px',
                backgroundColor: '#1B3C35',
                color: '#A8F5E5',
                border: '3px solid #4FA9A0',
                padding: '14px 20px',
                fontSize: 'clamp(12px, 2.5vw, 14px)',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                boxShadow: '0 5px 0 #0E221D, 0 8px 15px rgba(0,0,0,0.6)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#26544A'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1B3C35'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              [ 💾 CONTINUE CH {maxUnlocked} ]
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginTop: '4px', opacity: 0.85 }}>
          <button
            onClick={() => { chiptune.playTap(true); gameStore.toggleSound(); }}
            className="font-dialogue"
            style={{ background: 'transparent', border: 'none', color: '#FFF', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Sound: {settings?.sound !== false ? 'ON 🔊' : 'OFF 🔇'}
          </button>
          <button
            onClick={() => { chiptune.playTap(true); gameStore.toggleMotion(); }}
            className="font-dialogue"
            style={{ background: 'transparent', border: 'none', color: '#FFF', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Motion: {settings?.reducedMotion ? 'REDUCED 🧘' : 'FULL ⚡'}
          </button>
        </div>
      </div>
    </div>
  );
}
