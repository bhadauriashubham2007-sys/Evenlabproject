/**
 * ElevenVoice Studio — Application Logic
 * Full ElevenLabs TTS integration, real-time audio visualization,
 * model selection, voice presets, and audio playback management.
 */

// Default curated voices from ElevenLabs Voice Library
const DEFAULT_VOICES = [
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', category: 'premade', desc: 'Dominant & Firm (Male, American)', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/pNInz6obpgDQGcFmaJgB/d6905d7a-dd26-4187-bfff-1bd3a5ea7cac.mp3' },
  { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice', category: 'premade', desc: 'Clear & Engaging Educator (Female, British)', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/Xb7hH8MSUJpSbSDYk0k2/d10f7534-11f6-41fe-a012-2de1e482d336.mp3' },
  { id: 'hpp4J3VqNfWAUOO0d1Us', name: 'Bella', category: 'premade', desc: 'Professional, Bright & Warm (Female, American)', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/hpp4J3VqNfWAUOO0d1Us/dab0f5ba-3aa4-48a8-9fad-f138fea1126d.mp3' },
  { id: 'pqHfZKP75CvOlQylNhV4', name: 'Bill', category: 'premade', desc: 'Wise, Mature & Balanced (Male, American)', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/pqHfZKP75CvOlQylNhV4/d782b3ff-84ba-4029-848c-acf01285524d.mp3' },
  { id: 'nPczCjzI2devNBz1zQrb', name: 'Brian', category: 'premade', desc: 'Deep, Resonant & Comforting (Male, American)', previewUrl: 'https://api.us.elevenlabs.io/v1/voices/nPczCjzI2devNBz1zQrb/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJwcmVtYWRlIiwiZmlsZW5hbWUiOiIyZGQzZTcyYy00ZmQzLTQyZjEtOTNlYS1hYmM1ZDRlNWFhMWQubXAzIiwidGltZXN0YW1wIjoxNzkxMzk5NjAwMDAwMDAwfQ%3D%3D' },
  { id: 'N2lVS1w4EtoT3dr4eOWO', name: 'Callum', category: 'premade', desc: 'Husky Trickster (Male, Transatlantic)', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/N2lVS1w4EtoT3dr4eOWO/ac833bd8-ffda-4938-9ebc-b0f99ca25481.mp3' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', category: 'premade', desc: 'Deep, Confident & Energetic (Male, Australian)', previewUrl: 'https://api.us.elevenlabs.io/v1/voices/IKne3meq5aSn9XLyUdCD/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJwcmVtYWRlIiwiZmlsZW5hbWUiOiIxMDJkZTZmMi0yMmVkLTQzZTAtYTFmMS0xMTFmYTc1YzU0ODEubXAzIiwidGltZXN0YW1wIjoxNzkxMzk5NjAwMDAwMDAwfQ%3D%3D' },
  { id: 'iP95p4xoKVk53GoZ742B', name: 'Chris', category: 'premade', desc: 'Charming & Down-to-Earth (Male, American)', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/iP95p4xoKVk53GoZ742B/3f4bde72-cc48-40dd-829f-57fbf906f4d7.mp3' },
  { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel', category: 'premade', desc: 'Steady Broadcaster (Male, British)', previewUrl: 'https://api.us.elevenlabs.io/v1/voices/onwK4e9ZLuTAKqWW03F9/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJwcmVtYWRlIiwiZmlsZW5hbWUiOiI3ZWVlMDIzNi0xYTcyLTRiODYtYjMwMy01ZGNhZGMwMDdiYTkubXAzIiwidGltZXN0YW1wIjoxNzkxMzk5NjAwMDAwMDAwfQ%3D%3D' },
  { id: 'cjVigY5qzO86Huf0OWal', name: 'Eric', category: 'premade', desc: 'Smooth & Trustworthy (Male, American)', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/cjVigY5qzO86Huf0OWal/d098fda0-6456-4030-b3d8-63aa048c9070.mp3' },
  { id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George', category: 'premade', desc: 'Warm, Captivating Storyteller (Male, British)', previewUrl: 'https://api.us.elevenlabs.io/v1/voices/JBFqnCBsd6RMkjVDRZzb/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJwcmVtYWRlIiwiZmlsZW5hbWUiOiJlNjIwNmQxYS0wNzIxLTQ3ODctYWFmYi0wNmE2ZTcwNWNhYzUubXAzIiwidGltZXN0YW1wIjoxNzkxMzk5NjAwMDAwMDAwfQ%3D%3D' },
  { id: 'SOYHLrjzK2X1ezoPC6cr', name: 'Harry', category: 'premade', desc: 'Fierce Warrior (Male, American)', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/SOYHLrjzK2X1ezoPC6cr/86d178f6-f4b6-4e0e-85be-3de19f490794.mp3' },
  { id: 'cgSgspJ2msm6clMCkdW9', name: 'Jessica', category: 'premade', desc: 'Playful, Bright & Warm (Female, American)', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/cgSgspJ2msm6clMCkdW9/56a97bf8-b69b-448f-846c-c3a11683d45a.mp3' },
  { id: 'FGY2WhTYpPnrIDTdsKH5', name: 'Laura', category: 'premade', desc: 'Enthusiast & Quirky Attitude (Female, American)', previewUrl: 'https://api.us.elevenlabs.io/v1/voices/FGY2WhTYpPnrIDTdsKH5/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJwcmVtYWRlIiwiZmlsZW5hbWUiOiI2NzM0MTc1OS1hZDA4LTQxYTUtYmU2ZS1kZTEyZmU0NDg2MTgubXAzIiwidGltZXN0YW1wIjoxNzkxMzk5NjAwMDAwMDAwfQ%3D%3D' },
  { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', category: 'premade', desc: 'Energetic, Social Media Creator (Male, American)', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/TX3LPaxmHKxFdv7VOQHJ/63148076-6363-42db-aea8-31424308b92c.mp3' },
  { id: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily', category: 'premade', desc: 'Velvety Actress (Female, British)', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/pFZP5JQG7iQjIQuC4Bku/89b68b35-b3dd-4348-a84a-a3c13a3c2b30.mp3' },
  { id: 'XrExE9yKIg1WjnnlVkGX', name: 'Matilda', category: 'premade', desc: 'Knowledgeable & Professional (Female, American)', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/XrExE9yKIg1WjnnlVkGX/b930e18d-6b4d-466e-bab2-0ae97c6d8535.mp3' },
  { id: 'SAz9YHcvj6GT2YYXdXww', name: 'River', category: 'premade', desc: 'Relaxed, Neutral & Informative (Neutral)', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/SAz9YHcvj6GT2YYXdXww/e6c95f0b-2227-491a-b3d7-2249240decb7.mp3' },
  { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger', category: 'premade', desc: 'Laid-Back, Casual & Resonant (Male, American)', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/CwhRBWXzGAHq8TQ4Fs17/58ee3ff5-f6f2-4628-93b8-e38eb31806b0.mp3' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', category: 'premade', desc: 'Mature, Reassuring & Confident (Female, American)', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/EXAVITQu4vr4xnSDxMaL/01a3e33c-6e99-4ee7-8543-ff2216a32186.mp3' },
  { id: 'bIHbv24MWmeRgasZH58o', name: 'Will', category: 'premade', desc: 'Relaxed Optimist (Male, American)', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/bIHbv24MWmeRgasZH58o/8caf8f3d-ad29-4980-af41-53f20c72d7a4.mp3' },
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', category: 'premade', desc: 'Calm & Warm (Female, American)', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/21m00Tcm4TlvDq8ikWAM/df6788f9-1ec9-4788-8812-5cc284b667fb.mp3' }
];

// Sample Text Presets for Instant Testing
const SAMPLE_PRESETS = {
  scifi: 'In the quiet expanse between the distant stars, a lone signal echoed across the dark void. It was not a distress call, but an invitation—whispering secrets of civilizations that vanished before our sun was born.',
  audiobook: 'The ancient library was guarded by silence and the subtle smell of parchment. Behind the towering oak door, an illuminated manuscript pulsed with faint luminescence, waiting for the one destined to turn the page.',
  keynote: 'Today, we are taking a monumental leap into the future of sound. An experience designed not merely to speak words, but to breathe emotion, depth, and human soul into every single sentence.',
  meditation: 'Take a slow, deep breath in... hold it gently for a moment... and quietly let it go. Let the weight of the day fade away, allowing stillness and absolute calm to settle into your mind.',
  news: 'Breaking in artificial intelligence: Neural speech architectures have surpassed a historic benchmark today, synthesizing expressive multilingual voice performances virtually indistinguishable from human artists.'
};

// Storage Keys
const STORAGE_KEY_API = 'elevenlabs_api_key';
const STORAGE_KEY_MODEL = 'elevenvoice_selected_model';
const STORAGE_KEY_VOICE = 'elevenvoice_selected_voice';
const STORAGE_KEY_HISTORY = 'elevenvoice_history_items';
const STORAGE_KEY_VIZ_MODE = 'elevenvoice_viz_mode';

// Default ElevenLabs API Key provided by user
const DEFAULT_API_KEY = 'sk_dc9537c99f69465ec40f7bfb46ddebdee1b7268afbbf1b66';

// Application State
const state = {
  apiKey: localStorage.getItem(STORAGE_KEY_API) || DEFAULT_API_KEY,
  voices: [...DEFAULT_VOICES],
  currentAudioBlob: null,
  currentAudioUrl: null,
  currentTrackName: 'Narration Track',
  isGenerating: false,
  isPlaying: false,
  visualizerMode: localStorage.getItem(STORAGE_KEY_VIZ_MODE) || 'spectrum',
  history: [],
  audioContext: null,
  analyser: null,
  audioSourceNode: null,
  animationFrameId: null
};

// DOM Element References
const elements = {
  // Navigation & Modals
  apiKeyBtn: document.getElementById('apiKeyBtn'),
  apiKeyStatusDot: document.getElementById('apiKeyStatusDot'),
  apiKeyStatusText: document.getElementById('apiKeyStatusText'),
  apiKeyModal: document.getElementById('apiKeyModal'),
  closeApiKeyModalBtn: document.getElementById('closeApiKeyModalBtn'),
  apiKeyInput: document.getElementById('apiKeyInput'),
  saveApiKeyBtn: document.getElementById('saveApiKeyBtn'),
  clearApiKeyBtn: document.getElementById('clearApiKeyBtn'),
  testApiKeyBtn: document.getElementById('testApiKeyBtn'),
  apiTestResult: document.getElementById('apiTestResult'),
  toggleKeyVisibilityBtn: document.getElementById('toggleKeyVisibilityBtn'),
  eyeShowIcon: document.getElementById('eyeShowIcon'),
  eyeHideIcon: document.getElementById('eyeHideIcon'),

  // Header Interactive Elements & Quota
  neuralSoundOrb: document.getElementById('neuralSoundOrb'),
  headerTierText: document.getElementById('headerTierText'),
  headerQuotaText: document.getElementById('headerQuotaText'),

  // Controls Toolbar
  modelSelect: document.getElementById('modelSelect'),
  voiceSelect: document.getElementById('voiceSelect'),
  previewVoiceBtn: document.getElementById('previewVoiceBtn'),
  refreshVoicesBtn: document.getElementById('refreshVoicesBtn'),
  refreshSpinIcon: document.getElementById('refreshSpinIcon'),
  toggleSettingsBtn: document.getElementById('toggleSettingsBtn'),
  voiceSettingsPanel: document.getElementById('voiceSettingsPanel'),
  featuredVoiceChips: document.getElementById('featuredVoiceChips'),

  // Voice Settings Sliders
  stabilitySlider: document.getElementById('stabilitySlider'),
  stabilityVal: document.getElementById('stabilityVal'),
  similaritySlider: document.getElementById('similaritySlider'),
  similarityVal: document.getElementById('similarityVal'),
  styleSlider: document.getElementById('styleSlider'),
  styleVal: document.getElementById('styleVal'),
  speakerBoostToggle: document.getElementById('speakerBoostToggle'),

  // Script Input & Presets
  narrationTextInput: document.getElementById('narrationTextInput'),
  pasteBtn: document.getElementById('pasteBtn'),
  clearBtn: document.getElementById('clearBtn'),
  charCount: document.getElementById('charCount'),
  wordCount: document.getElementById('wordCount'),
  estDuration: document.getElementById('estDuration'),
  presetChips: document.querySelectorAll('.preset-chip'),

  // Action Buttons
  generatePlayBtn: document.getElementById('generatePlayBtn'),
  playBtnText: document.getElementById('playBtnText'),
  playIconSvg: document.getElementById('playIconSvg'),
  loadingSpinner: document.getElementById('loadingSpinner'),
  stopAudioBtn: document.getElementById('stopAudioBtn'),
  formatSelect: document.getElementById('formatSelect'),

  // Visualizer & Audio Player
  playerSection: document.getElementById('playerSection'),
  visualizerCanvas: document.getElementById('visualizerCanvas'),
  visualizerPlaceholder: document.getElementById('visualizerPlaceholder'),
  visualizerModeControls: document.getElementById('visualizerModeControls'),
  visualizerModelBadge: document.getElementById('visualizerModelBadge'),
  nativeAudioElement: document.getElementById('nativeAudioElement'),
  togglePlayPauseBtn: document.getElementById('togglePlayPauseBtn'),
  playerPlayIcon: document.getElementById('playerPlayIcon'),
  playerPauseIcon: document.getElementById('playerPauseIcon'),
  currentTimeLabel: document.getElementById('currentTimeLabel'),
  totalDurationLabel: document.getElementById('totalDurationLabel'),
  audioScrubber: document.getElementById('audioScrubber'),
  scrubProgress: document.getElementById('scrubProgress'),
  playbackSpeedSelect: document.getElementById('playbackSpeedSelect'),
  volumeSlider: document.getElementById('volumeSlider'),
  muteBtn: document.getElementById('muteBtn'),
  volumeIcon: document.getElementById('volumeIcon'),
  downloadAudioBtn: document.getElementById('downloadAudioBtn'),

  // Sidebar History & Tips
  historyList: document.getElementById('historyList'),
  historyEmptyState: document.getElementById('historyEmptyState'),
  clearHistoryBtn: document.getElementById('clearHistoryBtn'),
  toastContainer: document.getElementById('toastContainer')
};

// Canvas 2D context
const canvasCtx = elements.visualizerCanvas.getContext('2d');

/* ==========================================================================
   Initialization
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initApiStatusBadge();
  initVoiceOptions();
  initSettingsListeners();
  initTextStatistics();
  initAudioPlayerListeners();
  initHistory();
  initCanvasResize();
  initFeaturedVoiceChips();
  initVisualizerModes();
  initNeuralOrb();
  updateModelBadge();

  // Load saved model preference
  const savedModel = localStorage.getItem(STORAGE_KEY_MODEL);
  if (savedModel && elements.modelSelect.querySelector(`option[value="${savedModel}"]`)) {
    elements.modelSelect.value = savedModel;
    updateModelBadge();
  }

  // Pre-fill a sample preset if empty
  if (!elements.narrationTextInput.value.trim()) {
    elements.narrationTextInput.value = SAMPLE_PRESETS.keynote;
    updateTextStats();
  }

  // Fetch live voices and preview samples automatically on startup
  fetchVoices(true);
  fetchAccountQuota();
});

/* ==========================================================================
   API Key Management & Modal
   ========================================================================== */

function initApiStatusBadge() {
  if (state.apiKey) {
    elements.apiKeyStatusDot.classList.add('active');
    elements.apiKeyStatusText.textContent = 'API Key: Configured';
  } else {
    elements.apiKeyStatusDot.classList.remove('active');
    elements.apiKeyStatusText.textContent = 'API Key: Not Set';
  }
}

// Open API Key Modal
elements.apiKeyBtn.addEventListener('click', () => {
  elements.apiKeyInput.value = state.apiKey;
  elements.apiTestResult.classList.add('hidden');
  elements.apiTestResult.textContent = '';
  elements.apiKeyModal.classList.remove('hidden');
  elements.apiKeyInput.focus();
});

// Close Modal
elements.closeApiKeyModalBtn.addEventListener('click', () => {
  elements.apiKeyModal.classList.add('hidden');
});

elements.apiKeyModal.addEventListener('click', (e) => {
  if (e.target === elements.apiKeyModal) {
    elements.apiKeyModal.classList.add('hidden');
  }
});

// Toggle password visibility
elements.toggleKeyVisibilityBtn.addEventListener('click', () => {
  const isPass = elements.apiKeyInput.type === 'password';
  elements.apiKeyInput.type = isPass ? 'text' : 'password';
  elements.eyeShowIcon.classList.toggle('hidden', isPass);
  elements.eyeHideIcon.classList.toggle('hidden', !isPass);
});

// Save Key
elements.saveApiKeyBtn.addEventListener('click', () => {
  const key = elements.apiKeyInput.value.trim();
  if (!key) {
    showToast('Key Required', 'Please enter a valid ElevenLabs API key or click Remove.', 'error');
    return;
  }

  // Detect if user pasted an API Key ID instead of secret API key
  if (key.length === 64 && !key.startsWith('sk_')) {
    showToast('Key ID Detected', 'This is an API Key ID, not the Secret API Key. ElevenLabs API keys start with "sk_".', 'error');
    showTestResult('⚠️ This is an API Key ID, not the Secret API Key. ElevenLabs secret API keys start with "sk_". Your working key is sk_dc9537c99f69465ec40f7bfb46ddebdee1b7268afbbf1b66.', false);
    return;
  }

  state.apiKey = key;
  localStorage.setItem(STORAGE_KEY_API, key);
  initApiStatusBadge();
  elements.apiKeyModal.classList.add('hidden');
  showToast('API Key Saved', 'Your ElevenLabs API key was stored securely in your browser.', 'success');
  // Load account voices
  fetchVoices(false);
});

// Remove Key
elements.clearApiKeyBtn.addEventListener('click', () => {
  state.apiKey = '';
  localStorage.removeItem(STORAGE_KEY_API);
  elements.apiKeyInput.value = '';
  initApiStatusBadge();
  elements.apiKeyModal.classList.add('hidden');
  showToast('Key Removed', 'Your ElevenLabs API key was cleared.', 'info');
});

// Test Connection
elements.testApiKeyBtn.addEventListener('click', async () => {
  const testKey = elements.apiKeyInput.value.trim();
  if (!testKey) {
    showTestResult('Please enter an API key to test.', false);
    return;
  }

  // Quick check for Key ID
  if (testKey.length === 64 && !testKey.startsWith('sk_')) {
    showTestResult('⚠️ This string is an API Key ID, not the Secret API Key! ElevenLabs API keys start with "sk_" and are shown when creating or rotating a key in your ElevenLabs Dashboard.', false);
    return;
  }

  elements.testApiKeyBtn.disabled = true;
  showTestResult('Validating key with ElevenLabs API...', null);

  try {
    const res = await fetch('https://api.elevenlabs.io/v1/user', {
      headers: {
        'xi-api-key': testKey
      }
    });

    if (res.ok) {
      const data = await res.json();
      const tier = data.subscription?.tier || 'Free';
      const charCount = data.subscription?.character_count || 0;
      const charLimit = data.subscription?.character_limit || 0;

      // Check text_to_speech permission using Roger (premade voice supported on all tiers)
      try {
        const ttsCheck = await fetch('https://api.elevenlabs.io/v1/text-to-speech/CwhRBWXzGAHq8TQ4Fs17', {
          method: 'POST',
          headers: {
            'xi-api-key': testKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: 'test', model_id: 'eleven_multilingual_v2' })
        });

        if (!ttsCheck.ok) {
          const ttsErr = await ttsCheck.json().catch(() => ({}));
          const errMsg = ttsErr.detail?.message || '';
          if (errMsg.includes('permission text_to_speech') || ttsErr.detail?.status === 'missing_permissions') {
            showTestResult(`⚠️ Key Connected (Tier: ${tier.toUpperCase()}), BUT missing "text_to_speech" permission! Please edit this key in your ElevenLabs Dashboard (Settings > API Keys) and turn on the "Text to Speech" permission.`, false);
            return;
          }
        }
      } catch {}

      showTestResult(`✓ Connection successful! Tier: ${tier.toUpperCase()} • Available Quota: ${(charLimit - charCount).toLocaleString()} characters`, true);
    } else {
      const err = await res.json().catch(() => ({}));
      let msg = err.detail?.message || err.detail || 'Invalid API Key or unauthorized access.';
      if (msg.includes('API key ID used as API key')) {
        msg = 'API Key ID entered instead of Secret Key! Secret keys start with "sk_".';
      }
      showTestResult(`Validation failed (${res.status}): ${msg}`, false);
    }
  } catch (error) {
    showTestResult(`Network error: ${error.message}. Please check your internet connection.`, false);
  } finally {
    elements.testApiKeyBtn.disabled = false;
  }
});

function showTestResult(message, isSuccess) {
  elements.apiTestResult.classList.remove('hidden', 'success', 'error');
  if (isSuccess === true) {
    elements.apiTestResult.classList.add('success');
  } else if (isSuccess === false) {
    elements.apiTestResult.classList.add('error');
  } else {
    elements.apiTestResult.style.color = '#c7d2fe';
  }
  elements.apiTestResult.textContent = message;
}

/* ==========================================================================
   Voice & Model Selection Handling
   ========================================================================== */

function initVoiceOptions() {
  const savedVoice = localStorage.getItem(STORAGE_KEY_VOICE);
  renderVoiceDropdown(savedVoice);
}

function renderVoiceDropdown(preferredVoiceId = null) {
  elements.voiceSelect.innerHTML = '';

  // Group by category if user has custom voices
  const premade = state.voices.filter(v => v.category !== 'cloned' && v.category !== 'generated');
  const custom = state.voices.filter(v => v.category === 'cloned' || v.category === 'generated');

  if (custom.length > 0) {
    const customGroup = document.createElement('optgroup');
    customGroup.label = '⭐ Your Custom & Cloned Voices';
    custom.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.id;
      opt.textContent = `${v.name} (Custom Voice)`;
      customGroup.appendChild(opt);
    });
    elements.voiceSelect.appendChild(customGroup);
  }

  const premadeGroup = document.createElement('optgroup');
  premadeGroup.label = '🎙️ ElevenLabs Curated Voices';
  premade.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v.id;
    opt.textContent = `${v.name} — ${v.desc || 'Standard Voice'}`;
    premadeGroup.appendChild(opt);
  });
  elements.voiceSelect.appendChild(premadeGroup);

  // Restore preferred voice or first
  if (preferredVoiceId && state.voices.some(v => v.id === preferredVoiceId)) {
    elements.voiceSelect.value = preferredVoiceId;
  } else {
    // Default to Roger (premade voice verified for free accounts) or first
    const defaultVoice = state.voices.find(v => v.name.toLowerCase().startsWith('roger') || v.name.toLowerCase().startsWith('george'));
    elements.voiceSelect.value = defaultVoice ? defaultVoice.id : state.voices[0].id;
  }
  syncVoiceChips(elements.voiceSelect.value);
}

// Featured Cast Quick-Selection Configuration
const FEATURED_CAST = [
  { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger', tag: 'Casual • Male', initial: 'R' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', tag: 'Warm • Female', initial: 'S' },
  { id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George', tag: 'Storyteller • Male', initial: 'G' },
  { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice', tag: 'Educator • Female', initial: 'A' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', tag: 'Confident • Male', initial: 'C' },
  { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', tag: 'Expressive • Male', initial: 'L' },
  { id: 'N2lVS1w4EtoT3dr4eOWO', name: 'Callum', tag: 'Husky • Male', initial: 'K' }
];

function initFeaturedVoiceChips() {
  if (!elements.featuredVoiceChips) return;
  elements.featuredVoiceChips.innerHTML = '';

  FEATURED_CAST.forEach(cast => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'cast-chip';
    chip.dataset.id = cast.id;
    chip.dataset.name = cast.name;
    chip.title = `Switch to ${cast.name} (${cast.tag})`;
    chip.innerHTML = `
      <span class="cast-avatar">${cast.initial}</span>
      <span class="cast-name">${cast.name}</span>
      <span class="cast-tag">${cast.tag}</span>
    `;

    chip.addEventListener('click', () => {
      // Sync dropdown
      if (elements.voiceSelect.querySelector(`option[value="${cast.id}"]`)) {
        elements.voiceSelect.value = cast.id;
      }
      localStorage.setItem(STORAGE_KEY_VOICE, cast.id);
      syncVoiceChips(cast.id);
      showToast('Voice Actor Active', `Selected ${cast.name} (${cast.tag})`, 'info');
    });

    elements.featuredVoiceChips.appendChild(chip);
  });

  syncVoiceChips(elements.voiceSelect.value);
}

function syncVoiceChips(activeVoiceId) {
  if (!elements.featuredVoiceChips) return;
  const chips = elements.featuredVoiceChips.querySelectorAll('.cast-chip');
  chips.forEach(chip => {
    chip.classList.toggle('active', chip.dataset.id === activeVoiceId);
  });
}

function initVisualizerModes() {
  if (!elements.visualizerModeControls) return;
  const modeButtons = elements.visualizerModeControls.querySelectorAll('.viz-mode-btn');

  modeButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.viz === state.visualizerMode);
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.visualizerMode = btn.dataset.viz;
      localStorage.setItem(STORAGE_KEY_VIZ_MODE, state.visualizerMode);
      showToast('Matrix Mode', `Switched to ${btn.textContent.trim()} visualizer.`, 'info');
    });
  });
}

