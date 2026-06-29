# 🎬 Flickzen

> *found your fish in the ocean 🐟*

A mood-based movie recommendation engine. Tell it how you're feeling, get something worth watching.

Live → [flickzen.vercel.app](https://flickzen.vercel.app)

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| AI | Groq — llama-3.3-70b-versatile |
| Movie Data | TMDB API |
| Deployment | Vercel |

## Features

- 🎭 Mood-based recommendations
- 🖼️ Movie posters via TMDB
- 🤖 AI-written reason for each pick
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
