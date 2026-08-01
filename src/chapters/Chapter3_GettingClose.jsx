import React, { useState } from 'react';
import RoomHub from '../components/RoomHub';
import DialogueBox from '../components/DialogueBox';
import SpriteRenderer from '../engine/SpriteRenderer';
import storyData from '../data/storyData.json';
import { chiptune } from '../audio/chiptune';
import { gameStore } from '../state/gameStore';

const REELS = [
  { id: 1, title: "When the artist from Bahrain replies after 3 weeks on @art._pngz", likes: "48.2K", reaction: "[SHARON REPLIED FROM BAHRAIN]: 'I already apologized for the art account delay!'" },
  { id: 2, title: "Roblox obby obstacle falling compilation at 2:30 AM", likes: "124K", reaction: "[SHARON REPLIED ON DISCORD]: 'We are literally in that exact deep space obby right now!'" },
  { id: 3, title: "When you accidentally start calling your best friend 'papi'", likes: "92.4K", reaction: "[SHARON ('PAPI') REPLIED]: 'Best gaming nickname ever invented in Roblox history!'" },
  { id: 4, title: "How it feels having your favorite human 3,000 miles away", likes: "210K", reaction: "[SHARON REPLIED INSTANTLY]: 'You are literally my favorite person on earth.'" }
];