const MODEL_NAMES = {
  eleven_multilingual_v2: 'Multilingual v2',
  eleven_turbo_v2_5: 'Turbo v2.5',
  eleven_flash_v2_5: 'Flash v2.5',
  eleven_flash_v2: 'Flash v2',
  eleven_turbo_v2: 'Turbo v2',
  eleven_monolingual_v1: 'English v1'
};

function updateModelBadge() {
  if (!elements.visualizerModelBadge || !elements.modelSelect) return;
  const val = elements.modelSelect.value;
  elements.visualizerModelBadge.textContent = MODEL_NAMES[val] || val;
}

function initNeuralOrb() {
  if (!elements.neuralSoundOrb) return;
  elements.neuralSoundOrb.addEventListener('click', () => {
    const audio = elements.nativeAudioElement;
    if (audio.src) {
      if (audio.paused) {
        setupWebAudio();
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      elements.generatePlayBtn.click();
    }
  });
}

async function fetchAccountQuota() {
  if (!state.apiKey) return;
  try {
    const res = await fetch('https://api.elevenlabs.io/v1/user', {
      headers: { 'xi-api-key': state.apiKey }
    });
    if (res.ok) {
      const data = await res.json();
      const sub = data.subscription;
      if (sub) {
        const tier = (sub.tier || 'Free').toUpperCase();
        const count = sub.character_count || 0;
        const limit = sub.character_limit || 10000;
        const remaining = Math.max(0, limit - count);

        if (elements.headerTierText) elements.headerTierText.textContent = tier;
        if (elements.headerQuotaText) elements.headerQuotaText.textContent = `${remaining.toLocaleString()} left`;
      }
    }
  } catch (e) {
    console.debug('Quota fetch notice:', e);
  }
}

// Model & Voice Change storage
elements.modelSelect.addEventListener('change', (e) => {
  localStorage.setItem(STORAGE_KEY_MODEL, e.target.value);
  updateModelBadge();
});

elements.voiceSelect.addEventListener('change', (e) => {
  localStorage.setItem(STORAGE_KEY_VOICE, e.target.value);
  syncVoiceChips(e.target.value);
});

// Voice Preview Sample Button
if (elements.previewVoiceBtn) {
  elements.previewVoiceBtn.addEventListener('click', () => {
    const selectedVoiceId = elements.voiceSelect.value;
    const voiceObj = state.voices.find(v => v.id === selectedVoiceId);
    if (!voiceObj) return;

    if (voiceObj.previewUrl) {
      showToast('Voice Preview', `Streaming audio sample for ${voiceObj.name}...`, 'info');
      setupWebAudio();
      loadAudioTrack(voiceObj.previewUrl, `${voiceObj.name} (Sample Preview)`);
    } else {
      showToast('Sample Unavailable', `No audio sample cached for ${voiceObj.name}. Enter API key to synthesize custom text.`, 'info');
    }
  });
}

// Fetch Voices from ElevenLabs Account or Public Library
elements.refreshVoicesBtn.addEventListener('click', () => {
  fetchVoices(false);
});

async function fetchVoices(silent = false) {
  elements.refreshSpinIcon.style.animation = 'spin 0.8s linear infinite';

  try {
    const headers = {};
    if (state.apiKey) {
      headers['xi-api-key'] = state.apiKey;
    }
    const res = await fetch('https://api.elevenlabs.io/v1/voices', { headers });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.voices) && data.voices.length > 0) {
        state.voices = data.voices.map(v => ({
          id: v.voice_id,
          name: v.name,
          category: v.category || 'premade',
          desc: v.labels ? Object.values(v.labels).join(', ') : (v.description || 'ElevenLabs Voice'),
          previewUrl: v.preview_url || null
        }));

        renderVoiceDropdown(elements.voiceSelect.value);
        if (!silent) {
          showToast('Voices Synced', `Successfully loaded ${state.voices.length} voices from ElevenLabs!`, 'success');
        }
      }
    } else {
      if (!silent) {
        showToast('Sync Notice', 'Using built-in voice library. Verify your API key or connection.', 'info');
      }
    }
  } catch (err) {
    if (!silent) {
      showToast('Network Notice', 'Using built-in voices. Please check network connection.', 'info');
    }
  } finally {
    elements.refreshSpinIcon.style.animation = 'none';
  }
}

