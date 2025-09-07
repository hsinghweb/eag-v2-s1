# Web Reader Pro

A modern Chrome extension that reads webpage content aloud with synchronized word highlighting, advanced controls, and accessibility features.

## Features

- **Text-to-Speech**: Reads webpage content aloud using Chrome's TTS engine.
- **Synchronized Highlighting**: Highlights each word as it is spoken.
- **Playback Controls**:
  - Play/Pause button
  - Backward (<<) and Forward (>>) buttons (jump 10 words)
  - Reload button to refresh content from the current tab
- **Speed Control**: Adjustable reading speed (0.5x to 2x).
- **Font Size Options**: Small, Medium, and Large text sizes with instant preview and persistent setting.
- **Progress Tracking**:
  - Visual progress bar
  - Percentage completion indicator
  - Estimated time remaining
- **Navigation**:
  - Double-click any word to start reading from that position
  - Smooth auto-scrolling to keep the current word in view
- **State Persistence**:
  - Remembers reading position and content between popup opens and tab switches
  - Only updates content when Reload is pressed
- **Accessibility**:
  - Keyboard navigation and shortcuts
  - ARIA labels for screen readers
  - High-contrast and large text options

## Keyboard Shortcuts

- <kbd>Space</kbd>: Play/Pause
- <kbd>←</kbd> / <kbd>→</kbd>: Move backward/forward by 10 words

## Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode".
4. Click "Load unpacked" and select the extension directory.

## Usage

1. Click the extension icon on any webpage to open the reader popup.
2. Click "PLAY" to start reading.
3. Use the controls to:
   - Adjust reading speed
   - Change font size
   - Navigate through the text
   - Reload content from the current tab
4. Double-click any word to jump to that position.
5. Use the << and >> buttons to move by 10 words.
6. The extension remembers your position and settings until you reload content.

## Project Structure

```
.
├── background/
│   └── background.js         # Background service worker (TTS, state)
├── content/
│   └── content.js            # Content script (text extraction, highlighting)
├── icons/                    # Extension icons
├── popup/
│   ├── popup.html            # Popup UI
│   ├── popup.js              # Popup logic
│   └── popup.css             # Popup styles
├── manifest.json             # Chrome extension manifest
├── README.md                 # This file
```

## License

MIT