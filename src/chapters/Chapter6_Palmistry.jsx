import React, { useState } from 'react';
import RoomHub from '../components/RoomHub';
import DialogueBox from '../components/DialogueBox';
import SpriteRenderer from '../engine/SpriteRenderer';
import storyData from '../data/storyData.json';
import { chiptune } from '../audio/chiptune';
import { gameStore } from '../state/gameStore';

export default function Chapter6_Palmistry({ onComplete, soundEnabled }) {
  const [stage, setStage] = useState('room'); // 'room' | 'intro' | 'match' | 'reveal' | 'outro'
  const [matchCount, setMatchCount] = useState(0);
  const [currentTurn, setCurrentTurn] = useState('his');
  const [shaking, setShaking] = useState(false);
  const [energyBurst, setEnergyBurst] = useState(false);

  const chapterData = storyData.chapters["6"];

  const handleRoomInteract = (objectKey) => {
    if (objectKey === 'laptop') {
      chiptune.playSelect(soundEnabled);
      setStage('intro');
    }
  };

  const handleRuneTap = (side) => {
    if (side !== currentTurn) {
      chiptune.playBlip(soundEnabled, 200);
      return;
    }

    chiptune.playTap(soundEnabled);
    setEnergyBurst(true);
    setTimeout(() => setEnergyBurst(false), 300);

    const nextCount = matchCount + 1;
    setMatchCount(nextCount);
    setCurrentTurn(currentTurn === 'his' ? 'her' : 'his');

    if (nextCount >= 6) {
      chiptune.playMysticChime(soundEnabled);
      setShaking(true);
      setStage('reveal');
      setTimeout(() => setShaking(false), 800);
    }
  };

  return (
    <RoomHub
      chapterTitle="CHAPTER 6"
      chapterSubtitle="The Palmistry Reading"
      timeOfDay="night"
      activeObject="laptop"
      onInteract={handleRoomInteract}
      soundEnabled={soundEnabled}
      customObservation="It's 2:00 AM on Discord in your bedroom. Sharon just sent a link to a quirky AI astrological Palm-Reading tool on your PC!"
    >
      {/* Intro Dialogue */}
      {stage === 'intro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px' }}>
          <DialogueBox
            lines={chapterData.intro}
            onComplete={() => setStage('match')}
            palette="violet"
            soundEnabled={soundEnabled}
          />
        </div>
      )}

      {/* Palm Match Game on Desktop Screen (Upgraded with Synastry Beams & Zero Emojis) */}
      {(stage === 'match' || stage === 'reveal') && (
        <div className={`chapter-screen ${shaking ? 'shake' : ''}`} style={{
          flex: 1,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#1A0B2E',
          border: '4px solid #E0A8F2',
          boxShadow: 'inset 0 0 30px rgba(224,168,242,0.25)'
        }}>
          <div className="font-display" style={{ fontSize: '13px', color: '#E0A8F2', textAlign: 'center', marginBottom: '12px' }}>
            [AI SYSTEM]: 2:00 AM ASTROLOGICAL SYNASTRY TEST
          </div>

          {stage === 'match' && (
            <div className="font-display" style={{ fontSize: '11px', color: '#FFF', textAlign: 'center', marginBottom: '16px', background: '#3D1E5C', padding: '10px', borderRadius: '6px', border: '1px solid #7B3FA0' }}>
              ALTERNATELY SCAN GLOWING PALM CREASES ({matchCount}/6):<br/>
              [NEXT TARGET]: <span style={{ color: '#F4C95D' }}>{currentTurn === 'his' ? "CLICK SAKETH'S WEBCAM PALM" : "CLICK SHARON'S WEBCAM PALM"}</span>
            </div>
          )}

          {/* Interactive Webcam Scanning Field */}
          <div style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            minHeight: '190px',
            margin: '14px 0',
            padding: '16px 8px',
            background: '#0D0518',
            border: '2px solid #5C2B80',
            borderRadius: '12px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Saketh's Palm */}
            <div 
              onClick={() => stage === 'match' && handleRuneTap('his')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: stage === 'match' ? 'pointer' : 'default',
                opacity: stage === 'match' && currentTurn === 'his' ? 1 : 0.4,
                transform: stage === 'match' && currentTurn === 'his' ? 'scale(1.1)' : 'scale(0.95)',
                transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                zIndex: 2
              }}
            >
              <div style={{
                padding: '12px',
                background: currentTurn === 'his' ? 'rgba(244,201,93,0.15)' : 'transparent',
                border: currentTurn === 'his' ? '2px solid #F4C95D' : '2px dashed #444',
                borderRadius: '8px',
                boxShadow: currentTurn === 'his' ? '0 0 15px rgba(244,201,93,0.5)' : 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <SpriteRenderer spriteName="palm_rune" scale={4} animation={currentTurn === 'his' ? 'bounce' : 'idle'} />
              </div>
              <span className="font-display" style={{ fontSize: '10px', marginTop: '10px', color: '#F4C95D', background: '#25123E', padding: '4px 8px', borderRadius: '4px' }}>
                [SAKETH PALM]
              </span>
            </div>

            {/* Central Animated Synastry Core (Zero Emojis!) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
              {matchCount >= 6 ? (
                <div style={{
                  width: '74px',
                  height: '74px',
                  background: 'radial-gradient(circle, #F4C95D 0%, #7B3FA0 80%)',
                  border: '4px solid #FFF',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'synastryFlow 1s infinite, pulse 0.8s infinite',
                  boxShadow: '0 0 25px #FFF'
                }}>
                  <SpriteRenderer spriteName="heart" scale={4} animation="bounce" />
                </div>
              ) : (
                <div style={{
                  width: '64px',
                  height: '64px',
                  border: '4px dashed #E0A8F2',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'radial-gradient(circle, #3D1E5C 0%, #0D0518 90%)',
                  animation: energyBurst ? 'pulse 0.3s' : 'laserSpin 4s linear infinite',
                  boxShadow: energyBurst ? '0 0 25px #E0A8F2' : '0 0 10px rgba(224,168,242,0.4)'
                }}>
                  <SpriteRenderer spriteName="sparkle" scale={3} animation="idle" />
                </div>
              )}
              
              {/* Energy Progress Meter Bar */}
              <div style={{ width: '80px', marginTop: '12px', background: '#1D0D2E', border: '2px solid #E0A8F2', borderRadius: '6px', overflow: 'hidden', padding: '2px', boxShadow: 'inset 0 0 5px #000' }}>
                <div style={{
                  width: `${(matchCount / 6) * 100}%`,
                  height: '8px',
                  background: '#F4C95D',
                  boxShadow: '0 0 8px #F4C95D',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <span className="font-display" style={{ fontSize: '8px', color: '#F4C95D', marginTop: '5px' }}>
                POWER: {Math.round((matchCount / 6) * 100)}%
              </span>
            </div>

            {/* Sharon's Palm */}
            <div 
              onClick={() => stage === 'match' && handleRuneTap('her')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: stage === 'match' ? 'pointer' : 'default',
                opacity: stage === 'match' && currentTurn === 'her' ? 1 : 0.4,
                transform: stage === 'match' && currentTurn === 'her' ? 'scale(1.1)' : 'scale(0.95)',
                transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                zIndex: 2
              }}
            >
              <div style={{
                padding: '12px',
                background: currentTurn === 'her' ? 'rgba(224,168,242,0.15)' : 'transparent',
                border: currentTurn === 'her' ? '2px solid #E0A8F2' : '2px dashed #444',
                borderRadius: '8px',
                boxShadow: currentTurn === 'her' ? '0 0 15px rgba(224,168,242,0.5)' : 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <SpriteRenderer spriteName="palm_rune" scale={4} animation={currentTurn === 'her' ? 'bounce' : 'idle'} />
              </div>
              <span className="font-display" style={{ fontSize: '10px', marginTop: '10px', color: '#E0A8F2', background: '#25123E', padding: '4px 8px', borderRadius: '4px' }}>
                [SHARON PALM]
              </span>
            </div>
          </div>

          {/* Reveal Box */}
          {stage === 'reveal' && (
            <div style={{
              marginTop: '16px',
              padding: '20px',
              backgroundColor: '#3D1E5C',
              border: '4px solid #FFF',
              borderRadius: '12px',
              textAlign: 'center',
              animation: 'pulse 1.2s infinite',
              boxShadow: '0 10px 30px rgba(0,0,0,0.85)'
            }}>
              <div className="font-display" style={{ fontSize: '16px', color: '#F4C95D', marginBottom: '10px' }}>
                [AI VERDICT]: 99.8% SOULMATE SYNERGY
              </div>
              <div className="font-dialogue" style={{ fontSize: '22px', color: '#FFF', fontStyle: 'italic', marginBottom: '16px' }}>
                "Two palms predestined to conquer time zones, fiber optics, and 3,000 miles of ocean."
              </div>
              <button
                onClick={() => setStage('outro')}
                className="pixel-btn-violet pixel-btn"
                style={{ width: '100%', fontSize: '15px', padding: '14px', fontWeight: 'bold' }}
              >
                [READ SHARON'S GIDDY REACTION] -&gt;
              </button>
            </div>
          )}
        </div>
      )}

      {/* Outro Dialogue */}
      {stage === 'outro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px' }}>
          <DialogueBox
            lines={chapterData.outro}
            onComplete={() => {
              gameStore.completeChapter(6);
              if (onComplete) onComplete();
            }}
            palette="violet"
            soundEnabled={soundEnabled}
          />
        </div>
      )}
    </RoomHub>
  );
}