// Voice Settings Collapsible Drawer
elements.toggleSettingsBtn.addEventListener('click', () => {
  const isCollapsed = elements.voiceSettingsPanel.classList.toggle('collapsed');
  elements.toggleSettingsBtn.classList.toggle('active', !isCollapsed);
});

function initSettingsListeners() {
  elements.stabilitySlider.addEventListener('input', (e) => {
    elements.stabilityVal.textContent = parseFloat(e.target.value).toFixed(2);
  });
  elements.similaritySlider.addEventListener('input', (e) => {
    elements.similarityVal.textContent = parseFloat(e.target.value).toFixed(2);
  });
  elements.styleSlider.addEventListener('input', (e) => {
    elements.styleVal.textContent = parseFloat(e.target.value).toFixed(2);
  });
}

/* ==========================================================================
   Text Input & Presets Handling
   ========================================================================== */

function initTextStatistics() {
  elements.narrationTextInput.addEventListener('input', updateTextStats);

  // Paste button
  elements.pasteBtn.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        elements.narrationTextInput.value = text;
        updateTextStats();
        showToast('Pasted', 'Text pasted from clipboard', 'info');
      }
    } catch {
      elements.narrationTextInput.focus();
      showToast('Notice', 'Clipboard access denied. Please press Ctrl+V / Cmd+V to paste.', 'info');
    }
  });

  // Clear button
  elements.clearBtn.addEventListener('click', () => {
    elements.narrationTextInput.value = '';
    updateTextStats();
    elements.narrationTextInput.focus();
  });

  // Presets
  elements.presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const presetKey = chip.getAttribute('data-preset');
      if (SAMPLE_PRESETS[presetKey]) {
        elements.narrationTextInput.value = SAMPLE_PRESETS[presetKey];
        updateTextStats();
        showToast('Preset Loaded', `${chip.textContent.trim()} loaded into script editor.`, 'info');
      }
    });
  });
  // Keyboard shortcut: Ctrl+Enter or Cmd+Enter to generate
  elements.narrationTextInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      elements.generatePlayBtn.click();
    }
  });
}

