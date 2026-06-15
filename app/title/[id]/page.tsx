import { fetchMovieDetails, fetchMovieVideos } from '@/lib/tmdb';
import DetailModal from '@/components/DetailModal';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { id: string };
  searchParams: { type?: string };
}

export default async function TitlePage({ params, searchParams }: PageProps) {
  const mediaType = searchParams.type || 'movie';
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    notFound();
  }

  try {
    const [details, videos] = await Promise.all([
      fetchMovieDetails(id, mediaType),
      fetchMovieVideos(id, mediaType),
    ]);

    if (!details) {
      notFound();
    }

    const trailer = videos.find(
      (v: { type: string; site: string }) => v.type === 'Trailer' && v.site === 'YouTube'
    ) || videos.find(
      (v: { type: string; site: string }) => v.site === 'YouTube'
    ) || null;

    return (
      <DetailModal
        details={details}
        trailerKey={trailer?.key || null}
        mediaType={mediaType}
      />
    );
  } catch (error) {
    console.error('Error fetching title details:', error);
    notFound();
  }
}
