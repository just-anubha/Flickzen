'use client';

import { useState } from 'react';

const questions = [
  {
    id: 'who',
    question: "Who's watching tonight?",
    subtitle: "tell us your company 🍿",
    options: ['🧍 Just me', '👨‍👩‍👧 Family', '👫 Couple', '🎓 Friends'],
  },
  {
    id: 'time',
    question: "How much time do you have?",
    subtitle: "be honest 😄",
    options: ['⚡ 30 minutes', '🎬 1 to 2 hours', '🌙 All evening'],
  },
  {
    id: 'type',
    question: "Movie or Series?",
    subtitle: "how committed are you tonight?",
    options: ['🎭 Movie', '📺 Series', '🤷 No preference'],
  },
  {
    id: 'vibe',
    question: "What mood are you in?",
    subtitle: "pick what feels right",
    options: ['😂 Comedy', '😭 Emotional', '🤯 Thriller', '😴 Light and easy', '🔥 Action'],
  },
  {
    id: 'language',
    question: "Which language?",
    subtitle: "we have it all",
    options: ['🇮🇳 Hindi', '🌍 English', '🎭 Any language'],
  },
  {
    id: 'age',
    question: "Who is in the room?",
    subtitle: "so we pick something everyone enjoys",
    options: ['👶 Kids too', '🧑 Teenagers', '🧔 Adults only', '👨‍👩‍👦 Mixed ages'],
  },
  {
    id: 'profession',
    question: "What do you do?",
    subtitle: "this helps us go even deeper 🎯",
    options: ['👨‍⚕️ Doctor or Healthcare', '💼 Business or Finance', '🏛️ Government or Civil Services', '🏠 Homemaker', '🎓 Student', '💻 Tech or IT', '🎨 Arts or Creative', '⏭️ Skip'],
  },
];

interface Movie {
  title: string;
  reason: string;
  poster: string | null;
  type?: string;
}

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-red-500 transition-all duration-300">
      {movie.poster ? (
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-56 object-cover bg-zinc-800"
          loading="eager"
          onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
          style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
        />
      ) : (
        <div className="w-full h-40 bg-gradient-to-br from-zinc-800 to-zinc-900 flex flex-col items-center justify-center gap-2">
          <span className="text-4xl">🎬</span>
          <span className="text-zinc-600 text-xs">poster not available</span>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl font-bold">{movie.title}</h2>
          {movie.type && (
            <span className="text-xs bg-red-600 px-2 py-0.5 rounded-full font-medium">
              {movie.type}
            </span>
          )}
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed">{movie.reason}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [questions[step].id]: answer };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      getRecommendations(newAnswers);
    }
  };

  const getRecommendations = async (finalAnswers: Record<string, string>) => {
    setLoading(true);
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalAnswers),
      });
      const data = await res.json();
      setMovies(data.movies || []);
    } catch (e) {
      console.error(e);
      setMovies([]);
    }
    setLoading(false);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setMovies([]);
  };

  // Results screen
  if (movies.length > 0) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center p-6">
        <div className="mt-8 mb-2 text-center">
          <h1 className="text-3xl font-bold">🎬 Your Flickzen</h1>
          <p className="text-zinc-400 mt-1">found your fish in the ocean 🐟</p>
        </div>
        <div className="flex flex-col gap-6 w-full max-w-md mt-8">
          {movies.slice(0, 3).map((movie, i) => (
            <MovieCard key={i} movie={movie} />
          ))}
        </div>
        <button
          onClick={reset}
          className="mt-8 mb-12 border border-zinc-600 px-8 py-3 rounded-full text-zinc-300 hover:border-red-500 hover:text-red-400 transition-all duration-200 text-sm"
        >
          ↩ Start over
        </button>
      </main>
    );
  }

  // Loading screen
  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <div className="text-6xl animate-bounce">🎬</div>
        <p className="text-white text-xl font-semibold">Finding your perfect watch...</p>
        <p className="text-zinc-500 text-sm">searching the ocean for your fish 🐟</p>
      </main>
    );
  }

  // Question screen
  const current = questions[step];
  const progress = (step / questions.length) * 100;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-1">🎬 Flickzen</h1>
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
    </main>
  );
}