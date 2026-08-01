// Reactive game state management backed by LocalStorage
import { useState, useEffect } from 'react';

const STORAGE_KEY = '3000MILES_GAME_STATE';

const defaultState = {
  currentChapter: -1, // -1 = Home Title Screen, 0 = Map/Hub, 1-8 = Chapters, 9 = Finale
  unlockedChapters: [1], // Start with chapter 1 unlocked
  pathTone: null, // 'playful' | 'sincere' | 'adventurous' | null
  flavorLog: [],
  settings: {
    reducedMotion: false,
    sound: true
  }
};

class GameStore {
  constructor() {
    this.listeners = new Set();
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Always launch on the new pixelated title screen (-1) while retaining progress
        return { ...defaultState, ...parsed, currentChapter: -1 };
      }
      return { ...defaultState };
    } catch (e) {
      return { ...defaultState };
    }
  }

  saveState(newState) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  getState() {
    return this.state;
  }

  setState(updater) {
    const nextState = typeof updater === 'function' ? updater(this.state) : { ...this.state, ...updater };
    this.state = nextState;
    this.saveState(this.state);
    this.notify();
  }

  // Helper actions
  setChapter(chapterNumber) {
    this.setState({ currentChapter: chapterNumber });
  }

  completeChapter(chapterNumber) {
    const nextCap = chapterNumber + 1;
    const newUnlocked = [...new Set([...this.state.unlockedChapters, nextCap])];
    this.setState({
      unlockedChapters: newUnlocked,
      currentChapter: 0 // Return to map to see progress
    });
  }

  setPathTone(tone) {
    if (!this.state.pathTone) {
      this.setState({ pathTone: tone });
    }
  }

  logFlavor(text) {
    this.setState({ flavorLog: [...this.state.flavorLog, text] });
  }

  toggleSound() {
    this.setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, sound: !prev.settings.sound }
    }));
  }

  toggleMotion() {
    this.setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, reducedMotion: !prev.settings.reducedMotion }
    }));
  }

  resetProgress() {
    this.setState({ ...defaultState });
  }
}

export const gameStore = new GameStore();

export function useGameState() {
  const [state, setState] = useState(gameStore.getState());

  useEffect(() => {
    return gameStore.subscribe(setState);
  }, []);

  return state;
}
