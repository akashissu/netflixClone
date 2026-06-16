import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MovieRow } from '@/components/MovieRow';
import { ALL_MOVIES, MOVIE_ROWS } from '@/lib/data';
import type { Movie } from '@/types';

interface TitlePageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return ALL_MOVIES.map((movie) => ({ id: movie.id }));
}

export default function TitlePage({ params }: TitlePageProps) {
  const movie: Movie =
    ALL_MOVIES.find((m) => m.id === params.id) ??
    ({
      id: params.id,
      title: 'Unknown Title',
      description: 'No description available.',
      genre: 'Unknown',
      year: 2024,
      rating: 'N/A',
      score: 0,
      duration: 'N/A',
      thumbnail: `https://picsum.photos/seed/${params.id}/400/225`,
      backdrop: `https://picsum.photos/seed/${params.id}-bg/1920/1080`,
      isTrending: false,
      isNew: false,
      type: 'movie'
    } as Movie);

  const similarMovies = MOVIE_ROWS[0]?.movies ?? [];

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />

      {/* Backdrop */}
      <div
        className="relative w-full h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 70%, #141414 100%), url(${movie.backdrop})`
        }}
      >
        <div className="absolute bottom-0 left-0 px-8 md:px-16 pb-12 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">{movie.title}</h1>
          <div className="flex items-center gap-4 mb-4 text-sm">
            <span className="text-green-400 font-bold text-base">{movie.score}% Match</span>
            <span className="text-gray-300">{movie.year}</span>
            <span className="border border-gray-500 px-2 py-0.5 text-gray-300">{movie.rating}</span>
            <span className="text-gray-300">{movie.duration}</span>
          </div>
          <div className="flex gap-3 mb-6">
            <button className="flex items-center gap-2 bg-white text-black font-bold px-8 py-3 rounded hover:bg-gray-200 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>
            <button className="flex items-center gap-2 bg-gray-600 bg-opacity-70 text-white font-bold px-8 py-3 rounded hover:bg-opacity-90 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              My List
            </button>
          </div>
          <p className="text-gray-200 text-base leading-relaxed">{movie.description}</p>
        </div>
      </div>

      {/* Details */}
      <div className="px-8 md:px-16 py-8 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genre.split(', ').map((g) => (
              <span key={g} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                {g}
              </span>
            ))}
          </div>
          <h3 className="text-white font-semibold mb-2">About {movie.title}</h3>
          <p className="text-gray-400 leading-relaxed">{movie.description}</p>
        </div>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-gray-500">Type: </span>
            <span className="text-gray-300 capitalize">{movie.type}</span>
          </div>
          <div>
            <span className="text-gray-500">Genre: </span>
            <span className="text-gray-300">{movie.genre}</span>
          </div>
          <div>
            <span className="text-gray-500">Year: </span>
            <span className="text-gray-300">{movie.year}</span>
          </div>
          <div>
            <span className="text-gray-500">Rating: </span>
            <span className="text-gray-300">{movie.rating}</span>
          </div>
        </div>
      </div>

      {/* Similar Titles */}
      <div className="pb-16">
        <MovieRow title="More Like This" movies={similarMovies} />
      </div>

      <Footer />
    </div>
  );
}
