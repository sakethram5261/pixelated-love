import React, { useState } from 'react';
import RoomHub from '../components/RoomHub';
import DialogueBox from '../components/DialogueBox';
import SpriteRenderer from '../engine/SpriteRenderer';
import storyData from '../data/storyData.json';
import { chiptune } from '../audio/chiptune';
import { gameStore } from '../state/gameStore';

export default function Chapter7_LongDistance({ onComplete, soundEnabled }) {
  const [stage, setStage] = useState('room'); // 'room' | 'intro' | 'timezones' | 'branch'
  const [indiaHours, setIndiaHours] = useState(22); // 10 PM
  const [bahrainHours, setBahrainHours] = useState(19); // 7 PM
  const [synced, setSynced] = useState(false);

  const chapterData = storyData.chapters["7"];

  const handleRoomInteract = (objectKey) => {
    if (objectKey === 'window' || objectKey === 'calendar') {
      chiptune.playSelect(soundEnabled);
      setStage('intro');
    }
  };

  const handleAdjustDial = (diff) => {
    chiptune.playTap(soundEnabled);
    const nextIn = (indiaHours + diff + 24) % 24;
    const nextBh = (bahrainHours + diff + 24) % 24;
    setIndiaHours(nextIn);
    setBahrainHours(nextBh);

    if (nextIn === 0 || nextIn === 24) {
      chiptune.playConfetti(soundEnabled);
      setSynced(true);
      setTimeout(() => setStage('branch'), 1500);
    }
  };

  return (
    <RoomHub
      chapterTitle="CHAPTER 7"
      chapterSubtitle="Long Distance & Shared Stars"
      timeOfDay="night"
      activeObject={['window', 'calendar']}
      onInteract={handleRoomInteract}
      soundEnabled={soundEnabled}
      customObservation="Stargazing out your bedroom window in India while dialing your clocks to Bahrain's time zone during a night call."
    >
      {/* Intro Dialogue */}
      {stage === 'intro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px' }}>
          <DialogueBox
            lines={chapterData.intro}
            onComplete={() => setStage('timezones')}
            palette="night"
            soundEnabled={soundEnabled}
          />
        </div>
      )}

      {/* Time Zone Sync Mini-Game (Upgraded with Interactive Sky Constellations & Zero Emojis) */}
      {stage === 'timezones' && (
        <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#060714', border: '3px solid #33336B' }}>
          {!synced ? (
            <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
              <div className="font-display" style={{ fontSize: '13px', color: '#F4C95D' }}>
                [CELESTIAL DIALS]: ALIGN CLOCKS TO SHARE CONSTELLATIONS
              </div>

              {/* Live Interactive Rotating Star Window */}
              <div style={{
                width: '100%',
                maxWidth: '420px',
                height: '145px',
                background: '#02030A',
                border: '4px solid #485494',
                borderRadius: '12px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 0 20px rgba(72,84,148,0.5)'
              }}>
                {/* Constellation Canvas Rotation that visually moves when dials adjust */}
                <div style={{
                  display: 'flex',
                  gap: '35px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `rotate(${(indiaHours === 0 ? 0 : (24 - indiaHours) * 15)}deg)`,
                  transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}>
                  <SpriteRenderer spriteName="star" scale={3} animation="idle" />
                  <SpriteRenderer spriteName="sparkle" scale={4} animation="bounce" />
                  <SpriteRenderer spriteName="star" scale={3} animation="idle" />
                </div>

                <div style={{ position: 'absolute', bottom: '6px', left: '10px', fontSize: '9px', color: '#38BDF8' }} className="font-display">
                  [SKY VIEW]: INDIA-BAHRAIN CORRIDOR
                </div>
                <div style={{ position: 'absolute', top: '6px', right: '10px', fontSize: '9px', color: '#F4C95D' }} className="font-display">
                  OFFSET: {indiaHours === 0 ? 'ALIGNED (0.0°)' : `${Math.abs(indiaHours * 15)}.0° TO TARGET`}
                </div>
              </div>
              
              {/* Dual Time Zone Dials */}
              <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', alignItems: 'center', margin: '6px 0' }}>
                <div style={{ border: '3px solid var(--in-accent)', padding: '12px', background: '#1D130E', minWidth: '135px', borderRadius: '8px' }}>
                  <div className="font-display" style={{ fontSize: '10px', color: '#FFE3B3' }}>INDIA (YOUR ROOM)</div>
                  <div className="font-display" style={{ fontSize: '26px', margin: '8px 0', color: '#FFF' }}>{String(indiaHours).padStart(2, '0')}:00</div>
                  <div className="font-dialogue" style={{ fontSize: '16px', color: '#F2A65A' }}>UTC+5:30</div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 10px' }}>
                  <span className="font-display" style={{ fontSize: '14px', color: '#F4C95D', animation: 'pulse 1s infinite' }}>&lt;&gt;</span>
                  <span className="font-display" style={{ fontSize: '8px', color: '#9CA3AF', marginTop: '4px' }}>SYNC</span>
                </div>
                
                <div style={{ border: '3px solid var(--bh-accent)', padding: '12px', background: '#091A1D', minWidth: '135px', borderRadius: '8px' }}>
                  <div className="font-display" style={{ fontSize: '10px', color: '#FFF6E0' }}>BAHRAIN (SHARON)</div>
                  <div className="font-display" style={{ fontSize: '26px', margin: '8px 0', color: '#FFF' }}>{String(bahrainHours).padStart(2, '0')}:00</div>
                  <div className="font-dialogue" style={{ fontSize: '16px', color: '#4FA9A0' }}>UTC+3:00</div>
                </div>
              </div>

              <div className="font-dialogue" style={{ fontSize: '20px', color: '#FFF', fontStyle: 'italic', maxWidth: '400px', lineHeight: '1.3' }}>
                [TARGET]: Adjust hour dials until India reaches Midnight (00:00) to match star positions!
              </div>

              <div style={{ display: 'flex', gap: '12px', width: '90%' }}>
                <button onClick={() => handleAdjustDial(-1)} className="pixel-btn" style={{ flex: 1, fontSize: '14px', padding: '14px', background: '#2B2B5C', color: '#FFF' }}>
                  [-1 HOUR] &lt;- ROTATE WEST
                </button>
                <button onClick={() => handleAdjustDial(1)} className="pixel-btn" style={{ flex: 1, fontSize: '14px', padding: '14px', background: '#485494', color: '#FFF', fontWeight: 'bold' }}>
                  ROTATE EAST -&gt; [+1 HOUR]
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', animation: 'pulse 1s infinite', padding: '24px', background: '#111328', border: '4px solid #F4C95D', borderRadius: '14px', width: '95%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '14px' }}>
                <SpriteRenderer spriteName="star" scale={4} animation="bounce" />
                <SpriteRenderer spriteName="sparkle" scale={5} animation="bounce" />
                <SpriteRenderer spriteName="star" scale={4} animation="bounce" />
              </div>
              <div className="font-display" style={{ fontSize: '16px', color: '#F4C95D', marginTop: '10px' }}>
                [SUCCESS]: TIME ZONES &amp; CONSTELLATIONS LINKED!
              </div>
              <div className="font-dialogue" style={{ fontSize: '22px', marginTop: '12px', color: '#FFF', fontStyle: 'italic' }}>
                "Staring out our bedroom windows across 3,000 miles at the exact same glowing stars..."
              </div>
            </div>
          )}
        </div>
      )}

      {/* Crucial 3-Way Branch Point */}
      {stage === 'branch' && (
        <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#0C1021' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#1B243B', padding: '16px', border: '3px solid #F4C95D', borderRadius: '10px', marginBottom: '16px' }}>
            <SpriteRenderer spriteName={chapterData.branchChoice.portrait} scale={3} />
            <div className="font-dialogue" style={{ fontSize: '22px', color: '#FFF', lineHeight: '1.3' }}>
              <span style={{ color: '#F4C95D' }}>[{chapterData.branchChoice.speaker}]: </span>
              "{chapterData.branchChoice.text}"
            </div>
          </div>

          <div className="font-display" style={{ fontSize: '11px', color: '#4FA9A0', marginBottom: '12px', textAlign: 'center' }}>
            [CHOICE]: DEFINE YOUR ROMANTIC FUTURE (SETS FINALE TONE)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {chapterData.branchChoice.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  chiptune.playSelect(soundEnabled);
                  gameStore.setPathTone(opt.flag);
                  gameStore.completeChapter(7);
                  if (onComplete) onComplete();
                }}
                className="pixel-btn font-dialogue"
                style={{ fontSize: '18px', padding: '14px', textAlign: 'left', background: '#111827', border: '2px solid #F4C95D', color: '#FFF', lineHeight: '1.3', borderRadius: '6px' }}
              >
                [OPTION {i + 1}]: "{opt.label}"
              </button>
            ))}
          </div>
        </div>
      )}
    </RoomHub>
  );
}