function updateTextStats() {
  const text = elements.narrationTextInput.value;
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  
  elements.charCount.textContent = chars.toLocaleString();
  elements.wordCount.textContent = words.toLocaleString();

  // Average reading speed is ~150 words per minute -> 2.5 words per second
  const estSeconds = words > 0 ? Math.ceil(words / 2.5) : 0;
  if (estSeconds >= 60) {
    const mins = Math.floor(estSeconds / 60);
    const secs = estSeconds % 60;
    elements.estDuration.textContent = `${mins}m ${secs}s`;
  } else {
    elements.estDuration.textContent = `${estSeconds}s`;
  }
}

/* ==========================================================================
   Narration Generation & ElevenLabs API Call
   ========================================================================== */

elements.generatePlayBtn.addEventListener('click', async () => {
  const text = elements.narrationTextInput.value.trim();
  if (!text) {
    showToast('Input Required', 'Please enter or paste text to generate speech narration.', 'error');
    elements.narrationTextInput.focus();
    return;
  }

  // Check if API key is configured
  if (!state.apiKey) {
    showToast('API Key Required', 'Please configure your ElevenLabs API key to start narration.', 'info');
    elements.apiKeyBtn.click();
    return;
  }

  // Resume Web Audio within user gesture
  setupWebAudio();

  // Start Generation
  await generateNarration(text);
});

