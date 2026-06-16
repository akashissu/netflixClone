import { Title } from '@/types';
import { TitleCard } from '@/components/TitleCard';

interface ContentGridProps {
  title: string;
  items: Title[];
}

export function ContentGrid({ title, items }: ContentGridProps) {
  return (
    <div>
      <h2 className="text-white text-2xl font-semibold mb-6">{title}</h2>
      {items.length === 0 ? (
        <p className="text-netflix-lightgray">No titles found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {items.map((item) => (
            <TitleCard key={item.id} title={item} />
          ))}
        </div>
      )}
    </div>
  );
}
