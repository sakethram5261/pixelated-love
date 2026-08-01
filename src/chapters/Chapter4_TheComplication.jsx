import React, { useState } from 'react';
import RoomHub from '../components/RoomHub';
import DialogueBox from '../components/DialogueBox';
import storyData from '../data/storyData.json';
import { chiptune } from '../audio/chiptune';
import { gameStore } from '../state/gameStore';

export default function Chapter4_TheComplication({ onComplete, soundEnabled }) {
  const [stage, setStage] = useState('room'); // 'room' | 'intro' | 'choice' | 'after_choice'
  const chapterData = storyData.chapters["4"];

  const handleRoomInteract = (objectKey) => {
    if (objectKey === 'window' || objectKey === 'phone') {
      chiptune.playSelect(soundEnabled);
      setStage('intro');
    }
  };

  return (
    <RoomHub
      chapterTitle="CHAPTER 4"
      chapterSubtitle="The Complication (Distance Weeps)"
      timeOfDay="rain"
      activeObject={['window', 'phone']}
      onInteract={handleRoomInteract}
      soundEnabled={soundEnabled}
      customObservation="Heavy monsoon rain falls outside your Indian window. You hold your phone tightly; Sharon called with a trembling voice."
    >
      {/* Intro Dialogue */}
      {stage === 'intro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px' }}>
          <DialogueBox
            lines={chapterData.intro}
            onComplete={() => setStage('choice')}
            palette="night"
            soundEnabled={soundEnabled}
          />
        </div>
      )}

      {/* Empathetic Choice Branch */}
      {stage === 'choice' && (
        <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#0A0E1A' }}>
          <div className="font-display" style={{ fontSize: '12px', color: '#60A5FA', textAlign: 'center', marginBottom: '14px' }}>
            🌧️ EMPATHETIC NIGHT CALL FROM BAHRAIN
          </div>

          <div className="font-dialogue" style={{ fontSize: '22px', color: '#FFF', background: '#1E293B', padding: '14px', border: '2px solid #60A5FA', marginBottom: '16px', fontStyle: 'italic' }}>
            "{chapterData.dialogue[0].text}"
          </div>

          <div className="font-display" style={{ fontSize: '10px', color: '#F4C95D', marginBottom: '8px' }}>
            HOW DO YOU COMFORT YOUR BEST FRIEND ACROSS THE OCEANS?:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {chapterData.dialogue[0].choices.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => {
                  chiptune.playSelect(soundEnabled);
                  gameStore.setPathTone(ch.tone);
                  setStage('after_choice');
                }}
                className="pixel-btn font-dialogue"
                style={{ fontSize: '18px', padding: '12px', textAlign: 'left', background: '#1F2937', border: '2px solid #F4C95D' }}
              >
                💬 "{ch.label}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* After Choice Dialogue */}
      {stage === 'after_choice' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px' }}>
          <DialogueBox
            lines={chapterData.afterChoice}
            onComplete={() => {
              gameStore.completeChapter(4);
              if (onComplete) onComplete();
            }}
            palette="night"
            soundEnabled={soundEnabled}
          />
        </div>
      )}
    </RoomHub>
  );
}
