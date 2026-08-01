import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import DialogueBox from '../components/DialogueBox';
import BloomingFlowersCanvas from '../components/BloomingFlowersCanvas';
import SpriteRenderer from '../engine/SpriteRenderer';
import storyData from '../data/storyData.json';
import { chiptune } from '../audio/chiptune';
import { gameStore } from '../state/gameStore';

/**
 * Finale_SurpriseArrival: The momentous transition out of Saketh's Indian bedroom
 * into the physical world of Manama, Bahrain outside Sharon's doorstep!
 */
export default function Finale_SurpriseArrival({ onComplete, soundEnabled, gameState }) {
  const [stage, setStage] = useState('walk'); // 'walk' | 'knock' | 'doorstep_dialogue' | 'reunion' | 'epilogue' | 'credits'
  const [steps, setSteps] = useState(0);
  const [breathing, setBreathing] = useState(false);
  const [isKnocking, setIsKnocking] = useState(false);
  
  const chapterData = storyData.chapters["9"];
  const tone = gameState?.pathTone || 'sincere';
  const epilogueText = chapterData.epilogues[tone] || chapterData.epilogues['sincere'];

  const handleWalkStep = () => {
    chiptune.playTap(soundEnabled);
    const nextSteps = steps + 1;
    setSteps(nextSteps);

    if (nextSteps === 4) {
      setBreathing(true); // Nervous romantic pause
    } else if (nextSteps >= 8) {
      setStage('knock');
    }
  };

  const handleKnock = () => {
    if (isKnocking) return;
    setIsKnocking(true);
    chiptune.playBlip(soundEnabled, 100);
    setTimeout(() => chiptune.playBlip(soundEnabled, 100), 220);
    setTimeout(() => chiptune.playBlip(soundEnabled, 120), 450);
    setTimeout(() => {
      setIsKnocking(false);
      setStage('doorstep_dialogue');
    }, 900);
  };

  const triggerReunion = () => {
    chiptune.playReunionTheme(soundEnabled);
    setStage('reunion');
  };

  return (
    <div className="chapter-screen screen-enter" style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#0A2024', // Bahrain vibrant sea-glass teal atmosphere!
      color: '#FFF6E0',
      padding: '14px',
      justifyContent: 'space-between',
      minHeight: '100%',
      overflowY: 'auto'
    }}>
      {/* Dramatic Leaving-The-Room Header (No Emojis!) */}
      <div style={{ borderBottom: '3px solid #F2D49B', paddingBottom: '10px', textAlign: 'center', backgroundColor: '#061315', padding: '10px', borderRadius: '8px' }}>
        <div className="font-display" style={{ fontSize: '11px', color: '#2ecc71' }}>[LOCATION CHANGE]: LEAVING THE ROOM — PHYSICAL WORLD ARRIVAL!</div>
        <h2 className="font-display" style={{ fontSize: '16px', color: '#F2D49B', marginTop: '6px' }}>{chapterData.title}</h2>
        <div className="font-dialogue" style={{ fontSize: '18px', color: '#4FA9A0' }}>{chapterData.subtitle}</div>
      </div>

      {/* Main Action Viewport */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '12px 0',
        backgroundColor: '#0E2A2E',
        border: '4px solid #F2D49B',
        padding: '16px',
        position: 'relative',
        boxShadow: '0 0 35px rgba(79, 169, 160, 0.4)',
        borderRadius: '12px'
      }}>
        {/* Stage 1: Street Walk from Taxi (Upgraded with Retro Streetscape & Zero Emojis) */}
        {stage === 'walk' && (
          <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div className="font-display" style={{ fontSize: '12px', color: '#F2D49B' }}>
              [LOCATION]: MANAMA, BAHRAIN — WALKING FROM TAXI TO SHARON'S DOOR
            </div>
            
            {/* Physical Sidewalk & Taxi Scene */}
            <div style={{
              width: '100%',
              padding: '25px 10px',
              backgroundColor: '#061315',
              border: '2px solid #1F5E5E',
              borderRadius: '8px',
              margin: '14px 0',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '95%', margin: '0 auto' }}>
                {/* Retro Taxi Cab */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '52px', height: '32px', backgroundColor: '#F4C95D', border: '3px solid #FFF', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 0 #111' }}>
                    <span className="font-display" style={{ fontSize: '9px', color: '#000' }}>CAB</span>
                  </div>
                  <span className="font-display" style={{ fontSize: '9px', color: '#9CA3AF', marginTop: '6px' }}>AIRPORT</span>
                </div>

                {/* Street Progress Track with Hopping Character */}
                <div style={{ flex: 1, height: '8px', background: '#1F5E5E', margin: '0 15px', position: 'relative', borderBottom: '3px dashed #4FA9A0' }}>
                  <div style={{
                    position: 'absolute',
                    left: `${(steps / 8) * 85}%`,
                    top: '-34px',
                    transition: 'left 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    zIndex: 10
                  }}>
                    <SpriteRenderer spriteName="saketh_idle" scale={3} animation="bounce" />
                  </div>
                </div>

                {/* Sharon's Wooden Door Target */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '42px', height: '54px', backgroundColor: '#6B3F2A', border: '3px solid #F2D49B', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '6px', boxShadow: 'inset -3px -3px #2B1B12' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#F2D49B', borderRadius: '50%' }} />
                  </div>
                  <span className="font-display" style={{ fontSize: '9px', color: '#F2D49B', marginTop: '6px' }}>DOOR #402</span>
                </div>
              </div>
            </div>

            {breathing ? (
              <div style={{ padding: '18px', background: '#061315', border: '3px solid #E64C4C', textAlign: 'center', width: '95%', borderRadius: '10px' }}>
                <div className="font-display" style={{ fontSize: '12px', color: '#E64C4C', animation: 'pulse 0.8s infinite' }}>[SYSTEM]: NERVOUS HEARTBEAT PAUSE</div>
                <div className="font-dialogue" style={{ fontSize: '22px', margin: '12px 0', color: '#FFF', fontStyle: 'italic', lineHeight: '1.4' }}>
                  "My heart is hammering against my ribs. Months of Roblox dates, Reels, and bedroom calls have led to this exact physical moment..."
                </div>
                <button onClick={() => setBreathing(false)} className="pixel-btn-amber pixel-btn" style={{ width: '100%', fontSize: '15px', padding: '14px', fontWeight: 'bold' }}>
                  [EXHALE] -&gt; TAKE THE FINAL STEPS NOW
                </button>
              </div>
            ) : (
              <button onClick={handleWalkStep} className="pixel-btn-teal pixel-btn" style={{ width: '95%', fontSize: '15px', padding: '16px', fontWeight: 'bold' }}>
                [STEP FORWARD ALONG BAHRAIN STREET]: ({8 - steps} STEPS REMAINING)
              </button>
            )}
          </div>
        )}

        {/* Stage 2: Knock on Doorstep (Upgraded with Physical Shaking Door & Zero Emojis) */}
        {stage === 'knock' && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
            {/* Retro 16x16 Wooden Door Structural UI */}
            <div style={{
              width: '120px',
              height: '160px',
              backgroundColor: '#5C3118',
              border: '6px solid #F2D49B',
              borderRadius: '6px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: '16px',
              boxShadow: isKnocking ? '0 0 35px #F2D49B' : 'inset -8px -8px #2C160B, 0 10px 25px rgba(0,0,0,0.8)',
              animation: isKnocking ? 'doorShake 0.3s infinite' : 'floatBlock 3s infinite ease-in-out',
              transition: 'box-shadow 0.2s'
            }}>
              <div style={{ width: '14px', height: '14px', backgroundColor: '#F2D49B', border: '2px solid #FFF', borderRadius: '50%', boxShadow: '0 0 8px #F2D49B' }} />
            </div>

            <div className="font-display" style={{ fontSize: '15px', color: '#FFF' }}>[LOCATION]: YOU ARE OUTSIDE SHARON'S APARTMENT</div>
            <div className="font-dialogue" style={{ fontSize: '22px', color: '#FFF6E0', maxWidth: '420px', fontStyle: 'italic', lineHeight: '1.4' }}>
              "No more glowing phone screens. No more time zone dials or fiber optics. Just inches of wood separating you."
            </div>
            
            <button
              onClick={handleKnock}
              disabled={isKnocking}
              className="pixel-btn-amber pixel-btn"
              style={{
                fontSize: '16px',
                padding: '16px 32px',
                width: '90%',
                fontWeight: 'bold',
                background: isKnocking ? '#D97706' : '#F2D49B',
                color: '#000'
              }}
            >
              {isKnocking ? '[KNOCKING ON SHARON\'S DOOR...] (THUMP-THUMP)' : '[ACTION]: KNOCK ON SHARON\'S DOOR NOW!'}
            </button>
          </div>
        )}

        {/* Stage 3: Slow-mo Reunion Embrace Cutscene (Zero Emojis!) */}
        {stage === 'reunion' && (
          <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
            <div className="font-display" style={{ fontSize: '15px', color: '#F472B6', animation: 'pulse 1s infinite' }}>
              [REUNION]: 3,000 MILES DOWN TO ZERO
            </div>
            
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'center', background: '#091517', padding: '28px', border: '4px solid #F2D49B', borderRadius: '12px', width: '95%', boxShadow: 'inset 0 0 20px rgba(242,212,155,0.2)' }}>
              <SpriteRenderer spriteName="saketh_idle" scale={4} animation="bounce" />
              <SpriteRenderer spriteName="heart" scale={5} animation="bounce" />
              <SpriteRenderer spriteName="sharon_idle" scale={4} animation="bounce" />
            </div>

            <div className="font-dialogue" style={{ fontSize: '24px', fontStyle: 'italic', color: '#FFF', maxWidth: '450px', lineHeight: '1.4' }}>
              "She rushes straight into my arms. No Wi-Fi lag. No Instagram video drops. Just real, genuine warmth."
            </div>

            <button onClick={() => setStage('epilogue')} className="pixel-btn-teal pixel-btn" style={{ width: '95%', padding: '16px', fontSize: '15px', fontWeight: 'bold' }}>
              [VIEW CUSTOM ROMANCE EPILOGUE] -&gt;
            </button>
          </div>
        )}

        {/* Stage 4: Customized Epilogue Card (Zero Emojis!) */}
        {stage === 'epilogue' && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px', background: '#08181B', border: '4px solid #F2D49B', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 12px 35px rgba(0,0,0,0.9)' }}>
            <div className="font-display" style={{ fontSize: '15px', color: '#F2D49B' }}>
              [POLAROID MEMORY]: SAKETH &amp; SHARON ("PAPI")
            </div>
            <div className="font-display" style={{ fontSize: '11px', color: '#2ecc71' }}>
              TOGETHER FOREVER IN REALITY
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', margin: '10px 0', background: '#050D0E', padding: '20px', border: '3px solid #FFF', borderRadius: '8px' }}>
              <SpriteRenderer spriteName="saketh_idle" scale={4} />
              <SpriteRenderer spriteName="sparkle" scale={4} animation="bounce" />
              <SpriteRenderer spriteName="sharon_idle" scale={4} />
            </div>
            <div className="font-dialogue" style={{ fontSize: '22px', color: '#FFF6E0', fontStyle: 'italic', lineHeight: '1.4' }}>
              "{epilogueText}"
            </div>
            <button onClick={() => setStage('special_video')} className="pixel-btn-amber pixel-btn font-dialogue" style={{ width: '100%', padding: '16px', fontSize: '22px', fontWeight: 'bold', animation: 'pulse 1.5s infinite', background: '#FF5E7E', color: '#000', borderColor: '#FFF', boxShadow: '0 0 20px rgba(255,94,126,0.6)' }}>
              [OPEN YOUR SPECIAL GIRLFRIEND'S DAY SURPRISE] -&gt;
            </button>
          </div>
        )}

        {/* Stage 5: FULL-SCREEN Magical Girlfriend's Day Surprise Video Overlay via React Portal */}
        {stage === 'special_video' && createPortal(
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100dvh', // Dynamic viewport height prevents iOS Safari address bar bottom clipping!
            zIndex: 99999999,
            backgroundColor: '#0A0612',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            padding: '20px 20px 70px', // Extra bottom safety margin for mobile browser toolbars!
            boxSizing: 'border-box'
          }}>
            {/* GPU-Accelerated Center-Outward Botanical Flower Garden */}
            <BloomingFlowersCanvas />

            {/* Overlaid romantic typography that fades in smoothly over the center floral sanctuary */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              textAlign: 'center',
              padding: '0 20px',
              maxWidth: '880px',
              opacity: 0,
              animation: 'smoothFadeIn 3s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards'
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(38px, 6.8vw, 66px)',
                color: '#FFF7F9',
                fontWeight: '700',
                lineHeight: '1.25',
                letterSpacing: '0.5px',
                textShadow: '0 4px 30px rgba(0, 0, 0, 0.95), 0 0 45px rgba(255, 117, 143, 0.85), 0 0 90px rgba(255, 77, 109, 0.6)'
              }}>
                happiest girlfriend day to my princess
              </div>

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(28px, 4.8vw, 44px)',
                fontWeight: '600',
                fontStyle: 'italic',
                color: '#FFE8AA',
                marginTop: '18px',
                letterSpacing: '2px',
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.95), 0 0 35px rgba(255, 232, 170, 0.85)'
              }}>
                -from saketh
              </div>

              <div style={{ marginTop: '50px', opacity: 0, animation: 'smoothFadeIn 2s ease-out 4s forwards' }}>
                <button
                  onClick={() => {
                    gameStore.completeChapter(9);
                    if (onComplete) onComplete();
                  }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 77, 109, 0.92) 0%, rgba(157, 78, 221, 0.92) 100%)',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    borderRadius: '50px',
                    padding: '16px 44px',
                    color: '#FFFFFF',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(18px, 3.2vw, 22px)',
                    fontWeight: '600',
                    letterSpacing: '1.5px',
                    boxShadow: '0 10px 35px rgba(0, 0, 0, 0.85), 0 0 30px rgba(255, 77, 109, 0.65)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.9), 0 0 45px rgba(255,77,109,0.9)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 35px rgba(0, 0, 0, 0.85), 0 0 30px rgba(255, 77, 109, 0.65)'; }}
                >
                  ✨ Return to Fully Lit Golden Arcade Map ✨
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>

      {/* Doorstep Dialogue overlay */}
      {stage === 'doorstep_dialogue' && (
        <DialogueBox
          lines={chapterData.doorstep}
          onComplete={triggerReunion}
          palette="bahrain"
          soundEnabled={soundEnabled}
        />
      )}
    </div>
  );
}