export default function Chapter3_GettingClose({ onComplete, soundEnabled }) {
  // Stage flow: 'room' -> 'intro' -> 'roblox_game' -> 'banter' -> 'reels_game' -> 'questions' -> 'complete'
  const [stage, setStage] = useState('room');
  const [obbyProgress, setObbyProgress] = useState(0);
  const [lastAction, setLastAction] = useState("Sharon ('Papi') just spawned onto the neon floating block! Jump across the laser hazard now!");
  const [isJumping, setIsJumping] = useState(false);
  const [platformIndex, setPlatformIndex] = useState(1);
  const [reelsSent, setReelsSent] = useState([]);
  const [activeReelIdx, setActiveReelIdx] = useState(0);

  const chapterData = storyData.chapters["3"];

  const handleRoomInteract = (objectKey) => {
    if (objectKey === 'laptop' || objectKey === 'phone') {
      chiptune.playSelect(soundEnabled);
      setStage('intro');
    }
  };

  const performObbyAction = (actionType, text) => {
    if (isJumping) return; // Block input mid-jump physics animation
    chiptune.playTap(soundEnabled);

    if (actionType === 'jump' || actionType === 'rescue') {
      setIsJumping(true);
      setTimeout(() => {
        setIsJumping(false);
        setPlatformIndex((prev) => (prev + 1) % 5);
      }, 600);
    }

    const nextProg = Math.min(100, obbyProgress + 25);
    setObbyProgress(nextProg);
    setLastAction(text);

    if (nextProg >= 100) {
      chiptune.playConfetti(soundEnabled);
      setTimeout(() => setStage('banter'), 1400);
    }
  };

  const handleSendReel = (reel) => {
    if (reelsSent.includes(reel.id)) return;
    chiptune.playTap(soundEnabled);
    const next = [...reelsSent, reel.id];
    setReelsSent(next);
    if (next.length >= REELS.length) {
      chiptune.playConfetti(soundEnabled);
      setTimeout(() => setStage('questions'), 1500);
    } else {
      setTimeout(() => setActiveReelIdx((activeReelIdx + 1) % REELS.length), 400);
    }
  };

  return (
    <RoomHub
      chapterTitle="CHAPTER 3"
      chapterSubtitle="From Strangers to Best Friends"
      timeOfDay="night"
      activeObject="laptop"
      onInteract={handleRoomInteract}
      soundEnabled={soundEnabled}
      customObservation="Your wooden study desk laptop and bed phone glow brightly. After breaking the 3-week silence, you two are inseparable!"
    >
      {/* Intro Dialogue when clicking laptop */}
      {stage === 'intro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px' }}>
          <DialogueBox
            lines={chapterData.intro}
            onComplete={() => setStage('roblox_game')}
            palette="india"
            soundEnabled={soundEnabled}
          />
        </div>
      )}

      {/* ROBLOX GAMING LAPTOP MINI-GAME (Upgraded with Real Platformer Physics & Zero Emojis) */}
      {stage === 'roblox_game' && (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
          <div style={{
            width: '100%',
            maxWidth: '520px',
            backgroundColor: '#0F121F',
            border: '5px solid #38BDF8',
            borderRadius: '12px',
            boxShadow: '0 12px 35px rgba(0,0,0,0.95), 0 0 20px rgba(56,189,248,0.3)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            color: '#FFF'
          }}>
            {/* Laptop Window Header Bar */}
            <div style={{ backgroundColor: '#1E293B', padding: '8px 14px', borderBottom: '2px solid #38BDF8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-display" style={{ fontSize: '12px', color: '#38BDF8' }}>[PC] ROBLOX CLIENT — NEON DEEP SPACE OBBY</span>
              <span className="font-display" style={{ fontSize: '11px', color: '#2ecc71', background: 'rgba(46,204,113,0.2)', padding: '2px 8px', borderRadius: '4px' }}>
                [VOICE CHAT]: Papi (Sharon)
              </span>
            </div>

            {/* Virtual Obby Viewport with Physical Platforms & Jumping Sprites */}
            <div style={{
              padding: '20px 10px',
              backgroundColor: '#050711',
              backgroundImage: 'radial-gradient(circle at center, #1E1735 0%, #050711 85%)',
              borderBottom: '2px solid #2C3254',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '270px',
              justifyContent: 'space-between'
            }}>
              {/* Progress Bar */}
              <div style={{ width: '95%', marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', color: '#F4D35E' }} className="font-display">
                  <span>OBBY STAGE {platformIndex} PROGRESS</span>
                  <span>{obbyProgress}% COMPLETE</span>
                </div>
                <div style={{ width: '100%', background: '#1E2238', height: '12px', borderRadius: '6px', border: '2px solid #3E4670', overflow: 'hidden' }}>
                  <div style={{ width: `${obbyProgress}%`, height: '100%', background: 'linear-gradient(90deg, #F4D35E, #38BDF8)', transition: 'width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)' }} />
                </div>
              </div>

              {/* Physical Floating Platformer Scene */}
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'flex-end', padding: '15px 0', minHeight: '140px' }}>
                {/* Saketh Platform & Character */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  animation: 'floatBlock 2.4s ease-in-out infinite'
                }}>
                  <div style={{
                    animation: isJumping ? 'jumpArc 0.6s cubic-bezier(0.1, 0.8, 0.2, 1) forwards' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <div className="font-display" style={{ fontSize: '9px', background: '#38BDF8', color: '#000', padding: '2px 6px', borderRadius: '4px', marginBottom: '4px' }}>SAKETH</div>
                    <SpriteRenderer spriteName="roblox_block" scale={4} animation="bounce" />
                  </div>
                  {/* Floating Neon Block */}
                  <div style={{
                    width: '85px',
                    height: '18px',
                    background: '#1A2238',
                    border: '3px solid #38BDF8',
                    boxShadow: 'inset -3px -3px #0B0E17, 0 6px 12px rgba(56,189,248,0.4)',
                    marginTop: '2px'
                  }} />
                </div>
                
                {/* Rotating Laser Obstacle in Space (No Emojis!) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                  <div className="font-display" style={{ fontSize: '8px', color: '#E64C4C', marginBottom: '6px', animation: 'pulse 0.8s infinite' }}>HAZARD</div>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    border: '4px dashed #E64C4C',
                    background: 'radial-gradient(circle, #E64C4C 20%, transparent 70%)',
                    boxShadow: '0 0 15px #E64C4C',
                    animation: 'laserSpin 2.5s linear infinite'
                  }} />
                </div>

                {/* Sharon Platform & Character */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  animation: 'floatBlock 2.8s ease-in-out infinite 0.4s'
                }}>
                  <div style={{
                    animation: isJumping ? 'jumpArc 0.6s cubic-bezier(0.1, 0.8, 0.2, 1) 0.1s forwards' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <div className="font-display" style={{ fontSize: '9px', background: '#E0A8F2', color: '#000', padding: '2px 6px', borderRadius: '4px', marginBottom: '4px' }}>SHARON ("PAPI")</div>
                    <SpriteRenderer spriteName="sharon_idle" scale={3} animation="bounce" />
                  </div>
                  {/* Floating Neon Block */}
                  <div style={{
                    width: '85px',
                    height: '18px',
                    background: '#241935',
                    border: '3px solid #E0A8F2',
                    boxShadow: 'inset -3px -3px #110C17, 0 6px 12px rgba(224,168,242,0.4)',
                    marginTop: '2px'
                  }} />
                </div>
              </div>

              {/* Live Action/Chat Banner */}
              <div style={{ width: '95%', padding: '10px', backgroundColor: '#131626', border: '1px solid #434D80', borderRadius: '8px', marginTop: '8px' }}>
                <div className="font-dialogue" style={{ fontSize: '18px', color: '#FFF6E0', textAlign: 'center', fontStyle: 'italic', lineHeight: '1.3' }}>
                  {lastAction}
                </div>
              </div>
            </div>

            {/* Action Buttons Area */}
            <div style={{ padding: '14px', backgroundColor: '#1A1E33', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="font-display" style={{ fontSize: '11px', color: '#A9A9C9', textAlign: 'center' }}>
                CHOOSE YOUR CO-OP OBBY MOVES:
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => performObbyAction('jump', "Saketh: 'Watch out for that spinning laser beam, papi!! [LEAP JUMP LAUNCHED]'")}
                  disabled={isJumping}
                  className="pixel-btn"
                  style={{ flex: '1 1 45%', padding: '12px', background: isJumping ? '#475569' : '#38BDF8', color: '#000', fontSize: '13px', fontWeight: 'bold' }}
                >
                  [JUMP] TIMED DOUBLE JUMP OVER HAZARD
                </button>
                <button
                  onClick={() => performObbyAction('tease', "Sharon ('Papi'): 'Did you seriously just call me papi while leaping across space?! [DISCORD LAUGH]'")}
                  className="pixel-btn"
                  style={{ flex: '1 1 45%', padding: '12px', background: '#E0A8F2', color: '#000', fontSize: '13px', fontWeight: 'bold' }}
                >
                  [VOICE] TEASE "PAPI" ON DISCORD
                </button>
              </div>
              <button
                onClick={() => performObbyAction('rescue', "Saketh: 'I literally caught your character right before falling off block #3! Best team ever!'")}
                disabled={isJumping}
                className="pixel-btn"
                style={{ width: '100%', padding: '12px', background: isJumping ? '#475569' : '#F4D35E', color: '#000', fontSize: '13px', fontWeight: 'bold', boxShadow: isJumping ? 'none' : '0 0 12px rgba(244,211,94,0.5)' }}
              >
                [RESCUE] CATCH SHARON BEFORE SHE FALLS (+25%)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Banter Dialogue transition */}
      {stage === 'banter' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px' }}>
          <DialogueBox
            lines={chapterData.robloxBanter}
            onComplete={() => setStage('reels_game')}
            palette="bahrain"
            soundEnabled={soundEnabled}
          />
        </div>
      )}

      {/* INSTAGRAM REELS MOBILE MARATHON MINI-GAME (Upgraded with Video Player UI & Zero Emojis) */}
      {stage === 'reels_game' && (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
          <div style={{
            width: '100%',
            maxWidth: '380px',
            backgroundColor: '#0A0A12',
            border: '4px solid #E0A8F2',
            borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: '0 10px 35px rgba(0,0,0,0.95)',
            display: 'flex',
            flexDirection: 'column',
            color: '#FFF'
          }}>
            {/* Reel Top Bezel */}
            <div style={{ padding: '12px', background: '#161324', borderBottom: '2px solid #E0A8F2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-display" style={{ fontSize: '12px', color: '#FFF' }}>[MOBILE] REELS FEED</span>
              <span className="font-display" style={{ fontSize: '11px', color: '#E0A8F2' }}>2:45 AM IN INDIA</span>
            </div>

            {/* Reel Video Display Card (No Emojis!) */}
            <div style={{ padding: '18px', background: 'linear-gradient(180deg, #1C152C 0%, #0F0A1A 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '240px', justifyContent: 'space-between' }}>
              {/* Simulated Pixel Video Viewport */}
              <div style={{
                width: '100%',
                height: '110px',
                background: '#07050E',
                border: '2px solid #483A6B',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '12px',
                boxShadow: 'inset 0 0 15px rgba(224,168,242,0.2)'
              }}>
                <div style={{ position: 'absolute', top: '6px', left: '8px', fontSize: '9px', color: '#E64C4C' }} className="font-display">● REC [VIRAL REEL #{activeReelIdx + 1}]</div>
                <div style={{ position: 'absolute', top: '6px', right: '8px', fontSize: '9px', color: '#38BDF8' }} className="font-display">AUDIO: ■■■■■■□</div>
                <SpriteRenderer spriteName={activeReelIdx % 2 === 0 ? "sparkle" : "star"} scale={4} animation="bounce" style={{ marginTop: '10px' }} />
                <div className="font-display" style={{ fontSize: '10px', color: '#A9A9C9', marginTop: '6px' }}>[STREAMING FROM BAHRAIN SERVERS]</div>
              </div>
              
              <div style={{ width: '100%', textAlign: 'center', padding: '10px', background: 'rgba(0,0,0,0.6)', border: '1px solid #E0A8F2', borderRadius: '8px' }}>
                <div className="font-dialogue" style={{ fontSize: '18px', color: '#FFF', fontWeight: 'bold', marginBottom: '4px' }}>
                  {REELS[activeReelIdx].title}
                </div>
                <div className="font-display" style={{ fontSize: '11px', color: '#F472B6' }}>
                  [VIRAL TREND] • {REELS[activeReelIdx].likes} LIKES
                </div>
              </div>

              {reelsSent.includes(REELS[activeReelIdx].id) ? (
                <div className="font-dialogue" style={{ width: '100%', marginTop: '12px', padding: '10px', background: '#182238', border: '2px dashed #38BDF8', borderRadius: '8px', color: '#FDE047', textAlign: 'center', fontSize: '17px' }}>
                  {REELS[activeReelIdx].reaction}
                </div>
              ) : (
                <div className="font-dialogue" style={{ marginTop: '12px', color: '#A9A9C9', fontSize: '15px', fontStyle: 'italic', textAlign: 'center' }}>
                  [ACTION REQUIRED]: Share this Reel with Sharon across 3,000 miles!
                </div>
              )}
            </div>

            {/* Controls */}
            <div style={{ padding: '14px', background: '#13111E', borderTop: '2px solid #2B263E', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#F4D35E' }} className="font-display">
                <span>REEL MARATHON PROGRESS:</span>
                <span>{reelsSent.length} OF {REELS.length} SENT</span>
              </div>
              
              <button
                onClick={() => handleSendReel(REELS[activeReelIdx])}
                className="pixel-btn"
                disabled={reelsSent.includes(REELS[activeReelIdx].id)}
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  background: reelsSent.includes(REELS[activeReelIdx].id) ? '#374151' : '#E0A8F2',
                  color: reelsSent.includes(REELS[activeReelIdx].id) ? '#9CA3AF' : '#000',
                  boxShadow: reelsSent.includes(REELS[activeReelIdx].id) ? 'none' : '0 0 14px rgba(224,168,242,0.5)'
                }}
              >
                {reelsSent.includes(REELS[activeReelIdx].id) ? '[SENT] REEL ALREADY SHARED WITH SHARON' : '[SEND] SHARE REEL WITH SHARON (PAPI) NOW!'}
              </button>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    chiptune.playTap(soundEnabled);
                    setActiveReelIdx((activeReelIdx + REELS.length - 1) % REELS.length);
                  }}
                  className="pixel-btn"
                  style={{ flex: 1, padding: '8px', background: '#262238', color: '#CBD5E1', fontSize: '12px' }}
                >
                  &lt;- PREV REEL
                </button>
                <button
                  onClick={() => {
                    chiptune.playTap(soundEnabled);
                    setActiveReelIdx((activeReelIdx + 1) % REELS.length);
                  }}
                  className="pixel-btn"
                  style={{ flex: 1, padding: '8px', background: '#262238', color: '#CBD5E1', fontSize: '12px' }}
                >
                  NEXT REEL -&gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 20-Questions Deep Bonding Call */}
      {stage === 'questions' && (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
          <div style={{
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#111526',
            border: '4px solid #38BDF8',
            borderRadius: '16px',
            padding: '22px',
            boxShadow: '0 12px 35px rgba(0,0,0,0.95), 0 0 25px rgba(56,189,248,0.35)',
            display: 'flex',
            flexDirection: 'column',
            color: '#FFF'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #2C355E', paddingBottom: '10px' }}>
              <span className="font-display" style={{ fontSize: '13px', color: '#38BDF8' }}>[DISCORD] LATE NIGHT VOICE CALL</span>
              <span className="font-display" style={{ fontSize: '11px', background: '#2ecc71', color: '#000', padding: '2px 8px', borderRadius: '4px' }}>● 3:15 AM</span>
            </div>

            <div className="font-dialogue" style={{ fontSize: '20px', background: '#191F38', padding: '16px', border: '2px solid #F4D35E', color: '#FFF6E0', marginBottom: '18px', borderRadius: '8px', lineHeight: '1.4' }}>
              <b>[Sharon says]:</b> "{chapterData.questionsGame[0].q}"
            </div>

            <div className="font-display" style={{ fontSize: '11px', color: '#F4D35E', marginBottom: '10px' }}>
              CHOOSE YOUR HONEST REPLY TO HER:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {chapterData.questionsGame[0].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    chiptune.playSelect(soundEnabled);
                    gameStore.logFlavor(opt.label);
                    setStage('complete');
                  }}
                  className="pixel-btn font-dialogue"
                  style={{ fontSize: '16px', padding: '12px 14px', textAlign: 'left', background: '#232A4D', color: '#FFF', border: '2px solid #485494', lineHeight: '1.3' }}
                >
                  "{opt.label}"
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Complete Screen (Upgraded with Sprite Renderer Icons & Zero Emojis) */}
      {stage === 'complete' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ background: '#131728', border: '4px solid #38BDF8', padding: '26px', borderRadius: '14px', textAlign: 'center', maxWidth: '500px', boxShadow: '0 10px 35px rgba(0,0,0,0.95)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '16px' }}>
              <SpriteRenderer spriteName="laptop" scale={3} animation="bounce" />
              <SpriteRenderer spriteName="heart" scale={4} animation="bounce" />
              <SpriteRenderer spriteName="phone" scale={3} animation="bounce" />
            </div>
            <div className="font-display" style={{ fontSize: '16px', color: '#38BDF8', marginBottom: '12px' }}>
              STAGE 3 COMPLETE: BEST FRIENDS &amp; FALLING FAST!
            </div>
            <div className="font-dialogue" style={{ fontSize: '20px', color: '#FFF', marginBottom: '22px', fontStyle: 'italic', lineHeight: '1.4' }}>
              "We went from total strangers separated by a 21-day wait to inseparable best friends playing Roblox obbies, sharing Reels until 3 AM, and calling each other 'papi' across 3,000 miles."
            </div>
            <button
              onClick={() => {
                gameStore.completeChapter(3);
                if (onComplete) onComplete();
              }}
              className="pixel-btn"
              style={{ padding: '14px 32px', fontSize: '16px', background: '#38BDF8', color: '#000', fontWeight: 'bold', boxShadow: '0 0 15px rgba(56,189,248,0.5)' }}
            >
              [PROCEED TO CHAPTER 4: RAINY NIGHT SUPPORT] -&gt;
            </button>
          </div>
        </div>
      )}
    </RoomHub>
  );
}
