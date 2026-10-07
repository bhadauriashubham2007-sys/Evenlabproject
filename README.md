# ElevenVoice Studio 🎙️

A modern, high-fidelity AI Narration Studio built with **HTML5, CSS3, and JavaScript**, powered directly by the **ElevenLabs Text-to-Speech API**.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![ElevenLabs](https://img.shields.io/badge/ElevenLabs-API-6366f1?style=for-the-badge)

---

## ✨ Features

- **Model Selection Dropdown**: Easily choose from all state-of-the-art ElevenLabs narration models:
  - `eleven_multilingual_v2` — State-of-the-art emotional range across 29 languages (Recommended).
  - `eleven_turbo_v2_5` — High quality with ultra-low latency across 32 languages.
  - `eleven_flash_v2_5` — Real-time synthesis (~75ms latency) across 32 languages.
  - `eleven_flash_v2` — Fast real-time model for 30+ languages.
  - `eleven_turbo_v2` — Low-latency English synthesis.
  - `eleven_monolingual_v1` — Classic English narration.
- **Voice Actor Library**: Pre-loaded with 25+ top curated ElevenLabs voices (Rachel, Adam, Bella, Josh, George, Alice, etc.), plus **Sync** button to fetch custom/cloned voices directly from your ElevenLabs account!
- **Fine-Tuning Controls**: Adjust voice settings:
  - *Stability* (more steady vs. more expressive).
  - *Clarity / Similarity Boost*.
  - *Style Exaggeration*.
  - *Speaker Boost*.
- **Live Waveform Visualizer**: Real-time canvas frequency visualizer powered by Web Audio API (`AnalyserNode`) that dances to the generated audio stream.
- **Full Audio Player**:
  - Scrubbable timeline with time counter.
  - Playback speed multiplier (0.8x, 1.0x, 1.2x, 1.5x, 2.0x).
  - Volume control & instant mute.
  - One-click **Download MP3** button.
- **One-Click Script Presets**: Test immediately with presets for *Sci-Fi Odyssey*, *Fantasy Audiobook*, *Product Keynote*, *Calm Meditation*, and *Tech News*.
- **Generation History**: Re-listen or download any of your past audio clips anytime.
- **Secure Key Storage**: Saves your API key in your browser's `localStorage` — no backend required, never sent anywhere except directly to ElevenLabs over HTTPS.

---

## 🚀 Getting Started

### Method 1: Run with Python Dev Server (Recommended)
Open your terminal in this project folder and run:

```bash
python server.py
```
This automatically starts a local server at `http://localhost:3000` and opens your browser.

### Method 2: Open directly in Browser
You can also simply double-click or open `index.html` in Chrome, Edge, Brave, or Firefox.

---

## 🔑 Getting an ElevenLabs API Key

1. Sign up or log in at [ElevenLabs](https://elevenlabs.io).
2. Go to your [API Keys settings](https://elevenlabs.io/app/settings/api-keys).
3. Click **Create API Key** and copy it.
4. In **ElevenVoice Studio**, click the **API Key** button in the header, paste your key (`xi-api-key`), and click **Save Key**.
5. You can also click **Test Key** to verify your account tier and remaining character quota!

---

## 📁 Project Structure

```
Evenlabproject/
├── index.html       # Semantic HTML layout, modals & audio player
├── style.css        # Premium dark glassmorphism styling & animations
├── app.js           # ElevenLabs API calls, Web Audio API visualizer & logic
├── server.py        # Lightweight local Python server with CORS headers
└── README.md        # Documentation & usage guide
```

---

## 🛡️ Privacy & Security
Your ElevenLabs API key is stored strictly on your client device using `localStorage` and sent over an encrypted HTTPS connection directly to `api.elevenlabs.io`. No external servers or telemetry are used.
