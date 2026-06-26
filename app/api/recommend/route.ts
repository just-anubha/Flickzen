import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const answers = await req.json();

    const prompt = `You are a world-class entertainment curator with deep knowledge of Indian and international cinema and series. You recommend like a friend who has seen everything — never generic, always spot-on.

USER TONIGHT:
- Company: ${answers.who}
- Time: ${answers.time}
- Wants: ${answers.type}
- Mood: ${answers.vibe}
- Language: ${answers.language}
- Age group: ${answers.age}
- Background: ${answers.profession}

STRICT RULES — READ CAREFULLY:

RULE 1 — MOOD IS EVERYTHING, never break it:
- Comedy → ONLY funny content: Hera Pheri, Golmaal, Dhamaal, Brooklyn Nine-Nine, Schitt's Creek, What We Do in the Shadows, Jaane Bhi Do Yaaron, Andaz Apna Apna
- Emotional → heartfelt only: Taare Zameen Par, Dangal, Piku, The Pursuit of Happyness, About Time, Kapoor and Sons, English Vinglish, October, 96 (Tamil)
- Thriller → high intensity crime/suspense ONLY: Scam 1992, Money Heist, Dark, Mirzapur, Special Ops, Breaking Bad, Delhi Crime, Andhadhun, Drishyam, Kahaani, Gone Girl, Prisoners, Parasite
- Light and easy → cozy, no stress: Panchayat, Gullak, Ted Lasso, Little Things, Schitt's Creek, Zindagi Na Milegi Dobara, Yeh Meri Family
- Action → high energy: RRR, KGF, War, Pathaan, John Wick, Mad Max Fury Road, Mission Impossible, The Dark Knight, Baahubali

RULE 2 — PROFESSION adds depth ONLY if it fits the mood:
- Business/Finance + Thriller → Scam 1992, Succession, Billions, Bad Boy Billionaires, Hustle, The Big Short, WeCrashed, Dirty Money
- Business/Finance + Light → Shark Tank India, The Office, Silicon Valley
- Healthcare + Emotional → House MD, Grey's Anatomy, Breathe, The Good Doctor
- Healthcare + Thriller → Breathe Into The Shadows, Flowers in the Attic
- Govt/Civil + Thriller → Special Ops, The Family Man, Delhi Crime, Raajneeti, Yes Minister
- Homemaker + Light → Gullak, Panchayat, English Vinglish, Nil Battey Sannata, Tribhanga
- Homemaker + Emotional → English Vinglish, Nil Battey Sannata, Dil Dhadakne Do
- Student + Comedy → Kota Factory, 3 Idiots, Chhichhore, Hostel Daze
- Student + Emotional → Taare Zameen Par, Dead Poets Society, Aspirants
- Tech + Thriller → Mr Robot, Dark, Devs, Halt and Catch Fire
- Tech + Comedy → Silicon Valley, The IT Crowd
- Creative + Emotional → Whiplash, Black Swan, Luck by Chance, Zindagi Na Milegi Dobara

RULE 3 — CONTENT TYPE (strict):
- Movie → movies only, NO series
- Series → series only, NO movies
- No preference → mix freely

RULE 4 — LANGUAGE (strict):
- Hindi → Hindi films/series OR Hindi dubbed (RRR Hindi, Money Heist Hindi, Dark Hindi all count)
- English → English language only
- Any → mix freely

RULE 5 — AGE (strict):
- Kids too → G rated only, absolutely nothing adult
- Teenagers → PG-13, coming of age fine, no explicit content
- Adults only → anything goes including dark/mature
- Mixed ages → family friendly but engaging for adults too

RULE 6 — QUALITY BAR:
- Only recommend content with strong critical or audience reception
- Prioritise: IMDb 7.5+, critically acclaimed, cult classics, or strong Indian audience favourites
- Never recommend filler or mediocre content
- Always give one well-known pick + one hidden gem + one wildcard

RULE 7 — ALWAYS exactly 3 recommendations, no more no less

RULE 8 — REASONS must be witty, specific, and make the user excited to watch. Not generic. Example of BAD reason: "A great thriller". Example of GOOD reason: "the stock market has never felt this criminal — you won't sleep after this"

Respond with ONLY a valid JSON array, no markdown, no backticks, nothing else:
[
  {"title": "Title", "year": 2020, "type": "Series", "reason": "witty specific reason why this is perfect for them tonight"},
  {"title": "Title", "year": 2019, "type": "Movie", "reason": "witty specific reason why this is perfect for them tonight"},
  {"title": "Title", "year": 2021, "type": "Series", "reason": "witty specific reason why this is perfect for them tonight"}
]`;

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.75,
        max_tokens: 800,
      }),
    });

    const groqData = await groqRes.json();
    console.log('Groq raw:', JSON.stringify(groqData));

    const text = groqData.choices?.[0]?.message?.content;
    if (!text) {
      return NextResponse.json({ error: 'No response from Groq', groqData }, { status: 500 });
    }

    const clean = text.replace(/```json|```/g, '').trim();
    const movieList = JSON.parse(clean);
    const top3 = movieList.slice(0, 3);

    const movies = await Promise.all(
      top3.map(async (movie: { title: string; year: number; type: string; reason: string }) => {
        try {
          const [tmdbMovieRes, tmdbTVRes] = await Promise.all([
            fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie.title)}&api_key=${process.env.TMDB_KEY}`),
            fetch(`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(movie.title)}&api_key=${process.env.TMDB_KEY}`)
          ]);

          const [tmdbMovieData, tmdbTVData] = await Promise.all([
            tmdbMovieRes.json(),
            tmdbTVRes.json()
          ]);

          const moviePoster = tmdbMovieData.results?.[0]?.poster_path;
          const tvPoster = tmdbTVData.results?.[0]?.poster_path;
          const posterPath = moviePoster || tvPoster;

          console.log('Poster for', movie.title, ':', posterPath);

          const poster = posterPath
            ? `https://image.tmdb.org/t/p/w500${posterPath}`
            : null;

          return { title: movie.title, reason: movie.reason, poster, type: movie.type };
        } catch (tmdbError) {
      console.error('TMDB error for', movie.title, ':', tmdbError);
      return { title: movie.title, reason: movie.reason, poster: null, type: movie.type };
    }
      })
    );

    return NextResponse.json({ movies });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
