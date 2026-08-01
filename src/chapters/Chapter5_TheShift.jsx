import React, { useState } from 'react';
import RoomHub from '../components/RoomHub';
import DialogueBox from '../components/DialogueBox';
import SpriteRenderer from '../engine/SpriteRenderer';
import storyData from '../data/storyData.json';
import { chiptune } from '../audio/chiptune';
import { gameStore } from '../state/gameStore';

export default function Chapter5_TheShift({ onComplete, soundEnabled }) {
  const [stage, setStage] = useState('room'); // 'room' | 'dialogue' | 'epiphany_card'
  const chapterData = storyData.chapters["5"];

  const handleRoomInteract = (objectKey) => {
    if (objectKey === 'phone' || objectKey === 'laptop') {
      chiptune.playMysticChime(soundEnabled);
      setStage('dialogue');
    }
  };

  return (
    <RoomHub
      chapterTitle="CHAPTER 5"
      chapterSubtitle="The Shift (Month 6 Epiphany)"
      timeOfDay="morning"
      activeObject={['phone', 'laptop']}
      onInteract={handleRoomInteract}
      soundEnabled={soundEnabled}
      customObservation="Golden morning sunshine floods your room in India. A long, beautiful text confession just popped up from Sharon!"
    >
      {/* Dialogue */}
      {stage === 'dialogue' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px' }}>
          <DialogueBox
            lines={chapterData.intro}
            onComplete={() => setStage('epiphany_card')}
            palette="india"
            soundEnabled={soundEnabled}
          />
        </div>
      )}

      {/* Emotional Epiphany Confirmation Card */}
      {stage === 'epiphany_card' && (
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#112F35', border: '4px solid #F2D49B' }}>
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center', marginBottom: '16px' }}>
            <SpriteRenderer spriteName="saketh_idle" scale={3} animation="bounce" />
            <div style={{ fontSize: '36px', animation: 'pulse 1s infinite' }}>💖</div>
            <SpriteRenderer spriteName="sharon_idle" scale={3} animation="bounce" />
          </div>

          <div className="font-display" style={{ fontSize: '16px', color: '#F2D49B', textAlign: 'center', marginBottom: '14px' }}>
            ★ THE ROMANTIC TURNING POINT ★
          </div>

          <div className="font-dialogue" style={{ fontSize: '22px', textAlign: 'center', color: '#FFF6E0', maxWidth: '400px', marginBottom: '20px', fontStyle: 'italic' }}>
            "We started out as inseparable friends playing Roblox and spamming Instagram Reels across oceans. But in this sunlit room, I realize the absolute truth: she isn't just my best friend anymore. She is the love of my life."
          </div>

          <button
            onClick={() => {
              gameStore.completeChapter(5);
              if (onComplete) onComplete();
            }}
            className="pixel-btn"
            style={{ width: '85%', fontSize: '16px', backgroundColor: '#F2D49B', color: '#000' }}
          >
            WRITE YOUR PROMISE IN YOUR DESK JOURNAL ★
          </button>
        </div>
      )}
    </RoomHub>
  );
}
