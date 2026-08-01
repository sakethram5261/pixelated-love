import React, { useEffect, useRef } from 'react';

const PALETTES = [
  { outer: '#FF5E7E', inner: '#FF8EA3', center: '#FFF066' }, // Rose Pink
  { outer: '#F4D35E', inner: '#FFE57F', center: '#795548' }, // Sunflower Gold
  { outer: '#3A86EF', inner: '#64B5F6', center: '#FFF' },    // Electric Blue
  { outer: '#8338EC', inner: '#B388FF', center: '#FFD54F' }, // Purple Anemone
  { outer: '#FF0055', inner: '#FF5252', center: '#FFEE58' }, // Ruby Red
  { outer: '#00F5D4', inner: '#80DFEA', center: '#FFF' },    // Bright Cyan
  { outer: '#FF9E00', inner: '#FFB74D', center: '#5D4037' }, // Orange Dahlia
  { outer: '#FF007F', inner: '#FF80AB', center: '#FFFF00' }  // Magenta Bloom
];

export default function BloomingFlowersCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate spiral flower positions using Golden Ratio (Phyllotaxis)
    const totalFlowers = 220;
    const flowers = [];
    const GOLDEN_ANGLE = 137.5 * (Math.PI / 180);

    for (let i = 0; i < totalFlowers; i++) {
      const radius = 35 * Math.sqrt(i + 1);
      const angle = i * GOLDEN_ANGLE;

      flowers.push({
        baseDist: radius,
        angle: angle,
        maxRadius: 28 + (i % 5) * 8,
        palette: PALETTES[i % PALETTES.length],
        petals: 5 + (i % 4) * 2,
        rotSpeed: (i % 2 === 0 ? 1 : -1) * (0.003 + (i % 3) * 0.002),
        currentRot: Math.random() * Math.PI * 2,
        delay: i * 1.8, // Staggered blooming from center out
        currentScale: 0
      });
    }

    let time = 0;

    const drawFlower = (x, y, radius, flower, time) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(flower.currentRot + time * flower.rotSpeed);

      const numPetals = flower.petals;
      const petalAngle = (Math.PI * 2) / numPetals;

      // Draw Petals
      for (let p = 0; p < numPetals; p++) {
        ctx.save();
        ctx.rotate(p * petalAngle);

        // Outer Petal
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(radius * 0.7, -radius * 0.6, radius * 1.1, 0);
        ctx.quadraticCurveTo(radius * 0.7, radius * 0.6, 0, 0);
        ctx.fillStyle = flower.palette.outer;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 8;
        ctx.fill();

        // Inner Petal Layer
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(radius * 0.4, -radius * 0.35, radius * 0.75, 0);
        ctx.quadraticCurveTo(radius * 0.4, radius * 0.35, 0, 0);
        ctx.fillStyle = flower.palette.inner;
        ctx.fill();

        ctx.restore();
      }

      // Center Flower Core
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = flower.palette.center;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
      ctx.shadowBlur = 6;
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Deep rich background frame
      ctx.fillStyle = '#0B0813';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Render flowers in spiral order
      flowers.forEach((flower) => {
        if (time > flower.delay) {
          if (flower.currentScale < 1) {
            flower.currentScale += 0.015; // Smooth bloom transition
          }
        }

        if (flower.currentScale > 0) {
          // Slow continuous outwards spiral motion
          const currentDist = flower.baseDist + Math.sin(time * 0.01 + flower.delay) * 10;
          const x = centerX + Math.cos(flower.angle) * currentDist;
          const y = centerY + Math.sin(flower.angle) * currentDist;

          const currentRadius = flower.maxRadius * flower.currentScale;
          drawFlower(x, y, currentRadius, flower, time);
        }
      });

      // Central Vignette for text readability
      const vignette = ctx.createRadialGradient(centerX, centerY, 80, centerX, centerY, Math.max(width, height) * 0.7);
      vignette.addColorStop(0, 'rgba(11, 8, 19, 0.85)');
      vignette.addColorStop(0.5, 'rgba(11, 8, 19, 0.5)');
      vignette.addColorStop(1, 'rgba(11, 8, 19, 0.1)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
}
