import React, { useEffect, useRef } from 'react';
import { SPRITES, PALETTE_MAP } from './sprites';

export default function SpriteRenderer({ 
  spriteName, 
  scale = 3, 
  animation = 'idle', // 'idle' | 'bounce' | 'walk' | 'spin'
  className = '',
  onClick = null,
  style = {}
}) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Determine frames to cycle through
    let frames = [SPRITES[spriteName] || SPRITES['heart']];
    if (spriteName === 'saketh_walk') {
      frames = [SPRITES['saketh_idle'], SPRITES['saketh_walk1']];
    } else if (spriteName === 'sharon_walk') {
      frames = [SPRITES['sharon_idle'], SPRITES['sharon_walk1']];
    }

    const currentSprite = frames[0];
    const width = currentSprite[0].length;
    const height = currentSprite.length;

    canvas.width = width * scale;
    canvas.height = height * scale;

    let animId;
    let lastTime = 0;
    const fps = 8; // Fixed retro low frame rate (8-12 fps)
    const interval = 1000 / fps;

    function drawFrame(frameIdx, yOffset = 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const matrix = frames[frameIdx % frames.length];

      for (let y = 0; y < matrix.length; y++) {
        const row = matrix[y];
        for (let x = 0; x < row.length; x++) {
          const char = row[x];
          if (char !== '.' && PALETTE_MAP[char]) {
            ctx.fillStyle = PALETTE_MAP[char];
            ctx.fillRect(x * scale, (y + yOffset) * scale, scale, scale);
          } else if (char !== '.' && char.startsWith('I') || char.startsWith('B') || char.startsWith('M')) {
            // Two-character key handling (I1, B2, etc.)
            let fullKey = char;
            if (x + 1 < row.length && !isNaN(row[x + 1])) {
              fullKey = char + row[x + 1];
            }
            if (PALETTE_MAP[fullKey]) {
              ctx.fillStyle = PALETTE_MAP[fullKey];
              ctx.fillRect(x * scale, (y + yOffset) * scale, scale, scale);
            }
          }
        }
      }
    }

    function renderLoop(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;

      if (delta > interval) {
        lastTime = timestamp - (delta % interval);
        frameRef.current = (frameRef.current + 1) % 100;

        let yOffset = 0;
        if (animation === 'bounce' && (frameRef.current % 4 < 2)) {
          yOffset = -1; // Subtle pixel bounce
        }

        const frameIdx = animation === 'walk' ? Math.floor(frameRef.current / 2) : 0;
        drawFrame(frameIdx, yOffset);
      }

      animId = requestAnimationFrame(renderLoop);
    }

    drawFrame(0, 0);
    animId = requestAnimationFrame(renderLoop);

    return () => cancelAnimationFrame(animId);
  }, [spriteName, scale, animation]);

  return (
    <canvas
      ref={canvasRef}
      className={`sprite-canvas ${className}`}
      onClick={onClick}
      style={{
        imageRendering: 'pixelated',
        display: 'inline-block',
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
    />
  );
}
