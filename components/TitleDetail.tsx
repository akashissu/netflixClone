import Link from 'next/link';
import Image from 'next/image';
import { Title } from '@/types';

interface TitleDetailProps {
  title: Title;
}

export function TitleDetail({ title }: TitleDetailProps) {
  return (
    <div className="relative">
      {/* Backdrop */}
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${title.backdropPath || title.posterPath})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/60 to-transparent" />
      </div>

      {/* Detail Content */}
      <div className="relative -mt-32 px-4 md:px-8 lg:px-16 pb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 w-48 md:w-64 hidden md:block">
            <div className="relative aspect-[2/3] rounded-md overflow-hidden shadow-2xl">
              <Image
                src={title.posterPath}
                alt={title.title}
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            {title.isNetflixOriginal && (
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-netflix-red font-bold text-sm tracking-widest uppercase">N</span>
                <span className="text-white text-sm tracking-widest uppercase font-light">
                  {title.mediaType === 'tv' ? 'Series' : 'Film'}
                </span>
              </div>
            )}

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{title.title}</h1>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-green-400 font-semibold">
                {Math.round(title.voteAverage * 10)}% Match
              </span>
              <span className="text-netflix-lightgray">{title.releaseYear}</span>
              {title.maturityRating && (
                <span className="border border-netflix-gray text-netflix-lightgray text-xs px-2 py-0.5">
                  {title.maturityRating}
                </span>
              )}
              {title.duration && (
                <span className="text-netflix-lightgray text-sm">{title.duration}</span>
              )}
              {title.seasons && (
                <span className="text-netflix-lightgray text-sm">{title.seasons} Seasons</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 mb-6">
              <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-white/80 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Play</span>
              </button>
              <button className="flex items-center space-x-2 bg-netflix-gray/50 text-white px-8 py-3 rounded font-semibold hover:bg-netflix-gray/40 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>My List</span>
              </button>
            </div>

            <p className="text-white text-base leading-relaxed mb-6 max-w-2xl">{title.overview}</p>

            {/* Genres */}
            {title.genres && title.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {title.genres.map((genre) => (
                  <span
                    key={genre}
                    className="text-xs text-netflix-lightgray border border-netflix-gray px-3 py-1 rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Cast */}
            {title.cast && title.cast.length > 0 && (
              <p className="text-netflix-lightgray text-sm">
                <span className="text-netflix-gray">Cast: </span>
                {title.cast.join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
