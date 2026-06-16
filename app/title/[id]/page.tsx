import { getTitleDetails } from '@/lib/tmdb';
import { DetailModal } from '@/components/DetailModal';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: { id: string };
  searchParams: { type?: string };
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  try {
    const mediaType = searchParams.type || 'movie';
    const title = await getTitleDetails(params.id, mediaType);
    return {
      title: `${title.title || title.name} — Netflix Clone`,
      description: title.overview,
      openGraph: {
        title: title.title || title.name || 'Title',
        description: title.overview || '',
        images: title.backdrop_path
          ? [`https://image.tmdb.org/t/p/w1280${title.backdrop_path}`]
          : [],
      },
    };
  } catch {
    return { title: 'Title — Netflix Clone' };
  }
}

export default async function TitlePage({ params, searchParams }: Props) {
  const mediaType = searchParams.type || 'movie';

  let title;
  try {
    title = await getTitleDetails(params.id, mediaType);
  } catch {
    notFound();
  }

  if (!title) notFound();

  return (
    <div className="min-h-screen bg-netflix-black">
      <DetailModal title={title} />
    </div>
  );
}
