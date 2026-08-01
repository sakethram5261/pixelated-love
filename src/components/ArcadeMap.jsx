import React from 'react';
import SpriteRenderer from '../engine/SpriteRenderer';
import { gameStore } from '../state/gameStore';
import { chiptune } from '../audio/chiptune';

const CHAPTER_LIST = [
  { id: 1, name: "CH 1: The Dare", side: "left", desc: "India — His Room" },
  { id: 2, name: "CH 2: 3 Weeks Silence", side: "left", desc: "The Waiting Game" },
  { id: 3, name: "CH 3: Getting Close", side: "mid", desc: "6-Month Chat Streak" },
  { id: 4, name: "CH 4: Complication", side: "mid", desc: "Navigating Patience" },
  { id: 5, name: "CH 5: The Shift", side: "mid", desc: "Clear Sky Turning Point" },
  { id: 6, name: "CH 6: Palmistry Match", side: "mid-violet", desc: "Soulmate AI Reveal" },
  { id: 7, name: "CH 7: Long Distance", side: "right-sky", desc: "Time Zones & Branch" },
  { id: 8, name: "CH 8: Plan Surprise", side: "right", desc: "Stealth & Pack Bag" },
  { id: 9, name: "FINALE: Reunion", side: "right-gold", desc: "Bahrain — Her Doorstep" }
];

export default function ArcadeMap({ gameState, onSelectChapter }) {
  const { unlockedChapters, settings, pathTone } = gameState;

  const handleChapterClick = (id) => {
    if (unlockedChapters.includes(id)) {
      chiptune.playSelect(settings.sound);
      onSelectChapter(id);
    } else {
      chiptune.playBlip(settings.sound, 220); // Low dull error buzz for locked
    }
  };

  return (
    <div className="arcade-map-screen screen-enter" style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--nt-bg)',
      color: 'var(--nt-highlight)',
      overflowY: 'auto',
      padding: '12px'
    }}>
      {/* Top Arcade Header & Settings Toggle Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '12px',
        borderBottom: '4px solid var(--nt-fore)',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 className="font-display" style={{ fontSize: '18px', color: 'var(--nt-accent)' }}>
            3000 MILES
          </h1>
          <span className="font-dialogue" style={{ fontSize: '16px', color: 'var(--in-accent)' }}>
            Saketh &amp; Sharon's Pixel Arcade
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => { chiptune.playSelect(settings.sound); gameStore.setChapter(-1); }}
            className="pixel-btn"
            style={{ padding: '6px', fontSize: '10px', minWidth: '44px', minHeight: '44px', background: '#2B1B12', borderColor: '#F4C95D', color: '#F4C95D' }}
            title="Return to Title Screen"
          >
            ◀ TITLE
          </button>
          <button 
            onClick={() => { chiptune.playTap(true); gameStore.toggleSound(); }}
            className="pixel-btn"
            style={{ padding: '6px', fontSize: '10px', minWidth: '44px', minHeight: '44px', background: settings.sound ? '#33336B' : '#6B3F2A' }}
            title="Toggle Sound"
          >
            SND:{settings.sound ? 'ON' : 'OFF'}
          </button>
          <button 
            onClick={() => { chiptune.playTap(settings.sound); gameStore.toggleMotion(); }}
            className="pixel-btn-teal pixel-btn"
            style={{ padding: '6px', fontSize: '10px', minWidth: '44px', minHeight: '44px', background: settings.reducedMotion ? '#6B3F2A' : '#1F5E5E' }}
            title="Reduced Motion Toggle"
          >
            MOT:{settings.reducedMotion ? 'MIN' : 'FULL'}
          </button>
        </div>
      </div>

      {/* World Map Header Graphic: India to Bahrain with Paper Airplane Flight Path */}
      <div style={{
        backgroundColor: '#050514',
        border: '4px solid var(--nt-accent)',
        padding: '16px',
        borderRadius: '4px',
        marginBottom: '20px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 0 rgba(0,0,0,0.5)'
      }}>
        {/* Left: India (His Side) */}
        <div style={{ textAlign: 'center', color: 'var(--in-accent)' }}>
          <div style={{ marginBottom: '6px' }}>
            <SpriteRenderer spriteName="saketh_idle" scale={2} animation="bounce" />
          </div>
          <span className="font-display" style={{ fontSize: '11px' }}>INDIA</span>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Saketh (Him)</div>
        </div>

        {/* Center Dotted Flight Path & Flying Airplane Motif */}
        <div style={{ 
          flex: 1, 
          height: '4px', 
          margin: '0 12px', 
          borderBottom: '4px dashed var(--nt-accent)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-20px',
            animation: settings.reducedMotion ? 'none' : 'screenShake 2s infinite'
          }}>
            <SpriteRenderer spriteName="airplane" scale={2} animation="idle" />
          </div>
          <span className="font-display" style={{ 
            position: 'absolute', 
            bottom: '-22px', 
            fontSize: '9px', 
            color: 'var(--nt-highlight)',
            background: '#050514',
            padding: '2px 4px'
          }}>
            3,000 MILES
          </span>
        </div>

        {/* Right: Bahrain (Her Side) */}
        <div style={{ textAlign: 'center', color: 'var(--bh-accent)' }}>
          <div style={{ marginBottom: '6px' }}>
            <SpriteRenderer spriteName="sharon_idle" scale={2} animation="bounce" />
          </div>
          <span className="font-display" style={{ fontSize: '11px' }}>BAHRAIN</span>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Sharon (Her)</div>
        </div>
      </div>

      {/* Chapter Select List / Cabinet Markers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '24px' }}>
        <div className="font-display" style={{ fontSize: '12px', color: '#A9A9C9', marginBottom: '4px' }}>
          SELECT A STAGE TO PLAY:
        </div>

        {CHAPTER_LIST.map((chap) => {
          const isUnlocked = unlockedChapters.includes(chap.id);
          const isCompleted = unlockedChapters.includes(chap.id + 1) || (chap.id === 9 && isUnlocked && pathTone);
          
          let btnClass = "pixel-btn";
          if (chap.side.includes('violet') || chap.id === 6) btnClass += " pixel-btn-violet";
          else if (chap.side.includes('right') || chap.id >= 7) btnClass += " pixel-btn-teal";

          return (
            <button
              key={chap.id}
              onClick={() => handleChapterClick(chap.id)}
              className={`${btnClass} ${!isUnlocked ? 'locked-chapter' : ''}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                minHeight: '56px',
                opacity: isUnlocked ? 1 : 0.4,
                backgroundColor: !isUnlocked ? '#1B1B3A' : undefined,
                borderColor: isCompleted ? '#F4C95D' : isUnlocked ? '#FFF' : '#33336B'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                <span className="font-display" style={{ fontSize: '13px', color: isCompleted ? '#FFE3B3' : '#FFF' }}>
                  {chap.name} {isCompleted ? '★' : ''}
                </span>
                <span className="font-dialogue" style={{ fontSize: '18px', opacity: 0.9 }}>
                  {chap.desc}
                </span>
              </div>
              <div style={{ fontSize: '20px' }}>
                {isCompleted ? '💖' : isUnlocked ? '▶' : '🔒'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Branch flag status if achieved */}
      {pathTone && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#111', 
          border: '2px solid #E0A8F2', 
          textAlign: 'center',
          fontSize: '18px',
          fontFamily: 'var(--font-dialogue)'
        }}>
          Current Story Path: <span style={{ color: '#F4C95D', fontWeight: 'bold', textTransform: 'uppercase' }}>{pathTone}</span>
        </div>
      )}
    </div>
  );
}
