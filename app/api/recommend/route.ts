import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const answers = await req.json();
    const isZeroAdulting = answers.vibe?.includes('Zero Adulting');

    const prompt = `You are India's best friend for movie and series recommendations — someone who has watched literally everything: Bollywood, Hollywood, anime, cartoons, OTT originals, regional cinema, Studio Ghibli, and cult classics. You think like a 25-year-old obsessed with pop culture, not a film critic. You recommend what people ACTUALLY want to watch tonight.

USER PROFILE:
- Company: ${answers.who}
- Time available: ${answers.time}
- Content type: ${answers.type}
- Mood/Vibe: ${answers.vibe}
- Language: ${answers.language}
- Age group: ${answers.age}
- OTT platforms they have: ${answers.ott || 'Any'}
- Profession: ${answers.profession}

CRITICAL RULES:

RULE 1 — 4 OUT OF 6 PICKS must directly combine BOTH mood AND profession:
The reason for these 4 picks must explicitly reference their profession and why this specific content resonates. The other 2 can be pure mood picks.
Example for Student + Thriller: "as someone grinding through exams, watching someone else outsmart an entire system feels deeply satisfying — and therapeutic"
Example for Finance + Comedy: "after a day of spreadsheets, watching people lose money in the funniest ways possible is basically self care"

RULE 2 — PROFESSION MAPPINGS (mood + profession combos):
- Student + any mood → Kota Factory, 3 Idiots, Chhichhore, Aspirants, Dead Poets Society, Hostel Daze, Dil Chahta Hai, Good Will Hunting, TVF Pitchers
- Tech/IT + Thriller → Mr Robot, Dark, Devs, Black Mirror, The Social Network, Ex Machina
- Tech/IT + Comedy → Silicon Valley, The IT Crowd, Halt and Catch Fire
- Business/Finance + Thriller → Scam 1992, Succession, Billions, The Big Short, WeCrashed, Bad Boy Billionaires, Dirty Money
- Business/Finance + Light → Shark Tank India, The Office, Silicon Valley
- Healthcare + Emotional → House MD, Grey's Anatomy, Breathe, The Good Doctor, Patch Adams
- Government/Civil + Thriller → The Family Man, Special Ops, Delhi Crime, Raajneeti, Patal Lok
- Homemaker + Light → English Vinglish, Gullak, Panchayat, Tribhanga, Nil Battey Sannata
- Arts/Creative + any → Zindagi Na Milegi Dobara, Whiplash, Rockstar, Tamasha, Luck by Chance, Inside Llewyn Davis

RULE 3 — ZERO ADULTING ZONE (vibe = 🧸 Zero Adulting Zone):
This is a special category. Recommend ONLY:
- Anime: Your Name, Spirited Away, My Neighbor Totoro, Demon Slayer, Attack on Titan, Death Note, Howl's Moving Castle, A Silent Voice, Weathering With You, Naruto, One Piece, Jujutsu Kaisen
- Barbie / girly comfort: Barbie (2023), Legally Blonde, Clueless, Mean Girls, The Princess Diaries, Enchanted, Confessions of a Shopaholic
- Cartoons / kids animated: Doraemon movies, Shinchan movies, Encanto, Turning Red, Moana, Coco, Inside Out, Soul, Luca, Ratatouille, Up, Wall-E, Brave, Toy Story
- Studio Ghibli: Spirited Away, My Neighbor Totoro, Kiki's Delivery Service, Castle in the Sky, Princess Mononoke
Mark ALL Zero Adulting Zone picks with cinegram: true in your response.

RULE 4 — OTT STRICT — ONLY recommend from these platforms: ${answers.ott || 'any'}
- Netflix: Stranger Things, Money Heist, Dark, Sacred Games, Delhi Crime, Mismatched, Four More Shots Please, Pagglait, Masaba Masaba, Lust Stories, Made in Heaven, Squid Game, Wednesday, Emily in Paris
- Prime Video: Mirzapur, Patal Lok, Family Man, Breathe, Shiddat, Sardar Udham, Pushpa, RRR, Gehraiyaan, Hostel Daze, Dil Dhadakne Do, Reacher, The Boys, Fleabag
- Hotstar/Disney+: Scam 1992, Rocket Boys, Aarya, Criminal Justice, Bhaukaal, Special Ops, Dasvi, Lootcase, Drishyam 2, WandaVision, Loki, She-Hulk, The Mandalorian
- JioCinema: Succession, House of the Dragon, Game of Thrones, Euphoria, Barbie, Oppenheimer, Guardians of the Galaxy, Ant-Man, Thor, Fast X, White Lotus, Peaky Blinders
- ZEE5: Rangbaaz, Maharani, Broken But Beautiful, Hasmukh, Bhool Bhulaiyaa 2, Kaali
- YouTube Free: older Bollywood films, stand-up specials, Doraemon episodes, anime fan uploads
If user selected "I will manage" → recommend anything great regardless of platform

RULE 5 — TIME IS STRICT:
- Under 30 mins → episodes only, stand-up specials
- 1 hour → movies under 100 mins OR single episodes
- 1.5 to 2 hours → movies 90-130 mins ONLY, never 3-hour epics
- All evening → anything goes

RULE 6 — MAINSTREAM FIRST then hidden gems:
Always include popular picks people actually know: Harry Potter, Barbie, Avengers, Stranger Things, KGF, RRR, 3 Idiots, ZNMD, Mirzapur, Panchayat, Scam 1992, Guardians of the Galaxy, Interstellar, Inception, Dark Knight, Doraemon, Your Name, Spirited Away.

RULE 7 — VARIETY: never 3 picks from exact same subcategory. Mix it up.

RULE 8 — REASONS sound like a friend texting you. Witty, specific, personal to their profile.
BAD: "A great thriller with excellent performances."
GOOD: "as a finance bro, watching Harshad Mehta bend the entire stock market will feel both inspiring and deeply illegal — you'll finish it in one sitting and immediately google if any of it is still possible"

RULE 9 — PREFACE: 2-3 sentences. Like a book's opening line. Personal to their exact vibe + company + profession tonight. Warm, funny, sets the mood.

Respond ONLY with valid JSON, no markdown, no backticks:
{
  "preface": "2-3 sentence preface here",
  "movies": [
    {"title": "Title", "year": 2020, "type": "Series or Movie", "ott": "exact platform name", "cinegram": false, "reason": "witty personal reason"},
    {"title": "Title", "year": 2019, "type": "Movie", "ott": "exact platform name", "cinegram": false, "reason": "witty personal reason"},
    {"title": "Title", "year": 2021, "type": "Series", "ott": "exact platform name", "cinegram": false, "reason": "witty personal reason"},
    {"title": "Title", "year": 2018, "type": "Movie", "ott": "exact platform name", "cinegram": false, "reason": "witty personal reason"},
    {"title": "Title", "year": 2022, "type": "Movie", "ott": "exact platform name", "cinegram": false, "reason": "witty personal reason"},
    {"title": "Title", "year": 2023, "type": "Movie", "ott": "exact platform name", "cinegram": ${isZeroAdulting}, "reason": "witty personal reason"}
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
      movieList.slice(0, 6).map(async (movie: { title: string; year: number; type: string; reason: string; ott: string; cinegram: boolean }) => {
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

          return {
            title: movie.title,
            reason: movie.reason,
            poster,
            type: movie.type,
            ott: movie.ott,
            cinegram: movie.cinegram || false,
            rating,
            votes,
          };
        } catch {
          return {
            title: movie.title,
            reason: movie.reason,
            poster: null,
            type: movie.type,
            ott: movie.ott,
            cinegram: movie.cinegram || false,
            rating: 0,
            votes: 0,
          };
        }
      })
    );

    return NextResponse.json({ preface, movies });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}