async function generateNarration(text) {
  const voiceId = elements.voiceSelect.value;
  const modelId = elements.modelSelect.value;
  const outputFormat = elements.formatSelect.value;
  const voiceObj = state.voices.find(v => v.id === voiceId) || { name: 'AI Voice' };

  setLoadingState(true);

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=${outputFormat}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': state.apiKey
      },
      body: JSON.stringify({
        text: text,
        model_id: modelId,
        voice_settings: {
          stability: parseFloat(elements.stabilitySlider.value),
          similarity_boost: parseFloat(elements.similaritySlider.value),
          style: parseFloat(elements.styleSlider.value),
          use_speaker_boost: elements.speakerBoostToggle.checked
        }
      })
    });

    if (!response.ok) {
      let errorMsg = `ElevenLabs request failed (Status: ${response.status})`;
      try {
        const errorJson = await response.json();
        if (errorJson.detail && errorJson.detail.message) {
          errorMsg = errorJson.detail.message;
        } else if (typeof errorJson.detail === 'string') {
          errorMsg = errorJson.detail;
        }
      } catch {
        if (response.status === 401) {
          errorMsg = 'Invalid API Key or unauthorized access.';
        } else if (response.status === 429) {
          errorMsg = 'Quota exceeded or rate limit reached on your ElevenLabs account.';
        }
      }

      if (errorMsg.includes('permission text_to_speech') || errorMsg.includes('missing_permissions')) {
        errorMsg = 'This API key is missing the "text_to_speech" permission! Please edit this key in ElevenLabs Dashboard (Settings > API Keys) and enable the "Text to Speech" permission.';
      } else if (response.status === 402 || errorMsg.includes('library voices via the API') || errorMsg.includes('paid_plan_required')) {
        errorMsg = 'Free tier accounts can only use premade voices (such as Roger, George, Sarah, Charlie, Alice). Please switch to Roger or another premade voice in the dropdown!';
      }

      throw new Error(errorMsg);
    }

    // Convert audio byte stream to Blob
    const audioBlob = await response.blob();
    const trackName = `${voiceObj.name} - ${text.slice(0, 30)}...`;

    // Load and play
    loadAudioTrack(audioBlob, trackName);

    // Save to History
    addHistoryRecord({
      id: Date.now(),
      text: text,
      voiceName: voiceObj.name,
      voiceId: voiceId,
      modelId: modelId,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString(),
      blob: audioBlob
    });

    showToast('Narration Ready', `Generated speech using ${voiceObj.name} (${modelId})!`, 'success');

  } catch (error) {
    console.error('TTS Generation Error:', error);
    showToast('Generation Error', error.message, 'error');
  } finally {
    setLoadingState(false);
  }
}

