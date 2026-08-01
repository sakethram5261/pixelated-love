import React, { useEffect, useRef } from 'react';

/**
 * BloomingFlowersCanvas:
 * An ultra-definition, cinematic romantic canvas animation featuring:
 * 1. Ethereal aurora twilight gradients that slowly breathe and shift hues.
 * 2. Hundreds of twinkling golden fireflies and bokeh stardust floating skyward.
 * 3. Realistic 3D-spinning silk cherry blossom and rose petals drifting on a gentle breeze.
 * 4. Majestic multi-layered radiant flower blossoms that glow and frame the central romance text without obstructing readability.
 * 5. Full Retina display scaling (devicePixelRatio) and dynamic resize adaptation (100dvh) to prevent any mobile bottom cutoff or blurriness.
 */
export default function BloomingFlowersCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Maintain dimensions in memory
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set high-DPI sizing for ultra-sharp mobile Retina displays
    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Color Palettes for Petals & Blooms
    const PETAL_COLORS = [
      'rgba(255, 94, 126, ',   // Rose Pink
      'rgba(255, 142, 163, ',  // Cherry Blossom Pink
      'rgba(244, 211, 94, ',   // Golden Sunlight
      'rgba(224, 168, 242, ',  // Violet Dream
      'rgba(255, 64, 129, ',   // Crimson Fuchsia
      'rgba(255, 235, 238, '   // Diamond Silk White
    ];

    const BLOOM_PALETTES = [
      { outer: '#FF5E7E', inner: '#FFB2C1', core: '#FFE57F', glow: 'rgba(255, 94, 126, 0.4)' },
      { outer: '#9C27B0', inner: '#D500F9', core: '#FFD54F', glow: 'rgba(213, 0, 249, 0.4)' },
      { outer: '#FF4081', inner: '#FF80AB', core: '#FFF6E0', glow: 'rgba(255, 64, 129, 0.4)' },
      { outer: '#FF9E00', inner: '#FFD54F', core: '#FFFFFF', glow: 'rgba(255, 158, 0, 0.4)' },
      { outer: '#3F51B5', inner: '#8C9EFF', core: '#FFE57F', glow: 'rgba(140, 158, 255, 0.4)' }
    ];

    // 1. Initialize Floating Firefly Stardust Particles
    const fireflies = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedY: -(Math.random() * 0.6 + 0.2),
      speedX: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.8 + 0.2,
      alphaSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      color: Math.random() > 0.3 ? '244, 211, 94' : '255, 255, 255' // Gold or White
    }));

    // 2. Initialize Drifting 3D Rose Petals
    const petals = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - 100,
      size: Math.random() * 14 + 8,
      speedY: Math.random() * 1.5 + 0.8,
      speedX: Math.random() * 1.0 - 0.5,
      angle: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.04,
      tilt: Math.random() * Math.PI,
      tiltSpeed: Math.random() * 0.03 + 0.01,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)]
    }));

    // 3. Initialize Radiant Perimeter Blooms (Framing the window away from center text)
    const blooms = Array.from({ length: 26 }, (_, idx) => {
      // Distribute blooms gracefully along left edge, right edge, bottom edge and top corners
      let x, y;
      const progress = idx / 26;
      if (idx % 4 === 0) {
        x = Math.random() * (width * 0.22); // Left border
        y = Math.random() * height;
      } else if (idx % 4 === 1) {
        x = width - Math.random() * (width * 0.22); // Right border
        y = Math.random() * height;
      } else if (idx % 4 === 2) {
        x = Math.random() * width; // Bottom garden horizon
        y = height - Math.random() * (height * 0.25);
      } else {
        x = Math.random() * width; // Top canopy
        y = Math.random() * (height * 0.2);
      }

      return {
        x,
        y,
        maxRadius: Math.random() * 32 + 25,
        scale: 0,
        targetScale: 0.85 + Math.random() * 0.3,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.004,
        palette: BLOOM_PALETTES[Math.floor(Math.random() * BLOOM_PALETTES.length)],
        petalsCount: Math.floor(Math.random() * 4) * 2 + 8, // 8, 10, 12, or 14 petals
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseVal: Math.random() * Math.PI,
        delay: idx * 10
      };
    });

    let time = 0;

    // Helper: Draw a glowing cinematic flower blossom
    const drawBloom = (b) => {
      if (b.scale <= 0.01) return;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);

      const r = b.maxRadius * b.scale;

      // Ambient radial glow halo
      const glowGrad = ctx.createRadialGradient(0, 0, r * 0.1, 0, 0, r * 1.6);
      glowGrad.addColorStop(0, b.palette.glow);
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, r * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Outer Petals Layer
      const step = (Math.PI * 2) / b.petalsCount;
      for (let i = 0; i < b.petalsCount; i++) {
        ctx.save();
        ctx.rotate(i * step);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(r * 0.6, -r * 0.45, r * 1.1, -r * 0.1, r, 0);
        ctx.bezierCurveTo(r * 1.1, r * 0.1, r * 0.6, r * 0.45, 0, 0);
        ctx.fillStyle = b.palette.outer;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      // Inner Crown Layer (offset angle)
      ctx.save();
      ctx.rotate(step / 2);
      for (let i = 0; i < b.petalsCount / 2; i++) {
        ctx.save();
        ctx.rotate(i * (step * 2));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(r * 0.4, -r * 0.25, r * 0.65, 0);
        ctx.quadraticCurveTo(r * 0.4, r * 0.25, 0, 0);
        ctx.fillStyle = b.palette.inner;
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();

      // Radiant Golden Core
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.24, 0, Math.PI * 2);
      ctx.fillStyle = b.palette.core;
      ctx.shadowColor = '#FFFFFF';
      ctx.shadowBlur = 10;
      ctx.fill();

      // Core details (stamen dots)
      for (let d = 0; d < 6; d++) {
        const dotAngle = d * ((Math.PI * 2) / 6);
        const dx = Math.cos(dotAngle) * (r * 0.14);
        const dy = Math.sin(dotAngle) * (r * 0.14);
        ctx.beginPath();
        ctx.arc(dx, dy, r * 0.035, 0, Math.PI * 2);
        ctx.fillStyle = '#D97706';
        ctx.fill();
      }

      ctx.restore();
    };

    // Main Animation Loop
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      // 1. Deep Midnight Cosmic Backdrop
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#0A0612');
      bgGrad.addColorStop(0.5, '#150A21');
      bgGrad.addColorStop(1, '#1E0B2B');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Ethereal Breathing Aurora Light Spots
      const auroraAlpha = 0.15 + Math.sin(time * 0.015) * 0.05;
      const auroraGrad1 = ctx.createRadialGradient(width * 0.3, height * 0.3, 50, width * 0.3, height * 0.3, width * 0.6);
      auroraGrad1.addColorStop(0, `rgba(255, 94, 126, ${auroraAlpha})`);
      auroraGrad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = auroraGrad1;
      ctx.fillRect(0, 0, width, height);

      const auroraGrad2 = ctx.createRadialGradient(width * 0.7, height * 0.7, 50, width * 0.7, height * 0.7, width * 0.6);
      auroraGrad2.addColorStop(0, `rgba(131, 56, 236, ${auroraAlpha})`);
      auroraGrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = auroraGrad2;
      ctx.fillRect(0, 0, width, height);

      // 3. Render Background Fireflies (Stardust)
      fireflies.forEach((f) => {
        f.x += f.speedX + Math.sin(time * 0.02 + f.y) * 0.3;
        f.y += f.speedY;
        if (f.y < -10) {
          f.y = height + 10;
          f.x = Math.random() * width;
        }
        if (f.x < 0) f.x = width;
        if (f.x > width) f.x = 0;

        f.alpha += f.alphaSpeed;
        if (f.alpha > 0.95 || f.alpha < 0.2) f.alphaSpeed *= -1;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${f.color}, ${Math.max(0.1, Math.min(1, f.alpha))})`;
        ctx.shadowColor = `rgba(${f.color}, 0.8)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Render Perimeter Blooms with smooth blooming & organic pulsing
      blooms.forEach((b) => {
        if (time > b.delay) {
          if (b.scale < b.targetScale) {
            b.scale += (b.targetScale - b.scale) * 0.03 + 0.002;
            if (b.scale > b.targetScale) b.scale = b.targetScale;
          }
        }
        b.rot += b.rotSpeed;
        b.pulseVal += b.pulseSpeed;
        const currentPulse = Math.sin(b.pulseVal) * 0.04;
        
        // Temporarily adjust radius for breathing effect
        const origRadius = b.maxRadius;
        b.maxRadius += origRadius * currentPulse;
        drawBloom(b);
        b.maxRadius = origRadius;
      });

      // 5. Render Falling 3D Silk Petals over Blooms
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time * 0.02 + p.angle) * 0.6;
        p.angle += p.spinSpeed;
        p.tilt += p.tiltSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        // Simulate 3D rotation by scaling width/height with trigonometric tilt
        const width3D = p.size * Math.abs(Math.cos(p.tilt)) + 2;
        const height3D = p.size * Math.abs(Math.sin(p.tilt)) + 4;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Petal shape with soft gradient shimmer
        ctx.beginPath();
        ctx.ellipse(0, 0, width3D, height3D, 0, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}0.85)`;
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 4;
        ctx.fill();

        // Subtle center fold highlight on petal
        ctx.beginPath();
        ctx.ellipse(0, 0, width3D * 0.5, height3D * 0.7, 0, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}0.35)`;
        ctx.fill();

        ctx.restore();
      });

      // 6. Smooth Dark Central Vignette to guarantee crystalline text contrast
      const centerGrad = ctx.createRadialGradient(
        width / 2, height / 2, Math.min(width, height) * 0.1,
        width / 2, height / 2, Math.max(width, height) * 0.75
      );
      centerGrad.addColorStop(0, 'rgba(11, 8, 19, 0.65)');
      centerGrad.addColorStop(0.6, 'rgba(11, 8, 19, 0.3)');
      centerGrad.addColorStop(1, 'rgba(11, 8, 19, 0.05)');
      ctx.fillStyle = centerGrad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1
    }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
