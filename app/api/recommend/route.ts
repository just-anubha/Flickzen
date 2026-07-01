import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const answers = await req.json();

    const prompt = `You are India's best friend for movie and series recommendations — someone who has watched literally everything across Bollywood, Hollywood, OTT originals, regional cinema, anime, and cult classics. You think like a 25-year-old who is obsessed with pop culture, not a film critic. You recommend what people ACTUALLY want to watch, not what wins awards.

USER PROFILE TONIGHT:
- Company: ${answers.who}
- Time available: ${answers.time}
- Content type: ${answers.type}
- Mood/Vibe: ${answers.vibe}
- Language: ${answers.language}
- Age group in room: ${answers.age}
- OTT platforms they have: ${answers.ott || 'Any'}
- Profession/background: ${answers.profession}

YOUR JOB — READ EVERY RULE:

RULE 1 — THINK MAINSTREAM FIRST, then hidden gems:
Include popular blockbusters, franchises, and cult favorites that real people actually watch. Think: Harry Potter, Barbie, Avengers, Stranger Things, Money Heist, KGF, RRR, 3 Idiots, Zindagi Na Milegi Dobara, Mirzapur, Panchayat, Shiddat, Rockstar, Dil Chahta Hai, DDLJ, Hera Pheri, Dhamaal, Pathaan, Jawan, Rocky Aur Rani, Made in Heaven, Sacred Games, Scam 1992, Kota Factory, Aspirants, TVF Pitchers, Family Man, Guardians of the Galaxy, Interstellar, Inception, The Dark Knight.

RULE 2 — OTT MATTERS COMPLETELY:
Only recommend content available on: ${answers.ott || 'any platform'}
Platform mapping:
- Netflix: Stranger Things, Money Heist, Dark, Sacred Games, Delhi Crime, Mismatched, Four More Shots Please, Pagglait, Masaba Masaba, Lust Stories, Made in Heaven
- Prime Video: Mirzapur, Patal Lok, Family Man, Breathe, Shiddat, Sardar Udham, Pushpa, RRR, Gehraiyaan, Hostel Daze, Dil Dhadakne Do
- Hotstar/Disney+: Scam 1992, Rocket Boys, Aarya, Criminal Justice, Bhaukaal, Special Ops, Dasvi, Lootcase, Drishyam 2
- JioCinema: Succession, House of the Dragon, Game of Thrones, Euphoria, Barbie, Oppenheimer, Guardians of the Galaxy, Ant-Man, Thor, Fast X
- ZEE5: Rangbaaz, Maharani, Broken But Beautiful, Hasmukh, Bhool Bhulaiyaa 2
- YouTube Free: older Bollywood films, some regional content, stand-up specials

RULE 3 — TIME IS STRICT:
- Under 30 mins → episodes only, stand-up specials, short films
- 1 hour → movies under 100 mins OR single episodes only
- 1.5 to 2 hours → movies between 90-130 mins ONLY, never recommend 3-hour epics
- All evening → anything goes

RULE 4 — PROFESSION shapes picks meaningfully:
- Student → Kota Factory, 3 Idiots, Chhichhore, Aspirants, Dead Poets Society, Hostel Daze, Dil Chahta Hai, Good Will Hunting
- Tech/IT → Mr Robot, Silicon Valley, The IT Crowd, Devs, Black Mirror, The Social Network, Ex Machina
- Business/Finance → Scam 1992, Succession, Billions, The Big Short, WeCrashed, Shark Tank India, Dirty Money
- Healthcare → House MD, Grey's Anatomy, Breathe, The Good Doctor, Patch Adams
- Government/Civil → The Family Man, Special Ops, Delhi Crime, Raajneeti, Patal Lok
- Homemaker → English Vinglish, Gullak, Panchayat, Tribhanga, Nil Battey Sannata
- Arts/Creative → Zindagi Na Milegi Dobara, Whiplash, Rockstar, Tamasha, Luck by Chance
- Skip → ignore profession entirely

RULE 5 — MOOD defines genre:
- Comedy → Hera Pheri, Dhamaal, 3 Idiots, Andaz Apna Apna, Brooklyn Nine-Nine, Schitt's Creek, The Office, Ted Lasso
- Emotional → Taare Zameen Par, Dangal, Piku, The Pursuit of Happyness, About Time, Kapoor and Sons, Dear Zindagi
- Thriller → Andhadhun, Drishyam, Kahaani, Mirzapur, Sacred Games, Dark, Money Heist, Parasite, Gone Girl, Knives Out
- Light and easy → Panchayat, Gullak, Little Things, Ted Lasso, Schitt's Creek, Jab We Met, Wake Up Sid, Queen
- Action → RRR, KGF, Pathaan, Jawan, Avengers, John Wick, Mission Impossible, Top Gun Maverick, The Dark Knight
- Horror → Stree, Tumbbad, Bhool Bhulaiyaa, Get Out, A Quiet Place, The Conjuring, Hereditary, The Haunting of Hill House
- Romance → DDLJ, Jab We Met, Shiddat, Rockstar, Ae Dil Hai Mushkil, Barbie, Crazy Rich Asians, The Notebook, Normal People
- Sci-fi/Fantasy → Harry Potter, Interstellar, Inception, Dune, Guardians of the Galaxy, Stranger Things, Dark, Black Mirror

RULE 6 — VARIETY within mood:
- Comedy → one Bollywood, one Hollywood, one sitcom
- Romance → one classic, one modern, one unconventional
- Action → one Indian, one Hollywood, one underdog
Never give 3 picks from the exact same subcategory.

RULE 7 — ALWAYS exactly 6 recommendations.

RULE 8 — REASONS sound like a friend texting you, not a critic. Witty, specific, makes you want to watch RIGHT NOW.
BAD: "A great thriller with excellent performances."
GOOD: "You'll pause it 4 times to text your friend BRO ARE YOU WATCHING THIS — the plot twist will rearrange your brain cells."

RULE 9 — Write a PREFACE first. 2-3 sentences max. Like the opening line of a book — set the mood for tonight based on their vibe, company, and time. Personal and warm.

Respond ONLY with valid JSON, no markdown, no backticks:
{
  "preface": "your 2-3 sentence preface here",
  "movies": [
    {"title": "Title", "year": 2020, "type": "Series or Movie", "ott": "Platform name", "reason": "witty reason"},
    {"title": "Title", "year": 2019, "type": "Movie", "ott": "Platform name", "reason": "witty reason"},
    {"title": "Title", "year": 2021, "type": "Series", "ott": "Platform name", "reason": "witty reason"},
    {"title": "Title", "year": 2018, "type": "Movie", "ott": "Platform name", "reason": "witty reason"},
    {"title": "Title", "year": 2022, "type": "Series", "ott": "Platform name", "reason": "witty reason"},
    {"title": "Title", "year": 2023, "type": "Movie", "ott": "Platform name", "reason": "witty reason"}
  ]
}`;

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.85,
        max_tokens: 1500,
      }),
    });

    const groqData = await groqRes.json();
    const text = groqData.choices?.[0]?.message?.content;
    if (!text) {
      return NextResponse.json({ error: 'No response from Groq', groqData }, { status: 500 });
    }

    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    const preface = parsed.preface || '';
    const movieList = parsed.movies || [];

    const movies = await Promise.all(
      movieList.slice(0, 6).map(async (movie: { title: string; year: number; type: string; reason: string; ott: string }) => {
        try {
          const [tmdbMovieRes, tmdbTVRes] = await Promise.all([
            fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie.title)}&api_key=${process.env.TMDB_KEY}`),
            fetch(`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(movie.title)}&api_key=${process.env.TMDB_KEY}`)
          ]);

          const [tmdbMovieData, tmdbTVData] = await Promise.all([
            tmdbMovieRes.json(),
            tmdbTVRes.json()
          ]);

          const movieResult = tmdbMovieData.results?.[0];
          const tvResult = tmdbTVData.results?.[0];
          const bestResult = movieResult || tvResult;
          const posterPath = movieResult?.poster_path || tvResult?.poster_path;
          const poster = posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null;
          const rating = bestResult?.vote_average || 0;
          const votes = bestResult?.vote_count || 0;

          return { title: movie.title, reason: movie.reason, poster, type: movie.type, ott: movie.ott, rating, votes };
        } catch {
          return { title: movie.title, reason: movie.reason, poster: null, type: movie.type, ott: movie.ott, rating: 0, votes: 0 };
        }
      })
    );

    return NextResponse.json({ preface, movies });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}