function setLoadingState(loading) {
  state.isGenerating = loading;
  elements.generatePlayBtn.disabled = loading;
  elements.loadingSpinner.classList.toggle('hidden', !loading);
  elements.playIconSvg.classList.toggle('hidden', loading);
  elements.playBtnText.textContent = loading ? 'Synthesizing Audio with ElevenLabs...' : 'Generate & Play Narration';
}

/* ==========================================================================
   Audio Player & Canvas Visualizer
   ========================================================================== */

function loadAudioTrack(audioSource, trackName) {
  // Revoke previous Blob URL if one was created
  if (state.currentAudioUrl && state.currentAudioUrl.startsWith('blob:')) {
    URL.revokeObjectURL(state.currentAudioUrl);
  }

  if (audioSource instanceof Blob) {
    state.currentAudioBlob = audioSource;
    state.currentAudioUrl = URL.createObjectURL(audioSource);
  } else {
    state.currentAudioBlob = null;
    state.currentAudioUrl = audioSource;
  }
  state.currentTrackName = trackName;

  elements.nativeAudioElement.src = state.currentAudioUrl;
  elements.nativeAudioElement.load();

  // Show stop button
  elements.stopAudioBtn.classList.remove('hidden');

  // Ensure AudioContext is ready for visualizer
  setupWebAudio();

  // Trigger audio playback
  elements.nativeAudioElement.play().catch(err => {
    console.warn('Autoplay prevented by browser:', err);
    showToast('Ready to Play', 'Click the play button below to listen.', 'info');
  });
}

function setupWebAudio() {
  try {
    if (!state.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      state.audioContext = new AudioCtx();
    }

    if (state.audioContext.state === 'suspended') {
      state.audioContext.resume();
    }

    if (!state.audioSourceNode) {
      state.analyser = state.audioContext.createAnalyser();
      state.analyser.fftSize = 256;
      state.analyser.smoothingTimeConstant = 0.82;

      state.audioSourceNode = state.audioContext.createMediaElementSource(elements.nativeAudioElement);
      state.audioSourceNode.connect(state.analyser);
      state.analyser.connect(state.audioContext.destination);
    }

    elements.visualizerPlaceholder.classList.add('hidden');
    startVisualizerLoop();
  } catch (e) {
    console.warn('Web Audio API initialized with notice:', e);
  }
}

function startVisualizerLoop() {
  if (state.animationFrameId) {
    cancelAnimationFrame(state.animationFrameId);
  }

  const canvas = elements.visualizerCanvas;
  const ctx = canvasCtx;
  const bufferLength = state.analyser ? state.analyser.frequencyBinCount : 128;
  const freqData = new Uint8Array(bufferLength);
  const timeData = new Uint8Array(bufferLength);

  // Peak dots tracking for spectrum mode
  const peakDots = new Array(48).fill(0);
  let phase = 0;

  function draw() {
    state.animationFrameId = requestAnimationFrame(draw);

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const hasAudio = state.analyser && state.isPlaying;

    if (hasAudio) {
      state.analyser.getByteFrequencyData(freqData);
      state.analyser.getByteTimeDomainData(timeData);
    } else {
      // Decay frequency values
      for (let i = 0; i < freqData.length; i++) {
        freqData[i] = Math.max(0, freqData[i] - 5);
      }
    }

    phase += 0.04;

    // Calculate total energy
    let totalEnergy = 0;
    for (let i = 0; i < 32; i++) totalEnergy += freqData[i];
    const isActuallySilent = totalEnergy < 20;

    // Draw background subtle centerline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    if (isActuallySilent && !state.isPlaying) {
      drawIdleAmbientWave(ctx, width, height, phase);
      return;
    }

    const mode = state.visualizerMode || 'spectrum';

    if (mode === 'sine') {
      drawHarmonicSineMode(ctx, width, height, timeData, freqData, phase);
    } else if (mode === 'galaxy') {
      drawGalaxyNebulaMode(ctx, width, height, freqData, phase);
    } else {
      // Default: 'spectrum'
      drawNeonSpectrumMode(ctx, width, height, freqData, peakDots);
    }
  }

  draw();
}

