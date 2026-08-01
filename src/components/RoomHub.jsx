import React, { useState } from 'react';
import { chiptune } from '../audio/chiptune';

/**
 * RoomHub: Interactive top-down RPG pixel art bedroom in India.
 * Displays an authentic 16-bit retro bedroom artwork with interactive hotspot zones
 * over furniture items (bed phone, desk laptop, wall calendar, suitcase).
 * Overlays (dialogue boxes and mini-games) float cleanly over the room with a subtle
 * translucent background so your bedroom is always visible!
 */
export default function RoomHub({
  chapterTitle,
  chapterSubtitle,
  timeOfDay = 'night',
  activeObject,
  onInteract,
  soundEnabled = true,
  customObservation,
  children
}) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const defaultObservations = {
    night: "Indian midnight. Outside your bedroom window, stars shimmer across the sea toward Bahrain.",
    rain: "Monsoon raindrops drum against your bedroom glass in India as you count down the days.",
    day: "Warm morning sunlight streams across your Indian wooden study desk and glowing phone screen.",
    twilight: "Evening dusk fills your room with violet hues as time zone clocks tick into synchrony."
  };

  const observation = customObservation || selectedItem || defaultObservations[timeOfDay] || defaultObservations.night;

  const handleItemClick = (itemKey, label, description) => {
    chiptune.playSelect(soundEnabled);
    setSelectedItem(`[${label.toUpperCase()}] ${description}`);
    if (onInteract) {
      onInteract(itemKey);
    }
  };

  const isItemActive = (itemKey) => {
    if (!activeObject) return false;
    if (Array.isArray(activeObject)) return activeObject.includes(itemKey);
    return activeObject === itemKey;
  };

  const HOTSPOTS = [
    {
      key: 'laptop',
      label: 'Desk Laptop',
      actionTitle: 'USE LAPTOP',
      desc: "Your primary wooden desk workstation. Perfect for Instagram video calls, Roblox obby runs with 'papi', and late-night gaming.",
      style: { top: '39%', left: '17%', width: '17%', height: '17%' },
      badgeAlign: { top: '0%', left: '50%', transform: 'translate(-50%, -115%)' },
      badgeColor: '#F4D35E'
    },
    {
      key: 'phone',
      label: 'Bed Phone',
      actionTitle: 'CHECK PHONE',
      desc: "Your faithful mobile phone resting on your pillow. Your digital gateway across 3,000 miles to her art account @art._pngz.",
      style: { top: '49%', left: '61%', width: '8%', height: '7%' },
      badgeAlign: { top: '0%', left: '50%', transform: 'translate(-50%, -120%)' },
      badgeColor: '#FF5E7E'
    },
    {
      key: 'calendar',
      label: 'Wall Calendar',
      actionTitle: 'CHECK DATES',
      desc: "Your 2024 wall calendar by the window, counting the silent 21-day wait and marking down future flight goals.",
      style: { top: '13%', left: '50%', width: '12%', height: '18%' },
      badgeAlign: { top: '100%', left: '50%', transform: 'translate(-50%, 15%)' },
      badgeColor: '#2ecc71'
    },
    {
      key: 'suitcase',
      label: 'Travel Gear',
      actionTitle: 'PACK SUITCASE',
      desc: "Your travel gear and lucky paper airplane, waiting for the special secret trip when you bridge the 3,000 miles.",
      style: { top: '79%', left: '71%', width: '27%', height: '20%' },
      badgeAlign: { top: '0%', left: '50%', transform: 'translate(-50%, -115%)' },
      badgeColor: '#E0A8F2'
    }
  ];

  // Check if there is an active overlay or dialog being passed in children
  const hasActiveOverlay = React.Children.toArray(children).some(
    child => Boolean(child) && child !== false
  );

  return (
    <div className="chapter-screen screen-enter" style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: '#0B0813',
      color: '#FFF6E0',
      position: 'relative',
      overflow: 'hidden',
      justifyContent: 'space-between'
    }}>
      {/* Chapter Title Banner */}
      <div style={{ 
        padding: '10px 16px', 
        borderBottom: '4px solid #D4A373', 
        backgroundColor: '#190A1B',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.7)',
        zIndex: 10
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '15px' }}>🇮🇳</span>
            <span className="font-display" style={{ fontSize: '11px', color: '#F4D35E', textShadow: '1px 1px 0 #000' }}>
              SAKETH'S BEDROOM (TOP-DOWN VIEW)
            </span>
          </div>
          <div className="font-dialogue" style={{ fontSize: '19px', color: '#FFF', marginTop: '2px', fontWeight: 'bold' }}>
            {chapterTitle}: <span style={{ color: '#E0A8F2' }}>{chapterSubtitle}</span>
          </div>
        </div>
        <div className="font-display" style={{ 
          fontSize: '11px', 
          padding: '4px 10px', 
          background: '#3E1C38', 
          border: '2px solid #F4D35E',
          borderRadius: '4px',
          color: '#FFF',
          boxShadow: '2px 2px 0 #000'
        }}>
          ⏱️ {timeOfDay.toUpperCase()}
        </div>
      </div>

      {/* Main Top-Down RPG Bedroom Artwork Container */}
      <div style={{
        flex: 1,
        position: 'relative',
        margin: '6px',
        border: '5px solid #D4A373',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 8px 25px rgba(0,0,0,0.8)',
        backgroundColor: '#11091A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Aspect-Ratio Locked Bedroom Stage so interactive boxes NEVER drift off-center on any phone or PC screen */}
        <div style={{
          position: 'relative',
          width: '1200px',
          maxWidth: '100%',
          maxHeight: '100%',
          aspectRatio: '1 / 1',
          margin: 'auto',
          backgroundImage: 'url(/bedroom_vertical.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated'
        }}>
          {/* Render Interactive Hotspot Overlays */}
          {HOTSPOTS.map((spot) => {
            const active = isItemActive(spot.key);
            const hovered = hoveredItem === spot.key;

            return (
              <div
                key={spot.key}
                data-hotspot={spot.key}
                onClick={() => handleItemClick(spot.key, spot.label, spot.desc)}
                onMouseEnter={() => setHoveredItem(spot.key)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  position: 'absolute',
                  ...spot.style,
                  cursor: 'pointer',
                  borderRadius: '6px',
                  border: active ? `3px solid ${spot.badgeColor}` : hovered ? '2px solid rgba(255,255,255,0.8)' : '1px solid transparent',
                  backgroundColor: active ? 'rgba(255, 255, 255, 0.2)' : hovered ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  boxShadow: active ? `0 0 18px ${spot.badgeColor}, inset 0 0 12px rgba(255,255,255,0.4)` : 'none',
                  transition: 'all 0.15s ease-out',
                  zIndex: active ? 5 : 2
                }}
              >
                {/* Clamped Floating Action Badge */}
                {(active || hovered) && (
                  <div
                    className="font-display"
                    style={{
                      position: 'absolute',
                      ...spot.badgeAlign,
                      backgroundColor: active ? spot.badgeColor : '#110C17',
                      color: active && (spot.badgeColor === '#F4D35E' || spot.badgeColor === '#2ecc71') ? '#000' : '#FFF',
                      padding: '5px 9px',
                      fontSize: active ? '10px' : '9px',
                      borderRadius: '4px',
                      border: '2px solid #FFF',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.95)',
                      pointerEvents: 'none',
                      textTransform: 'uppercase',
                      animation: active ? 'pulse 1s infinite' : 'none',
                      zIndex: 10
                    }}
                  >
                    {active ? `👉 ${spot.actionTitle}` : `🔍 ${spot.label}`}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Overlaid Active Modal / Mini-Game / Dialogue */}
        {hasActiveOverlay && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(11, 8, 19, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            animation: 'fadeIn 0.2s ease-out',
            padding: '12px',
            boxSizing: 'border-box'
          }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
