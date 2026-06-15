'use client';

interface VideoPlayerProps {
  trailerKey: string;
  title: string;
}

export default function VideoPlayer({ trailerKey, title }: VideoPlayerProps) {
  return (
    <div className="relative w-full h-full">
      <iframe
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
        title={`${title} - Official Trailer`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        style={{ border: 'none' }}
      />
    </div>
  );
}
