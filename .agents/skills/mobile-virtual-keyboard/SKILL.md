---
name: mobile-virtual-keyboard
description: Resolves mobile browser virtual keyboard layout issues (especially iOS Safari) by using the visualViewport API to create rock-solid flex layouts that mimic native mobile apps (like the Gemini app) instead of relying on broken 100vh or fixed positioning. Use this when you are tasked with fixing scrolling, keyboard popping, or input bars being covered on mobile web apps.
---

# Mobile Virtual Keyboard Handler

Mobile browsers (particularly iOS Safari) notoriously break web app layouts when the virtual keyboard opens. `100vh` and `100dvh` often fail to update correctly, and `position: fixed; bottom: 0;` elements either get covered by the keyboard or pushed off-screen.

To achieve a buttery-smooth, native-app feel (like the Gemini mobile app), you must abandon standard CSS heights and fixed positioning for the main chat/input layouts, and instead use the `visualViewport` API combined with CSS Custom Properties and Flexbox.

## Implementation Steps

When applying this skill to a project, follow these exact steps:

### 1. Add the React Hook
Create a file (e.g., `src/hooks/useVisualViewport.ts`) with the following hook. This hook listens to the actual visual viewport and updates a CSS variable (`--vv-height`) on the `<html>` root in real-time.

```typescript
import { useEffect } from 'react';

export function useVisualViewport() {
  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        // Set the height of the visual viewport as a CSS variable
        const height = window.visualViewport.height;
        document.documentElement.style.setProperty('--vv-height', \`\${height}px\`);
        
        // Optional: you can also track offsetTop if needed for absolutely positioned overlays
        // const offset = window.visualViewport.offsetTop;
        // document.documentElement.style.setProperty('--vv-offset', \`\${offset}px\`);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      window.visualViewport.addEventListener('scroll', handleResize);
      // Trigger once on mount
      handleResize();
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
        window.visualViewport.removeEventListener('scroll', handleResize);
      }
    };
  }, []);
}
```

### 2. Update the Global Layout CSS
Replace any `height: 100vh` or `height: 100dvh` on your main app container (e.g., `#root`, `body`, or `.app-layout`) with the dynamically updated CSS variable.

```css
/* Apply to the outermost container of the app */
#root, .app-layout {
  /* Fallback to 100dvh if visualViewport is unavailable/initializing */
  height: 100dvh; 
  /* Use the dynamic visual viewport height */
  height: var(--vv-height, 100dvh);
  
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent body scrolling */
}
```

### 3. Update the Input Bar & Scroll Area
Remove `position: fixed; bottom: 0;` from the input bar container. The input bar must naturally sit at the bottom of the flex container.

```css
.chat-scroll-area {
  flex: 1; /* Takes up all available space */
  overflow-y: auto; /* Scrollable */
  /* -webkit-overflow-scrolling: touch; is often needed for iOS momentum scrolling */
}

.input-bar-container {
  /* DO NOT USE position: fixed */
  flex-shrink: 0; /* Ensures the input bar never shrinks */
  padding-bottom: env(safe-area-inset-bottom, 10px); /* Respect iOS home indicator */
}
```

### 4. Wire It Up
Call the hook in your top-level component (e.g., `App.tsx` or `Home.tsx`).

```typescript
import { useVisualViewport } from './hooks/useVisualViewport';

function App() {
  useVisualViewport();
  
  // ...
}
```

### 5. Auto-Scroll on Keyboard Open
When the keyboard opens, the visual viewport shrinks. If you have a chat interface, you usually want to scroll to the bottom immediately when this happens so the user can see what they are typing.

```typescript
// Inside your chat component
useEffect(() => {
  const handleKeyboardOpen = () => {
    // Scroll to bottom of your messages container
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  };
  
  window.visualViewport?.addEventListener('resize', handleKeyboardOpen);
  return () => window.visualViewport?.removeEventListener('resize', handleKeyboardOpen);
}, []);
```
