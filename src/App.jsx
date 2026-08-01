import React, { useEffect } from 'react';
import { useGameState, gameStore } from './state/gameStore';
import ArcadeMap from './components/ArcadeMap';
import HomePage from './components/HomePage';
import Chapter1_TheDare from './chapters/Chapter1_TheDare';
import Chapter2_ThreeWeeks from './chapters/Chapter2_ThreeWeeks';
import Chapter3_GettingClose from './chapters/Chapter3_GettingClose';
import Chapter4_TheComplication from './chapters/Chapter4_TheComplication';
import Chapter5_TheShift from './chapters/Chapter5_TheShift';
import Chapter6_Palmistry from './chapters/Chapter6_Palmistry';
import Chapter7_LongDistance from './chapters/Chapter7_LongDistance';
import Chapter8_PlanningSurprise from './chapters/Chapter8_PlanningSurprise';
import Finale_SurpriseArrival from './chapters/Finale_SurpriseArrival';
import { chiptune } from './audio/chiptune';

export default function App() {
  const gameState = useGameState();
  const { currentChapter, settings } = gameState;

  useEffect(() => {
    document.body.setAttribute('data-reduced-motion', String(settings.reducedMotion));
  }, [settings.reducedMotion]);

  const handleSelectChapter = (id) => {
    gameStore.setChapter(id);
  };

  const handleReturnToMap = () => {
    chiptune.playSelect(settings.sound);
    gameStore.setChapter(0);
  };

  return (
    <div className="arcade-cabinet-viewport" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* If inside a chapter, show a discreet Back to Map HUD bar at top */}
      {currentChapter > 0 && (
        <div style={{
          backgroundColor: '#0A0A14',
          borderBottom: '2px solid #33336B',
          padding: '6px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 50
        }}>
          <button
            onClick={handleReturnToMap}
            className="font-display"
            style={{
              background: 'transparent',
              border: '1px solid #FFF',
              color: '#FFF',
              padding: '4px 8px',
              fontSize: '10px',
              cursor: 'pointer'
            }}
          >
            ◀ MAP HUB
          </button>
          <span className="font-display" style={{ fontSize: '10px', color: '#F4C95D' }}>
            STAGE {currentChapter} / 9
          </span>
          <button 
            onClick={() => gameStore.toggleSound()}
            style={{ background: 'transparent', border: 'none', color: '#FFF', fontSize: '12px', cursor: 'pointer' }}
          >
            {settings.sound ? '🔊' : '🔇'}
          </button>
        </div>
      )}

      {currentChapter === -1 && (
        <HomePage gameState={gameState} />
      )}
      {currentChapter === 0 && (
        <ArcadeMap gameState={gameState} onSelectChapter={handleSelectChapter} />
      )}
      {currentChapter === 1 && (
        <Chapter1_TheDare onComplete={() => gameStore.setChapter(0)} soundEnabled={settings.sound} />
      )}
      {currentChapter === 2 && (
        <Chapter2_ThreeWeeks onComplete={() => gameStore.setChapter(0)} soundEnabled={settings.sound} />
      )}
      {currentChapter === 3 && (
        <Chapter3_GettingClose onComplete={() => gameStore.setChapter(0)} soundEnabled={settings.sound} />
      )}
      {currentChapter === 4 && (
        <Chapter4_TheComplication onComplete={() => gameStore.setChapter(0)} soundEnabled={settings.sound} />
      )}
      {currentChapter === 5 && (
        <Chapter5_TheShift onComplete={() => gameStore.setChapter(0)} soundEnabled={settings.sound} />
      )}
      {currentChapter === 6 && (
        <Chapter6_Palmistry onComplete={() => gameStore.setChapter(0)} soundEnabled={settings.sound} />
      )}
      {currentChapter === 7 && (
        <Chapter7_LongDistance onComplete={() => gameStore.setChapter(0)} soundEnabled={settings.sound} />
      )}
      {currentChapter === 8 && (
        <Chapter8_PlanningSurprise onComplete={() => gameStore.setChapter(0)} soundEnabled={settings.sound} />
      )}
      {currentChapter === 9 && (
        <Finale_SurpriseArrival onComplete={() => gameStore.setChapter(0)} soundEnabled={settings.sound} gameState={gameState} />
      )}
    </div>
  );
}
