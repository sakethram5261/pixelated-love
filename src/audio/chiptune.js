// Web Audio API Retro Chiptune & Sound Juice Engine
// Generates chunky sound effects programmatically with zero external dependencies.

let audioCtx = null;

function getContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const chiptune = {
  playBlip: (soundEnabled = true, pitch = 440) => {
    if (!soundEnabled) return;
    try {
      const ctx = getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.error('Audio error:', e);
    }
  },

  playTap: (soundEnabled = true) => {
    chiptune.playBlip(soundEnabled, 660);
  },

  playSelect: (soundEnabled = true) => {
    if (!soundEnabled) return;
    try {
      const ctx = getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.06); // E5
      
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  },

  playConfetti: (soundEnabled = true) => {
    if (!soundEnabled) return;
    try {
      const ctx = getContext();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C major arpeggio
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        const start = ctx.currentTime + idx * 0.08;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.2);
      });
    } catch (e) {}
  },

  playMysticChime: (soundEnabled = true) => {
    if (!soundEnabled) return;
    try {
      const ctx = getContext();
      // Mystical chord for Palmistry reveal (A minor / violet resonance)
      const notes = [440, 523.25, 659.25, 880];
      notes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq + Math.random() * 4, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      });
    } catch (e) {}
  },

  playReunionTheme: (soundEnabled = true) => {
    if (!soundEnabled) return;
    try {
      const ctx = getContext();
      // Triumphant 6-note retro swell
      const melody = [440, 554.37, 659.25, 880, 740, 880]; // A major triumphant
      melody.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        const start = ctx.currentTime + idx * 0.2;
        const duration = idx === 5 ? 0.8 : 0.2;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + duration);
      });
    } catch (e) {}
  }
};