// 1. Idle Ambient Holographic Wave
function drawIdleAmbientWave(ctx, width, height, phase) {
  const cy = height / 2;
  
  // Wave 1 - Cyan
  ctx.beginPath();
  for (let x = 0; x <= width; x += 6) {
    const y = cy + Math.sin(x * 0.012 + phase) * 12 * Math.sin(x / width * Math.PI);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.45)';
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(6, 182, 212, 0.6)';
  ctx.shadowBlur = 8;
  ctx.stroke();

  // Wave 2 - Indigo / Violet
  ctx.beginPath();
  for (let x = 0; x <= width; x += 6) {
    const y = cy + Math.sin(x * 0.018 - phase * 0.9) * 9 * Math.sin(x / width * Math.PI);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
  ctx.lineWidth = 1.8;
  ctx.shadowColor = 'rgba(168, 85, 247, 0.5)';
  ctx.shadowBlur = 8;
  ctx.stroke();

  ctx.shadowBlur = 0;
}

// 2. Neon Spectrum Equalizer Bars with Peak Dots & Soft Floor Reflection
function drawNeonSpectrumMode(ctx, width, height, freqData, peakDots) {
  const barCount = 48;
  const barWidth = Math.max(3, (width / barCount) - 4);
  const step = Math.floor(freqData.length / barCount) || 1;
  const baseline = height * 0.82;

  for (let i = 0; i < barCount; i++) {
    const val = freqData[i * step] || 0;
    const percent = val / 255;
    const barHeight = Math.max(3, percent * (baseline - 10));
    const x = i * (barWidth + 4);
    const y = baseline - barHeight;

    // Dynamic Gradient for each bar
    const grad = ctx.createLinearGradient(0, y, 0, baseline);
    grad.addColorStop(0, '#38bdf8');
    grad.addColorStop(0.35, '#6366f1');
    grad.addColorStop(0.8, '#a855f7');
    grad.addColorStop(1, '#ec4899');

    ctx.fillStyle = grad;
    if (percent > 0.45) {
      ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
      ctx.shadowBlur = 10;
    } else {
      ctx.shadowBlur = 0;
    }

    roundRect(ctx, x, y, barWidth, barHeight, 2.5);

    // Peak Dot with slow gravity decay
    if (barHeight > peakDots[i]) {
      peakDots[i] = barHeight;
    } else {
      peakDots[i] = Math.max(0, peakDots[i] - 1.4);
    }

    const peakY = baseline - peakDots[i] - 3;
    if (peakY >= 2 && peakDots[i] > 6) {
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 6;
      roundRect(ctx, x, peakY, barWidth, 2, 1);
    }

    // Floor Reflection
    const reflectHeight = barHeight * 0.22;
    const reflectGrad = ctx.createLinearGradient(0, baseline, 0, baseline + reflectHeight);
    reflectGrad.addColorStop(0, 'rgba(99, 102, 241, 0.25)');
    reflectGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = reflectGrad;
    ctx.shadowBlur = 0;
    roundRect(ctx, x, baseline + 2, barWidth, reflectHeight, 1.5);
  }

  ctx.shadowBlur = 0;
}

// 3. Fluid Harmonics Sine Waves Mode
function drawHarmonicSineMode(ctx, width, height, timeData, freqData, phase) {
  const cy = height / 2;
  
  // Calculate average audio intensity
  let sum = 0;
  for (let i = 0; i < 32; i++) sum += freqData[i] || 0;
  const energy = Math.max(0.15, sum / (32 * 255));
  const maxAmp = (height * 0.42) * energy;

  // Ribbon 1: Deep Cyan Bass
  ctx.beginPath();
  for (let x = 0; x <= width; x += 4) {
    const timeVal = (timeData[Math.floor((x / width) * timeData.length)] || 128) - 128;
    const timeOffset = (timeVal / 128) * maxAmp * 0.6;
    const y = cy + Math.sin(x * 0.015 + phase) * (maxAmp + 8) * Math.sin(x / width * Math.PI) + timeOffset;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 3;
  ctx.shadowColor = 'rgba(6, 182, 212, 0.8)';
  ctx.shadowBlur = 12;
  ctx.stroke();

  // Ribbon 2: Electric Violet Mid-range
  ctx.beginPath();
  for (let x = 0; x <= width; x += 4) {
    const y = cy + Math.sin(x * 0.022 - phase * 1.3) * (maxAmp * 0.85 + 6) * Math.sin(x / width * Math.PI);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 2.5;
  ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
  ctx.shadowBlur = 12;
  ctx.stroke();

  // Ribbon 3: Neon Magenta Treble
  ctx.beginPath();
  for (let x = 0; x <= width; x += 4) {
    const y = cy + Math.sin(x * 0.034 + phase * 1.8) * (maxAmp * 0.65 + 4) * Math.sin(x / width * Math.PI);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = '#ec4899';
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(236, 72, 153, 0.8)';
  ctx.shadowBlur = 10;
  ctx.stroke();

  ctx.shadowBlur = 0;
}

// 4. Radial Sound Nebula / Galaxy Mode
function drawGalaxyNebulaMode(ctx, width, height, freqData, phase) {
  const cx = width / 2;
  const cy = height / 2;

  // Bass energy
  let bass = 0;
  for (let i = 0; i < 6; i++) bass += freqData[i] || 0;
  const bassNorm = bass / (6 * 255);
  const coreRadius = Math.min(height * 0.22, 24) + bassNorm * 18;

  // Draw Pulsing Nebula Core
  const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, coreRadius * 1.6);
  coreGrad.addColorStop(0, '#fff');
  coreGrad.addColorStop(0.3, '#38bdf8');
  coreGrad.addColorStop(0.7, 'rgba(99, 102, 241, 0.5)');
  coreGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, coreRadius * 1.6, 0, Math.PI * 2);
  ctx.fill();

  // Equalizer Rays
  const rayCount = 42;
  for (let i = 0; i < rayCount; i++) {
    const theta = (i / rayCount) * Math.PI * 2 + (phase * 0.25);
    const val = freqData[i * 2] || 0;
    const rayLength = 8 + (val / 255) * (height * 0.35);

    const x1 = cx + Math.cos(theta) * (coreRadius + 2);
    const y1 = cy + Math.sin(theta) * (coreRadius + 2);
    const x2 = cx + Math.cos(theta) * (coreRadius + rayLength);
    const y2 = cy + Math.sin(theta) * (coreRadius + rayLength);

    const rayGrad = ctx.createLinearGradient(x1, y1, x2, y2);
    rayGrad.addColorStop(0, '#06b6d4');
    rayGrad.addColorStop(0.6, '#818cf8');
    rayGrad.addColorStop(1, '#ec4899');

    ctx.strokeStyle = rayGrad;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // Floating Stardust Particles
  const particleCount = 12;
  for (let p = 0; p < particleCount; p++) {
    const pTheta = (p / particleCount) * Math.PI * 2 - (phase * 0.45);
    const pDist = coreRadius + 22 + Math.sin(p * 2 + phase) * 12;
    const px = cx + Math.cos(pTheta) * pDist;
    const py = cy + Math.sin(pTheta) * pDist;

    ctx.fillStyle = p % 2 === 0 ? '#a5f3fc' : '#f472b6';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(px, py, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.shadowBlur = 0;
}

function roundRect(ctx, x, y, width, height, radius) {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  ctx.fill();
}

function initCanvasResize() {
  const resizeCanvas = () => {
    const rect = elements.visualizerCanvas.parentElement.getBoundingClientRect();
    if (rect.width > 0) {
      const dpr = window.devicePixelRatio || 1;
      elements.visualizerCanvas.width = Math.floor(rect.width * dpr);
      elements.visualizerCanvas.height = Math.floor(rect.height * dpr);
    }
  };
  window.addEventListener('resize', resizeCanvas);
  setTimeout(resizeCanvas, 100);
}

function initAudioPlayerListeners() {
  const audio = elements.nativeAudioElement;

  // Play / Pause events
  audio.addEventListener('play', () => {
    state.isPlaying = true;
    elements.playerPlayIcon.classList.add('hidden');
    elements.playerPauseIcon.classList.remove('hidden');
    elements.visualizerPlaceholder.classList.add('hidden');
    
    // Animate Neural Reactor Orb & Glow
    if (elements.neuralSoundOrb) elements.neuralSoundOrb.classList.add('playing');
    if (elements.visualizerCanvas && elements.visualizerCanvas.parentElement) {
      elements.visualizerCanvas.parentElement.classList.add('active');
    }
    document.querySelector('.studio-card.main-card')?.classList.add('audio-playing');

    if (state.audioContext && state.audioContext.state === 'suspended') {
      state.audioContext.resume();
    }
  });

  audio.addEventListener('pause', () => {
    state.isPlaying = false;
    elements.playerPlayIcon.classList.remove('hidden');
    elements.playerPauseIcon.classList.add('hidden');

    if (elements.neuralSoundOrb) elements.neuralSoundOrb.classList.remove('playing');
    if (elements.visualizerCanvas && elements.visualizerCanvas.parentElement) {
      elements.visualizerCanvas.parentElement.classList.remove('active');
    }
    document.querySelector('.studio-card.main-card')?.classList.remove('audio-playing');
  });

  audio.addEventListener('ended', () => {
    state.isPlaying = false;
    elements.playerPlayIcon.classList.remove('hidden');
    elements.playerPauseIcon.classList.add('hidden');

    if (elements.neuralSoundOrb) elements.neuralSoundOrb.classList.remove('playing');
    if (elements.visualizerCanvas && elements.visualizerCanvas.parentElement) {
      elements.visualizerCanvas.parentElement.classList.remove('active');
    }
    document.querySelector('.studio-card.main-card')?.classList.remove('audio-playing');

    elements.audioScrubber.value = 0;
    elements.scrubProgress.style.width = '0%';
    elements.currentTimeLabel.textContent = '0:00';
  });

  // Time update
  audio.addEventListener('timeupdate', () => {
    if (audio.duration && !isNaN(audio.duration)) {
      const cur = audio.currentTime;
      const dur = audio.duration;
      elements.currentTimeLabel.textContent = formatTime(cur);
      elements.totalDurationLabel.textContent = formatTime(dur);
      const percent = (cur / dur) * 100;
      elements.audioScrubber.value = percent;
      elements.scrubProgress.style.width = `${percent}%`;
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    elements.totalDurationLabel.textContent = formatTime(audio.duration);
  });

  // Play/Pause button
  elements.togglePlayPauseBtn.addEventListener('click', () => {
    if (!audio.src) {
      showToast('No Audio', 'Please generate speech first by clicking "Generate & Play Narration".', 'info');
      return;
    }
    if (audio.paused) {
      setupWebAudio();
      audio.play();
    } else {
      audio.pause();
    }
  });

  // Stop button
  elements.stopAudioBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    elements.stopAudioBtn.classList.add('hidden');
    elements.playerPlayIcon.classList.remove('hidden');
    elements.playerPauseIcon.classList.add('hidden');
    
    if (elements.neuralSoundOrb) elements.neuralSoundOrb.classList.remove('playing');
    if (elements.visualizerCanvas && elements.visualizerCanvas.parentElement) {
      elements.visualizerCanvas.parentElement.classList.remove('active');
    }
    document.querySelector('.studio-card.main-card')?.classList.remove('audio-playing');

    elements.audioScrubber.value = 0;
    elements.scrubProgress.style.width = '0%';
    elements.currentTimeLabel.textContent = '0:00';
  });

  // Scrubber drag
  elements.audioScrubber.addEventListener('input', (e) => {
    if (audio.duration) {
      const seekTo = (e.target.value / 100) * audio.duration;
      audio.currentTime = seekTo;
      elements.scrubProgress.style.width = `${e.target.value}%`;
    }
  });

  // Playback speed
  elements.playbackSpeedSelect.addEventListener('change', (e) => {
    audio.playbackRate = parseFloat(e.target.value);
  });

  // Volume & Mute
  elements.volumeSlider.addEventListener('input', (e) => {
    audio.volume = parseFloat(e.target.value);
    audio.muted = false;
    updateVolumeIcon(audio.volume);
  });

  elements.muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    if (audio.muted) {
      elements.volumeSlider.value = 0;
      updateVolumeIcon(0);
    } else {
      elements.volumeSlider.value = audio.volume || 1;
      updateVolumeIcon(audio.volume || 1);
    }
  });

  // Download Button
  elements.downloadAudioBtn.addEventListener('click', async () => {
    if (state.currentAudioBlob) {
      downloadBlob(state.currentAudioBlob, `elevenlabs-narration-${Date.now()}.mp3`);
      return;
    }
    if (state.currentAudioUrl) {
      showToast('Downloading', 'Preparing audio download...', 'info');
      try {
        const res = await fetch(state.currentAudioUrl);
        const b = await res.blob();
        downloadBlob(b, `elevenlabs-sample-${Date.now()}.mp3`);
      } catch {
        window.open(state.currentAudioUrl, '_blank');
      }
      return;
    }
    showToast('No Audio', 'Generate or play a speech track first before downloading.', 'info');
  });
}

function updateVolumeIcon(vol) {
  if (vol === 0 || elements.nativeAudioElement.muted) {
    elements.volumeIcon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27l4.73 4.73H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
  } else if (vol < 0.5) {
    elements.volumeIcon.innerHTML = '<path d="M7 9v6h4l5 5V4L11 9H7zM3 9v6h2V9H3zm15.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>';
  } else {
    elements.volumeIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
  }
}

function formatTime(secs) {
  if (isNaN(secs) || secs < 0) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ==========================================================================
   History Management
   ========================================================================== */

function initHistory() {
  elements.clearHistoryBtn.addEventListener('click', () => {
    state.history = [];
    renderHistory();
    showToast('History Cleared', 'All previous generations cleared.', 'info');
  });
  renderHistory();
}

function addHistoryRecord(record) {
  state.history.unshift(record);
  if (state.history.length > 30) {
    state.history.pop();
  }
  renderHistory();
}

function renderHistory() {
  if (state.history.length === 0) {
    elements.historyEmptyState.classList.remove('hidden');
    elements.historyList.querySelectorAll('.history-item').forEach(el => el.remove());
    return;
  }

  elements.historyEmptyState.classList.add('hidden');
  elements.historyList.querySelectorAll('.history-item').forEach(el => el.remove());

  state.history.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'history-item';
    card.innerHTML = `
      <div class="history-item-top">
        <span class="history-voice-badge">${escapeHtml(item.voiceName)}</span>
        <span class="history-time">${item.timestamp}</span>
      </div>
      <p class="history-snippet" title="${escapeHtml(item.text)}">${escapeHtml(item.text)}</p>
      <div class="history-actions">
        <span class="history-meta">${escapeHtml(item.modelId.replace('eleven_', ''))}</span>
        <div class="history-btn-group">
          <button type="button" class="hist-btn play-hist-btn" data-index="${index}" title="Listen">
            ▶ Play
          </button>
          <button type="button" class="hist-btn dl-hist-btn" data-index="${index}" title="Download">
            ↓ MP3
          </button>
        </div>
      </div>
    `;

    // Listeners
    card.querySelector('.play-hist-btn').addEventListener('click', () => {
      loadAudioTrack(item.blob, `${item.voiceName} - History`);
      elements.narrationTextInput.value = item.text;
      updateTextStats();
    });

    card.querySelector('.dl-hist-btn').addEventListener('click', () => {
      downloadBlob(item.blob, `elevenlabs-${item.voiceName.toLowerCase()}-${item.id}.mp3`);
    });

    elements.historyList.appendChild(card);
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

/* ==========================================================================
   Toast Notifications
   ========================================================================== */

function showToast(title, message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconSvg = type === 'success'
    ? '<svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/></svg>'
    : type === 'error'
    ? '<svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd"/></svg>'
    : '<svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"/></svg>';

  toast.innerHTML = `
    ${iconSvg}
    <div class="toast-body">
      <div class="toast-title">${escapeHtml(title)}</div>
      <div class="toast-message">${escapeHtml(message)}</div>
    </div>
    <button class="toast-close" type="button" aria-label="Close notification">&times;</button>
  `;

  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.remove();
  });

  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => toast.remove(), 300);
    }
  }, 4500);
}
