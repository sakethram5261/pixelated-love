import React, { useState } from 'react';
import RoomHub from '../components/RoomHub';
import DialogueBox from '../components/DialogueBox';
import SpriteRenderer from '../engine/SpriteRenderer';
import storyData from '../data/storyData.json';
import { chiptune } from '../audio/chiptune';
import { gameStore } from '../state/gameStore';

const ITEMS = [
  { id: 'passport', name: 'Passport & Visa', icon: 'passport', desc: 'Required to board the flight to Bahrain!' },
  { id: 'gift', name: 'Special Handmade Gift', icon: 'heart', desc: 'Crafted specifically for Sharon ("papi").' },
  { id: 'luckycharm', name: 'Lucky Origami Plane', icon: 'airplane', desc: 'Our signature 3,000 mile symbol.' }
];

export default function Chapter8_PlanningSurprise({ onComplete, soundEnabled }) {
  const [stage, setStage] = useState('room'); // 'room' | 'intro' | 'stealth_text' | 'pack_game' | 'ready'
  const [packedItems, setPackedItems] = useState([]);
  const chapterData = storyData.chapters["8"];

  const handleRoomInteract = (objectKey) => {
    if (objectKey === 'suitcase') {
      chiptune.playSelect(soundEnabled);
      setStage('intro');
    }
  };

  const handleStealthReply = (reply) => {
    chiptune.playSelect(soundEnabled);
    gameStore.logFlavor(reply);
    setStage('pack_game');
  };

  const handlePackItem = (item) => {
    if (packedItems.includes(item.id)) return;
    chiptune.playTap(soundEnabled);
    const newPacked = [...packedItems, item.id];
    setPackedItems(newPacked);

    if (newPacked.length >= ITEMS.length) {
      chiptune.playConfetti(soundEnabled);
      setTimeout(() => setStage('ready'), 1200);
    }
  };

  return (
    <RoomHub
      chapterTitle="CHAPTER 8"
      chapterSubtitle="Planning the Surprise Flight"
      timeOfDay="sunset"
      activeObject="suitcase"
      onInteract={handleRoomInteract}
      soundEnabled={soundEnabled}
      customObservation="Your open suitcase lies across your bedroom rug in India! You booked a secret flight to Bahrain—pack up without spoiling the surprise!"
    >
      {/* Intro Dialogue */}
      {stage === 'intro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px' }}>
          <DialogueBox
            lines={chapterData.packIntro}
            onComplete={() => setStage('stealth_text')}
            palette="india"
            soundEnabled={soundEnabled}
          />
        </div>
      )}

      {/* Stealth Text Dodge on Phone */}
      {stage === 'stealth_text' && (
        <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#1A0B2E' }}>
          <div className="font-display" style={{ fontSize: '13px', color: '#2ecc71', textAlign: 'center', marginBottom: '14px' }}>
            📱 STEALTH TEXT FROM SHARON ON WHATSAPP:
          </div>
          
          <div className="font-dialogue" style={{ fontSize: '22px', background: '#0D0C14', padding: '14px', border: '2px solid #FFF', color: '#FFF', marginBottom: '16px' }}>
            "{chapterData.stealthTexts[0].question}"
          </div>

          <div className="font-display" style={{ fontSize: '11px', color: '#F2A65A', marginBottom: '10px' }}>
            CHOOSE NATURAL REPLY TO PROTECT THE SECRET:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {chapterData.stealthTexts[0].options.map((reply, idx) => (
              <button
                key={idx}
                onClick={() => handleStealthReply(reply)}
                className="pixel-btn font-dialogue"
                style={{ fontSize: '18px', padding: '12px', textAlign: 'left', background: '#3D1E5C', border: '2px solid #E0A8F2' }}
              >
                💬 "{reply}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Suitcase Packing Game on bedroom floor */}
      {stage === 'pack_game' && (
        <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2B1B12', border: '4px solid #C97B3D' }}>
          <div className="font-display" style={{ fontSize: '13px', color: '#FFE3B3', textAlign: 'center', marginBottom: '12px' }}>
            🧳 PACK SUITCASE ON BEDROOM RUG ({packedItems.length}/{ITEMS.length}):
          </div>

          <div style={{
            width: '160px',
            height: '110px',
            backgroundColor: '#190D06',
            border: '4px dashed #F2A65A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '18px',
            boxShadow: '0 0 20px rgba(242, 166, 90, 0.4)'
          }}>
            {packedItems.length === 0 ? <span style={{ opacity: 0.6 }} className="font-dialogue">[ Empty Suitcase ]</span> : null}
            {packedItems.includes('passport') && <SpriteRenderer spriteName="passport" scale={2} />}
            {packedItems.includes('gift') && <SpriteRenderer spriteName="heart" scale={2} />}
            {packedItems.includes('luckycharm') && <SpriteRenderer spriteName="airplane" scale={2} />}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
            {ITEMS.map((it) => {
              const isPacked = packedItems.includes(it.id);
              return (
                <button
                  key={it.id}
                  onClick={() => handlePackItem(it)}
                  disabled={isPacked}
                  className="pixel-btn"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    opacity: isPacked ? 0.4 : 1,
                    backgroundColor: isPacked ? '#111' : '#6B3F2A'
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <SpriteRenderer spriteName={it.icon} scale={2} />
                    <span className="font-dialogue" style={{ fontSize: '20px', color: '#FFF' }}>{it.name}</span>
                  </div>
                  <span className="font-display" style={{ fontSize: '11px', color: isPacked ? '#2ecc71' : '#FFE3B3' }}>
                    {isPacked ? '✔ PACKED' : '+ TAP TO PACK'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Ready for Airport Confirmation */}
      {stage === 'ready' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', backgroundColor: 'rgba(0,0,0,0.95)' }}>
          <div style={{ fontSize: '44px', marginBottom: '12px', animation: 'bounce 1s infinite' }}>✈️ 🧳 🚕</div>
          <div className="font-display" style={{ fontSize: '16px', color: '#2ecc71', textAlign: 'center', marginBottom: '12px' }}>
            STAGE 8 COMPLETE: BAGS PACKED &amp; SECRET SAFE!
          </div>
          <div className="font-dialogue" style={{ fontSize: '22px', textAlign: 'center', color: '#FFF', marginBottom: '22px' }}>
            "The taxi is waiting outside my door in India. I am leaving this bedroom behind. Next stop: 3,000 miles across the Arabian Sea straight to Sharon in Bahrain!"
          </div>
          <button
            onClick={() => {
              gameStore.completeChapter(8);
              if (onComplete) onComplete();
            }}
            className="pixel-btn-amber pixel-btn"
            style={{ width: '85%', fontSize: '16px' }}
          >
            RETURN TO MAP TO LAUNCH FINALE ★
          </button>
        </div>
      )}
    </RoomHub>
  );
}
