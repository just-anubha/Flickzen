# 🎬 Flickzen

**AI-powered mood-based movie recommendation engine**

> *found your fish in the ocean 🐟*

Live → [flickzen.vercel.app](https://flickzen.vercel.app)

---

## What it does

Tell Flickzen how you're feeling — it figures out what you should watch. No endless scrolling, no decision fatigue. Pick a vibe, get a curated list of movies with real posters and AI-written match reasons.

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| AI | Groq API — llama-3.3-70b-versatile |
| Movie Data | TMDB API |
| Deployment | Vercel |

## Features

- 🎭 Mood-based recommendation engine
- 🖼️ Real movie posters via TMDB
- 🤖 AI-generated match reason for each pick
- ⚡ Fast inference via Groq

## Run locally

```bash
git clone https://github.com/just-anubha/Flickzen.git
cd flickzen
npm install
```

Create `.env.local`:
```
TMDB_KEY=your_tmdb_api_key
GROQ_API_KEY=your_groq_api_key
```

```bash
npm run dev
```

## Built by

**Anubha Goyal** — BTech CSE (AI/ML), KIIT University  
[@just-anubha](https://github.com/just-anubha)
