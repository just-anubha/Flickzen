'use client';

import { useState } from 'react';

const questions = [
  {
    id: 'who',
    question: "Who's watching tonight?",
    subtitle: "tell us your company ðŸ¿",
    options: ['ðŸ§ Just me', 'ðŸ‘¨â€ðŸ‘©â€ðŸ‘§ Family', 'ðŸ‘« Couple', 'ðŸŽ“ Friends'],
  },
  {
    id: 'time',
    question: "How much time do you have?",
    subtitle: "be honest ðŸ˜„",
    options: ['âš¡ Under 30 mins', 'ðŸŽ¬ 1 hour', 'ðŸŽ¥ 1.5 to 2 hours', 'ðŸŒ™ All evening'],
  },
  {
    id: 'type',
    question: "Movie or Series?",
    subtitle: "how committed are you tonight?",
    options: ['ðŸŽ­ Movie', 'ðŸ“º Series', 'ðŸ¤· No preference'],
  },
  {
    id: 'vibe',
    question: "What mood are you in?",
    subtitle: "pick what feels right",
    options: ['ðŸ˜‚ Comedy', 'ðŸ˜­ Emotional', 'ðŸ¤¯ Thriller', 'ðŸ˜´ Light and easy', 'ðŸ”¥ Action', 'ðŸ’€ Horror', 'ðŸ’• Romance', 'ðŸš€ Sci-fi or Fantasy', 'ðŸ§¸ Zero Adulting Zone'],
  },
  {
    id: 'language',
    question: "Which language?",
    subtitle: "we have it all",
    options: ['ðŸ‡®ðŸ‡³ Hindi', 'ðŸŒ English', 'ðŸŒ Any language'],
  },
  {
    id: 'age',
    question: "Who is in the room?",
    subtitle: "so we pick something everyone enjoys",
    options: ['ðŸ‘¶ Kids too', 'ðŸ§‘ Teenagers', 'ðŸ§” Adults only', 'ðŸ‘¨â€ðŸ‘©â€ðŸ‘¦ Mixed ages'],
  },
  {
    id: 'ott',
    question: "What do you have access to?",
    subtitle: "pick all that apply â€” we'll only suggest what you can actually watch",
    options: ['Netflix', 'Prime Video', 'Hotstar / Disney+', 'JioCinema', 'ZEE5', 'YouTube Free', 'ðŸ¤· I will manage'],
    multi: true,
  },
  {
    id: 'profession',
    question: "What do you do?",
    subtitle: "this helps us go even deeper ðŸŽ¯",
    options: ['ðŸ‘¨â€âš•ï¸ Doctor or Healthcare', 'ðŸ’¼ Business or Finance', 'ðŸ›ï¸ Government or Civil Services', 'ðŸ  Homemaker', 'ðŸŽ“ Student', 'ðŸ’» Tech or IT', 'ðŸŽ¨ Arts or Creative', 'â­ï¸ Skip'],
  },
];

interface Movie {
  title: string;
  reason: string;
  poster: string | null;
  type?: string;
  rating?: number;
  votes?: number;
  ott?: string;
  cinegram?: boolean;
}

interface RecommendationData {
  preface: string;
  movies: Movie[];
}

function StarRating({ rating }: { rating: number }) {
  const stars = Math.round(rating / 2);
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= stars ? 'text-yellow-400' : 'text-zinc-700'} style={{fontSize: '12px'}}>â˜…</span>
      ))}
      <span className="text-zinc-400 text-xs ml-1">{rating.toFixed(1)}/10</span>
    </div>
  );
}

