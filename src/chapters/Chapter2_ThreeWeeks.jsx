import React, { useState } from 'react';
import RoomHub from '../components/RoomHub';
import DialogueBox from '../components/DialogueBox';
import storyData from '../data/storyData.json';
import { chiptune } from '../audio/chiptune';
import { gameStore } from '../state/gameStore';

export default function Chapter2_ThreeWeeks({ onComplete, soundEnabled }) {
  // Stages: 'room' -> 'intro_dialogue' -> 'calendar_loop' -> 'notification' -> 'reconnect_dialogue'
  const [stage, setStage] = useState('room');
  const [day, setDay] = useState(1);
  const [weather, setWeather] = useState('rain');
  const [dailyThought, setDailyThought] = useState("Day 1: Just checked @art._pngz on my phone. No response yet, but artists take time!");
  
  const chapterData = storyData.chapters["2"];

  const handleRoomInteract = (objectKey) => {
    if (objectKey === 'calendar' && stage === 'room') {
      chiptune.playSelect(soundEnabled);
      setStage('intro_dialogue');
    } else if (objectKey === 'phone' && stage === 'notification') {
      chiptune.playConfetti(soundEnabled);
      setStage('reconnect_dialogue');
    }
  };

  const advanceDays = (increment) => {
    chiptune.playTap(soundEnabled);
    const nextDay = Math.min(21, day + increment);
    setDay(nextDay);

    if (nextDay >= 21) {
      chiptune.playMysticChime(soundEnabled);
      setDailyThought("🚨 BZZZ! BZZZ! YOUR PHONE ON THE BED JUST VIBRATED WITH AN INSTAGRAM DM!");
      setStage('notification');
    } else if (nextDay >= 15) {
      setWeather('day');
      setDailyThought(chapterData.dailyReflections["day18"] || `Day ${nextDay}: Warm sunlight in India. Still checking @art._pngz occasionally.`);
    } else if (nextDay >= 8) {
      setWeather('twilight');
      setDailyThought(chapterData.dailyReflections["day12"] || `Day ${nextDay}: Two weeks of silence. No regrets sending that art compliment.`);
    } else {
      setWeather('rain');
      setDailyThought(chapterData.dailyReflections["day5"] || `Day ${nextDay}: Monsoon rains outside my window today. Staying patient.`);
    }
  };

  return (
    <RoomHub
      chapterTitle="CHAPTER 2"
      chapterSubtitle="Three Weeks of Silence"
      timeOfDay={weather}
      activeObject={stage === 'notification' ? 'phone' : 'calendar'}
      onInteract={handleRoomInteract}
      soundEnabled={soundEnabled}
      customObservation={
        stage === 'notification'
          ? "🚨 BZZZT! YOUR BED PHONE JUST BURST TO LIFE! @art._pngz REPLIED! [CLICK PHONE ON BED]"
          : `[Wall Calendar] ${dailyThought}`
      }
    >
      {/* Intro Dialogue when clicking Calendar initially */}
      {stage === 'intro_dialogue' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px' }}>
          <DialogueBox
            lines={chapterData.intro}
            onComplete={() => setStage('calendar_loop')}
            palette="night"
            soundEnabled={soundEnabled}
          />
        </div>
      )}

      {/* Interactive Time-Lapse Waiting Mini-Game */}
      {stage === 'calendar_loop' && (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
          <div style={{
            width: '100%',
            maxWidth: '460px',
            backgroundColor: '#131526',
            border: '4px solid #F4D35E',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 12px 35px rgba(0,0,0,0.95), 0 0 20px rgba(244,211,94,0.25)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#FFF',
            textAlign: 'center'
          }}>
            <div className="font-display" style={{ fontSize: '14px', color: '#F4D35E', marginBottom: '16px' }}>
              🗓️ TIME-LAPSE: WAITING FOR AN ARTIST'S REPLY
            </div>

            {/* Retro Calendar Flip Piece */}
            <div style={{
              width: '170px',
              height: '165px',
              backgroundColor: '#1E293B',
              border: '4px solid #FFF',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 25px rgba(0,0,0,0.8)',
              marginBottom: '20px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: '#DC2626', color: '#FFF', textAlign: 'center', padding: '6px', fontSize: '11px' }} className="font-display">
                OCTOBER 2024
              </div>
              <span className="font-display" style={{ fontSize: '56px', marginTop: '16px', color: '#FFF', textShadow: '2px 2px 0 #000' }}>
                {day}
              </span>
              <span className="font-dialogue" style={{ fontSize: '15px', color: '#E2E8F0', fontWeight: 'bold' }}>
                Days of Silence
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{ width: '100%', backgroundColor: '#2B3252', height: '14px', borderRadius: '7px', overflow: 'hidden', border: '2px solid #4E598A', marginBottom: '16px' }}>
              <div style={{ width: `${(day / 21) * 100}%`, height: '100%', backgroundColor: '#2ecc71', transition: 'width 0.2s ease-out' }} />
            </div>

            {/* Reflection Thought Box */}
            <div style={{ padding: '14px', backgroundColor: '#0C0E1A', border: '2px solid #3B4371', borderRadius: '8px', width: '100%', marginBottom: '20px', minHeight: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="font-dialogue" style={{ fontSize: '18px', color: '#FFF6E0', fontStyle: 'italic', lineHeight: '1.4' }}>
                💭 "{dailyThought}"
              </div>
            </div>

            {/* Advancement Controls */}
            <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
              <button
                onClick={() => advanceDays(1)}
                className="pixel-btn"
                style={{ flex: 1, fontSize: '14px', padding: '14px', background: '#4A5568', color: '#FFF', fontWeight: 'bold' }}
              >
                ⏭️ NEXT DAY (+1)
              </button>
              <button
                onClick={() => advanceDays(5)}
                className="pixel-btn"
                style={{ flex: 1.2, fontSize: '14px', padding: '14px', background: '#F4D35E', color: '#000', fontWeight: 'bold', boxShadow: '0 0 12px rgba(244,211,94,0.4)' }}
              >
                ⏩ FAST FORWARD (+5)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pixgram Notification Alert floating when Day 21 triggers before clicking phone */}
      {stage === 'notification' && (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
          <div style={{
            width: '100%',
            maxWidth: '420px',
            backgroundColor: '#190E2A',
            border: '4px solid #FF5E7E',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            boxShadow: '0 0 35px rgba(255, 94, 126, 0.6)',
            animation: 'pulse 1s infinite'
          }}>
            <div style={{ fontSize: '54px', marginBottom: '10px' }}>💌 📱</div>
            <div className="font-display" style={{ fontSize: '16px', color: '#FF5E7E', marginBottom: '10px' }}>
              PIXGRAM NOTIFICATION ALERT!
            </div>
            <div className="font-dialogue" style={{ fontSize: '18px', color: '#FFF', marginBottom: '18px', lineHeight: '1.4' }}>
              <b>@art._pngz (Sharon)</b> just accepted your message request after 3 weeks and replied to your art compliment!
            </div>
            <button
              onClick={() => {
                chiptune.playSelect(soundEnabled);
                setStage('reconnect_dialogue');
              }}
              className="pixel-btn"
              style={{ padding: '14px 28px', background: '#2ecc71', color: '#000', fontSize: '15px', fontWeight: 'bold' }}
            >
              💬 OPEN @art._pngz REPLY NOW
            </button>
          </div>
        </div>
      )}

      {/* Reconnection Dialogue after clicking phone on Day 21 */}
      {stage === 'reconnect_dialogue' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px' }}>
          <DialogueBox
            lines={chapterData.reconnection}
            onComplete={() => {
              gameStore.completeChapter(2);
              if (onComplete) onComplete();
            }}
            palette="bahrain"
            soundEnabled={soundEnabled}
          />
        </div>
      )}
    </RoomHub>
  );
}
