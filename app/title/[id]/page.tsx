import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TitleDetail } from '@/components/TitleDetail';
import { ContentRow } from '@/components/ContentRow';
import { ALL_TITLES, TRENDING_NOW } from '@/lib/mockData';
import { notFound } from 'next/navigation';

interface TitlePageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return ALL_TITLES.map((title) => ({
    id: title.id.toString(),
  }));
}

export default function TitlePage({ params }: TitlePageProps) {
  const title = ALL_TITLES.find((t) => t.id.toString() === params.id);

  if (!title) {
    notFound();
  }

  const similar = TRENDING_NOW.filter((t) => t.id !== title.id).slice(0, 6);

  return (
    <div className="bg-netflix-black min-h-screen">
      <TitleDetail title={title} />
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <ContentRow title="More Like This" items={similar} />
      </div>
    </div>
  );
}