function MovieCard({ movie, index }: { movie: Movie; index: number }) {
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-red-500 transition-all duration-300 group">
      <div className="relative">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-64 object-cover bg-zinc-800 group-hover:scale-[1.02] transition-transform duration-500"
            loading="eager"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 flex flex-col items-center justify-center gap-2">
            <span className="text-4xl">ðŸŽ¬</span>
            <span className="text-zinc-600 text-xs">poster not available</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {movie.type && (
            <span className="text-xs bg-red-600 px-2 py-1 rounded-full font-semibold backdrop-blur-sm">
              {movie.type}
            </span>
          )}
          {index === 0 && (
            <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-bold backdrop-blur-sm">
              ðŸ”¥ Top Pick
            </span>
          )}
        </div>
        {movie.ott && (
          <div className="absolute bottom-3 right-3">
            <span className="text-xs bg-black/80 border border-zinc-600 px-2 py-1 rounded-full backdrop-blur-sm text-zinc-300">
              ðŸ“º {movie.ott}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-1">{movie.title}</h2>
        {movie.rating && movie.rating > 0 && (
          <div className="flex items-center gap-3 mb-2">
            <StarRating rating={movie.rating} />
            {movie.votes && movie.votes > 0 && (
              <span className="text-zinc-500 text-xs">{(movie.votes / 1000).toFixed(0)}k reviews</span>
            )}
          </div>
        )}
        <p className="text-zinc-400 text-sm leading-relaxed italic mb-3">"{movie.reason}"</p>
        {movie.cinegram && (<a`n            href="https://cinegram.tv/home"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs bg-pink-600/20 border border-pink-500/40 text-pink-300 px-3 py-1.5 rounded-full hover:bg-pink-600/40 transition-all duration-200"
          >
            ðŸŽ€ Watch on CineGram
          </a>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RecommendationData | null>(null);

  const current = questions[step];
  const isMulti = (current as any)?.multi;

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [current.id]: answer };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      getRecommendations(newAnswers);
    }
  };

  const toggleMulti = (option: string) => {
    setMultiSelected(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const confirmMulti = () => {
    const val = multiSelected.length > 0 ? multiSelected.join(', ') : 'Any';
    handleAnswer(val);
    setMultiSelected([]);
  };

  const getRecommendations = async (finalAnswers: Record<string, string>) => {
    setLoading(true);
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalAnswers),
      });
      const json = await res.json();
      setData({ preface: json.preface || '', movies: json.movies || [] });
    } catch (e) {
      console.error(e);
      setData({ preface: '', movies: [] });
    }
    setLoading(false);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setMultiSelected([]);
    setData(null);
  };

  if (data && data.movies.length > 0) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center p-6">
        <div className="mt-10 mb-2 text-center max-w-md">
          <h1 className="text-3xl font-bold mb-3">ðŸŽ¬ Your Flickzen</h1>
          {data.preface && (
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 mb-2">
              <p className="text-zinc-300 text-sm leading-relaxed italic">"{data.preface}"</p>
            </div>
          )}
          <p className="text-zinc-600 text-xs mt-3">found your fish in the ocean ðŸŸ</p>
        </div>
        <div className="flex flex-col gap-6 w-full max-w-md mt-6">
          {data.movies.map((movie, i) => (
            <MovieCard key={i} movie={movie} index={i} />
          ))}
        </div>
        <button
          onClick={reset}
          className="mt-8 mb-12 border border-zinc-600 px-8 py-3 rounded-full text-zinc-300 hover:border-red-500 hover:text-red-400 transition-all duration-200 text-sm"
        >
          â†© Start over
        </button>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <div className="text-6xl animate-bounce">ðŸŽ¬</div>
        <p className="text-white text-xl font-semibold">Finding your perfect watch...</p>
        <p className="text-zinc-500 text-sm">searching the ocean for your fish ðŸŸ</p>
      </main>
    );
  }

  const progress = (step / questions.length) * 100;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-1">ðŸŽ¬ Flickzen</h1>
        <p className="text-zinc-500 text-sm">stop scrolling. find your flick.</p>
      </div>
      <div className="w-full max-w-sm mb-2">
        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <p className="text-zinc-600 text-xs mb-8">{step + 1} of {questions.length}</p>
      <p className="text-2xl font-bold text-center mb-1">{current.question}</p>
      <p className="text-zinc-500 text-sm text-center mb-8">{current.subtitle}</p>

      {isMulti ? (
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <div className="flex flex-wrap gap-2 mb-2">
            {current.options.map((option) => (
              <button
                key={option}
                onClick={() => toggleMulti(option)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                  multiSelected.includes(option)
                    ? 'bg-red-600 border-red-500 text-white'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-red-500'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={confirmMulti}
            className="bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-200 mt-2"
          >
            {multiSelected.length > 0 ? `Continue with ${multiSelected.length} selected â†’` : 'Skip â†’'}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {current.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="bg-zinc-900 hover:bg-red-600 border border-zinc-700 hover:border-red-500 text-white text-base py-4 px-6 rounded-2xl transition-all duration-200 text-left font-medium"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
