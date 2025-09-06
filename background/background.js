let readingState = {
  isPlaying: false,
  currentPosition: 0,
  speed: 1.0,
  words: [],
  tabId: null
};

function startReading() {
  if (readingState.currentPosition >= readingState.words.length) {
    readingState.currentPosition = 0;
  }

  // Build natural phrases for human-like reading
  let phrase = '';
  let wordsRead = 0;
  let currentPhrase = [];
  
  while (readingState.currentPosition + wordsRead < readingState.words.length) {
    const word = readingState.words[readingState.currentPosition + wordsRead];
    currentPhrase.push(word);
    wordsRead++;
    
    // Complete phrase on punctuation or reasonable length
    if (/[.!?]$/.test(word) || // End of sentence
        (/[,;:]$/.test(word) && currentPhrase.length >= 4) || // Natural break with minimum words
        currentPhrase.length >= 8) { // Maximum phrase length
      
      phrase += currentPhrase.join(' ');
      if (/[.!?]$/.test(word)) {
        phrase += ' . '; // Add slight pause after sentences
      } else if (/[,;:]$/.test(word)) {
        phrase += ' , '; // Add minimal pause after clauses
      } else {
        phrase += ' ';
      }
      break;
    }
  }

  // Notify popup about word progress
  chrome.runtime.sendMessage({
    action: 'wordProgress',
    position: readingState.currentPosition
  });

  // Adjust speech rate for natural flow
  let speechRate = readingState.speed * 1.1; // Slightly increased base rate
  
  // Configure speech for natural pacing and intonation
  const cleanPhrase = phrase.trim()
    .replace(/\s+/g, ' ')
    .replace(/\s*([.,;:!?])\s*/g, '$1 ');

  chrome.tts.speak(cleanPhrase, {
    rate: speechRate * 0.85, // Slower pace for clarity
    pitch: 1.05, // Slightly higher pitch for better engagement
    volume: 1.0,
    enqueue: false,
    voiceName: 'Google US English',
    lang: 'en-US',
    onEvent: (event) => {
      if (event.type === 'end' || event.type === 'error') {
        if (readingState.isPlaying) {
          // Move position by the number of words we just read
          const wordsRead = phrase.trim().split(/\s+/).length;
          readingState.currentPosition += wordsRead;
          
          if (readingState.currentPosition < readingState.words.length) {
            startReading();
          } else {
            resetState();
          }
        }
      }
    }
  });
}

function resetState() {
  readingState.isPlaying = false;
  readingState.currentPosition = 0;
  chrome.tts.stop();
  if (readingState.tabId) {
    chrome.tabs.sendMessage(readingState.tabId, {
      action: 'highlightWord',
      index: -1
    });
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateState') {
    readingState = { ...readingState, ...request.state };
    if (readingState.isPlaying) {
      chrome.tts.stop();
      startReading();
    } else {
      chrome.tts.stop();
    }
    sendResponse({ success: true });
  } else if (request.action === 'getState') {
    sendResponse({ state: readingState });
  } else if (request.action === 'setContent') {
    readingState.words = request.words;
    readingState.tabId = request.tabId;
    sendResponse({ success: true });
  }
  return true;
});