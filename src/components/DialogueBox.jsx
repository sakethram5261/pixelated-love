import React, { useState, useEffect, useRef } from 'react';
import SpriteRenderer from '../engine/SpriteRenderer';
import { chiptune } from '../audio/chiptune';
import { gameStore } from '../state/gameStore';

export default function DialogueBox({ 
  lines = [], 
  onComplete, 
  onChoiceSelect,
  palette = 'night', // 'india' | 'bahrain' | 'night' | 'violet'
  soundEnabled = true 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef(null);

  const currentLine = lines[currentIndex] || {};

  useEffect(() => {
    if (!currentLine || !currentLine.text) return;
    setDisplayedText('');
    setIsTyping(true);
    let charIdx = 0;
    const fullText = currentLine.text;

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      charIdx++;
      setDisplayedText(fullText.slice(0, charIdx));
      
      // Play character blip sound on words
      if (charIdx % 3 === 0 && fullText[charIdx] !== ' ') {
        chiptune.playBlip(soundEnabled, 440 + (charIdx % 5) * 40);
      }

      if (charIdx >= fullText.length) {
        clearInterval(timerRef.current);
        setIsTyping(false);
      }
    }, 35); // Retro character typing speed

    return () => clearInterval(timerRef.current);
  }, [currentIndex, currentLine]);

  const handleTap = () => {
    chiptune.playTap(soundEnabled);
    if (isTyping) {
      clearInterval(timerRef.current);
      setDisplayedText(currentLine.text || '');
      setIsTyping(false);
    } else if (!currentLine.choices) {
      if (currentIndex + 1 < lines.length) {
        setCurrentIndex(currentIndex + 1);
      } else if (onComplete) {
        onComplete();
      }
    }
  };

  const handleSkip = (e) => {
    e.stopPropagation();
    chiptune.playSelect(soundEnabled);
    clearInterval(timerRef.current);
    if (onComplete) onComplete();
  };

  const handleChoice = (choice, e) => {
    e.stopPropagation();
    chiptune.playSelect(soundEnabled);
    if (choice.tone) gameStore.logFlavor(choice.label);
    if (choice.flag) gameStore.setPathTone(choice.flag);
    if (onChoiceSelect) onChoiceSelect(choice);
  };

  if (!lines.length || !currentLine) return null;

  // Choose border accent color based on palette
  const borderColor = palette === 'india' ? 'var(--in-accent)' : 
                      palette === 'bahrain' ? 'var(--bh-accent)' : 
                      palette === 'violet' ? 'var(--my-accent)' : 'var(--nt-accent)';

  return (
    <div 
      onClick={handleTap} 
      className="dialogue-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '12px',
        width: '100%',
        backgroundColor: 'rgba(10, 10, 30, 0.95)',
        border: `4px solid ${borderColor}`,
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {/* Top Header Row: Speaker & Fast Forward Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="font-display" style={{ fontSize: '14px', color: '#F4C95D', textTransform: 'uppercase' }}>
          {currentLine.speaker || 'Narrator'}
        </span>
        <button 
          onClick={handleSkip}
          className="font-display"
          style={{
            background: 'transparent',
            border: '1px solid #7B3FA0',
            color: '#E0A8F2',
            padding: '4px 8px',
            fontSize: '10px',
            cursor: 'pointer'
          }}
        >
          SKIP / FF &gt;&gt;
        </button>
      </div>

      {/* Content Row: Emotion Portrait & Text */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {currentLine.portrait && (
          <div style={{ 
            border: '2px solid #F4C95D', 
            backgroundColor: '#1B1B4D', 
            padding: '4px', 
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <SpriteRenderer 
              spriteName={currentLine.portrait} 
              scale={3} 
              animation="idle" 
            />
          </div>
        )}
        <div className="font-dialogue" style={{ flex: 1, minHeight: '60px', color: '#FFF' }}>
          {displayedText}
          {isTyping && <span style={{ opacity: 0.8 }}>_</span>}
          {!isTyping && !currentLine.choices && (
            <span style={{ display: 'inline-block', marginLeft: '8px', animation: 'pulse 1s infinite', color: '#F4C95D' }}>
              ▼
            </span>
          )}
        </div>
      </div>

      {/* Branching Options / Choices */}
      {!isTyping && currentLine.choices && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
          {currentLine.choices.map((ch, idx) => (
            <button
              key={idx}
              onClick={(e) => handleChoice(ch, e)}
              className="pixel-btn font-dialogue"
              style={{ fontSize: '20px', padding: '10px', textAlign: 'left', minHeight: '44px' }}
            >
              ▶ {ch.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
