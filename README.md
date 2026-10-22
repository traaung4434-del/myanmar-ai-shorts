# ShortsAI — Myanmar AI Short Video Studio

## Run locally
1. Install Node.js 20+.
2. In this folder run `npm install`
3. Run `npm run dev`
4. Open the local URL printed by Vite.

## Current prototype features
- Myanmar-language responsive web UI
- Short script template generation
- 9:16 preview mockup and scene prompt planning
- Browser SpeechSynthesis voice playback (Myanmar voice availability depends on browser/device)
- Export scene plan as JSON

## Important limitation
This prototype does not generate/render an actual MP4 from text yet. To add real text-to-video, connect a video-generation provider API through a server-side backend. Keep provider API keys on the server; never place secrets in `src.jsx`. For a production version, add a server endpoint for script generation, a video provider endpoint, job status polling, storage, and MP4 download. Browser speech synthesis is not a guaranteed Myanmar TTS service.
